<div 
  class:task-completed={taskObject.isDone}
  class:task-scheduled={!taskObject.isDone && taskObject.startDate && taskObject.startTime}
>
  {taskObject.name}

  {#if taskObject.isRepeating}
    (Repeats)
  {/if}

  {#if taskObject.isDone}
    (Completed)
  {/if}

  {#if taskObject.startDate && taskObject.startTime}
    ({taskObject.startDate} {taskObject.startTime})
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