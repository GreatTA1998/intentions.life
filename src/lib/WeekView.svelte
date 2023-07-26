
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
  import ReusableCalendarView from '$lib/ReusableCalendarView.svelte'

  export let allTasks
  export let thisWeekScheduledTasks

  let pixelsPerDay = 200

  let daysOfWeek = null

  const baseDate = new Date()
  baseDate.setDate(baseDate.getDate() + 1)

  let weekCalendarBeginningDateClassObject = new Date()

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