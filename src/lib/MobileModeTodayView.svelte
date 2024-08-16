{#key intForTriggeringRerender}
  <div style="padding: 0px; overflow-y: auto;">
    {#if doodleIcons}
      <div style="display: flex; flex-wrap: wrap;">
        {#each flexibleIconTasks as iconTask}
          <FunctionalDoodleIcon
            {iconTask}
            on:task-click
            on:task-checkbox-change
          />
        {/each}
      </div>
    {/if}

    {#each flexibleNormalTasks as flexibleDayTask}
      <div on:click={() => dispatch('task-click', { task: flexibleDayTask })} 
        style="width: var(--calendar-day-section-width); font-size: 12px; display: flex; gap: 4px; margin-bottom: 4px; margin-left: 4px; margin-right: 4px;"
      >
        <ReusableFlexibleDayTask task={flexibleDayTask}
          on:task-click
          on:task-update
          on:task-checkbox-change
        />
      </div>
    {/each}

    {#each scheduledEvents as eventToday, i}
      {#if i === idxOfTimeIndicator}
        <div class="current-time-indicator"></div>
      {/if}

      {#if eventToday.iconDataURL}
        <div on:click={() => dispatch('task-click', { task: eventToday })}
          class="today-event"
          class:half-visible={!hasAlreadyHappened(eventToday)} 
          class:night-time={isNightTime(eventToday)}
          style="display: flex; align-items: center; margin-bottom: 0px;"
        >
          <div class="event-scheduled-time">
            {eventToday.startTime} 
          </div>

          <img src={eventToday.iconDataURL} style="width: 48px; height: 48px;">
        </div>
      {:else}
        <div on:click={() => dispatch('task-click', { task: eventToday })}
          class="today-event"
          class:half-visible={!hasAlreadyHappened(eventToday)} 
          class:night-time={isNightTime(eventToday)}
          style="
            margin-bottom: 0px;
            background-image: {eventToday.imageDownloadURL ? `url(${eventToday.imageDownloadURL})` : ''};
            background-size: contain;
            background-repeat: no-repeat;
          "
        >
          {#if !eventToday.imageDownloadURL}
            <div class="event-scheduled-time">
              {eventToday.startTime} 
            </div>
            <div style="font-size: 32px; display: flex; align-items: center; flex-wrap: no-wrap;">
              {eventToday.name}
            </div>
          {:else}
            <div style="width: 100%; height: 240px;"></div>
          {/if}
        </div>
      {/if}
    {/each}      
  </div>
{/key}


<script>
  import { getTimeInHHMM, pureNumericalHourForm } from '/src/helpers/everythingElse.js'
  import { createEventDispatcher, onMount } from 'svelte'
  import { tasksScheduledOn } from '/src/store.js'
  import { getFirestoreCollection } from '/src/crud.js'
  import ReusableFlexibleDayTask from '$lib/ReusableFlexibleDayTask.svelte'
  import FunctionalDoodleIcon from '$lib/FunctionalDoodleIcon.svelte'

  let idxOfTimeIndicator = 0
  let todayTasks = []
  let flexibleIconTasks = []
  let flexibleNormalTasks = []
  let scheduledEvents = []
  let doodleIcons
  let intForTriggeringRerender = 0
  const dispatch = createEventDispatcher()

  onMount(async () => {
    const temp = await getFirestoreCollection('/doodleIcons')
    doodleIcons = temp
  })

  $: if ($tasksScheduledOn) {
    intForTriggeringRerender += 1
    computeDataStructures()
    computeIndicatorPosition()
  }

  function computeDataStructures () {
    todayTasks = getScheduledTasks()
    flexibleIconTasks = todayTasks.filter(task => !task.startTime && task.iconDataURL)
    flexibleNormalTasks = todayTasks.filter(task => !task.startTime && !task.iconDataURL)
    scheduledEvents = todayTasks.filter(t => t.startTime).sort((task1, task2) => {
      return pureNumericalHourForm(task1.startTime) - pureNumericalHourForm(task2.startTime)
    })
  }

  function getScheduledTasks () {
    const simpleISO = getSimpleISOFromDateClassObj(new Date())
    return $tasksScheduledOn[simpleISO] || [] // `tasksScheduledOn` will only use
  }

  function computeIndicatorPosition () {
    // bonus: display current time (brown line)
    for (let i = 0; i < scheduledEvents.length; i++) {
      if (!hasTimeAlreadyPassed(scheduledEvents[i])) {
        idxOfTimeIndicator = i
        return
      }
    }
  }

  // dd-mm-yyyy format
  function getSimpleISOFromDateClassObj (d) {
    let dd = d.getDate()
    let mm = d.getMonth() + 1
    let yyyy = d.getFullYear()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    return dd + '-' + mm + '-' + yyyy;
  }

  function hasTimeAlreadyPassed (eventTask) {
    const nowHHMM = getTimeInHHMM({ dateClassObj: new Date() })
    return pureNumericalHourForm(nowHHMM) > pureNumericalHourForm(eventTask.startTime)
  }

  function hasAlreadyHappened (eventTask) {
    return eventTask.isDone
  }

  function isNightTime (eventTask) {
    const sevenPM = new Date()
    sevenPM.setHours(19) // 7 pm
    const nightHHMM = getTimeInHHMM({ dateClassObj: sevenPM })
    return pureNumericalHourForm(eventTask.startTime) > pureNumericalHourForm(nightHHMM) 
  }
</script>

<style>
  .current-time-indicator {
    border: 4px solid var(--location-indicator-color); 
    border-radius: 0px;
    width: 100%; 
    margin-top: 8px; 
    margin-bottom: 8px;
  }

  .today-event {
    padding: 8px;
    border: 1px solid grey;
  }

  .night-time {
    background-color: rgb(40, 40, 40);
    color: white;
  }

  .event-scheduled-time {
    font-size: 32px; 
    font-weight: 600;
  }

  .half-visible {
    opacity: 0.5;
  }
</style>