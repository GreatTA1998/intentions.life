<div 
  class="todo-list-container" 
  style={$$props.style}
  on:drop|stopPropagation={(e) => handleDroppedTask(e)}
  on:dragover={(e) => dragover_handler(e)}
> 
  <div class="first-column" style="height: 100%; display: flex; flex-direction: column;">
    <div style="display: flex; align-items: center; margin-bottom: 12px;">
      <div style="font-weight: 600; font-size: 18px; color: rgb(80, 80, 80)">
        {listTitle} 
      </div> 
      
      <span on:click={startTypingNewTask} 
        class="new-task-icon material-icons" 
        style="margin-left: 10px; margin-bottom: 10px"
      >
        +
      </span>
    </div>

    <div 
      style="flex-grow: 1; padding: 0px 6px;"
      class:has-max-width={hasMaxWidth}
      class:enable-scrolling={enableScrolling} 
    >
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
        <div style="margin-bottom: 8px;"></div>
      {/if}

      {#each tasksToDisplay as taskObj, i (taskObj.id)}
        <RecursiveTaskElement 
          {taskObj}
          depth={0}
          ancestorRoomIDs={['']}
          doNotShowScheduledTasks={true}
          doNotShowCompletedTasks={true}
          {dueInHowManyDays}
          {willShowCheckbox}
          {isLargeFont}
          {isRecursive}
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
    </div>
  </div>

  <slot {startTypingNewTask}>

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
  import db from '/src/db.js'

  export let dueInHowManyDays = null // AF(null) means it's a life todo, otherwise it should be a number
  export let allTasksDue = []
  export let listTitle
  export let enableScrolling = false
  export let hasMaxWidth = false // quickfix to prevent complicated flexbox layout ordering issues
  export let willShowCheckbox = true
  export let isLargeFont = false
  export let isRecursive = true

  let defaultDeadline
  let tasksToDisplay = []
  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''
  const dispatch = createEventDispatcher()
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

  function startTypingNewTask () {
    isTypingNewRootTask = true
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

    if (tasksToDisplay.length > 0) {
      newRootTaskObj.orderValue = (0 + tasksToDisplay[0].orderValue) / 2 
    } // otherwise the default `orderValue` will be `maxOrder`, handled by `checkTaskObjSchema`

    dispatch('new-root-task', newRootTaskObj)
    // use same API as legacy code
  }

  function handleDroppedTask (e) {
    e.preventDefault()

    // to be consistent with the API of <ReusableHelperDropzone {parentObj}/>
    const parentObj = { subtreeDeadlineInMsElapsed: Infinity }

    // put task to the bottom of to-do list, if it wasn't already on the to-do list
    let newVal
    if ($whatIsBeingDraggedFullObj.startDate) {
      const initialNumericalDifference = 3
      newVal = $user.maxOrderValue || initialNumericalDifference
      batch.update(
        doc(db, `/users/${$user.uid}/`), {
          maxOrderValue: increment(initialNumericalDifference)
        }
      )
    } 
    else { // don't re-position the todo-task if it's already on the list, leave it as it is
      newVal = $whatIsBeingDraggedFullObj.orderValue
    }

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

    whatIsBeingDraggedFullObj.set(null)
    whatIsBeingDraggedID.set('')
    whatIsBeingDragged.set('')
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
    /* width: 100%; will cause the strange shifting out of screen bug*/
    height: 100%;
    background-color: var(--todo-list-bg-color);
    padding-bottom: 16px;
    padding-left: 2vw; 
    padding-right: 2vw;
    font-size: 2em;
  }

  .enable-scrolling {
    overflow-y: auto;
  }

  /* This saves a lot of pain, trust me. I have no idea why the flexboxes don't shrink with flex-basis, flex-shrink etc. and upon further research it looks like 
    it can get extremely complicated, and that CSS grid could be a better solution.
  */
  .has-max-width {
    max-width: 21.2vw; 
  }

  .first-column {
    flex-basis: 100%; 
  }
</style>