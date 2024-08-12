<script>
  import ReusableCreateTaskDirectly from "$lib/ReusableCreateTaskDirectly.svelte";
  import ReusableFlexibleDayTask from "$lib/ReusableFlexibleDayTask.svelte";
  import FunctionalDoodleIcon from "$lib/FunctionalDoodleIcon.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import { trace } from "../helpers/utils";
  import {
    tasksScheduledOn,
    whatIsBeingDraggedFullObj,
    whatIsBeingDragged,
    whatIsBeingDraggedID,
  } from "/src/store.js";
  import {
    computeDayDifference,
    getDateInDDMMYYYY,
    getDateInMMDD,
  } from "/src/helpers.js";
  import { getFirestoreCollection } from "/src/crud.js";
  import { DateTime } from "luxon";
  export let ISODate;
  export let intForTriggeringRerender;
  export let isShowingDockingArea;

  let doodleIcons = null;

  const dispatch = createEventDispatcher();
  let isDirectlyCreatingTask = false;

  onMount(async () => {
    const temp = await getFirestoreCollection("/doodleIcons");
    doodleIcons = temp;
  });

  function dragover_handler(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  }

  function drop_handler(e, ISODate) {
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return; // it means we're adjusting the duration but it triggers a drop event, and a dragend event must be followed by a drop event

    e.preventDefault();
    e.stopPropagation();

    dispatch("task-scheduled", {
      id,
      timeOfDay: "",
      dateScheduled: DateTime.fromISO(ISODate).toFormat("LL/dd"),
    });

    whatIsBeingDraggedFullObj.set(null);
    whatIsBeingDraggedID.set("");
    whatIsBeingDragged.set("");
  }

  function getScheduledTasks(ISODate) {
    return $tasksScheduledOn[ISODate] || []; // `tasksScheduledOn` will only use
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

  function isFuture(dateClassObj) {
    return 0 < computeDayDifference(new Date(), dateClassObj); // dayDiff := d2 - d1
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="day-header sticky-day-of-week-abbreviation"
  on:click|self={() => (isDirectlyCreatingTask = true)}
  on:dragover={(e) => dragover_handler(e)}
  on:drop={(e) => drop_handler(e, ISODate)}
>
  <div class="unselectable">
    <div
      class="center-flex day-name-label"
      class:active-day-name={DateTime.now().toISODate < ISODate}
    >
      {DateTime.fromISO(ISODate).toFormat("ccc")}
    </div>

    <div class="center-flex" style="font-size: 16px; font-weight: 300">
      <div
        class="center-flex"
        style="padding: 8px; width: 48px; height: 36px;"
        class:active-date-number={DateTime.now().toISODate < ISODate}
        class:highlighted-circle={DateTime.now().toISODate == ISODate}
      >
        {DateTime.fromISO(ISODate).toFormat("MM dd")}
      </div>
    </div>
  </div>

  {#if isShowingDockingArea}
    <div style="overflow: hidden; margin-top: 4px;">
      {#key intForTriggeringRerender}
        {#if doodleIcons}
          <div style="display: flex; flex-wrap: wrap;">
            {#each getScheduledTasks(ISODate).filter((task) => !task.startTime && task.iconDataURL) as iconTask}
              <FunctionalDoodleIcon
                {iconTask}
                on:task-click
                on:task-checkbox-change
              />
            {/each}
          </div>
        {/if}

        {#each getScheduledTasks(ISODate).filter((task) => !task.startTime && !task.iconDataURL) as flexibleDayTask}
          <div
            on:click={() => dispatch("task-click", { task: flexibleDayTask })}
            style="width: var(--calendar-day-section-width); font-size: 12px; display: flex; gap: 4px; margin-top: 8px; margin-left: 4px; margin-right: 4px;"
          >
            <ReusableFlexibleDayTask
              task={flexibleDayTask}
              on:task-click
              on:task-update
              on:task-checkbox-change
            />
          </div>
        {/each}
      {/key}
    </div>
  {/if}
  <!-- END OF DOCKING AREA -->

  {#if isDirectlyCreatingTask}
    <div
      id="calendar-direct-task-div"
      style="
        width: 90%; 
        padding-left: 0px; 
        padding-right: 0px;
      "
    >
      <ReusableCreateTaskDirectly
        newTaskStartTime={""}
        resultantDateClassObject={dateClassObj}
        on:new-root-task
        on:reset={() => (isDirectlyCreatingTask = false)}
      />
    </div>
  {/if}
</div>

<style>
  .day-header {
    width: var(--calendar-day-section-width);
    padding-top: var(--main-content-top-margin);
    padding-bottom: 18px;
  }

  .sticky-day-of-week-abbreviation {
    font-size: 1.4em;
    background-color: var(--calendar-bg-color);
    color: #6d6d6d;

    position: sticky;

    /* FIGURE THIS OUT TOMORROW */
    top: 0px;
    z-index: 1;
  }

  .day-name-label {
    font-size: 16px;
    margin-bottom: 0px;
    font-weight: 500;
  }

  .active-day-name {
    font-weight: 600;
    color: black;
  }

  .active-date-number {
    font-weight: 400;
    color: black;
  }

  .highlighted-circle {
    border-radius: 25px;
  }

  .center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
