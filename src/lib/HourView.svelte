<div>
  <ReusableCalendarView
    pixelsPerHour={pixelsPerMinute * 60}
    timeBlockDurationInMinutes={5}
    subdivisionsPerBlock={5}
    {calendarBeginningDateClassObject}
    {timestamps}
    scheduledTasks={scheduledTasksToday}
    on:task-duration-adjusted
    on:task-click
    on:task-scheduled
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
  import HourViewUnscheduledTasks from './HourViewUnscheduledTasks.svelte'
  import ReusableCalendarView from './ReusableCalendarView.svelte';
  import { convertDDMMYYYYToDateClassObject, getDateInDDMMYYYY, twoDigits } from '/src/helpers.js'

  export let allTasks
  export let scheduledTasksToday
  
  let pixelsPerMinute = 20
  let timestamps = []

  function generateCalendarTimestamps () {
    const d = new Date()
    for (let i = 0; i <= 55; i += 5) {
      const timestamp = twoDigits(d.getHours()) + ':' + twoDigits(i)
      timestamps = [...timestamps, timestamp]
    }
  }
  generateCalendarTimestamps()

  function getCalendarBeginningDateClassObject () {
    const d = new Date()
    // DANGER, d.getHours() does not always return 2 digits 
    return convertDDMMYYYYToDateClassObject(
      getDateInDDMMYYYY(new Date()), // ddmmyyyy
      `${d.getHours()}:00` // hhmm
    )
  }

  let calendarBeginningDateClassObject = getCalendarBeginningDateClassObject()

</script>