<div style="width: 100%; margin-left: 40px; margin-top: 5px;">
  {#each timesOfDay as timeOfDay}
    <div style="display: flex;">
      <div class="time-indicator">
        {timeOfDay}
      </div>

      <div id={timeOfDay}
        class="calendar-time-block"
        on:drop={(e) => drop_handler(e, timeOfDay)}
        on:dragover={dragover_handler}
      > 
        {#each tasksOfHour[timeOfDay] as task}
          <div class="scheduled-task" style="top: 0; height: 30px;">
            {task.name}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateOfToday } from './helpers.js'

  export let scheduledTasks 
  const dispatch = createEventDispatcher()
  const timesOfDay = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
  let tasksOfHour = {} 

  $: if (scheduledTasks) {
    console.log('scheduledTasks changed')
    recomputeTasksMap()
  }

  function recomputeTasksMap () {
    const dict = {} 
    for (const timeOfDay of timesOfDay) {
      dict[timeOfDay] = []
    }
    // first initialize it with empty arrays, so there are no undefined look-ups
    for (const task of scheduledTasks) {
      dict[task.startTime] = [task] // TODO: don't assume there's only one task in each hour slot
    }
    tasksOfHour = dict
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function drop_handler (e, timeOfDay) {
    e.preventDefault()
    dispatch('task-scheduled', {
      taskName: e.dataTransfer.getData('text/plain'),
      timeOfDay,
      dateOfToday: getDateOfToday()
    })
  }
</script>

<style>
  .calendar-time-block {
    height: 90px;
    width: 100%;
    position: relative;
    border-top: 1px solid rgb(187, 180, 180);
  }

  .time-indicator {
    position: relative; 
    top: -5px; 
    margin-right: 4px;
    font-size: 0.7rem;
  }

  .scheduled-task {
    display: inline;
    position: absolute;
    margin-left: 2px;
    border-left: 2px solid green;
    padding-left: 2px;
    font-size: 0.8rem;
    width: 100%;
  }
</style>