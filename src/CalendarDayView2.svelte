<!-- 
  You need the relative scrolling container to be different from `calendar-day-container`,
  so the absolute positionings will count from the right place (no need to fully understand yet) 

  height: 200% is just so it's high enough to contain all the absolute elements
-->
<div style="overflow-y: scroll; overflow-x: hidden; height: 77vh">
  <div 
    id="calendar-day-container" 
    style="position: relative; width: 12vw; height: 1500px"
    on:drop={(e) => drop_handler(e)}
    on:dragover={dragover_handler}
  >
    <div style="margin-top: 6px">{getDate()}</div>
    
    {#each timesOfDay as timeOfDay, i}
      <div 
        class="time-indicator" 
        style="top: {30 + (60 * i)}px;"
      >
        {timeOfDay}
        
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
        <!-- border: 2px solid red; -->
        <div  
          style="height: {task.duration * pixelsPerMinute - 20 - 10}px; width: 11vw" 
          draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)}
        >

        </div>
        
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
  const timesOfDay = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00']
  let pixelsPerMinute = 90 / 60
  let startY = 0

  let tasks = [
    {
      name: 'Launch Life Organizer',
      startTime: '08:00',
      duration: 120
    },
    {
      name: 'Meditate',
      startTime: '16:00',
      duration: 10
    }
  ]

  function computeOffset ({ startTime }) {
    // compute how many hours ahead of 8 am `startTime` is
    const hh = startTime.slice(0, 2)
    const mm = startTime.slice(3, 5)
    const hoursOffset = Number(hh) + (Number(mm) / 60) - 8 // 8 refers to "8 am"
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

  function drop_handler (e) {
    console.log('drop detected')


    e.preventDefault()
    const element = document.getElementById("calendar-day-container")
    var position = element.getBoundingClientRect();
    var x = position.left;
    var y = position.top;

    const heightOfHour = 90 // defined in CSS below
    const calendarTopMargin = 20

    // `e.layerY` gives the Y-coordinate with respect to the current container
    // otherwise the multiple scrolling contexts messes it up
    let hoursOffset = (e.layerY) / heightOfHour

    let n = hoursOffset 
    const decimal = n - Math.floor(n)
    const integer = Math.trunc(n)
    
    let minutesOffset = decimal * 60
    let hh = 8 + integer
    if (hh < 10) {
      hh = `0${hh}`
    }
    if (minutesOffset < 10) {
      minutesOffset = minutesOffset.toPrecision(1)
      minutesOffset = `0${minutesOffset}`
    } else {
      minutesOffset = minutesOffset.toPrecision(2)
    }
    const scheduledTime = `${hh}:${minutesOffset}` 
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