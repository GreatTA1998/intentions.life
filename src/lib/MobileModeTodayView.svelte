<div style="padding: 0px; overflow-y: auto;">
  {#each todayScheduledTasks as eventToday, i}
    {#if i === idxOfTimeIndicator}
      <div style="
        border: 4px solid var(--location-indicator-color); 
        border-radius: 0px;
        width: 100%; 
        margin-top: 8px; 
        margin-bottom: 8px;"
      >

      </div>
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

<script>
  import { getDateInMMDD, getTimeInHHMM, pureNumericalHourForm } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'

  export let allTasks 

  let idxOfTimeIndicator = 0
  let todayScheduledTasks = []
  const dispatch = createEventDispatcher()

  $: if (allTasks.length > 0) {
    collectTodayScheduledTasksToArray()
  }
  
  function collectTodayScheduledTasksToArray () {
    todayScheduledTasks = [] // reset 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => { 
        const todayMMDD = getDateInMMDD(new Date())
        return task.startDate === todayMMDD && task.startTime
      }, 
      applyFunc: (task) => todayScheduledTasks = [...todayScheduledTasks, task]
    })

    todayScheduledTasks.sort((task1, task2) => {
      return pureNumericalHourForm(task1.startTime) - pureNumericalHourForm(task2.startTime)
    })

    // bonus: display current time (brown line)
    for (let i = 0; i < todayScheduledTasks.length; i++) {
      if (!hasAlreadyHappened(todayScheduledTasks[i])) {
        idxOfTimeIndicator = i
        return
      }
    }
  }

  
  function traverseAndUpdateTree ({ fulfilsCriteria, applyFunc }) {
    const artificialRootNode = {
      name: 'root',
      children: allTasks
    }
    helperFunction({ node: artificialRootNode, fulfilsCriteria, applyFunc })
  }

  // useful helper function for task update operations
  function helperFunction ({ node, fulfilsCriteria, applyFunc }) {
    if (fulfilsCriteria(node)) {
      applyFunc(node)
    } 
    for (const child of node.children) {
      helperFunction({ node: child, fulfilsCriteria, applyFunc })
    }
  }

  function hasAlreadyHappened (eventTask) {
    return eventTask.isDone
    // const nowHHMM = getTimeInHHMM({ dateClassObj: new Date() })
    // return pureNumericalHourForm(nowHHMM) > pureNumericalHourForm(eventTask.startTime)
  }

  function isNightTime (eventTask) {
    const sevenPM = new Date()
    sevenPM.setHours(19) // 7 pm
    const nightHHMM = getTimeInHHMM({ dateClassObj: sevenPM })
    return pureNumericalHourForm(eventTask.startTime) > pureNumericalHourForm(nightHHMM) 
  }
</script>

<style>
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