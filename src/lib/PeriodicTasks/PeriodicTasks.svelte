<script>
  import TemplateColumn from './TemplateColumn.svelte'
  import { onMount } from 'svelte'
  import { user, periodicTasks } from '/src/store.js'
  import PeriodicTasks from '/src/back-end/PeriodicTasks'

  $: weeklyTasks = $periodicTasks
    .filter((task) => PeriodicTasks.getPeriodFromCrontab(task.crontab) === 'weekly')
    .sort((a, b) => a.orderValue - b.orderValue)

  $: monthlyTasks = $periodicTasks
    .filter((task) => PeriodicTasks.getPeriodFromCrontab(task.crontab) === 'monthly')
    .sort((a, b) => a.orderValue - b.orderValue)

  $: yearlyTasks = $periodicTasks
    .filter((task) => PeriodicTasks.getPeriodFromCrontab(task.crontab) === 'yearly')
    .sort((a, b) => a.orderValue - b.orderValue)

  $: quickTasks = $periodicTasks
    .filter((task) => PeriodicTasks.getPeriodFromCrontab(task.crontab) === 'quick')
    .sort((a, b) => a.orderValue - b.orderValue)


  onMount(async () => {
    $periodicTasks = await PeriodicTasks.getAll($user.uid)
  })

</script>

<div style="padding: 48px;">
  <div style="font-size: 32px; margin-bottom: 48px;">Templates</div>
  {#if periodicTasks}
    <div style="display: flex; width: 90vw; justify-content: space-between;">
      <TemplateColumn templates={quickTasks} crontab=""  />
      <TemplateColumn templates={weeklyTasks} crontab="0 0 * * 0" />
      <TemplateColumn templates={monthlyTasks} crontab="0 0 0 * *" />
      <TemplateColumn templates={yearlyTasks} crontab="0 0 0 0 *" />
    </div>
  {/if}
</div>

<style src="./PeriodicTasks.css" lang="postcss">
</style>
