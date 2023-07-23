<div id="scroll-container" 
  style="position: relative; 
  width: 15vw"
>
  <div id="calendar-day-container" 
    style="height: {timestamps.length * timeBlockDurationInMinutes * pixelsPerMinute}px; 
      font-family: Roboto, sans-serif; 
      margin-bottom: 1px; 
      color: #6D6D6D;
    "
    on:drop={(e) => drop_handler(e)}
    on:dragover={(e) => dragover_handler(e)}
  >
    {#each timestamps as timestamp, i}
      <div class="timestamp-number" style="top: {-6 + 6 + (pixelsPerMinute * timeBlockDurationInMinutes * i)}px;">
        {timestamp.substring(0, 5)}
      </div>
    {/each}

    {#each scheduledTasksToday.filter(task => task.startTime >= calendarStartTime) as task, i}
      <CalendarAbsolutePositionWrapper
        {task}
        pixelsPerHour={pixelsPerMinute * 60}
        {calendarStartTime}
        offsetFromLeft={32}
      >
        <ReusableTaskElement
          {task}
          pixelsPerHour={pixelsPerMinute * 60}
          fontSize={0.8}
          on:task-click
          on:task-duration-adjusted
        />
      </CalendarAbsolutePositionWrapper>
    {/each}
      
    <!-- This offsets the fact that the timestamp needs a -6 margin to not be cut off from the top edge of the container -->
    <div style="margin-top: 6px;"></div>

    <!-- Again, because we're using absolute positioning for above elements, their positionings are independent from each other -->
    {#each {length: subdivisionsPerBlock * timestamps.length} as _, i}
      <div 
        class:visible-line={(i % 5) === 0}
        style="height: {pixelsPerMinute}px; box-sizing: border-box; margin-right: 0; margin-left: auto; width: 82%"
        class:highlighted-background={highlightedMinute === i}
        on:dragenter={() => highlightedMinute = i}
        on:dragend={() => console.log('dragend') }
        on:dragover={(e) => dragover_handler(e)}
      >
      </div>
    {/each}

    <!-- A red line that indicates the current time -->
    {#if currentTimeInHHMM}
      <hr 
      style="
        border-top: 3px solid orange; 
        position: absolute; 
        top: {computeOffsetGeneral({ calendarBeginningDateClassObject, pixelsPerMinute })}px;
        left: 35px;
        width: 11vw;  
      "
      >
    {/if}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateOfToday, getTrueY, computeMillisecsDifference } from '/src/helpers.js'
  import ReusableTaskElement from '$lib/ReusableTaskElement.svelte'
  import CalendarAbsolutePositionWrapper from '$lib/CalendarAbsolutePositionWrapper.svelte';

  export let pixelsPerHour 
  export let timeBlockDurationInMinutes 
  export let calendarBeginningDateClassObject

  const subdivisionsPerBlock = 5

  $: pixelsPerMinute = pixelsPerHour / 60
  // TO-DO: make it reactive
  pixelsPerMinute = pixelsPerHour / 60

  let scheduledTasksToday = []

  let timestamps = []

  function p (...args) {
    console.log(...args)
  }

  function generateCalendarTimestamps () {
    for (let i = 0; i <= 60; i += 5)
    timestamps.push(`${i}`)
  }
  generateCalendarTimestamps()

  p('timestamps =', timestamps)

  function computeOffsetGeneral ({ calendarBeginningDateClassObject, pixelsPerMinute }) {
    const now = new Date()
    const millisecsDifference = computeMillisecsDifference(calendarBeginningDateClassObject, now)
    
    // translate time difference to a physical distance
    const minutesDifference = millisecsDifference / (1000 * 60)
    const offset = minutesDifference * pixelsPerMinute
    return offset
  }

  const dispatch = createEventDispatcher()
  const getDate = getDateOfToday

  const numOfHourBlocksDisplayed = 18

  let highlightedMinute = null 

  let calendarStartTime = ''
  let currentTimeInHHMM = ''

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
    let n = trueY / pixelsPerHour
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
/* Notion scrollbar styles */
::-webkit-scrollbar {
  background: transparent;
}
::-webkit-scrollbar {
  width: 4px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: #6D6D6D;
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
    /* margin-left: -6px; */
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