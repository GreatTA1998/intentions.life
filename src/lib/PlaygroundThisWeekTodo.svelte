<div style="
    min-width: 495px; 
    background-color: #ECECEC;
    padding-left: 80px; padding-right: 80px;
    padding-top: 120px;
    font-size: 2em;
  "  
  on:drop={(e) => unscheduleTask(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <div style="display: flex; align-items: center">
    <div style="font-family: Inter; color: #6D6D6D; font-weight: 600">
      This week's to-do
    </div>

    <span on:click={() => isTypingNewRootTask = true} class="material-icons">
      add
    </span>
  </div>

  <!-- TO-DO: Render all tasks with deadline of this week here -->
  {#each tasksDueThisWeek as taskObj}
    <RecursiveTaskElement 
      {taskObj}
      depth={0}
      doNotShowScheduledTasks
      doNotShowCompletedTasks
      on:task-click
      on:task-node-update
    />
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
  export let allIncompleteTasks
  export let allTasks

  import { 
    computeDayDifference, 
    convertMMDDToDateClassObject, 
    applyFuncToEveryTreeNode,
    convertDDMMYYYYToDateClassObject,
    getDateInDDMMYYYY, 
    getRandomID
  } from '/src/helpers.js'
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { createEventDispatcher, tick } from 'svelte'
  

  let tasksDueThisWeek = null

  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''
  let NewRootTaskInput = ''
  const dispatch = createEventDispatcher()

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
        if (0 <= dayDiff && dayDiff <= 7) {
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
      // create new task
      createRootTaskWithDeadline(newRootTaskStringValue)
      // then reset
      newRootTaskStringValue = ''
    }
  }

  function createRootTaskWithDeadline (taskName) {
    const d = new Date()
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1)
    }
    const newRootTaskObj = {
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '23:59',
      id: getRandomID(),
      name: taskName,
      children: []
    }
    dispatch('new-root-task', newRootTaskObj)
    // use same API as legacy code
  }

  function unscheduleTask (e) {
    e.preventDefault()
    dispatch('task-unscheduled', {
      id: e.dataTransfer.getData('text/plain')
    })
  }

  function dragover_handler (e) {
    e.preventDefault()
  }
</script>