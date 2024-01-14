<div class="todo-list-container"  
  on:drop={(e) => handleDroppedTask(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <div style="display: flex; align-items: center"
    on:mouseenter={() => isMouseHoveringOnTaskName = true}
    on:mouseleave={() => isMouseHoveringOnTaskName = false}
  >
    <div style="height: 24px; font-size: 16px; align-items: center; display: flex;">
      <div style="margin-left: 8px; color: rgb(10, 10, 10); font-weight: 500">{listTitle}</div> 
    </div>

    {#if isMouseHoveringOnTaskName}
      <span on:click={() => isTypingNewRootTask = true} class="material-icons" style="margin-left: 6px; cursor: pointer;">
        add
      </span>
    {/if}
  </div>

  <div style="margin-bottom: 36px;"></div>

  <!-- TO-DO: Render all tasks with deadline of this week here -->
  {#each tasksDueThisWeek as taskObj}
    <RecursiveTaskElement 
      {taskObj}
      depth={0}
      doNotShowScheduledTasks={false}
      doNotShowCompletedTasks={true}
      on:task-click
      on:task-node-update
      on:subtask-create
    />
    <div style="margin-bottom: 24px;"></div>
  {/each}

  {#if isTypingNewRootTask}
    <input 
      bind:this={NewRootTaskInput}
      bind:value={newRootTaskStringValue} 
      on:keydown={(e) => handleKeyDown(e)}
      placeholder="Type task here..."
    >
  {/if}
</div>

<script>
  import { 
    computeDayDifference, 
    convertMMDDToDateClassObject, 
    applyFuncToEveryTreeNode,
    convertDDMMYYYYToDateClassObject,
    getDateInDDMMYYYY, 
    getRandomID,
  } from '/src/helpers.js'
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { createEventDispatcher, tick } from 'svelte'

  export let allIncompleteTasks
  export let dueInHowManyDays

  export let listTitle

  let defaultDeadline

  let isMouseHoveringOnTaskName = false
  let tasksDueThisWeek = null

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

  $: getTasksDueThisWeek(allIncompleteTasks)

  $: {
    if (isTypingNewRootTask) {
      tick().then(() => {
        if (NewRootTaskInput) {// quick-fix {
          NewRootTaskInput.focus()
        }
      })
    }
  }

  function getTasksDueThisWeek (taskArray) {
    const output = []
    const copy = [...taskArray]

    applyFuncToEveryTreeNode({ 
      tree: copy, 
      applyFunc: (task) => {
        if (!task.deadlineDate) return false

        // check if it's already scheduled on calendar
        if (task.startTime && task.startDate) return false

        const d1 = new Date()
        const d2 = convertDDMMYYYYToDateClassObject(task.deadlineDate)
        const dayDiff = computeDayDifference(
          d1, d2
        )

        // KEY INTERFACE HERE
        if (dayDiff <= dueInHowManyDays) {
          output.push(task)
          return true // this will terminate further traversal down its children
        }
      }
    })
    tasksDueThisWeek = output
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
      deadlineTime: deadlineTimeHHMM, // 
      deadlineDate: deadlineDateDDMMYYYY
    })

    // console.log('If event is handled, taskObject would be =',{
    //   id: taskID, 
    //   timeOfDay: '',
    //   deadlineTime: deadlineTimeHHMM, // 
    //   deadlineDate: deadlineDateDDMMYYYY
    // })
  }
</script>

<style>
  .todo-list-container {
    height: 100%;
    width: 100%;
    /* min-width: 300px;  */
    background-color: var(--todo-list-bg-color);
    padding-left: 12px; 
    border-radius: 12px;
    padding-right: 12px;
    padding-top: 24px;
    font-size: 2em;
    overflow-y: auto;
  }
</style>