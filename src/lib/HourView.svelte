<div>
  <HourViewCalendarThisHourView
    {pixelsPerMinute}
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

  export let allTasks

  // this will be renamed, it's actually for every FIVE minutes
  let pixelsPerMinute = 100
</script>