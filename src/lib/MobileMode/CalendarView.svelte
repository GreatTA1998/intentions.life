{#each mobileCalDaysToRender as dateToRender}
  {#if $tasksScheduledOn && $tasksScheduledOn[dateToRender]}
    <CalendarViewDay 
      {dateToRender} 
      {doodleIcons}
      on:task-click  
    />

    <div style="margin-bottom: 60px;"></div>
  {/if}
{/each}


<script>
  import { onMount } from 'svelte'
  import { tasksScheduledOn, user } from '/src/store.js'
  import { getFirestoreCollection } from '/src/helpers/firestoreHelpers.js'
  import { DateTime } from 'luxon'
  import { buildDates } from '/src/helpers/dataStructures.js'
  import CalendarViewDay from '$lib/MobileMode/CalendarViewDay.svelte'

  let mobileCalDaysToRender = []
  let doodleIcons

  onMount(async () => {
    decideMobileCalDaysToRender()

    const temp = await getFirestoreCollection('/doodleIcons')
    doodleIcons = temp
  })

  function decideMobileCalDaysToRender () {
    const today = DateTime.now()
    mobileCalDaysToRender = buildDates({
      start: today.minus({ days: 7 }), 
      totalDays: 7 * 2 + 1
    })
  }
</script>