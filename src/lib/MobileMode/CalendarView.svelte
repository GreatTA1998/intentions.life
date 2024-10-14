{#each mobileCalDaysToRender as dateToRender}
  {#if $tasksScheduledOn && $tasksScheduledOn[dateToRender]}
    <CalendarViewDay {dateToRender} {doodleIcons}
      on:task-click  
    />

    <div style="margin-bottom: 80px;"></div>
  {/if}
{/each}


<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { tasksScheduledOn, user } from '/src/store.js'
  import { getFirestoreCollection } from '/src/helpers/crud.js'
  import Tasks from '/src/back-end/Tasks.js'
  import { DateTime } from 'luxon'
  import { buildCalendarDataStructures } from '/src/helpers/maintainState.js'
  import { buildDates } from '/src/helpers/dataStructures.js'
  import CalendarViewDay from '$lib/MobileMode/CalendarViewDay.svelte'

  let mobileCalDaysToRender = []
  let doodleIcons

  onMount(async () => {
    const temp = await getFirestoreCollection('/doodleIcons')
    doodleIcons = temp

    fetchMobileCalTasks()

    decideMobileCalDaysToRender()
  })

  function fetchMobileCalTasks () {
    const today = DateTime.now()
    Tasks.getByDateRange(
      $user.uid, 
      today.minus({ days: 7 }).toFormat('yyyy-MM-dd'), 
      today.plus({ days: 7 }).toFormat('yyyy-MM-dd')
    )
      .then(scheduledTasks => buildCalendarDataStructures({ flatArray: scheduledTasks }))
  }

  function decideMobileCalDaysToRender () {
    const today = DateTime.now()
    mobileCalDaysToRender = buildDates({
      start: today.minus({ days: 7 }), 
      totalDays: 7 * 2 + 1
    })
  }
</script>