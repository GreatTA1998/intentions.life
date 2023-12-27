<!-- Do not remove 100%, flex boxes will stretch according to children elements 
  unless you specify that you want it to be 100% of its containing block.
-->
<div style="display: flex; height: 100%;">
  <div>
    <div style="display: flex; width: 13vw;">  
      <ReusableUnscheduledTodoList
        {allTasks}
        pixelsPerHour={MIKA_PIXELS_PER_HOUR}
        title={"Today's to-do"}
        taskCriteria={(task) => task.deadlineDate === getDateInDDMMYYYY(new Date()) && !task.startTime}
        dropzoneInfo={{
          deadlineDate: getDateInDDMMYYYY(new Date()),
          deadlineTime: '23:59'
        }}
        on:task-click
        on:task-duration-adjusted
        on:task-dragged
      />

      <div style="width: 2vw"></div>

      <!-- <FutureOverview
        {futureScheduledTasks}
        on:task-duration-adjusted
        on:task-click
      /> -->
    </div>
  </div>

  <div style="margin-left: 48px;"></div>

  <div style="overflow-y: auto; height: 100%;">
    <ReusableCalendarView
      pixelsPerHour={MIKA_PIXELS_PER_HOUR}
      timeBlockDurationInMinutes={60}
      subdivisionsPerBlock={60}
      calendarBeginningDateClassObject={dayCalendarBeginningDateClassObject}
      timestamps={timesOfDay}
      scheduledTasks={scheduledTasksToday}
      on:task-duration-adjusted
      on:task-click
      on:task-scheduled
      on:task-checkbox-change
    />
  </div>
</div>

<script>
  import ReusableCalendarView from './ReusableCalendarView.svelte';
  import ReusableUnscheduledTodoList from '$lib/ReusableUnscheduledTodoList.svelte';
  import FutureOverview from '$lib/FutureOverview.svelte'

  import { 
    MIKA_PIXELS_PER_HOUR, 
    PIXELS_PER_HOUR, 
    getNicelyFormattedDate, 
    computeDayDifference, 
    convertDDMMYYYYToDateClassObject, 
    getDateInDDMMYYYY 
  } 
    from '/src/helpers.js'

  export let allTasks
  export let scheduledTasksToday
  export let futureScheduledTasks

  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 17

  function getDayCalendarBeginningDateClassObject () {
    const d = new Date()
    return convertDDMMYYYYToDateClassObject(
      getDateInDDMMYYYY(new Date()), // ddmmyyyy
      `07:00` // hhmm
    )
  }

  let dayCalendarBeginningDateClassObject = getDayCalendarBeginningDateClassObject ()

  let currentHour = 7 // today.getHours() // get the integer i.e. 0 to 23
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
</script>
