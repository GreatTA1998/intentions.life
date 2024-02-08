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
    <div style="margin-top: 12px; max-width: 22vw;">
      {#each tasksToDisplay as taskObj, i}
        <RecursiveTaskElement 
          {taskObj}
          depth={0}
          ancestorRoomIDs={['']}
          doNotShowScheduledTasks={true}
          doNotShowCompletedTasks={true}
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

  export let dueInHowManyDays = null // AF(null) means it's a life todo, otherwise it should be a number
  export let allTasksDue = []
  export let listTitle

  let defaultDeadline
  let tasksToDisplay = []
  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''
  const dispatch = createEventDispatcher()

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
    for (let i = 0; i < dueInHowManyDays; i++) {
      d.setDate(d.getDate() + 1)
    }
    const newRootTaskObj = {
      deadlineDate: defaultDeadline, // getDateInDDMMYYYY(d),
      deadlineTime: '23:59',
      id: getRandomID(),
      name: taskName,
      parentID: ""
    }
    dispatch('new-root-task', newRootTaskObj)
    // use same API as legacy code
  }

  // HANDLING DROP, WE HAVE TO HANDLE ALL THE CASES CORRECTLY
  // WHEN IT'S COMING FROM THE CALENDAR (ALTHOUGH WE'RE NOT USING IT THEN, WE HAVE TO UNSCHEDULE IT)
  // WHAT'S THE EXACT, PRECISE BEHAVIOR THAT WE WANT
  function handleDroppedTask (e) {
    e.preventDefault()

    const droppedTaskID = e.dataTransfer.getData('text/plain')

    dispatchNewDeadline({
      deadlineDateDDMMYYYY: defaultDeadline,
      deadlineTimeHHMM: '23:59',
      taskID: droppedTaskID
    })

    // also unschedule it (this was an old API, but we can just add it here via composition : ) lazy work
    dispatch('task-unscheduled', {
      id: e.dataTransfer.getData('text/plain')
    })
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
</style>