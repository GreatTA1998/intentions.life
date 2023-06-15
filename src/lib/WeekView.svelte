
<div>
  <WeekViewCalendarThisWeekView
    on:task-click
    on:task-duration-adjusted
    on:task-scheduled
    scheduledTasksThisWeek={thisWeekScheduledTasks}
  />
</div>

<div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  This week's tasks
</div>

<div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming this month
</div>

<!-- For prototypes, it's better for code to be easy to understand and inefficient, than the other way around -->

<script>
  import WeekViewCalendarThisWeekView from './WeekViewCalendarThisWeekView.svelte'

  export let thisWeekScheduledTasks

</script>