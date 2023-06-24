<div>
  <MonthViewCalendarThisMonthView
    {pixelsPerWeek}
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
  import MonthViewCalendarThisMonthView from './MonthViewCalendarThisMonthView.svelte'
  import MonthViewUnscheduledTasks from './MonthViewUnscheduledTasks.svelte'

  export let allTasks

  let pixelsPerWeek = 160
</script>