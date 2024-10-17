<script>
  import Weekly from './Weekly/Weekly.svelte'
  import { onMount, onDestroy } from 'svelte'
  import { user, periodicTasks } from '/src/store.js'
  import PeriodicTasks from '/src/back-end/PeriodicTasks.js'

  let shouldUnsub = false

  let getStatsFromTaskID = {}
  let maxHourDuration = 0
  let weeklyTaskWidthInPx = 180


  onMount(async () => {
    $periodicTasks = await PeriodicTasks.get($user.uid)

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
