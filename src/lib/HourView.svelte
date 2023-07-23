<div>
  <ReusableCalendarView
    pixelsPerHour={pixelsPerMinute * 60}
    timeBlockDurationInMinutes={5}
    {calendarBeginningDateClassObject}
  />
</div>

<HourViewUnscheduledTasks
  on:task-click
  on:task-duration-adjusted
  on:task-dragged
  {allTasks}
  pixelsPerDay={pixelsPerMinute}
/>

<div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming today
</div>

<script>
  import HourViewCalendarThisHourView from './HourViewCalendarThisHourView.svelte'
  import HourViewUnscheduledTasks from './HourViewUnscheduledTasks.svelte'

  import ReusableCalendarView from './ReusableCalendarView.svelte';
  import { convertDDMMYYYYToDateClassObject, getDateInDDMMYYYY } from '/src/helpers.js'

  export let allTasks
  const minutesPerTimeBlock = 5
  // this will be renamed, it's actually for every FIVE minutes
  let pixelsPerMinute = 20


  function getCalendarBeginningDateClassObject () {
    const d = new Date()
    return convertDDMMYYYYToDateClassObject(
      getDateInDDMMYYYY(new Date()), // ddmmyyyy
      `${d.getHours()}:00` // hhmm
    )
  }

  let calendarBeginningDateClassObject = getCalendarBeginningDateClassObject()

</script>