<div style="height: 77vh; overflow-y: scroll; overflow-x: hidden;">
  Today
  <div 
    id="calendar-day-container"
    style="width: 12vw; margin-left: 0px; margin-top: 10px; position: relative; height: 1600px" 
    on:drop={(e) => drop_handler(e)}
    on:dragover={dragover_handler}
  >
    {#each timesOfDay as timeOfDay, i}
      <div style="display: flex; top: {90*i}px; position: absolute;">
        <div 
          class="time-indicator" 
          style="color: {timeOfDay.slice(0, 2) === getHH() && getDateOfToday() === getDate()? 'red' : ''}" 
          id="{timeOfDay.slice(0, 2) === getHH() ? 'current-hour-block' : ''}"
        >
          {timeOfDay}
        </div>
        <div id={timeOfDay} class="calendar-time-block"/> 
      </div>
    {/each}

    <!-- 
      we have a duplicate for-loop because we really don't want the scheduled task elements to be the children of calendar blocks, we want them to be siblings,
      else drag and drop won't work 
    -->
    {#each timesOfDay as timeOfDay, i}
      {#each tasksOfHour[timeOfDay] as task}
        <div on:click={() => openDetailedCard(task)}
          class="scheduled-task" 
          style="top: {task.verticalOffset}px; height: {task.duration * pixelsPerMinute || 30}px;"
        >
          <div draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)} style="width: 11vw">
            {task.name}
          </div>
          <!-- border: 2px solid red; -->
          <div  
            style="height: {task.duration * pixelsPerMinute - 20 - 10}px; width: 11vw" 
            draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)}>

          </div>
          
          <!-- border: 2px solid black; -->
          <div draggable="true"
            on:dragstart={(e) => mousedown_handler(e)}
            on:dragend={(e) => mouseup_handler(e, task)}
            style="height: 8px; width: 11vw; position: absolute; bottom: 0; left: -3px; cursor: ns-resize; "
          >

          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>

<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { getDateOfToday, getHH } from './helpers.js'

  export let scheduledTasks 
  export let getDate

  const dispatch = createEventDispatcher()
  const timesOfDay = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00']
  let tasksOfHour = {} 
  let startY = 0
  let pixelsPerMinute = 90 / 60
  
  onMount(() => {
    document.getElementById('current-hour-block').scrollIntoView()
  })

  $: if (scheduledTasks) {
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

  function computeOffset ({ startTime }) {
    // compute how many hours ahead of 8 am `startTime` is
    const hh = startTime.slice(0, 2)
    const mm = startTime.slice(3, 5)
    const hoursOffset = Number(hh) + (Number(mm) / 60) - 8 // 8 refers to "8 am"
    const pixelsPerHour = 90
    return hoursOffset * pixelsPerHour
  }
</script>

<style>
  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .calendar-time-block {
    height: 90px;
    width: 100%;
    /* position: relative; */
    position: absolute;
    /* border-top: 1px solid rgb(187, 180, 180); */
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
    border-left: 2px solid grey;
    padding-left: 2px;
    font-size: 0.8rem;
    width: 100%;
  }
</style>