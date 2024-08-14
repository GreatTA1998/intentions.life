<script>
  import ReusableCalendarHeader from "$lib/ReusableCalendarHeader.svelte";
  import ReusableCalendarView from "$lib/ReusableCalendarView.svelte";
  import {
    MIKA_PIXELS_PER_HOUR,
    getDateInMMDD,
    getDateInDDMMYYYY,
    computeDayDifference,
  } from "/src/helpers.js";
  import { onMount, createEventDispatcher, tick ,
    beforeUpdate, afterUpdate

  } from "svelte";
  import {
    user,
    tasksScheduledOn,
    isInitialRender,
    leftMostDateForNewFetch,
    rightMostDateForNewFetch,
  } from "/src/store.js";
  import { getFirestoreCollection } from "/src/crud.js";
  import RenderlessMaryusState from "$lib/RenderlessMaryusState.svelte";
  import { lazyCallable } from "/src/helpers/actions.js";
  import Tasks from "../back-end/Tasks";
  import { DateTime } from "luxon";
  import {
    reconstructTreeInMemory,
    computeDateToTasksDict,
  } from "../helpers/dataStructures";
  import { size, cushion } from '/src/helpers/constants.js'
  import { getRandomID } from "../helpers.js";
  import BackgroundRainScene from "./BackgroundRainScene.svelte";
  import BasicWhiteboard from "./BasicWhiteboard.svelte";
  import { calendarMemoryTree } from "/src/store.js"

  export let calStartDateClassObj;

  let doodleIcons = null;
  // NOTE: timesOfDay should start from 00:00, so dateClassObjects also need to start from 00:00 military time
  let timesOfDay = [];
  let numOfHourBlocksDisplayed = 24;
  let dateClassObjects = [];
  let intForTriggeringRerender = 0;
  let hasAutoScrolled = false;
  let daysToRender = [];
  const topMarginEqualizer = 8 + timestampDivTopMargin; // to align with the timestamps that can't be displayed at negative margins
  const timestampDivTopMargin = 24;
  let isShowingDockingArea = true;
  
  let newScrollLeft = 0
  let ScrollingParent
  let hasFetchedNewPastTasks = false

  $: if ($tasksScheduledOn) {
    intForTriggeringRerender += 1;
  }

  beforeUpdate(() => {

  })

  afterUpdate(() => {
    if (ScrollingParent && hasFetchedNewPastTasks) {
      ScrollingParent.scrollLeft = newScrollLeft
      hasFetchedNewPastTasks = false
    }
  })

  onMount(() => {
    const today = DateTime.now()
    const temp = buildDates(
      // today.minus({ days: -180 }),
      // 365
      today.minus({ days: size + cushion }), 
      2 * (size + cushion) + 1 // +1 means because today's date column counts as the midpoint and is an additional column
    )
    daysToRender = temp
    getTimesOfDay()
    fetchDoodleIcons()
  })

  function saveScrollPosition () {
    ScrollingParent = document.getElementById('the-only-scrollable-container')
    if (ScrollingParent) {
      const dayColumnWidth = 200
      const correctionAmount = dayColumnWidth * (size + cushion)  
 
      const oldScrollLeft = ScrollingParent.scrollLeft
      newScrollLeft = correctionAmount + oldScrollLeft
      hasFetchedNewPastTasks = true
    }
  }

  function incorporateNewWeekIntoCalendarTree (newWeekTasksArray) {
    const newWeekMemoryTree = reconstructTreeInMemory(newWeekTasksArray)
    calendarMemoryTree.set([...$calendarMemoryTree, ...newWeekMemoryTree])
    const newDateToTasks = computeDateToTasksDict($calendarMemoryTree)
    tasksScheduledOn.set(newDateToTasks)
  }

  async function fetchPastTasks(ISODate) {
    const dt = DateTime.fromISO(ISODate);
  
    const right = dt.minus({ days: cushion + 1 })
    const left = dt.minus({ days: cushion + size + cushion })

    const newWeekTasksArray = await Tasks.getByDateRange(
      $user.uid,
      left.toISODate(), // '2024-07-31',
      right.toISODate()
    )

    hasFetchedNewPastTasks = true

    saveScrollPosition()
    // from left
    daysToRender = [...buildDates(left, size + cushion), ...daysToRender];

    // now update state
    incorporateNewWeekIntoCalendarTree(newWeekTasksArray)
  }

  async function fetchNewWeekOfFutureTasks(intersectedDate) {
    const dt = DateTime.fromISO(intersectedDate);
    const left = dt.plus({ days: cushion + 1 });
    const right = left.plus({ days: size + cushion });
    daysToRender = [...daysToRender, ...buildDates(left, size + cushion)];

    // note each new loaded intervals should not be overlapping
    const newWeekTasksArray = await Tasks.getByDateRange(
      $user.uid,
      left.toISODate(), // '2024-08-18',
      right.toISODate() // '2024-08-24'
    )
    incorporateNewWeekIntoCalendarTree(newWeekTasksArray);
  }

  async function fetchDoodleIcons() {
    const temp = await getFirestoreCollection("/doodleIcons");
    doodleIcons = temp;
  }

  function toggleDockingArea() {
    isShowingDockingArea = !isShowingDockingArea;
  }

  function addToDateClassObjects(startdateClassObj) {
    const temp = [];
    for (let i = -7; i < 0; i++) {
      const offset = i * (24 * 60 * 60 * 1000);
      const copy = startdateClassObj;
      copy.setTime(startdateClassObj.getTime() + offset);
      // no longer start from 7 am, or else there will be missing hours
      copy.setHours(0, 0, 0); // hours, minutes, seconds, note it's ZERO-indexed, 0-23, 0-59
      temp.push(copy);
    }
    dateClassObjects = [...temp, ...dateClassObjects]; // ma
  }

  // totalNumber
  function buildDates(start, totalNumber) {
    const dates = [];
    for (let i = 0; i < totalNumber; i++) {
      dates.push(
        start.plus({ days: i }).toFormat('yyyy-MM-dd')
      )
    }
    return dates;
  }

  function getTimesOfDay() {
    let currentHour = 0; // today.getHours() // get the integer i.e. 0 to 23
    // now generate 16 hours of time (so it covers, for example, 8 am - midnight)
    for (let i = 0; i < numOfHourBlocksDisplayed; i++) {
      if (currentHour === 24) {
        currentHour = 0;
      }
      if (currentHour < 10) {
        timesOfDay.push("0" + currentHour + ":00");
      } else {
        timesOfDay.push(currentHour + ":00");
      }

      currentHour += 1;
    }
    timesOfDay = timesOfDay;
  }
