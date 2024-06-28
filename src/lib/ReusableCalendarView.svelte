<!-- https://github.com/sveltejs/svelte/issues/6016 -->
<div 
  bind:this={OverallContainer}
  bind:clientHeight={overallContainerHeight}
  class="scroll-container"
  style="
    position: relative;
    width: var(--calendar-day-section-width);
    background-color: var(--calendar-bg-color);
    flex-grow: 1;
  "
>
  <!-- NOTE: this is a tall rectangular container that only encompasses the timestamps -->
  <div 
    class="calendar-day-container" 
    style="height: {timestamps.length * timeBlockDurationInMinutes * pixelsPerMinute}px; 
      margin-bottom: 1px; 
      color: #6D6D6D;
    "
    on:drop={(e) => drop_handler(e)}
    on:dragover={(e) => dragover_handler(e)}
    on:click|self={(e) => {
      isDirectlyCreatingTask = true
      yPosition = copyGetTrueY(e)
    }}
  >
    {#each sortedScheduledTasks as task, i}
      <div
        style="
          position: absolute; 
          top: {computeOffsetGeneral({ 
            d1: calendarBeginningDateClassObject, 
            d2: convertDDMMYYYYToDateClassObject(
              task.startDate.split('/')[1] + '/' + task.startDate.split('/')[0] + '/' + (task.startYYYY ? task.startYYYY : new Date().getFullYear()), // notice we flip mm/dd format into dd/mm/yyyy
              task.startTime   // hhmm
            ),
            pixelsPerMinute
          })}px;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          width: 94%;
        "
      >
        {#if task.iconDataURL}
          <!-- TO-DO: think about how attaching photos to icon tasks work -->
          <ReusableIconTaskElement
            {task}
            pixelsPerHour={pixelsPerMinute * 60}
            fontSize={0.8}
            hasCheckbox={false}
            on:task-click
            on:task-update
            on:task-checkbox-change
          />          
        {:else if task.imageDownloadURL}
          <ReusablePhotoTaskElement
            {task}
            pixelsPerHour={pixelsPerMinute * 60}
            fontSize={0.8}
            hasCheckbox
            on:task-click
            on:task-update
            on:task-checkbox-change
          /> 
        {:else}
          <ReusableTaskElement
            {task}
            pixelsPerHour={pixelsPerMinute * 60}
            fontSize={0.8}
            hasCheckbox
            on:task-click
            on:task-update
            on:task-checkbox-change
          /> 
        {/if}
      </div>
    {/each}
      

    {#if isDirectlyCreatingTask}
      <div 
        id="calendar-direct-task-div"  
        style="
          top: {yPosition - formFieldTopPadding}px;
          position: absolute;
          width: 98%; 
          padding-left: 0px; 
          padding-right: 0px;
        "
      >
        <ReusableCreateTaskDirectly
          newTaskStartTime={getHHMM(resultantDateClassObject)}
          {resultantDateClassObject}
          on:new-root-task
          on:reset={() => isDirectlyCreatingTask = false}
        />
      </div> 
    {/if}

    <!-- https://svelte.dev/tutorial/update
      "Scrolling is hard to achieve with purely a state-driven way"
    -->

    <!-- A red line that indicates the current time -->
    {#if calendarBeginningDateClassObject.getDate() === new Date().getDate()}
      <div class="current-time-indicator-container" style="
          top: {computeTimeIndicatorOffset()}px;
        "
      > 

      <hr 
        style="border: 2px solid var(--location-indicator-color); border-radius: 5px; width: 100%; margin-top: 0px; margin-bottom: 0px;"
        bind:this={CurrentTimeIndicator}
      > 
        <div style="font-size: 12px; color: var(--location-indicator-color); font-weight: 600;">
          {DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE)}
        </div>
      </div>
    {/if}
  </div>
</div>

<script>
  import { DateTime, Interval } from 'luxon'
  import { getFirestoreCollection } from '/src/crud.js'
  import { 
    computeMillisecsDifference, 
    convertDDMMYYYYToDateClassObject, 
    ensureTwoDigits,
    getTimeInHHMM, 
    getHHMM,
    pureNumericalHourForm
   } from '/src/helpers.js'
  import ReusableTaskElement from '$lib/ReusableTaskElement.svelte'
  import ReusablePhotoTaskElement from '$lib/ReusablePhotoTaskElement.svelte'
  import ReusableIconTaskElement from '$lib/ReusableIconTaskElement.svelte'
  import { onMount, beforeUpdate, afterUpdate, tick, createEventDispatcher, onDestroy } from 'svelte'
  import { user, hasInitialScrolled, yPosWithinBlock } from '/src/store.js'
  import ReusableCreateTaskDirectly from '$lib/ReusableCreateTaskDirectly.svelte'

  export let scheduledTasks = [] 
  export let timestamps = []

  export let pixelsPerHour 
  export let timeBlockDurationInMinutes 
  export let calendarBeginningDateClassObject

  let overallContainerHeight 

  let OverallContainer
  let CurrentTimeIndicator

  const dispatch = createEventDispatcher()
  
  let isDirectlyCreatingTask = false
  let formFieldTopPadding = 40
  let yPosition
  let newTaskName = ''

  let reusableTaskTemplates = null
  let taskTemplateSearchResults = []

  $: pixelsPerMinute = pixelsPerHour / 60
  $: resultantDateClassObject = getResultantDateClassObject(yPosition)

  // Put tasks in ascending order of `startTime`, so newer tasks are above older tasks
  // this is important because when a big task swallows a small task,
  // you need to be able to drag the small task out easily (and the small task is BELOW the big task by definition)
  $: sortedScheduledTasks = scheduledTasks.sort((task1, task2) => {
    return pureNumericalHourForm(task1.startTime) - pureNumericalHourForm(task2.startTime)
  })

  onMount(async () => {
    // scrolling
    if (CurrentTimeIndicator) {
      setTimeout(() => {
        // the calendar is re-rendered on every task drag-and-drop, so we don't want to reset scrolling each time
        if (CurrentTimeIndicator && !$hasInitialScrolled) { 
          CurrentTimeIndicator.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
          hasInitialScrolled.set(true)
        }
      }, 0) 
    }

    // task template dropdown
    const temp = await getFirestoreCollection(`/users/${$user.uid}/periodicTasks`)
    reusableTaskTemplates = temp
  })

  onDestroy(() => {

  })

  function computeTimeIndicatorOffset () {
    const now = DateTime.now()
    const startOfDay = now.startOf('day')
    const i = Interval.fromDateTimes(startOfDay, now)
    const minutesDifference = i.length() / (1000 * 60)
    return minutesDifference * pixelsPerMinute
  } 

  function p (...args) {
    console.log(...args)    
  }

  function copyGetTrueY (e) {
    return e.clientY + OverallContainer.scrollTop - OverallContainer.getBoundingClientRect().top - OverallContainer.style.paddingTop
  }

  // computes the physical offset, within origin based on d1
  function computeOffsetGeneral ({ d1, d2, pixelsPerMinute }) {
    const millisecsDifference = computeMillisecsDifference(d1, d2)
    
    // translate time difference to a physical distance
    const minutesDifference = millisecsDifference / (1000 * 60)
    const offset = minutesDifference * pixelsPerMinute
    return offset
  }

  let highlightedMinute = null 

  function dragover_handler (e) {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "move"
  }

  /**
   * Calculate what the new time is by measuring offset from top of container
   * 
   * We don't just read the hh e.g. "24" from the hour block, 
   * because the drop_handler is defined outside of those hour <divs>
   * 
   * TODO: ensure the drop package is a valid task
   * 
   *     
    // TODO: in practice there is a small discrepancy between where the drop is and where the mouse is 
    // because the user aims with the image corner whereas the code reads the precise mouse pointer location
   */

  // How it works:
  //   1. Do origin + new difference to get the date object
  //   2. use the new date object to generate `startTime` and `startDate`
  function drop_handler (e) {
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return // it means we're adjusting the duration but it triggers a drop event, and a dragend event must be followed by a drop event

    e.preventDefault()
    e.stopPropagation()
    highlightedMinute = null

    // `trueY` is the end position of the mouse
    const finalMousePosY = copyGetTrueY(e)

    // origin
    const calendarStartAsMs = calendarBeginningDateClassObject.getTime()

    // account for dragging the block from really low or from really high up 
    const trueY = finalMousePosY - $yPosWithinBlock
    yPosWithinBlock.set(0)

    // resultant time based on difference difference
    const resultantDateClassObject = getResultantDateClassObject(trueY)
    const d = resultantDateClassObject
    const hhmm = ensureTwoDigits(d.getHours()) + ':' + ensureTwoDigits(d.getMinutes())
    const mmdd = ensureTwoDigits(d.getMonth() + 1) + '/' + ensureTwoDigits(d.getDate())


    dispatch('task-scheduled', {
      id,
      timeOfDay: hhmm,
      dateScheduled: mmdd
    })
  }

  function getResultantDateClassObject (trueY) {
    const calendarStartAsMs = calendarBeginningDateClassObject.getTime()

    const totalHoursDistance = trueY / pixelsPerHour
    const totalMsDistance = totalHoursDistance * 60 * 60 * 1000

    // Add them together: https://stackoverflow.com/a/12795802/7812829
    const resultantTimeInMs = calendarStartAsMs + totalMsDistance
    const resultantDateClassObject = new Date(resultantTimeInMs)
    return resultantDateClassObject
  } 
</script>

<style lang="scss">
  .current-time-indicator-container {
    display: block; 
    align-items: center;
    position: absolute; 
    width: var(--calendar-day-section-width);
    pointer-events: none;
  }

  /* DO NOT REMOVE, BREAKS DRAG-AND-DROP AND DURATION ADJUSTMENT */
  .scroll-container {
    height: fit-content;
    overflow-y: hidden;
    overflow-x: hidden; 
  }

  .highlighted-background {
    background: rgb(82, 180, 251);
  }

  .calendar-day-container {
    width: 100%;
  }

  .green-text {
    color: #0085FF;
  }

  /* VERDICT: absolute works
  "Independence" is the best word you can ever hear in programming */
  .timestamp-number {
    position: absolute;
    left: 5px;
    font-size: 0.7rem;
  }

  .visible-line {
    border-top: 1px solid rgb(195, 195, 195);
  }
</style>