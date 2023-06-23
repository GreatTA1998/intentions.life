<div id="scroll-container" style="position: relative; width: 13vw">
  <!-- This is a relative container -->
  <div id="calendar-day-container" 
    style="height: {pixelsPerDay * numOfHourBlocksDisplayed}px; 
      font-family: Roboto, sans-serif; 
      margin-bottom: 1px; 
      color: #6D6D6D;
    "
    on:drop={(e) => drop_handler(e)}
    on:dragover={(e) => dragover_handler(e)}
  >
    {#if daysOfWeek}
      {#each daysOfWeek as dayOfWeek, i}
        <div class="timestamp-number" style="top: {-6 + 6 + (pixelsPerDay * i)}px;">
          {dayOfWeek}
        </div>
      {/each}
    {/if}
    
    {#each scheduledTasksThisWeek as task, i}
      <WeekViewTaskElement
        {task}
        height={((task.duration || 30) / (60 * 24)) * pixelsPerDay}
        fontSize={0.8}
        offsetFromLeft={32}
        offsetFromTop={computeOffset({ startTime: task.startTime, startDate: task.startDate })}
        {pixelsPerDay}
        on:task-click
        on:task-duration-adjusted
      />
    {/each}
        
    <!-- This offsets the fact that the timestamp needs a -6 margin to not be cut off from the top edge of the container -->
    <div style="margin-top: 6px;"></div>

    <!-- Again, because we're using absolute positioning for above elements, their positionings are independent from each other -->
    {#each {length: 60 * numOfHourBlocksDisplayed} as _, i}
      <div 
        class:visible-line={(i % 60) === 0}
        style="height: {pixelsPerDay / 60}px; box-sizing: border-box; margin-right: 0; margin-left: auto; width: 82%"
        class:highlighted-background={highlightedMinute === i}
        on:dragenter={() => highlightedMinute = i}
        on:dragend={() => console.log('dragend') }
        on:dragover={(e) => dragover_handler(e)}
      >
      </div>
    {/each}

    <!-- RED LINE INDICATOR -->
    {#if currentTimeInHHMM}
      <hr style="
        border-top: 2px solid orange; 
        position: absolute; 
        top: {computeOffset({ startTime: currentTimeInHHMM, startDate: getDateInMMDD(new Date()) }, pixelsPerDay, calendarStartTime)}px;
        left: 32px;
        width: 10vw;  
      "
      >
    {/if}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateInMMDD, getDateOfToday, getTrueY } from '../helpers.js'
  import WeekViewTaskElement from './WeekViewTaskElement.svelte'

  export let scheduledTasksThisWeek
  export let pixelsPerDay

  const dispatch = createEventDispatcher()
  const getDate = getDateOfToday

  const numOfHourBlocksDisplayed = 7

  let highlightedMinute = null 
  let daysOfWeek = null

  function decideCalendarStartDay () {
    const today = new Date() // display 7 days ahead
    const baseDate = today
    const output = [] 
    for (let i = 0; i < 7; i++) {
      const dayName = today.toLocaleDateString('en', { weekday: 'long'})
      output.push(dayName)
      baseDate.setDate(baseDate.getDate() + 1)
    }
    daysOfWeek = [...output]
  }

  decideCalendarStartDay()

  function getDayName (mmddyyyy, locale = 'en') {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long'})
  }

  let startY = 0

  let calendarStartTime = ''
  let currentTimeInHHMM = ''

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  function getDayOfWeek () {
    const today = new Date()
    const options = { weekday: 'short' }
    return new Intl.DateTimeFormat('en-US', options).format(today)
  }

  function toggleIsDone (task) { 
    dispatch('task-done', { taskName: task.name, id: task.id })
  }

  const one_sec = 1000 // milliseconds
  updateCurrentTime()
  setInterval(updateCurrentTime, 60 * one_sec)

  // update currentRedLineIndicator
  function updateCurrentTime () {
    const today = new Date()
    let hh = today.getHours()
    hh = `${hh < 10 ? '0' : ''}` + hh

    let mm = today.getMinutes()
    mm = `${mm < 10 ? '0' : ''}` + mm
    
    let result = hh + ':' + mm
    currentTimeInHHMM = result
  }

  function computeOffset ({ startTime, startDate }) {    
    // startDate is in `dd/mm/yyyy` format
    // startTime is in `hh:mm` format
    let utc1 
    if (startDate.length === 5) {
      const yyyy = new Date().getFullYear()
      const [mm, dd] = startDate.split('/')
      utc1 = Date.UTC(yyyy, mm, dd)
    }

    const today = new Date()
    const utc2 = Date.UTC(today.getFullYear(), 1 + today.getMonth(), today.getDate())

    const msPerDay = 1000 * 60 * 60 * 24
    const baseDayDifference = Math.floor(utc1 - utc2) / msPerDay

    const hh = startTime.slice(0, 2)
    const mm = startTime.slice(3, 5)
    const dayDifferenceDueToStartTime = (Number(hh) / 24) + (Number(mm) / (24 * 60))

    const totalDayDifference = baseDayDifference + dayDifferenceDueToStartTime
    return totalDayDifference * pixelsPerDay
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


  // tricky thing is you had to add from the origin, whereas here 
  // in the week calendar 

  function oldFunction (n) {
    const decimal = n - Math.floor(n)
    const integer = Math.trunc(n)
    
    // calculate minutes i.e. `mm` 
    let minutesOffset = decimal * 60
    let mm 
    if (minutesOffset < 1) {
      mm = '00'
    } else if (minutesOffset < 10) {
      mm = `0${minutesOffset.toPrecision(1)}`
    } else {
      mm = minutesOffset.toPrecision(2)
    }

    // calculate hours i.e. `hh`
    const origin = parseInt('00') // '00' stands for 00:00 am, i.e start of day, or midnight
    let hh = origin + integer
    if (hh < 10) {
      hh = `0${hh}`
    }

    const scheduledTime = `${hh}:${mm}` 
    return scheduledTime
  }

  
  // the goal here is to compute 2 quantities:
  //   startDate: in mm/yy format (you'll have to fix backwards compatibility problems soon)
  //   startTime: in hh:mm format
  function drop_handler (e) {
    e.preventDefault()
    highlightedMinute = null

    const trueY = getTrueY(e)
    let n = trueY / pixelsPerDay
    const decimal = n - Math.floor(n)
    const integer = Math.trunc(n)

    // start date is just the integer part (might be negative) 
    const d = new Date()
    d.setDate(d.getDate() + integer)

    const scheduledDate = getDateInMMDD(d)

    // then you can recursively re-use the function you used 
    // to convert a value into a time, using `decimals` as the input

    // note the input of `function computation` is a value n in HOURS represented by the gap
    const hoursPerDay = 24
    const scheduledTime = oldFunction(decimal * hoursPerDay)
    
    dispatch('task-scheduled', {
      id: e.dataTransfer.getData('text/plain'),
      timeOfDay: scheduledTime,
      dateScheduled: scheduledDate
    })
  }
</script>

<style>
/* Notion scrollbar styles */
::-webkit-scrollbar {
  background: transparent;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: #D3D1CB;
}
::-webkit-scrollbar-track {
  background: #EDECE9;
}

* {
  box-sizing: border-box;
}


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


#scroll-container {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  /* padding-top: 22px;  */
  box-sizing: border-box;
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
  .timestamp-number {
    top: -5px; 
    margin-right: 4px;
    font-size: 0.7rem;

    /* these CSS properties are copied from `.calendar-time-block`, which used to be separate */
    position: absolute;
    /* height: 90px;
    width: 100%; */
  }

  .visible-line {
    border-top: 1px solid rgb(195, 195, 195);
  }
</style>