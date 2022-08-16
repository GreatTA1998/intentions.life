<!-- 
  You need the relative scrolling container to be different from `calendar-day-container`,
  so the absolute positionings will count from the right place (no need to fully understand yet) 

  height: 200% is just so it's high enough to contain all the absolute elements
-->
<div style="overflow-y: scroll; overflow-x: hidden; height: 77vh">
  <div 
    id="calendar-day-container" 
    style="position: relative; width: 12vw; height: 1000px"
    on:drop={(e) => drop_handler(e)}
    on:dragover={dragover_handler}
  >
    <div style="margin-top: 27px">{getDate()}</div>
    
    {#each timesOfDay as timeOfDay, i}
      <div 
        class="time-indicator" 
        style="top: {30 + (60 * i)}px;"
      >
        {timeOfDay.substring(0, 5)}
        
      </div>
    {/each}

    {#each scheduledTasks as task, i}
      <div 
        on:click={() => openDetailedCard(task)}
        class="scheduled-task" 
        style="top: {computeOffset(task)}px; 
               height: {task.duration * pixelsPerMinute || 30}px; 
               left: 30px"
      >

        <div draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)} style="width: 11vw">
          {task.name} 
        </div>
        <!-- Continuation of re-scheduling zone -->
        <!-- border: 2px solid red; -->
        <div  
          style="height: {task.duration * pixelsPerMinute - 20 - 10}px; width: 11vw" 
          draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)}
        >

        </div>
        
        <!-- Bottom region for adjusting duration -->
        <!-- border: 2px solid black; -->
        <div draggable="true"
          on:dragstart={(e) => mousedown_handler(e)}
          on:dragend={(e) => mouseup_handler(e, task)}
          style="height: 8px; width: 11vw; position: absolute; bottom: 0; left: -3px; cursor: ns-resize;"
        >

        </div>
      </div>
    {/each}
  </div>
</div>

<!-- 
  VERDICT: absolute works
  "Independence" is the best word you can ever hear in programming
 -->

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateOfToday } from './helpers.js'

  export let scheduledTasks

  const dispatch = createEventDispatcher()
  const getDate = getDateOfToday
  let timesOfDay = []
  let pixelsPerMinute = 90 / 60
  let startY = 0

  let calendarStartTime = ''

  // Start either from the current hour, or the current ongoing task's start time
  //   - if it's 8 pm, but there's an ongoing task that started at 7 pm and hasn't ended
  //     we start the calendar at 7 pm to not suddenly lose sight of the task
  function decideCalendarStartTime () {
    // get current time
    const today = new Date()
    // note we don't care about the minutes, we always start from the exact hour
    const currentMinutesFromMidnight = today.getHours() * 60 // `getHour()` between 0-23
    // for all tasks, check if it "includes" current time
    for (const task of scheduledTasks) { // (only includes today's)
    const hhOfStart = task.startTime.substring(0, 2)
      const taskStartMinutesFromMidnight = parseInt(hhOfStart) * 60
      const taskEndMinutesFromMidnight = taskStartMinutesFromMidnight + task.duration 
      if (taskStartMinutesFromMidnight < currentMinutesFromMidnight && currentMinutesFromMidnight < taskEndMinutesFromMidnight) {
        calendarStartTime = `${hhOfStart}:00`
      } 
    }

    if (!calendarStartTime) {
      calendarStartTime = `${today.toLocaleTimeString().substring(0, 2)}:00`
    }

    let currentHour = today.getHours() // get the integer i.e. 0 to 23
    // now generate 16 hours of time (so it covers, for example, 8 am - midnight)
    for (let i = 0; i < 16; i++) {
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
    const hh = startTime.slice(0, 2)
    const mm = startTime.slice(3, 5)
    const hoursOffset = Number(hh) + (Number(mm) / 60) - parseInt(calendarStartTime.substring(0, 2)) // 8 refers to "8 am"
    const pixelsPerHour = 90
    return hoursOffset * pixelsPerHour
  }

  function openDetailedCard (task) {
    dispatch('task-click', {
      task
    })
  }

  function dragstart_handler(e, taskName) {
    e.dataTransfer.setData("text/plain", taskName)
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  /**
   * 
   * Calculate what the new time is by measuring offset from top of container
   * 
   * We don't just read the hh e.g. "24" from the hour block, 
   * because the drop_handler is defined outside of those hour <divs>
   * 
   * TODO: ensure the drop package is a valid task
   */
  function drop_handler (e) {
    console.log('drop detected')

    e.preventDefault()
    const element = document.getElementById("calendar-day-container")
    var position = element.getBoundingClientRect();
    var x = position.left;
    var y = position.top;

    const heightOfHour = 90 // defined in CSS below
    const calendarTopMargin = 20

    // `n` represents time in PURE hours e.g. 8.24, 13.90
    // `e.layerY` gives the Y-coordinate with respect to the current container
    // otherwise the multiple scrolling contexts messes it up
    let n = (e.layerY) / heightOfHour
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
    console.log('scheduledTime =', scheduledTime)

    dispatch('task-scheduled', {
      taskName: e.dataTransfer.getData('text/plain'),
      timeOfDay: scheduledTime,
      dateScheduled: getDate()
    })
  }

  function mousedown_handler (e) {
    startY = e.offsetY
  }

  function mouseup_handler (e, task) {
    // alert(`From ${startY} to ${e.offsetY}`)

    // quickfix
    if (!task.duration) {
      task.duration = 10
    }

    const minutesPerPixel = 60 / 90
    const durationChange = (e.offsetY - startY) * minutesPerPixel

    dispatch('task-duration-adjusted', {
      taskName: task.name,
      duration: Math.max(1, task.duration + durationChange) // can't have a 0 duration event
    })
  }
</script>

<style>
  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .scheduled-task {
    display: inline;
    position: absolute;
    margin-left: 2px;
    border-left: 2px solid grey;
    padding-left: 2px;
    font-size: 0.8rem;
    width: 100%;
  }

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