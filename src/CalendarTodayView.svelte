<div id="scroll-container">
  <div style="padding-bottom: 16px;">
    {#each tasksThatAlreadyHappened as task}
      <!-- class:red-text={!task.isDone} -->
      <div style="display: flex; align-items: center; opacity: 1; margin-top: 10px;" class:green-text={task.isDone}>
        <input
          style="margin-left: 0; accent-color: #0085FF"
          type="checkbox"
          bind:checked={task.isDone}
          on:click={() => toggleIsDone(task)}
        >
        <div on:click={() => dispatch('task-click', { task })} style="font-family: sans-serif; font-size: 0.8rem;">
          {task.name}
        </div>
      </div>
    {/each}
  </div>

  <!-- This is a relative container -->
  <div id="calendar-day-container" 
    style="height: {PIXELS_PER_HOUR * numOfHourBlocksDisplayed}px; font-family: Roboto, sans-serif; margin-bottom: 1px; color: #6D6D6D; "
    on:drop={(e) => drop_handler(e)}
    on:dragover={(e) => dragover_handler(e)}
  >
    {#if calendarStartTime}
      {#each timesOfDay as timeOfDay, i}
        <div class="time-indicator" style="top: {-6 + (PIXELS_PER_HOUR * i)}px;">
          {timeOfDay.substring(0, 5)}
        </div>
      {/each}

      {#each scheduledTasksToday.filter(task => task.startTime > calendarStartTime) as task, i}
        <TaskElement
          {task}
          offsetFromTop={computeOffset(task)}
          height={task.duration * PIXELS_PER_MINUTE || 30}
          fontSize={0.8}
          offsetFromLeft={32}
          on:task-click
          on:task-duration-adjusted
        />
      {/each}

      <!-- Again, because we're using absolute positioning for above elements, their positionings are independent from each other -->
      {#each {length: 60 * 12} as _, i}
        <div 
          class="atomic-minute" 
          style="height: {PIXELS_PER_MINUTE}px; box-sizing: border-box; margin-right: 0; margin-left: auto; width: 82%"
          class:visible-line={(i % 60) === 0}
          class:highlighted-background={highlightedMinute === i}
          on:dragenter={() => highlightedMinute = i}
          on:dragend={() => console.log('dragend') }
          on:dragover={(e) => dragover_handler(e)}
        >
        </div>
      {/each}
    {/if}

    <!-- A red line that indicates the current time -->
    {#if currentTimeInHHMM}
      <hr style="
        border-top: 1px solid orange; 
        position: absolute; 
        top: {computeOffset({ startTime: currentTimeInHHMM })}px;
        left: 32px;
        width: 10vw;  
      "
      >
    {/if}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateOfToday, getTrueY, PIXELS_PER_HOUR, PIXELS_PER_MINUTE } from './helpers.js'
  import TaskElement from './TaskElement.svelte'

  export let scheduledTasksToday

  const dispatch = createEventDispatcher()
  const getDate = getDateOfToday

  const numOfHourBlocksDisplayed = 16

  let highlightedMinute = null 
  let timesOfDay = []
  let startY = 0

  let calendarStartTime = ''
  let tasksThatAlreadyHappened
  let currentTimeInHHMM = ''

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  function getDayOfWeek () {
    const today = new Date()
    const options = { weekday: 'short' }
    return new Intl.DateTimeFormat('en-US', options).format(today)
  }

  function print (message) {
    console.log(message)
  }

  $: if (calendarStartTime) {
    tasksThatAlreadyHappened = scheduledTasksToday.filter(task => task.startTime < calendarStartTime)
  }

  function toggleIsDone (task) { 
    dispatch('task-done', { taskName: task.name, id: task.id })
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
    return hoursOffset * PIXELS_PER_HOUR
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
   * 
   *     
    // TODO: in practice there is a small discrepancy between where the drop is and where the mouse is 
    // because the user aims with the image corner whereas the code reads the precise mouse pointer location
   */
  function drop_handler (e) {
    e.preventDefault()
    highlightedMinute = null

    const trueY = getTrueY(e)
    let n = trueY / PIXELS_PER_HOUR
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
      id: e.dataTransfer.getData('text/plain'),
      timeOfDay: scheduledTime,
      dateScheduled: getDate()
    })
  }
</script>

<style>
.highlighted-background {
  background: rgb(82, 180, 251);
}

/* 
  You need the relative scrolling container to be different from `calendar-day-container`,
  so the absolute positionings will count from the right place (no need to fully understand yet) 

  height: 200% is just so it's high enough to contain all the absolute elements

  without border-box, the padding on top will add ON TOP OF 100% height  
*/
@media only screen and (max-width : 480px) {
  #scroll-container {
    width: 200px;
  }
  #calendar-day-container {
    width: 100px;
  }
}

@media only screen and (min-width : 480px) {
  #scroll-container {
    width: 12vw;
  }
  #calendar-day-container {
    width: 12vw;
  }
} 

#calendar-day-container {
  position: relative; 
  margin-top: 4px;
}

#scroll-container {
    height: 100%; 
    overflow-y: scroll; 
    overflow-x: hidden; 
    padding-top: 22px; 
    box-sizing: border-box
  }

  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .green-text {
    color: #0085FF;
  }

  .red-text {
    font-family: Roboto, Arial,sans-serif;
    color: red;
  }

  /* VERDICT: absolute works
  "Independence" is the best word you can ever hear in programming */
  .time-indicator {
    top: -5px; 
    margin-right: 4px;
    font-size: 0.7rem;

    /* these CSS properties are copied from `.calendar-time-block`, which used to be separate */
    position: absolute;
    /* height: 90px;
    width: 100%; */
  }

  .visible-line {
    border-top: 1px solid grey;
  }
</style>