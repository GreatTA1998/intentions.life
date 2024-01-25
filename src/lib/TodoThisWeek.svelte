<div class="todo-container">
  <div style="display: flex; align-items: center"
  >
    <div style="height: 24px; font-size: 16px; align-items: center; display: flex;">
      <slot>
        <!-- <GrandTreeTodoPopup/> injected here -->
      </slot>
      <div style="margin-left: 8px; color: rgb(60, 60, 60); font-weight: 400">
        THIS WEEK'S
      </div> 
      <div style="color: rgb(10, 10, 10); font-weight: 600; margin-left: 6px;">
        TO-DO
      </div>
    </div>

    <div on:click={() => isTypingNewRootTask = true} 
      class="material-icons new-task-icon" 
      style="margin-bottom: 10px; margin-left: 12px;"
    >
      +
    </div>
  </div>

  <div style="margin-bottom: 36px;"></div>

  <div style="height: calc(100% - 24px - 36px);"
    on:drop={(e) => unscheduleTask(e)}
    on:dragover={(e) => dragover_handler(e)}
  >
    <!-- TO-DO: Render all tasks with deadline of this week here -->
    {#each tasksToDisplay.filter(topLevelTask => !topLevelTask.isDone) as taskObj, i}
      <!-- again, refrain from using `doNotShowCompletedTasks` 
        and aim for a data-driven implementation instead
      -->
      <RecursiveTaskElement 
        {taskObj}
        depth={0}
        doNotShowScheduledTasks={false}
        doNotShowCompletedTasks={false}
        ancestorRoomIDs={['']}
        on:task-click
        on:subtask-create
        on:task-checkbox-change
      >   
        <div slot="dropzone-above-task-name">
          {#if tasksToDisplay.length > 2}
            <ReusableHelperDropzone
              ancestorRoomIDs={['']}
              roomsInThisLevel={tasksToDisplay}
              idxInThisLevel={i}
              parentID={''}
              parentObj={{ subtreeDeadlineInMsElapsed: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }}
              colorForDebugging="purple"
            />
          {/if}
        </div>
      </RecursiveTaskElement>
      <div style="margin-bottom: 12px;"></div>
    {/each}

    {#if tasksToDisplay.length > 2}
      <ReusableHelperDropzone
        ancestorRoomIDs={['']}
        roomsInThisLevel={tasksToDisplay}
        idxInThisLevel={tasksToDisplay.length}
        parentID={''}
        parentObj={{ subtreeDeadlineInMsElapsed: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }}
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
  import { allTasksDueThisWeek } from '/src/store.js'
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { createEventDispatcher, tick } from 'svelte'
  import ReusableHelperDropzone from '$lib/ReusableHelperDropzone.svelte'

  let tasksToDisplay = [] 

  let isTypingNewRootTask = false
  let newRootTaskStringValue = ''
  let NewRootTaskInput = ''
  const dispatch = createEventDispatcher()

  $: if ($allTasksDueThisWeek.length > 0) {
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
    tasksToDisplay = sortByUnscheduledThenByOrderValue($allTasksDueThisWeek)
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

  function createRootTaskWithDeadline (taskName) {
    const d = new Date()
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1)
    }
    const newRootTaskObj = {
      duration: 1,
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

<style>
  .todo-container {
    min-width: 400px; 
    background-color: var(--todo-list-bg-color);
    padding-left: 3vw; 
    padding-right: 3vw;
    padding-top: 36px;
    font-size: 2em;
    overflow-y: auto;
  }

  @media (max-width: 1279.99px) {
    .todo-container {
      min-width: 300px;
    }
  }
</style>