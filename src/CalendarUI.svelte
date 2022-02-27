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
          <div class="scheduled-task" style="top: {task.verticalOffset}px; height: {task.duration * pixelsPerMinute || 30}px;">
            <div draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)}>
              {task.name}
            </div>

            <div draggable="true"
              on:dragstart={(e) => mousedown_handler(e)}
              on:dragend={(e) => mouseup_handler(e, task)}
              style="border: 2px solid black; height: 2px; width: 100%; position: absolute; bottom: 0; cursor: ns-resize; "
            >
    
            </div>
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
  let startY = 0
  let pixelsPerMinute = 90 / 60; 

  $: if (scheduledTasks) {
    console.log('scheduledTasks changed')
    recomputeTasksMap()
  }

  function recomputeTasksMap () {
    const dict = {} 
    for (const timeOfDay of timesOfDay) {
      dict[timeOfDay] = []
      for (const task of scheduledTasks) {
        if (task.startTime.slice(0, 2) === timeOfDay.slice(0, 2)) {
          // WARNING: this is a mutation that changes the prop at the child instead of the parent
          dict[timeOfDay].push({ ...task, verticalOffset: computeOffset(task) })
        }
      }
    }
    tasksOfHour = dict
  }

  function dragstart_handler(e, taskName) {
    e.dataTransfer.setData("text/plain", taskName);
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function drop_handler (e, timeOfDay) {
    e.preventDefault()

    const heightOfHour = 90 // defined in CSS below
    const hh = timeOfDay.slice(0, 2)
    let minutesOffset = (e.offsetY / heightOfHour) * 60
    if (minutesOffset < 10) {
      minutesOffset = `0${minutesOffset}`
    }
    const scheduledTime = `${hh}:${minutesOffset}` 

    dispatch('task-scheduled', {
      taskName: e.dataTransfer.getData('text/plain'),
      timeOfDay: scheduledTime,
      dateOfToday: getDateOfToday()
    })
  }

  function mousedown_handler (e) {
    startY = e.offsetY
  }

  function mouseup_handler (e, task) {
    const minutesPerPixel = 60 / 90
    dispatch('task-duration-adjusted', {
      taskName: task.name,
      duration: (e.offsetY - startY) * minutesPerPixel
    })
    console.log("newDuration =", e.offsetY - startY * minutesPerPixel)
  }

  function computeOffset ({ startTime }) {
    const pixelsPerHour = 90
    const pixelsPerMinute = pixelsPerHour / 60
    const minutesOffset = startTime.slice(3, 5) 
    return minutesOffset * pixelsPerMinute
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