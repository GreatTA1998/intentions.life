<div>
  <ReusableCalendarView
    pixelsPerHour={pixelsPerWeek / (7 * 24)}
    timeBlockDurationInMinutes={24 * 60 * 7}
    subdivisionsPerBlock={7}
    calendarBeginningDateClassObject={new Date()}
    timestamps={['W1/4', 'W2/4', 'W3/4', 'W4/4']}
    scheduledTasks={thisMonthScheduledTasks}
    on:task-duration-adjusted
    on:task-click
    on:task-scheduled
  />
</div>

<ReusableUnscheduledTodoList
  {allTasks}
  pixelsPerHour={pixelsPerWeek / (7 * 24)}
  title={"This month's to-do"}
  taskCriteria={criteriaForThisMonth}
  dropzoneInfo={{
    deadlineDate: getNextMonthDateClassObject()
  }}
  on:task-click
  on:task-duration-adjusted
  on:task-dragged
/>

<!-- <div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming this year
</div> -->

<script>
  import ReusableCalendarView from './ReusableCalendarView.svelte'
  import ReusableUnscheduledTodoList from '$lib/ReusableUnscheduledTodoList.svelte'
  import { computeDayDifference, convertDDMMYYYYToDateClassObject, getDateInDDMMYYYY } from '/src/helpers.js'

  export let allTasks
  export let thisMonthScheduledTasks

  let pixelsPerWeek = 280

  function criteriaForThisMonth (task) {
    if (!task.deadlineDate) return false
    if (task.startTime) return false
    const dayDiff = computeDayDifference(
      new Date(),
      convertDDMMYYYYToDateClassObject(task.deadlineDate, task.deadlineTime) // DDMMYYYY is the `deadlineDate` format
    )
    return dayDiff >= 0 && dayDiff <= 30
  }

  function getNextMonthDateClassObject () {
    const d = new Date()
    const nextWeek = new Date(d.getTime() + 30 * 24 * 60 * 60 * 1000)
    const ddmmyyyy = getDateInDDMMYYYY(nextWeek)
    return ddmmyyyy
  }
</script>