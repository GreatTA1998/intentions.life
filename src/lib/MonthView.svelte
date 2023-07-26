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

<MonthViewUnscheduledTasks
  on:task-click
  on:task-duration-adjusted
  on:task-dragged
  {allTasks}
  pixelsPerDay={pixelsPerWeek}
/>

<div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming this year
</div>

<script>
  import ReusableCalendarView from './ReusableCalendarView.svelte'
  import MonthViewUnscheduledTasks from './MonthViewUnscheduledTasks.svelte'

  export let allTasks
  export let thisMonthScheduledTasks

  let pixelsPerWeek = 280
</script>