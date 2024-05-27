<!-- This component was first planned on Svelte REPL: https://svelte.dev/repl/d42716f1cc2746ce949de01f0117419e?version=4.2.15 -->
  <!-- style="height: {dockingAreaHeight + 96}px" -->
  <div class="top-flexbox" style="border-bottom: 1px solid lightgrey;">
    <div class="pinned-div">
      <div style="display: flex; font-size: 14px; margin-top: 32px;">
        <div style="color: rgb(80, 80, 80); font-weight: 400;">
          {calStartDateClassObj.toLocaleString('en-US', { month: 'short'})}
        </div>
        <div style="margin-left: 6px; font-weight: 300; color: rgb(80, 80, 80)">
          {calStartDateClassObj.toLocaleString('en-US', { year: 'numeric'})}
        </div>
      </div>
      <span on:click={toggleDockingArea} class="collapse-arrow material-symbols-outlined">
        {isShowingDockingArea ? 'expand_less' : 'expand_more' }
      </span>
    </div>

    <div class="sticky-y-div flexbox">
      {#each dateClassObjects as dateClassObj}
        <ReusableCalendarHeader 
          {dateClassObj}
          {intForTriggeringRerender}
          on:task-scheduled  
          on:new-root-task
          on:task-click
        />
      {/each}
    </div>
  </div>


<div style="display: flex; width: fit-content;">
  <div class="x-sticky" style="margin-top: {timestampDivTopMargin}px;">
    {#each timesOfDay as timestamp, i}
      <div class="x-sticky timestamp-number" 
        style="height: {MIKA_PIXELS_PER_HOUR}px; width: var(--timestamps-column-width);"
      >
        {timestamp.substring(0, 5)}
      </div>
    {/each}
  </div>

  {#each dateClassObjects as dateClassObj, i (dateClassObj.getTime())}
   <!-- margin-left: 0.5vw;  -->
   <div style="margin-top: {topMarginEqualizer}px;" class="unselectable">
      {#key intForTriggeringRerender}
        {#if timesOfDay.length !== 0}
          <ReusableCalendarView
            calendarBeginningDateClassObject={dateClassObj}
            scheduledTasks={getScheduledTasks(dateClassObj).filter(task => task.startTime)}
            timestamps={timesOfDay}
            pixelsPerHour={MIKA_PIXELS_PER_HOUR}
            timeBlockDurationInMinutes={60}
            on:new-root-task
            on:task-update
            on:task-click
            on:task-scheduled
            on:task-checkbox-change
          />
        {/if}
      {/key}
    </div>
  {/each}
</div>

<script>
import ReusableCalendarHeader from '$lib/ReusableCalendarHeader.svelte'
import ReusableCalendarView from '$lib/ReusableCalendarView.svelte'
import { MIKA_PIXELS_PER_HOUR, getDateInMMDD, getDateInDDMMYYYY, computeDayDifference } from '/src/helpers.js'
import { onMount, createEventDispatcher } from 'svelte'
import { tasksScheduledOn } from '/src/store.js'
import { getFirestoreCollection } from '/src/crud.js'

export let calStartDateClassObj

let doodleIcons = null
// NOTE: timesOfDay should start from 00:00, so dateClassObjects also need to start from 00:00 military time
let timesOfDay = [] 
let numOfHourBlocksDisplayed = 24
let dateClassObjects = []
let intForTriggeringRerender = 0

const topMarginEqualizer = 8 + timestampDivTopMargin // to align with the timestamps that can't be displayed at negative margins
const timestampDivTopMargin = 24
let isShowingDockingArea = true

$: {
  getDateClassObjects(calStartDateClassObj)
}

$: if ($tasksScheduledOn) {
  intForTriggeringRerender += 1
}

onMount(() => {
  // Default start date is today, if left, you shift calStartDateClassObj
  getTimesOfDay()

  fetchDoodleIcons()
})

function getScheduledTasks (dateClassObj) {
  const simpleISO = getSimpleISOFromDateClassObj(dateClassObj)
  return $tasksScheduledOn[simpleISO] || [] // `tasksScheduledOn` will only use
}

// dd-mm-yyyy format
function getSimpleISOFromDateClassObj (d) {
  let dd = d.getDate()
  let mm = d.getMonth() + 1
  let yyyy = d.getFullYear()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  return dd + '-' + mm + '-' + yyyy;
}

async function fetchDoodleIcons () {
  const temp = await getFirestoreCollection('/doodleIcons')
  doodleIcons = temp
}

function toggleDockingArea () {
  isShowingDockingArea = !isShowingDockingArea
}

function getDateClassObjects (dateClassObj) {
  const temp = []
  let d = dateClassObj
  for (let i = -7; i < 7; i++) {
    const offset = i * (24*60*60*1000)
    const copy = new Date()
    copy.setTime(d.getTime() + offset)
    // no longer start from 7 am, or else there will be missing hours
    copy.setHours(0, 0, 0) // hours, minutes, seconds, note it's ZERO-indexed, 0-23, 0-59
    temp.push(copy)
  }
  dateClassObjects = [...temp] // manually trigger reactivity)
}

function getTimesOfDay () {
  let currentHour = 0 // today.getHours() // get the integer i.e. 0 to 23
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
  timesOfDay = timesOfDay
}

</script>

<style>
  :root {
    --pinned-div-width: 72px;
    --timestamps-column-width: 96px;
    --day-header-width: 120px;
  }


  .x-sticky {
    position: sticky;
    left: 0px;
    z-index: 1;
  }

  .timestamp-number {
    padding-left: var(--calendar-section-left-spacing);
    color: #6D6D6D;

    /* opaque, so that shifted calendar content will go "underneath" the timestamps */
    background-color: var(--calendar-bg-color);
    z-index: 2;
    font-size: 12px;
  }

  .pinned-div {
    width: var(--timestamps-column-width);
    position: sticky;
    left: 0;
    background-color: var(--calendar-bg-color);
    /* background-color: cyan; */
    padding: 5px;
    padding-left: 16px;
    z-index: 2; /* Ensure it appears on top */
  }

  .sticky-y-div {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1; /* Lower z-index than pinned-div */
    /* border: 4px solid green; */
    /* background-color: purple; */
    background-color: var(--calendar-bg-color);
    /* border-bottom: 2px dashed grey; */
    width: fit-content;
  }
	
  .flexbox {
    display: flex;
  }

  .collapse-arrow {
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 26px;
    cursor: pointer;
    color: rgb(121, 121, 121);
    font-weight: 300;
  }

  .top-flexbox {
    display: flex;
    position: static;
    position: sticky;
    top: 0;
    z-index: 2;
    width: fit-content;
  }
</style>