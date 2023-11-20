<!-- TO-DO: rename to calendar container, as each calendar individually does not handle scrolling (it's handled by the parents) -->
<div 
  bind:this={ScrollContainer}
  class="scroll-container"
  style="
    position: relative;
    width: 15vw;
    background-color: {backgroundColor};
    flex-grow: 1;
  "
>
  <!-- NOTE: this is a tall rectangular container that only encompasses the timestamps -->
  <div 
    class="calendar-day-container" 
    style="height: {timestamps.length * timeBlockDurationInMinutes * pixelsPerMinute}px; 
      margin-bottom: 1px; 
      color: #6D6D6D;
    "
    on:drop={(e) => drop_handler(e)}
    on:dragover={(e) => dragover_handler(e)}
  >
    {#if willShowTimestamps}
      {#each timestamps as timestamp, i}
        <div 
          class="timestamp-number" 
          style="
            top: {-6 + 6 + (pixelsPerMinute * timeBlockDurationInMinutes * i)}px; 
          "
        >
          <!-- TO-DO: this is a Tree Sentinel issue..run away and come back later
          <div style="position: sticky; left: 0px;"> -->
            {timestamp.substring(0, 5)}
          <!-- </div> -->
        </div>
      {/each}
      <!-- </div> -->
    {/if}

    {#each scheduledTasks as task, i}
      <div
        style="
          position: absolute; 
          top: {computeOffsetGeneral({ 
            d1: calendarBeginningDateClassObject, 
            d2: convertDDMMYYYYToDateClassObject(
              task.startDate.split('/')[1] + '/' + task.startDate.split('/')[0] + '/' + (task.startYYYY ? task.startYYYY : new Date().getFullYear()), // notice we flip mm/dd format into dd/mm/yyyy
              task.startTime   // hhmm
            ),
            pixelsPerMinute
          })}px;
          left: {36}px;
          width: calc(15vw - 48px);
        "
      >
        <ReusableTaskElement
          {task}
          pixelsPerHour={pixelsPerMinute * 60}
          fontSize={0.8}
          hasCheckbox
          on:task-click
          on:task-duration-adjusted
          on:task-checkbox-change
        />
      </div>
    {/each}
      
    <!-- This offsets the fact that the timestamp needs a -6 margin to not be cut off from the top edge of the container -->
    <div style="margin-top: 6px;"></div>

    <!-- Again, because we're using absolute positioning for above elements, their positionings are independent from each other -->
    <!-- old width is 82% -->
    <!-- class:visible-line={(i % subdivisionsPerBlock) === 0} -->
    {#each {length: subdivisionsPerBlock * timestamps.length} as _, i}
      <div 
        style="height: { (timeBlockDurationInMinutes * pixelsPerMinute) / subdivisionsPerBlock  }px; box-sizing: border-box; margin-right: 0; margin-left: auto; width: 100%"
        class:highlighted-background={highlightedMinute === i}
        on:click|self={(e) => createTaskDirectly(e)}
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
        border-top: 4px solid orange; 
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
  import { browser } from '$app/environment';
  import { getDateInDDMMYYYY, getDateInMMDD, getRandomID } from '/src/helpers';

  export let pixelsPerHour 
  export let timeBlockDurationInMinutes 
  export let calendarBeginningDateClassObject
  export let subdivisionsPerBlock 

  export let scheduledTasks = [] 
  export let timestamps = []
  export let willShowTimestamps = true
  export let backgroundColor = 'white'

  let myObserver = null
  let InputElement

  function p (...args) {
    console.log(...args)    
  }

  let ScrollContainer
  let CurrentTimeIndicator
  const dispatch = createEventDispatcher()

  $: pixelsPerMinute = pixelsPerHour / 60

  onMount(() => {
    // NOTE: window.ResizeObserve requires `window` to be defined, so must be called in onMount()

    // PROBLEM: our scroll container's dimension is 0, even after scheduledTask is hydrated, and we tick() / beforeUpdate / afterUpdate
    // new strategy:
    //   1. Notice when the Scroll container resizes
    //   2. Then set it's scrollTop value to the currentTimeIndicator's top value (parseFloat of course)
    // if (browser) {
    //   myObserver = new ResizeObserver(entries => {
    //     entries.forEach(entry => { 
    //       ScrollContainer.scrollTop = parseFloat(CurrentTimeIndicator.style.top) // style.top returns '136.px', `parseFloat` gets rid of the 'px' suffix
    //     })
    //   })
    //   myObserver.observe(ScrollContainer)
    // }
  })

  onDestroy(() => {
    // if (browser) {
    //   myObserver.disconnect()
    // }
  })

  function copyGetTrueY (e) {
    // const ScrollContainer = document.getElementById('scroll-container')
    return e.clientY + ScrollContainer.scrollTop - ScrollContainer.getBoundingClientRect().top - ScrollContainer.style.paddingTop
  }

  async function createTaskDirectly (e) {
    // get the y-coordinate
    const trueY = copyGetTrueY(e)
    const resultantDateClassObject = getResultantDateClassObject(trueY)

    if (InputElement) {
      // only allow 1 textbox to appear at a time
      return
    }

    const newInput = document.createElement("input")
    ScrollContainer.appendChild(newInput)
    newInput.style.top = `${trueY}px`
    newInput.style.left = '30px'
    newInput.style.position = 'Absolute'
    newInput.style.id = 'calendar-direct-task-input'

    InputElement = newInput

    await tick() 
    newInput.focus()

    newInput.addEventListener('keyup', (e) => {
      if (e.key !== 'Enter') return

      const newTaskName = newInput.value 
      if (newTaskName !== '') {
        const newTaskObj = {
          id: getRandomID(),
          name: newTaskName,
          startDate: getDateInMMDD(resultantDateClassObject),
          // deadlineDate: getDateInDDMMYYYY(resultantDateClassObject),
          startTime: getHHMM(resultantDateClassObject),
          startYYYY: resultantDateClassObject.getFullYear()
        }
        dispatch('new-root-task', newTaskObj)
      }
      InputElement.remove()
      InputElement = null
    })

    // // and give it some content
    // const newContent = document.createTextNode("Hi there and greetings!");

    // add the text node to the newly created div
    // newDiv.appendChild(newContent);

    // create the task
  } 

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

    const trueY = copyGetTrueY(e)

    // origin
    const calendarStartAsMs = calendarBeginningDateClassObject.getTime()
    
    // difference
    const resultantDateClassObject = getResultantDateClassObject(trueY)
    const d = resultantDateClassObject
    const hhmm = ensureTwoDigits(d.getHours()) + ':' + ensureTwoDigits(d.getMinutes())
    const mmdd = ensureTwoDigits(d.getMonth() + 1) + '/' + ensureTwoDigits(d.getDate())


    dispatch('task-scheduled', {
      id: e.dataTransfer.getData('text/plain'),
      timeOfDay: hhmm,
      dateScheduled: mmdd
    })
  }

  function getResultantDateClassObject (trueY) {
    const calendarStartAsMs = calendarBeginningDateClassObject.getTime()

    const totalHoursDistance = trueY / pixelsPerHour
    const totalMsDistance = totalHoursDistance * 60 * 60 * 1000

    // Add them together: https://stackoverflow.com/a/12795802/7812829
    const resultantTimeInMs = calendarStartAsMs + totalMsDistance
    const resultantDateClassObject = new Date(resultantTimeInMs)
    return resultantDateClassObject
  } 

  // now format to hh:mm format to be compatible with old API
  function ensureTwoDigits (number) {
    return (number < 10 ? `0${number}` : `${number}`)
  }

  function getHHMM (dateClassObj) {
    const d = dateClassObj
    const hhmm = ensureTwoDigits(d.getHours()) + ':' + ensureTwoDigits(d.getMinutes())
    return hhmm
  }

</script>

<style>
/* DO NOT REMOVE, BREAKS DRAG-AND-DROP AND DURATION ADJUSTMENT */
.scroll-container {
  height: fit-content;
  overflow-x: hidden; 
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

.calendar-day-container {
  width: 100%;
}


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