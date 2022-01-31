<!-- Recursively display a task and all its subtasks -->
<div 
  style="margin-left: 20px; margin-bottom: 10px"
  on:pointerenter={showSubtasks}
  on:pointerleave={hideSubtasks}
>
  <div style="display: flex; align-items: center">
    <div class="keep-on-same-line" style="font-size: 1.65rem">
      {taskObject.name}
    </div>
    {#if isShowingSubtasks}
      {#if !isTypingNewTask}
        <div on:click={() => isTypingNewTask = true} style="margin-left: 14px; display: flex; align-content: center">
          <div class="plus alt"></div>
          <!-- <div style="margin-top: 1px">new sub-task</div> -->
        </div>
      {:else}
        <input bind:value={newTask} on:keypress={detectEnterKey} style="width: 100%; margin-left: 5px"/>
      {/if}
    {/if}
  </div>

  <div style="margin-top: 10px;">
    {#each taskObject.children as child, i}
      <RecursiveTask 
        taskObject={child}
        on:task-create={(e) => handleGrandchildUpdate(e, i)}
      />
    {/each}
  </div>
</div>

<script>
  import RecursiveTask from './RecursiveTask.svelte'
  import { createEventDispatcher } from 'svelte'

  export let taskObject

  const dispatch = createEventDispatcher()
  let isShowingSubtasks = false
  let isTypingNewTask = false 
  let newTask = ''

  /**
    * Creates a children payload that correctly reflects changes in grandchildren
    * 
    * @param e the event that contains the modified grandchildren
    * @param i the index of the child that has been modified 
    */
  function handleGrandchildUpdate (e, i) {
    // to avoid confusion, don't mutate taskObject in this component,
    // only let the parent mutate it (even if the side-effects happen to cancel each other out)
    // therefore construct a new payload 
    const childCopy = { ...taskObject.children[i] }
    childCopy.children = e.detail.updatedChildren

    const childrenCopy = [...taskObject.children]
    childrenCopy[i] = childCopy

    sendUpNewChildrenPayload(childrenCopy)
  }

  function detectEnterKey (e) {
    if (e.charCode === 13) {
      createNewChild(newTask)
      newTask = ''
      isTypingNewTask = false
    }
  }

  function createNewChild (name) {
    sendUpNewChildrenPayload(
      [...taskObject.children, { name, children: [] }]
    )
  }

  function sendUpNewChildrenPayload (payload) {
    dispatch('task-create', {
      updatedChildren: payload
    })
  }

  function showSubtasks () {
    isShowingSubtasks = true
  }

  function hideSubtasks () {
    isShowingSubtasks = false
  }
</script>

<style>
  .keep-on-same-line {
    white-space: nowrap;
  }

  .plus {
    display:inline-block;
    width:30px;
    height:30px;
    
    background:
      linear-gradient(#fff 0 0),
      linear-gradient(#fff 0 0),
      #000;
    background-position:center;
    background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
  }

  .alt {
    background:
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0);
    background-position:center;
    background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
  }
</style>
