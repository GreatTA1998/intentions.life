<script>
  import ReusableCalendarHeader from "$lib/ReusableCalendarHeader.svelte";
  import ReusableCalendarView from "$lib/ReusableCalendarView.svelte";
  import {
    MIKA_PIXELS_PER_HOUR,
    getDateInMMDD,
    getDateInDDMMYYYY,
    computeDayDifference,
  } from "/src/helpers.js";
  import { onMount, createEventDispatcher } from "svelte";
  import {
    user,
    tasksScheduledOn,
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
  import { getRandomID } from "../helpers.js";
  import BackgroundRainScene from "./BackgroundRainScene.svelte";
  import BasicWhiteboard from "./BasicWhiteboard.svelte";

  export let calStartDateClassObj;

  const size = 4
  const cushion = 2

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

  $: if ($tasksScheduledOn) {
    intForTriggeringRerender += 1;
  }

  onMount(() => {
    const today = DateTime.now()
    daysToRender = buildDates(
      // today.minus({ days: -365 }),
      // 365
      today.minus({ days: size + cushion }), 
      2 * (size + cushion) + 1 // +1 means because today's date column counts as the midpoint and is an additional column
    )
    getTimesOfDay()
    fetchDoodleIcons()
  })

  function incorporateNewWeekIntoCalendarTree(newWeekTasksArray) {
    const newWeekMemoryTree = reconstructTreeInMemory(newWeekTasksArray);
    const newSection = computeDateToTasksDict(newWeekMemoryTree);
    tasksScheduledOn.set({ ...$tasksScheduledOn, ...newSection });
  }

  async function fetchPastTasks(ISODate) {
    // console.log('intersector should be August 8 =', ISODate)
    const dt = DateTime.fromISO(ISODate);
  
    const right = dt.minus({ days: cushion + 1 })
    const left = dt.minus({ days: cushion + size + cushion })
    // console.log("right should be August 5 =", right)
    // console.log('left should be July 31', left)

    // from left
    daysToRender = [...buildDates(left, size + cushion), ...daysToRender];

    const newWeekTasksArray = await Tasks.getByDateRange(
      $user.uid,
      left.toISODate(), // '2024-07-31',
      right.toISODate()
    )
    incorporateNewWeekIntoCalendarTree(newWeekTasksArray);
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

  // dd-mm-yyyy format
  function getSimpleISOFromDateClassObj(d) {
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yyyy = d.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "-" + mm + "-" + yyyy;
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
  function getDateClassObjects(dateClassObj) {
    const temp = [];
    let d = dateClassObj;
    for (let i = -7; i < 7; i++) {
      const offset = i * (24 * 60 * 60 * 1000);
      const copy = new Date();
      copy.setTime(d.getTime() + offset);
      // no longer start from 7 am, or else there will be missing hours
      copy.setHours(0, 0, 0); // hours, minutes, seconds, note it's ZERO-indexed, 0-23, 0-59
      temp.push(copy);
    }
    dateClassObjects = [...temp]; // manually trigger reactivity)
  }
  
  // totalNumber
  function buildDates(start, totalNumber) {
    const dates = [];
    console.log("numToRender =", totalNumber)
    for (let i = 0; i < totalNumber; i++) {
      dates.push(
        start.plus({ days: i }).toFormat('yyyy-MM-dd')
      )
    }
    console.log('build more dates =', dates)
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
    {#each daysToRender.sort((a, b) => a - b) as ISODate, i (ISODate)}
      {#if i === cushion}
        <div
          use:lazyCallable={() => setTimeout(()=>{
            console.log('we are loading more past')
            fetchPastTasks(ISODate)}
            , 3000)}
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

  {#each  daysToRender.sort((a, b) => a - b) as ISODate, i}
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
