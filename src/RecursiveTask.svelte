<!-- Recursively display a task and all its subtasks -->
<div style="margin-left: 20px">
  <div class="keep-on-same-line">{taskObject.name}</div>
  {#if taskObject.children.length > 0}
    {#each taskObject.children as child, i}
      <!-- Refer to blackboard video (URL coming soon) -->
      <RecursiveTask 
        taskObject={child}
        on:task-create={(e) => handleGrandchildUpdate(e, i)}
      />
    {/each}
  {:else}
    <!-- Base case -->
  {/if}

  <!-- New subtask -->
  <div on:click={createNewChild}>
    New subtask
  </div>
</div>

<script>
  import RecursiveTask from './RecursiveTask.svelte'
  import { createEventDispatcher } from 'svelte'

  export let taskObject

  const dispatch = createEventDispatcher()

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

  function createNewChild() {
    sendUpNewChildrenPayload(
      [
        ...taskObject.children, 
        { name: 'Fulfill MIT covid-19 requirements', id: 4, children: [] }
      ]
    )
  }

  function sendUpNewChildrenPayload (payload) {
    dispatch('task-create', {
      updatedChildren: payload
    })
  }
</script>

<style>
  .keep-on-same-line {
    white-space: nowrap;
  }
</style>