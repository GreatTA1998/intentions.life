<div style="position: relative; background-color: var(--calendar-bg-color);">
    <!-- Absolute element is not in the flex flow -->
    <!-- e.g. DEC 2023 -->
    <div style="position: absolute; left: var(--calendar-section-left-spacing); top: var(--main-content-top-margin); z-index: 3">
      <div style="display: flex; font-size: 14px;">
        <div style="color: rgb(80, 80, 80); font-weight: 400;">
          {calStartDateClassObj.toLocaleString('en-US', { month: 'short'})}
        </div>
        <div style="margin-left: 6px; font-weight: 300; color: rgb(80, 80, 80)">
          {calStartDateClassObj.toLocaleString('en-US', { year: 'numeric'})}
        </div>
      </div>

      <!-- TO-DO: figure out a scroll-only solution -->
      <div style="display: flex; margin-top: 4px;">
        <div>
          <span on:click={() => dispatch('calendar-shifted', { days: -7 })} class="material-icons shift-calendar-arrow">
            arrow_left
          </span>
        </div>

        <div>
          <span on:click={() => dispatch('calendar-shifted', { days: 7 })} class="material-icons shift-calendar-arrow">
            arrow_right
          </span>
        </div>
      </div>
    </div>
    <!-- End of absolute element -->


  <div style="display: flex; width: fit-content;">
    <div class="x-sticky" style="margin-top: {totalCalStartTopOffset}px;">
      {#each timesOfDay as timestamp, i}
        <div class="x-sticky timestamp-number" 
          style="height: {MIKA_PIXELS_PER_HOUR}px;"
        >
          {timestamp.substring(0, 5)}
        </div>
      {/each}
    </div>

    {#each dateClassObjects as dateClassObj, i (dateClassObj.getTime())}
      <!-- To vertically group the date label with the calendar component-->
      <!-- 4px for gap between each calendar so the calendar blocks don't visually merge -->
      <div style="margin-left: 0.5vw;" class="unselectable">
        <div class="sticky-day-of-week-abbreviation" style="padding-top: var(--main-content-top-margin); margin-bottom: {spacingBetweenLabelAndCal}px">
          <div>
            <div 
              class="center-flex day-name-label" 
              class:active-day-name={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
            >
              {dateClassObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
            </div>

            <div 
              class="center-flex" 
              style="font-size: 16px; font-weight: 300" 
            >
              <div class="center-flex" 
                style="padding: 8px; width: 48px; height: 36px;" 
                class:active-date-number={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
                class:highlighted-circle={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
              >
                {dateClassObj.getDate()}
              </div>
            </div>
          </div>  

          <!-- quickfix for reactivity, don't know why it fixes -->
          {#key intForTriggeringRerender}
            <!-- make it drag-and-droppable -->
            {#each getScheduledTasks(dateClassObj).filter(task => !task.startTime) as flexibleDayTask}
              <div on:click={() => dispatch('task-click', { task: flexibleDayTask })} style="font-size: 12px; display: flex; gap: 4px; margin-top: 4px;">
                <ReusableCheckbox/>
                {flexibleDayTask.name}
              </div>
            {/each}
          {/key}
        </div>

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
</div>

<script>
  import ReusableCalendarView from '$lib/ReusableCalendarView.svelte'
  import { MIKA_PIXELS_PER_HOUR, getDateInMMDD, getDateInDDMMYYYY } from '/src/helpers'
  import { onMount, createEventDispatcher } from 'svelte'
  import { tasksScheduledOn } from '/src/store.js'
  import ReusableCheckbox from '$lib/ReusableCheckbox.svelte'

  export let calStartDateClassObj

  let allIncompleteTasks = null
  // NOTE: timesOfDay should start from 00:00, so dateClassObjects also need to start from 00:00 military time
  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 24
  let dateClassObjects = []
  let intForTriggeringRerender = 0

  const totalCalStartTopOffset = 100 + spacingBetweenLabelAndCal; // 100 is the height of the top label, 12 is the margin 
  const spacingBetweenLabelAndCal = 36

  const dispatch = createEventDispatcher()

  $: getDateClassObjects(calStartDateClassObj)

  $: if ($tasksScheduledOn) {
    intForTriggeringRerender += 1
  }

  onMount(() => {
    // Default start date is today, if left, you shift calStartDateClassObj
    getTimesOfDay()
  })

  function getDateClassObjects (dateClassObj) {
    dateClassObjects = []
    let d = dateClassObj
    for (let i = -2; i < 8; i++) {
      const offset = i * (24*60*60*1000)
      const copy = new Date()
      copy.setTime(d.getTime() + offset)
      // no longer start from 7 am, or else there will be missing hours
      copy.setHours(0, 0, 0) // hours, minutes, seconds, note it's ZERO-indexed, 0-23, 0-59
      dateClassObjects.push(copy)
    }
    dateClassObjects = dateClassObjects // manually trigger reactivity)
  }
  
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

  .shift-calendar-arrow {
    font-size: 32px; 
    cursor: pointer; 
    height: 40px; 

    position: sticky; 
    top: 0;
    z-index: 1;

    padding-top: 0px;
  }

  .day-name-label {
    font-size: 16px; 
    margin-bottom: 0px; 
    /* margin-top: 24px;  */
    /* padding-top: 24px; */
    font-weight: 500;
  }

  .active-day-name {
    /* in the future, figure out why class: selectors are overriden by <styles> */
    font-weight: 600;
    color: black;
  }

  .active-date-number {
    font-weight: 400;
    color: black;
  }
/* 
  .orange-highlight {
    color: black;
    font-weight: 600;
  } */

  .highlighted-circle {
    border-radius: 25px;
  }

  .center-flex {
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  .sticky-day-of-week-abbreviation {
    font-size: 1.4em;
    background-color: var(--calendar-bg-color);
    color: #6D6D6D;
    height: 100px;
    
    position: sticky; 

    /* FIGURE THIS OUT TOMORROW */
    top: 0px;
    z-index: 1;

    /* border-bottom: 1px solid rgb(212, 212, 212); */
  
  }
</style>