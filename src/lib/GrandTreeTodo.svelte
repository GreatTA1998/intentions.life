<!-- background-color:#F4F4F4; -->
<div 
  class="life-container" 
  on:drop
  on:dragover={(e) => dragover_handler(e)}
  style="font-size: 36px;"
>

  <div style="height: 24px; font-size: 16px; align-items: center; display: flex;"
    on:mouseenter={() => isMouseHoveringOnTaskName = true}
    on:mouseleave={() => isMouseHoveringOnTaskName = false}
  >
    <div style="margin-left: 8px; font-weight: 500; font-size: 18px;">
      THIS LIFE
    </div> 

    {#if isMouseHoveringOnTaskName}
      <span on:click={() => isTypingNewRootTask = true} class="material-icons" style="margin-left: 6px; cursor: pointer;">
        add
      </span>
    {/if}
  </div>

  <div style="margin-bottom: 36px;"></div>

  <div class="life-task-tree-container">
    {#if allTasks}
      {#each allTasks as task}
        {#if !task.isDone && !task.deadlineDate}
          <div class="task-container">
            <RecursiveTaskElement 
              taskObj={task}
              depth={0}
              doNotShowScheduledTasks={true}
              doNotShowCompletedTasks={true}
              willShowCheckbox={false}
              ancestorRoomIDs={['']}
              on:task-click
              on:task-node-update
              on:subtask-create
            />
          </div>
        {/if}
      {/each}

      {#if isTypingNewRootTask}
        <div style="height: 60px; display: flex; align-content: center; justify-items: center">
          <input 
            bind:this={NewRootTaskInput}
            bind:value={newRootTaskStringValue} 
            on:keydown={(e) => handleKeyDown(e)}
            placeholder="Type task here..."
          >
        </div>
      {/if}     
    {/if}
  </div>
</div>

<script>
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { createEventDispatcher, tick } from 'svelte'
  import { getRandomID } from '/src/helpers.js'

  export let allTasks

  let newRootTaskStringValue = ''
  let isTypingNewRootTask = false
  const dispatch = createEventDispatcher()

  let NewRootTaskInput

  let isMouseHoveringOnTaskName = false

  $: {
    if (isTypingNewRootTask) {
      tick().then(() => {
        if (NewRootTaskInput) {// quick-fix {
          NewRootTaskInput.focus()
        }
      })
    }
  }

  function handleKeyDown (e) {
    if (e.key !== 'Enter') return

    if (newRootTaskStringValue === '') {
      isTypingNewRootTask = false
      newRootTaskStringValue = ''
    }
    // nice side-effect of this: double-tap ENTER to be done
    else  {
      createRootTaskWithoutDeadline(newRootTaskStringValue)
      // then reset
      newRootTaskStringValue = ''
    }
  }

  function createRootTaskWithoutDeadline (taskName) {
    const newRootTaskObj = {
      id: getRandomID(),
      name: taskName,
      parentID: ""
    }
    dispatch('new-root-task', newRootTaskObj)
  }

  function dragover_handler (e) {
    e.preventDefault()
  }
</script>

<style>
  .life-container {
    overflow-y: auto;
    overflow-x: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    padding-top: 0px; padding-left: 12px; padding-right: 12px; 
    background-color: white;
    border-radius: 24px;
  }

  .life-task-tree-container {
    width: 80vw; 
    display: flex; 
  }

  .task-container { 
    border: 0px solid; 
    margin-bottom: 25px; 
    padding-left: 0; 
    padding-bottom: 10px; 
    padding-right: 0; 
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