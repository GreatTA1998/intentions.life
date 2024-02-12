<div 
  class="todo-list-container" 
  style={$$props.style}
  on:drop|stopPropagation={(e) => handleDroppedTask(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <!-- <slot name="above-list-title">

  </slot> -->

  <!-- Yes every indented <div> is necessary, trust me for now, to make the 
    Month todo layout work horizontally with flexbox
    and the week todo layout work vertically  
  -->
  <div>
    <div>
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <div style="height: 24px; align-items: center; display: flex;">
          <div style="font-weight: 600; font-size: 18px; margin-left: 2px;">
            {listTitle} 
          </div> 
        </div>

        <span on:click={() => isTypingNewRootTask = true} 
          class="new-task-icon material-icons" 
          style="margin-left: 10px; margin-bottom: 10px"
        >
          +
        </span>
      </div>
    </div>


    <!-- giving a maximum width for to-do lists prevents complicated
      nested flexbox calculations
    -->
    <div class:enable-scrolling={enableScrolling} class:has-max-width={hasMaxWidth} style="margin-top: 12px;">
      {#each tasksToDisplay as taskObj, i (taskObj.id)}
        <RecursiveTaskElement 
          {taskObj}
          depth={0}
          ancestorRoomIDs={['']}
          doNotShowScheduledTasks={true}
          doNotShowCompletedTasks={true}
          {dueInHowManyDays}
          on:task-click
          on:task-checkbox-change
          on:task-node-update
          on:subtask-create
        > 
          <div slot="dropzone-above-task-name">
            {#if tasksToDisplay.length > 2}
              <ReusableHelperDropzone
                ancestorRoomIDs={['']}
                roomsInThisLevel={tasksToDisplay}
                idxInThisLevel={i}
                parentID={''}
                parentObj={{ subtreeDeadlineInMsElapsed: convertDDMMYYYYToDateClassObject(defaultDeadline).getTime() }}
                colorForDebugging="purple"
                {dueInHowManyDays}
              />
            {/if}
          </div>
        </RecursiveTaskElement>
      {/each}

      {#if tasksToDisplay.length > 2}
        <!-- NOTE: BECAUSE WE DON'T DISPLAY TASKS THAT ARE COMPLETED,
          WE HAVE A DEVIATION BETWEEN STATE AND UI
          IN THE FUTURE IF THERE ARE UNEXPECTED BUGS, THIS IS THE LIKELY CAUSE
        -->
        <!-- {tasksToDisplay.length} -->
        <ReusableHelperDropzone
          ancestorRoomIDs={['']}
          roomsInThisLevel={tasksToDisplay}
          idxInThisLevel={tasksToDisplay.length}
          parentID={''}
          parentObj={{ subtreeDeadlineInMsElapsed: convertDDMMYYYYToDateClassObject(defaultDeadline).getTime() }}
          colorForDebugging="blue"
          {dueInHowManyDays}
        />
      {/if}

      {#if isTypingNewRootTask}
        <UXFormField
          fieldLabel="Task Name"
          value={newRootTaskStringValue}
          on:input={(e) => newRootTaskStringValue = e.detail.value}
          on:focus-out={() => {
            if (newRootTaskStringValue === '') {
              isTypingNewRootTask = false
            }
          }}
          on:task-entered={(e) => handleKeyDown(e)}
        />
      {/if}
    </div>
  </div>

  <slot>

  </slot>
</div>

<script>
  import { 
    getDateInDDMMYYYY, 
    getRandomID,
    sortByUnscheduledThenByOrderValue,
    convertDDMMYYYYToDateClassObject
  } from '/src/helpers.js'
  import UXFormField from '$lib/UXFormField.svelte'
  import ReusableHelperDropzone from '$lib/ReusableHelperDropzone.svelte'
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { createEventDispatcher, tick } from 'svelte'
  import {
    breakParentRelationIfNecessary,
    maintainValidSubtreeDeadlines,
    correctDeadlineIfNecessary
  } from '/src/helpers/subtreeDragDrop.js'
  import { user, whatIsBeingDraggedFullObj, whatIsBeingDragged, whatIsBeingDraggedID } from '/src/store.js'
  import { getFirestore, writeBatch, doc, increment } from 'firebase/firestore'

  export let dueInHowManyDays = null // AF(null) means it's a life todo, otherwise it should be a number
  export let allTasksDue = []
  export let listTitle
  export let enableScrolling = false
  export let hasMaxWidth = false // quickfix to prevent complicated flexbox layout ordering issues

  let defaultDeadline
  let tasksToDisplay = []
  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''
  const dispatch = createEventDispatcher()
  const db = getFirestore()
  let batch = writeBatch(db)

  // COMPUTE DEFAULT DEADLINE 
  $: {
    const d = new Date()
    for (let i = 0; i < dueInHowManyDays; i++) {
      d.setDate(d.getDate() + 1)
    }
    defaultDeadline = getDateInDDMMYYYY(d)
  }

  // svelte reactive statements are order sensitive
  $: if (allTasksDue.length > 0) {
    computeTasksToDisplay()
  }

  function computeTasksToDisplay () {
    const temp = sortByUnscheduledThenByOrderValue(allTasksDue)
    tasksToDisplay = temp.filter(task => !task.isDone)
  }

  function handleKeyDown (e) {
    if (newRootTaskStringValue === '') {
      isTypingNewRootTask = false
    }
    // nice side-effect of this: double-tap ENTER to be done
    else  {
      createRootTaskWithDeadline(newRootTaskStringValue)
      // then reset
      newRootTaskStringValue = ''
    }
  }

  // INTERFACE DIFFERENCE #2
  function createRootTaskWithDeadline (taskName) {
    const d = new Date()
    d.setDate(d.getDate() + dueInHowManyDays - 1)
    const newRootTaskObj = {
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '23:59',
      id: getRandomID(),
      name: taskName,
      parentID: ""
    }
    dispatch('new-root-task', newRootTaskObj)
    // use same API as legacy code
  }

  function handleDroppedTask (e) {
    e.preventDefault()

    // to be consistent with the API of <ReusableHelperDropzone {parentObj}/>
    const parentObj = { subtreeDeadlineInMsElapsed: Infinity }

    const initialNumericalDifference = 3
    let newVal = $user.maxOrderValue || initialNumericalDifference
    batch.update(
      doc(db, `/users/${$user.uid}/`), {
        maxOrderValue: increment(initialNumericalDifference)
      }
    )

    // 1. ORDER VALUE (and startTime)
    // only applies to the subtree's root
    const { deadlineDate, deadlineTime, id, subtreeDeadlineInMsElapsed } = $whatIsBeingDraggedFullObj

    let updateObj = {
      orderValue: newVal,
      deadlineDate,
      deadlineTime,
      id,
      subtreeDeadlineInMsElapsed
    }
    
    // 2. UNSCHEDULE: when you drag to the to-do list, it always unschedules it from the calendar
    updateObj.startTime = '' 
    updateObj.startDate = ''
    updateObj.startYYYY = ''

    // 3. DEADLINE
    updateObj = correctDeadlineIfNecessary({ 
      node: updateObj, 
      todoListUpperBound: dueInHowManyDays, 
      parentObj,
      batch,
      userDoc: $user
    })

    // 4. PARENTID
    updateObj = breakParentRelationIfNecessary(updateObj)

    // 2. HANDLE SUBTREE DEADLINES
    maintainValidSubtreeDeadlines({ 
      node: $whatIsBeingDraggedFullObj, 
      todoListUpperBound: dueInHowManyDays, 
      parentObj,
      batch,
      userDoc: $user
    })

    batch.update(
      doc(db, `users/${$user.uid}/tasks/${$whatIsBeingDraggedID}`),
      updateObj
    )

    batch.commit()

    batch = writeBatch(db)
  }

  function dragover_handler (e) {
    e.preventDefault()
  }

  function dispatchNewDeadline ({ taskID, deadlineDateDDMMYYYY, deadlineTimeHHMM }) {
    dispatch('task-dragged', {
      id: taskID,
      timeOfDay: '',
      deadlineTime: deadlineTimeHHMM, 
      deadlineDate: deadlineDateDDMMYYYY
    })
  }
</script>

<style>
  .todo-list-container {
    width: 100%;
    background-color: var(--todo-list-bg-color);
    padding-bottom: 16px;
    padding-left: 2vw; 
    padding-right: 2vw;
    font-size: 2em;
  }

  .enable-scrolling {
    height: 68vh;
    overflow-y: auto;
  }

  .has-max-width {
    max-width: 22vw; 
  }
</style>