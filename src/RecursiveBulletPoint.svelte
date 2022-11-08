<div 
  class:task-completed={taskObject.isDone}
  class:task-scheduled={!taskObject.isDone && taskObject.startDate && taskObject.startTime}
>
  {taskObject.name}

  {#if taskObject.daysBeforeRepeating}
    (repeats every {taskObject.daysBeforeRepeating} days)
    (completed {taskObject.completionCount || 0} times)
    (missed {taskObject.missedCount || 0} times)
  {:else if taskObject.isDone}
    (completed)
  {/if}

  {#if taskObject.startDate && taskObject.startTime}
    (scheduled {taskObject.startDate} {taskObject.startTime})
  {/if}
  
  {#each taskObject.children as child}
    <div style="margin-left: 12px;">
    <RecursiveBulletPoint taskObject={child}/>
    </div>
  {/each}
</div>

<script>
  import RecursiveBulletPoint from './RecursiveBulletPoint.svelte'

  export let taskObject 
</script>

<style>
  .task-completed {
    color: green;
  }

  .task-scheduled {
    color: orange;
  }
</style>