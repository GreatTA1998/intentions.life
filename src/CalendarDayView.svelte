<!-- 
  You need the relative scrolling container to be different from `calendar-day-container`,
  so the absolute positionings will count from the right place (no need to fully understand yet) 

  height: 200% is just so it's high enough to contain all the absolute elements

  without border-box, the padding on top will add ON TOP OF 100% height 
-->
<div style="height: 100%; overflow-y: scroll; overflow-x: hidden; padding-top: 28px; box-sizing: border-box">
  {#if tasksThatAlreadyHappened.length > 0}
    <div style="font-weight: 600;">
      Passed tasks:
    </div>
  {/if}

  {#each tasksThatAlreadyHappened as task}
    <div style="display: flex; align-items: center; margin-bottom: 12px" class:green-text={task.isDone} class:red-text={!task.isDone}>
      <input 
        type="checkbox" 
        bind:checked={task.isDone}
        on:click={() => toggleIsDone(task)}
      >
      <div style="font-size: 0.82rem;">{task.name}</div>
    </div>
  {/each}

  <div style="font-weight: 600">
    {getDate()}
  </div>

  <div 
    id="calendar-day-container" 
    style="position: relative; height: {pixelsPerHour * numOfHourBlocksDisplayed}px; width: 12vw; "
    on:drop={(e) => drop_handler(e)}
    on:dragover={dragover_handler}
  >
    {#if calendarStartTime}
      {#each timesOfDay as timeOfDay, i}
        <div class="time-indicator" style="top: {pixelsPerHour * i}px;">
          {timeOfDay.substring(0, 5)}
        </div>
      {/each}

      {#each scheduledTasksToday.filter(task => task.startTime > calendarStartTime) as task, i}
        <TaskElement
          {task}
          offsetFromTop={computeOffset(task)}
          height={task.duration * pixelsPerMinute || 30}
          fontSize={0.8}
          offsetFromLeft={30}
          on:task-click
          on:task-duration-adjusted
        />
      {/each}
    {/if}

    <!-- A red line that indicates the current time -->
    {#if currentTimeInHHMM}
      <hr style="
        border-top: 1px solid red; 
        position: absolute; 
        top: {computeOffset({ startTime: currentTimeInHHMM })}px;
        left: 32px;
        width: 8vw;  
      "
      >
    {/if}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateOfToday } from './helpers.js'
  import TaskElement from './TaskElement.svelte'

  export let scheduledTasksToday

  const dispatch = createEventDispatcher()
  const getDate = getDateOfToday

  const pixelsPerHour = 80
  const pixelsPerMinute = 80 / 60
  const numOfHourBlocksDisplayed = 16

  let timesOfDay = []
  let startY = 0

  let calendarStartTime = ''
  let tasksThatAlreadyHappened
  let currentTimeInHHMM = ''

  $: if (calendarStartTime) {
    tasksThatAlreadyHappened = scheduledTasksToday.filter(task => task.startTime < calendarStartTime)
  }

  function toggleIsDone (task) { 
    dispatch('task-done', { taskName: task.name })
  }

  const one_sec = 1000 // milliseconds
  updateCurrentTime()
  setInterval(updateCurrentTime, 60 * one_sec)
  function updateCurrentTime () {
    const today = new Date()
    let hh = today.getHours()
    hh = `${hh < 10 ? '0' : ''}` + hh

    let mm = today.getMinutes()
    mm = `${mm < 10 ? '0' : ''}` + mm
    
    let result = hh + ':' + mm
    currentTimeInHHMM = result
  }

  // Start either from the current hour, or the current ongoing task's start time
  //   - if it's 8 pm, but there's an ongoing task that started at 7 pm and hasn't ended
  //     we start the calendar at 7 pm to not suddenly lose sight of the task
  function decideCalendarStartTime () {
    // get current time
    const today = new Date()
    // note we don't care about the minutes, we always start from the exact hour
    const currentMinutesFromMidnight = today.getHours() * 60 // `getHour()` between 0-23
    // for all tasks, check if it "includes" current time
    for (const task of scheduledTasksToday) {
      const hhOfStart = task.startTime.substring(0, 2)
      const taskStartMinutesFromMidnight = parseInt(hhOfStart) * 60
      const taskEndMinutesFromMidnight = taskStartMinutesFromMidnight + task.duration 
      if (taskStartMinutesFromMidnight < currentMinutesFromMidnight && currentMinutesFromMidnight < taskEndMinutesFromMidnight) {
        calendarStartTime = `${hhOfStart}:00`
      } 
    }

    if (!calendarStartTime) {
      const currentH = today.getHours()
      calendarStartTime = `${currentH < 10 ? '0' : ''}` + `${currentH}:00`
    }

    let currentHour = today.getHours() // get the integer i.e. 0 to 23
    // now generate 16 hours of time (so it covers, for example, 8 am - midnight)
    for (let i = 0; i < numOfHourBlocksDisplayed; i++) {
      if (currentHour === 24) {
        currentHour = 0
      }

      if (currentHour < 10) {
        timesOfDay.push('0' + currentHour + ':00')
      } else {
        timesOfDay.push(currentHour + ':00')
      }

      currentHour += 1
    }
  } 
  decideCalendarStartTime()

  function computeOffset ({ startTime }) {
    // compute how many hours ahead of calendar's starting hour
    // TODO: this breaks when the scheduled time is "lower" than the calendar's startTime i.e. need to pad 24 on top of it
    const hh = startTime.slice(0, 2)
    const mm = startTime.slice(3, 5)
    const hoursOffset = Number(hh) + (Number(mm) / 60) - parseInt(calendarStartTime.substring(0, 2)) // 8 refers to "8 am"
    return hoursOffset * pixelsPerHour
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  /**
   * Calculate what the new time is by measuring offset from top of container
   * 
   * We don't just read the hh e.g. "24" from the hour block, 
   * because the drop_handler is defined outside of those hour <divs>
   * 
   * TODO: ensure the drop package is a valid task
   */
  function drop_handler (e) {
    e.preventDefault()
    const element = document.getElementById("calendar-day-container")
    var position = element.getBoundingClientRect();
    var x = position.left;
    var y = position.top;

    // `n` represents time in PURE hours e.g. 8.24, 13.90
    // `e.layerY` gives the Y-coordinate with respect to the current container
    // otherwise the multiple scrolling contexts messes it up
    let n = e.layerY / pixelsPerHour
    const decimal = n - Math.floor(n)
    const integer = Math.trunc(n)
    
    // calculate minutes i.e. `mm` 
    let minutesOffset = decimal * 60
    let mm 
    if (minutesOffset < 10) { //minutesOffset = minutesOffset.toPrecision(1)
      mm = `0${minutesOffset.toPrecision(1)}`
    } else {
      mm = minutesOffset.toPrecision(2)
    }

    // calculate hours i.e. `hh`
    const origin = parseInt(calendarStartTime.substring(0, 2))
    let hh = origin + integer
    if (hh < 10) {
      hh = `0${hh}`
    }

    const scheduledTime = `${hh}:${mm}` 

    dispatch('task-scheduled', {
      taskName: e.dataTransfer.getData('text/plain'),
      timeOfDay: scheduledTime,
      dateScheduled: getDate()
    })
  }
</script>

<style>
  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .green-text {
    color: green;
  }

  .red-text {
    color: red;
  }

  /* VERDICT: absolute works
  "Independence" is the best word you can ever hear in programming */
  .time-indicator {
    /* position: relative;  */
    top: -5px; 
    margin-right: 4px;
    font-size: 0.7rem;

    /* these CSS properties are copied from `.calendar-time-block`, which used to be separate */
    position: absolute;
    /* height: 90px;
    width: 100%; */
  }
</style>