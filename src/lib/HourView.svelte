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
    on:task-checkbox-change
  />
</div>

<ReusableUnscheduledTodoList
  {allTasks}
  pixelsPerHour={pixelsPerMinute * 60}
  title={"This hour's to-do"}
  taskCriteria={criteriaForThisHour}
  dropzoneInfo={{
    deadlineDate: getDateInDDMMYYYY(new Date()),
    deadlineTime: getNextHourHHMM()
  }}
  on:task-click
  on:task-duration-adjusted
  on:task-dragged
/>

<!-- <div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming today
</div> -->

<script>
  import ReusableUnscheduledTodoList from './ReusableUnscheduledTodoList.svelte'
  import ReusableCalendarView from './ReusableCalendarView.svelte';
  import { convertDDMMYYYYToDateClassObject, getDateInDDMMYYYY, twoDigits } from '/src/helpers.js'

  export let allTasks
  export let scheduledTasksToday
  
  let pixelsPerMinute = 20
  let timestamps = []

  function getNextHourHHMM () {
    const d = new Date()
    return twoDigits(1 + d.getHours()) + ':' + '00'
  }

  function criteriaForThisHour (task) {
    if (!task.deadlineDate) return false
    if (task.startTime) return false

    const d1 = new Date()

    const ddmmyyyy = task.deadlineDate
    const hhmm = task.deadlineTime
    const d2 = convertDDMMYYYYToDateClassObject(ddmmyyyy, hhmm)
 
    const millisecsDiff = d2.getTime() - d1.getTime()
    const minutesDiff = millisecsDiff / (1000 * 60)
 
    return minutesDiff > 0 && minutesDiff <= 60
  }

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