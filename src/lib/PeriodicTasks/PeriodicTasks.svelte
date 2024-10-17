<script>
  import Weekly from './Weekly/Weekly.svelte'
  import { onMount, onDestroy } from 'svelte'
  import { user, weeklyTasks, monthlyTasks, yearlyTasks } from '/src/store.js'
  import PeriodicTasks from '/src/back-end/PeriodicTasks.js'

  let shouldUnsub = false
  let periodicTasks = []

  let getStatsFromTaskID = {}
  let maxHourDuration = 0
  let weeklyTaskWidthInPx = 180


  onMount(async () => {
    periodicTasks = await PeriodicTasks.get($user.uid)
    console.log('periodicTasks', periodicTasks)
    const filterAndSort = (tasks, period) =>
      tasks
        .filter((task) => PeriodicTasks.getPeriod(task) === period)
        .sort((a, b) => a.orderValue - b.orderValue)
    $weeklyTasks = filterAndSort(periodicTasks, 'weekly')
    console.log('$weeklyTasks', $weeklyTasks)
    $monthlyTasks = filterAndSort(periodicTasks, 'monthly')
    $yearlyTasks = filterAndSort(periodicTasks, 'yearly')
  })

  onDestroy(() => shouldUnsub && unsub())

  function getDisplayLength(weeklyTask) {
    // imperfect code, quick-fix was to divide by 3
    const maxTimeBarWidth = window.innerWidth / 3 - weeklyTaskWidthInPx
    const pixelsPerHour = maxTimeBarWidth / maxHourDuration

    const accurateLength =
      (getStatsFromTaskID[weeklyTask.id].hourDuration /
        getStatsFromTaskID[weeklyTask.id].frequency) *
      pixelsPerHour
    return accurateLength
  }

</script>

<div style="padding: 48px;">
  <div style="font-size: 32px; margin-bottom: 48px;">Reusable Tasks</div>

  {#if periodicTasks}
    <div style="display: flex;">
      <Weekly />
    </div>
  {/if}
</div>

<style src="./PeriodicTasks.css" lang="postcss">
</style>
