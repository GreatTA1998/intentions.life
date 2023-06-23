
<div>
  <WeekViewCalendarThisWeekView
    on:task-click
    on:task-duration-adjusted
    on:task-scheduled
    scheduledTasksThisWeek={thisWeekScheduledTasks}
    {pixelsPerDay}
  />
</div>

<WeekViewNotYetScheduledTasks
  on:task-click
  on:task-duration-adjusted
  on:task-dragged
  {allTasks}
  {pixelsPerDay}
/>

<div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
  Upcoming this month
</div>

<!-- For prototypes, it's better for code to be easy to understand and inefficient, than the other way around -->

<script>
  import WeekViewNotYetScheduledTasks from './WeekViewNotYetScheduledTasks.svelte'
  import WeekViewCalendarThisWeekView from './WeekViewCalendarThisWeekView.svelte'

  export let allTasks
  export let thisWeekScheduledTasks

  let pixelsPerDay = 200
</script>