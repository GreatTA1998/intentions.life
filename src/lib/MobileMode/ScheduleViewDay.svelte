<div style="margin-bottom: 20px;">
  <div>
    <div style="font-size: 14px; margin-bottom: 2px; color: rgb(10, 10, 10); font-weight: 600;">  
      {DateTime.fromISO(simpleDateISO).toFormat('LLLL d (ccc)')}
    </div>
  </div>

  <div style="display: flex; flex-wrap: wrap;">
    {#each tasksThisDay.noStartTime.hasIcon as iconTask}
      <FunctionalDoodleIcon
        {iconTask}
        on:task-click
        on:task-checkbox-change
      />
    {/each}
  </div>

  {#each tasksThisDay.noStartTime.noIcon as flexibleDayTask}
    <div on:click={() => dispatch('task-click', { task: flexibleDayTask })} 
      style="
        width: var(--calendar-day-section-width); 
        font-size: 12px; 
        display: flex; 
        flex-direction: column;
        gap: 4px; margin-left: 4px; margin-right: 4px; margin-bottom: 4px;
      "
    >
      <ReusableFlexibleDayTask task={flexibleDayTask}
        on:task-click
        on:task-update
        on:task-checkbox-change
      />
    </div>
  {/each}

  {#each tasksThisDay.hasStartTime as task}
    <div
      on:click={() => dispatch('task-click', { task })} 
      style="display: flex; align-items: center; flex-wrap: nowrap; padding: 2px;"
    >
      <div 
        style="font-size: 16px; white-space: nowrap; text-overflow: ellipsis;"
        class:grey-text={task.daysBeforeRepeating}
        class:purple-text={!task.daysBeforeRepeating}
      > 
        <span style="white-space: nowrap; text-overflow: ellipsis; color: rgb(40, 40, 40); font-weight: 400; display: flex;">
          - <div style="color: rgb(90, 90, 90); font-weight: 300; margin-right: 4px;">{task.startTime}</div> {' ' + task.name + ' '}
        </span>
      </div>
    </div>
  {/each}
</div>

<script>
  import { DateTime } from 'luxon'
  import ReusableFlexibleDayTask from '$lib/ReusableFlexibleDayTask.svelte'
  import FunctionalDoodleIcon from '$lib/FunctionalDoodleIcon.svelte'
  import { createEventDispatcher } from 'svelte'

  export let tasksThisDay
  export let simpleDateISO

  const dispatch = createEventDispatcher()
</script>

<style>
  .purple-text {
    color: #6D6D6D;
  }
</style>