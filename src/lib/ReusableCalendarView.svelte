<div 
  bind:this={ScrollContainer}
  id="scroll-container" 
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

    {#each scheduledTasks as task, i}
      <div
        style="
          position: absolute; 
          top: {computeOffsetGeneral({ 
            d1: calendarBeginningDateClassObject, 
            d2: convertDDMMYYYYToDateClassObject(
              task.startDate.split('/')[1] + '/' + task.startDate.split('/')[0] + '/' + (task.startYYYY ? task.startYYYY : new Date().getYears()), // notice we flip mm/dd format into dd/mm/yyyy
              task.startTime   // hhmm
            ),
            pixelsPerMinute
          })}px;
          left: {32}px;
        "
      >
        <ReusableTaskElement
          {task}
          pixelsPerHour={pixelsPerMinute * 60}
          fontSize={0.8}
          on:task-click
          on:task-duration-adjusted
        />
      </div>
    {/each}
      
    <!-- This offsets the fact that the timestamp needs a -6 margin to not be cut off from the top edge of the container -->
    <div style="margin-top: 6px;"></div>

    <!-- Again, because we're using absolute positioning for above elements, their positionings are independent from each other -->
    {#each {length: subdivisionsPerBlock * timestamps.length} as _, i}
      <div 
        class:visible-line={(i % subdivisionsPerBlock) === 0}
        style="height: { (timeBlockDurationInMinutes * pixelsPerMinute) / subdivisionsPerBlock  }px; box-sizing: border-box; margin-right: 0; margin-left: auto; width: 82%"
        class:highlighted-background={highlightedMinute === i}
        on:dragenter={() => highlightedMinute = i}
        on:dragend={() => console.log('dragend') }
        on:dragover={(e) => dragover_handler(e)}
      >
      </div>
    {/each}

    <!-- https://svelte.dev/tutorial/update
      "Scrolling is hard to achieve with purely a state-driven way"
    -->

    <!-- A red line that indicates the current time -->
    {#if currentTimeInHHMM}
      <hr 
        bind:this={CurrentTimeIndicator}
        style="
        border-top: 3px solid orange; 
        position: absolute; 
        top: {computeOffsetGeneral({ 
          d1: calendarBeginningDateClassObject, 
          d2: new Date(), 
          pixelsPerMinute 
        })}px;
        left: 35px;
        width: 11vw;  
      "
      >
    {/if}
  </div>
</div>

<script>
  import { getDateOfToday, getTrueY, computeMillisecsDifference, convertDDMMYYYYToDateClassObject} from '/src/helpers.js'
  import ReusableTaskElement from '$lib/ReusableTaskElement.svelte'
  import { onMount, beforeUpdate, afterUpdate, tick, createEventDispatcher, onDestroy } from 'svelte'

  export let pixelsPerHour 
  export let timeBlockDurationInMinutes 
  export let calendarBeginningDateClassObject
  export let subdivisionsPerBlock 

  export let scheduledTasks = [] 
  export let timestamps = []

  function p (...args) {
    console.log(...args)    
  }

  let ScrollContainer
  let CurrentTimeIndicator

  // PROBLEM: our scroll container's dimension is 0, even after scheduledTask is hydrated, and we tick() / beforeUpdate / afterUpdate
  // new strategy:
  //   1. Notice when the Scroll container resizes
  //   2. Then set it's scrollTop value to the currentTimeIndicator's top value (parseFloat of course)
  const myObserver = new ResizeObserver(entries => {
    entries.forEach(entry => { 
      ScrollContainer.scrollTop = parseFloat(CurrentTimeIndicator.style.top) // style.top returns '136.px', `parseFloat` gets rid of the 'px' suffix
    })
  });

  onMount(() => {
    myObserver.observe(ScrollContainer)
  })


  onDestroy(() => {
    myObserver.disconnect()
  })

  const dispatch = createEventDispatcher()

  let pixelsPerMinute = pixelsPerHour / 60

  // computes the physical offset, within origin based on d1
  function computeOffsetGeneral ({ d1, d2, pixelsPerMinute }) {
    const millisecsDifference = computeMillisecsDifference(d1, d2)
    
    // translate time difference to a physical distance
    const minutesDifference = millisecsDifference / (1000 * 60)
    const offset = minutesDifference * pixelsPerMinute
    return offset
  }

  const getDate = getDateOfToday

  let highlightedMinute = null 

  let calendarStartTime = '07:00'
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

  // How it works:
  //   1. Do origin + new difference to get the date object
  //   2. use the new date object to generate `startTime` and `startDate`
  function drop_handler (e) {
    e.preventDefault()
    highlightedMinute = null

    // origin
    const calendarStartAsMs = calendarBeginningDateClassObject.getTime()
    
    // difference
    const trueY = getTrueY(e)
    const totalHoursDistance = trueY / pixelsPerHour
    const totalMsDistance = totalHoursDistance * 60 * 60 * 1000

    // Add them together: https://stackoverflow.com/a/12795802/7812829
    const resultantTimeInMs = calendarStartAsMs + totalMsDistance
    const resultantDateClassObject = new Date(resultantTimeInMs)

    // now format to hh:mm format to be compatible with old API
    function ensureTwoDigits (number) {
      return (number < 10 ? `0${number}` : `${number}`)
    }
    const d = resultantDateClassObject
    const hhmm = ensureTwoDigits(d.getHours()) + ':' + ensureTwoDigits(d.getMinutes())
    const mmdd = ensureTwoDigits(d.getMonth() + 1) + '/' + ensureTwoDigits(d.getDate())


    dispatch('task-scheduled', {
      id: e.dataTransfer.getData('text/plain'),
      timeOfDay: hhmm,
      dateScheduled: mmdd
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