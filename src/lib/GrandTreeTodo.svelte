<!-- background-color:#F4F4F4; -->
<div 
  class="todo-container" 
  style="padding-top: 24px; padding-left: 12px; padding-right: 12px; background-color: var(--todo-list-bg-color); border-radius: 24px;" 
  on:drop
  on:dragover={(e) => dragover_handler(e)}
>

  <div style="height: 24px; font-size: 16px; align-items: center; display: flex;">
    <div style="margin-left: 8px; color: rgb(10, 10, 10); font-weight: 500">THIS LIFE</div> 
  </div>

  <div style="margin-bottom: 36px;"></div>

  <div class="todo-list">
    {#if allTasks}
      {#each allTasks as task}
        {#if !task.isDeleted}
          <div class="task-container">
            <RecursiveTask 
              on:task-click
              on:task-create={(e) => dispatch('task-create', { 
                updatedChildren: e.detail.updatedChildren,
                taskAffected: task 
              })}
              on:task-done
              on:task-delete
              on:task-repeating
              taskObject={task}
              depth={1}
            />
          </div>
        {/if}
      {/each}

      <!-- CREATE NEW TASK (invisible but hoverable region) -->
      <div style="height: 300px; width: 200px;"
        on:mouseenter={() => isShowingCreateButton = true}
        on:mouseleave={() => isShowingCreateButton = false}
      >
        {#if isShowingCreateButton}
          {#if !isTypingNewRootTask}
            <div style="font-size: 2rem; color: #000000;" on:click={() => isTypingNewRootTask = true}>
              New task 
            </div>
          {:else}
            <div style="display: flex; align-content: center; justify-items: center">
              <input 
                bind:value={newTopLevelTask} placeholder="Type task..." 
                on:keypress={detectEnterKey2}
              >
            </div>
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</div>

<script>
  import { getRandomID } from '/src/helpers.js'
  import RecursiveTask from '$lib/RecursiveTask.svelte'
  import { createEventDispatcher } from 'svelte'

  export let allTasks

  let newTopLevelTask = ''
  let isTypingNewRootTask = false
  let isShowingCreateButton = false
  const dispatch = createEventDispatcher()

  function detectEnterKey2 (e) { 
    if (e.charCode === 13) {
      createTask()
    }
  }

  function createTask () {
    if (!newTopLevelTask) {
      alert("You have to type something first")
    }
    const newValue = [
      ...allTasks, 
      { name: newTopLevelTask,
        duration: 15, // minutes 
        children: [],
        id: getRandomID()
      }
    ]

    updateDoc(
      doc(db, userDocPath),
      { allTasks: newValue }
    )

    newTopLevelTask = ''
    isTypingNewTask = false
  }

  function dragover_handler (e) {
    e.preventDefault()
  }
</script>

<style>
  .todo-container {
    overflow-y: auto;
    overflow-x: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .todo-list {
    width: 100%; 
    display: flex; 
  }

  .task-container { 
    border: 0px solid; 
    margin-bottom: 25px; 
    padding-left: 0; 
    padding-bottom: 10px; 
    padding-right: 0; 
    overflow: none;
  }

  /* Small Devices, Tablets and bigger devices */
  /* @media only screen and (min-width : 480px) {
    .todo-container {
      font-family: Roboto, sans-serif;
      width: 30vw;
      height: 100vh;
      padding-top: 15px; 
      padding-left: 20px;
      border: none; 
      border-top: none;
      border-right: none;
    }
  }

  @media only screen and (max-width : 480px) {
    .todo-container {
      width: 600px;
      height: 100%;
    }
  } */
</style>