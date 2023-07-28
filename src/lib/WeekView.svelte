
<div>
  <ReusableCalendarView
    pixelsPerHour={pixelsPerDay / 24}
    timeBlockDurationInMinutes={24 * 60}
    subdivisionsPerBlock={24}
    calendarBeginningDateClassObject={weekCalendarBeginningDateClassObject}
    timestamps={daysOfWeek}
    scheduledTasks={thisWeekScheduledTasks}
    on:task-duration-adjusted
    on:task-click
    on:task-scheduled
  />
</div>

<ReusableUnscheduledTodoList
  {allTasks}
  pixelsPerHour={pixelsPerDay / 24}
  title={"This week's to-do"}
  taskCriteria={criteriaForThisWeek}
  dropzoneInfo={{
    deadlineDate: getNextWeekDDMMYYYY()
  }}
  on:task-click
  on:task-duration-adjusted
  on:task-dragged
/>

<!-- <div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming this month
</div> -->

<!-- For prototypes, it's better for code to be easy to understand and inefficient, than the other way around -->

<script>
  import ReusableUnscheduledTodoList from '$lib/ReusableUnscheduledTodoList.svelte';
  import ReusableCalendarView from '$lib/ReusableCalendarView.svelte'
  import { computeDayDifference, convertDDMMYYYYToDateClassObject, getDateInDDMMYYYY } from '/src/helpers.js'

  export let allTasks
  export let thisWeekScheduledTasks

  

  function criteriaForThisWeek (task) {
    if (!task.deadlineDate) return false
    if (task.startTime) return false
    const dayDiff = computeDayDifference(
      getBeginningOfToday(),
      convertDDMMYYYYToDateClassObject(task.deadlineDate, task.deadlineTime) // DDMMYYYY is the `deadlineDate` format
    )
    return dayDiff >= 0 && dayDiff <= 7
  }

  function getNextWeekDDMMYYYY () {
    const d = new Date()
    const nextWeek = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000)
    const ddmmyyyy = getDateInDDMMYYYY(nextWeek)
    return ddmmyyyy
  }

  let pixelsPerDay = 200

  let daysOfWeek = null

  const baseDate = new Date()
  baseDate.setDate(baseDate.getDate() + 1)

  let weekCalendarBeginningDateClassObject = getBeginningOfToday()

  function getBeginningOfToday () {
    const d = new Date()
    d.setHours(0)
    return d
  }

  function generateDaysOfWeek () {
    let d = new Date() // display 7 days ahead
    const output = [] 
    for (let i = 0; i < 7; i++) {
      const dayName = d.toLocaleDateString('en', { weekday: 'long'})
      output.push(dayName)
      d.setDate(d.getDate() + 1)
    }
    daysOfWeek = [...output]
  }

  generateDaysOfWeek()
</script>