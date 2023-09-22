<div style="min-width: 300px; width: 30vw; border: 2px solid purple;">
  <button on:click={() => isTypingNewRootTask = true}>
    +
  </button>

  <!-- TO-DO: Render all tasks with deadline of this week here -->
  {#each tasksDueThisWeek as taskObj}
    <RecursiveTaskElement 
      {taskObj}
      on:task-click
      on:task-node-update
    />
  {/each}

  {#if isTypingNewRootTask}
    <input 
      bind:value={newRootTaskStringValue} 
      on:keydown={(e) => handleKeyDown(e)}
      placeholder="Type task here..."
    >
  {/if}
</div>

<script>
  export let allIncompleteTasks

  import { 
    computeDayDifference, 
    convertMMDDToDateClassObject, 
    applyFuncToEveryTreeNode,
    convertDDMMYYYYToDateClassObject
  } from '/src/helpers.js'
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'

  $: getTasksDueThisWeek(allIncompleteTasks)

  let tasksDueThisWeek = null

  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''

  function getTasksDueThisWeek (taskArray) {
    const output = []
    const copy = [...taskArray]

    applyFuncToEveryTreeNode({ 
      tree: copy, 
      applyFunc: (task) => {
        if (!task.deadlineDate) return
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
    if (e.key === 'Enter') {
      console.log("Enter key is pressed")
      if (newRootTaskStringValue !== '') {
        console.log('newTaskStringValue =', newRootTaskStringValue)
        // create new task

        // then reset
        newRootTaskStringValue = ''
      }
      // nice side-effect of this: double-tap ENTER to be done
      else  {
        isTypingNewRootTask = false
      }
    }
  }

  // how do you create new deadlines when you drag and drop
  function createNewTask ({ deadlineDate = '', deadlineTime = '' }) {
    // how do you support both creating a top-level task vs sub-task

    // see how RecursiveTask and UnscheduledTodo's dropzone handles it 
    // then come up with a better solution
  }
</script>