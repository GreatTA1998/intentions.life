<div 
  class="todo-list-container" 
  style={$$props.style}
  on:drop|stopPropagation={(e) => handleDroppedTask(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <slot name="above-list-title">

  </slot>

  <div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <div style="height: 24px; align-items: center; display: flex;">
        <div style="font-weight: 500; font-size: 16px;">
          {listTitle}
        </div> 
      </div>

      <span on:click={() => isTypingNewRootTask = true} class="material-icons" style="margin-left: 6px; cursor: pointer; opacity: 0.5;
        color: var(--logo-twig-color);">
        add
      </span>
    </div>

    <slot name="below-list-title">

    </slot>
  </div>

  <div style="outline: 0px solid blue; margin-top: 12px; padding-left: {cheatToAddPadding ? '12px' : ''}">
    <slot name="alternative-title" openNewTaskInput={() => isTypingNewRootTask = true}>

    </slot>

    {#each tasksToDisplay as taskObj, i}
      <RecursiveTaskElement 
        {taskObj}
        depth={0}
        ancestorRoomIDs={['']}
        doNotShowScheduledTasks={false}
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
      <div style="margin-bottom: 24px;"></div>
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
      <input 
        bind:this={NewRootTaskInput}
        bind:value={newRootTaskStringValue} 
        on:keydown={(e) => handleKeyDown(e)}
        placeholder="Type task here..."
      >
    {/if}
  </div>
</div>

<script>
  import { 
    getDateInDDMMYYYY, 
    getRandomID,
    sortByUnscheduledThenByOrderValue
  } from '/src/helpers.js'
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { createEventDispatcher, tick } from 'svelte'
  import ReusableHelperDropzone from '$lib/ReusableHelperDropzone.svelte'
  import { convertDDMMYYYYToDateClassObject } from '/src/helpers';

  export let dueInHowManyDays = null // AF(null) means it's a life todo, otherwise it should be a number
  export let allTasksDue = []
  export let listTitle
  export let cheatToAddPadding = false

  let defaultDeadline

  let tasksToDisplay = []

  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''
  let NewRootTaskInput = ''
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

  $: {
    if (isTypingNewRootTask) {
      tick().then(() => {
        if (NewRootTaskInput) {// quick-fix {
          NewRootTaskInput.focus()
        }
      })
    }
  }

  function computeTasksToDisplay () {
    tasksToDisplay = sortByUnscheduledThenByOrderValue(allTasksDue)
  }

  function handleKeyDown (e) {
    if (e.key !== 'Enter') return

    if (newRootTaskStringValue === '') {
      isTypingNewRootTask = false
      newRootTaskStringValue = ''
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
    height: 100%;
    width: 100%;
    background-color: var(--todo-list-bg-color);
    border-radius: 12px;
    padding: 16px;
    font-size: 2em;
    overflow-y: auto;
  }
</style>