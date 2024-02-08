<div 
  on:click={() => dispatch('task-click', { task: taskObject })}
  class:completed-task={taskObject.isDone}
  style="margin-bottom: 2px; font-size: 12px;"
>
  <div style="display: flex; align-items: center;" class:accented-branch={taskObject.id === originalPopupTask.id}>
    <ReusableCheckbox value={taskObject.isDone} zoom={0.5}/>
    <div style="margin-left: 4px; margin-right: 4px;" class="truncate-to-one-line">
      {taskObject.name}
    </div>
    
    {#if taskObject.startDate && taskObject.startTime}
      ({taskObject.startDate} {taskObject.startTime})
    {/if}
  </div>

  {#if taskObject.daysBeforeRepeating}
    (repeats every {taskObject.daysBeforeRepeating} days)
    (completed {taskObject.completionCount || 0} times)
    (missed {taskObject.missedCount || 0} times)
  {/if}

  
  {#each taskObject.children as child}
    <div style="margin-left: 12px;">
      <RecursiveBulletPoint taskObject={child} {originalPopupTask}/>
    </div>
  {/each}
</div>

<script>
  import RecursiveBulletPoint from './RecursiveBulletPoint.svelte'
  import ReusableCheckbox from '$lib/ReusableCheckbox.svelte'
  import { createEventDispatcher } from 'svelte'

  export let taskObject 
  export let originalPopupTask

  const dispatch = createEventDispatcher()
</script>

<style>
  .completed-task {
    text-decoration: line-through;
    color: rgb(180, 180, 180);
  }

  .accented-branch {
    color: var(--logo-twig-color);
  }
</style>