</script>

<!-- This component was first planned on Svelte REPL: https://svelte.dev/repl/d42716f1cc2746ce949de01f0117419e?version=4.2.15 -->
<div class="top-flexbox" style="border-bottom: 1px solid lightgrey;">
  <div class="pinned-div">
    <div style="font-size: 16px; margin-top: var(--main-content-top-margin);">
      <div style="color: rgb(0, 0, 0); font-weight: 400;">
        {calStartDateClassObj.toLocaleString("en-US", { month: "short" })}
      </div>
      <div style="font-weight: 200; margin-top: 2px;">
        {calStartDateClassObj.toLocaleString("en-US", { year: "numeric" })}
      </div>
    </div>
    <span
      on:click={toggleDockingArea}
      class="collapse-arrow material-symbols-outlined"
    >
      {isShowingDockingArea ? "expand_less" : "expand_more"}
    </span>
  </div>

  <div class="sticky-y-div flexbox">
    {#each daysToRender as ISODate, i (ISODate)}
      {#if i === cushion}
        <div
          use:lazyCallable={() => {
            if ($isInitialRender) {
              isInitialRender.set(false)
              return false
            }
            else {
              fetchPastTasks(ISODate)
              return true
            }
          }}
          style="outline: 2px solid red;"
        >
          <ReusableCalendarHeader
            {ISODate}
            {intForTriggeringRerender}
            {isShowingDockingArea}
            on:task-checkbox-change
            on:task-scheduled
            on:new-root-task
            on:task-click
          />
        </div>
      {:else if i === daysToRender.length - 1 - cushion}
        <div
          use:lazyCallable={() => fetchNewWeekOfFutureTasks(ISODate)}
          style="outline: 2px solid blue;"
        >
          <ReusableCalendarHeader
            {ISODate}
            {intForTriggeringRerender}
            {isShowingDockingArea}
            on:task-checkbox-change
            on:task-scheduled
            on:new-root-task
            on:task-click
          />
        </div>
      {:else}
        <ReusableCalendarHeader
          {ISODate}
          {intForTriggeringRerender}
          {isShowingDockingArea}
          on:task-checkbox-change
          on:task-scheduled
          on:new-root-task
          on:task-click
        />
      {/if}
    {/each}
  </div>
</div>

<div style="display: flex; width: fit-content;">
  <div class="x-sticky" style="margin-top: {timestampDivTopMargin}px;">
    {#each timesOfDay as timestamp, i (i)}
      <div
        class="x-sticky timestamp-number"
        style="height: {MIKA_PIXELS_PER_HOUR}px; width: var(--timestamps-column-width);"
      >
        {timestamp.substring(0, 5)}
      </div>
    {/each}
  </div>

  {#each daysToRender.sort((a, b) => a - b) as ISODate, i (ISODate)}
    <!-- margin-left: 0.5vw;  -->
    <div style="margin-top: {topMarginEqualizer}px;" class="unselectable">
      <RenderlessMaryusState dateClassObj={DateTime.fromISO(ISODate).toJSDate()} let:ourReactiveState>
        {#if timesOfDay.length !== 0}
          <ReusableCalendarView
            calendarBeginningDateClassObject={DateTime.fromISO(ISODate).toJSDate()}
            scheduledTasks={ourReactiveState}
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
      </RenderlessMaryusState>
    </div>
  {/each}
</div>

<style>
  :root {
    --pinned-div-width: 72px;
    --timestamps-column-width: 64px; /* was 96px */
    --day-header-width: 120px;
    --calendar-left-padding: 16px;
  }

  .x-sticky {
    position: sticky;
    left: 0px;
    z-index: 1;
  }

  .timestamp-number {
    padding-left: var(--calendar-left-padding);
    color: #6d6d6d;

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
    padding: 0px 5px 5px var(--calendar-left-padding);
    z-index: 2; /* Ensure it appears on top */
  }

  .sticky-y-div {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1; /* Lower z-index than pinned-div */
    background-color: var(--calendar-bg-color);
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
