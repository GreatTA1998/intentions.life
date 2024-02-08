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
    {#each scheduledTasks as task, i}
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
          left: 0px;
          width: 100%;
        "
      >
        <ReusableTaskElement
          {task}
          pixelsPerHour={pixelsPerMinute * 60}
          fontSize={0.8}
          hasCheckbox
          on:task-click
          on:task-update
          on:task-checkbox-change
        />
      </div>
    {/each}
      
    <!-- This offsets the fact that the timestamp needs a -6 margin to not be cut off from the top edge of the container -->
    <div style="margin-top: 6px;"></div>

    {#if isDirectlyCreatingTask}
      <div 
        id="calendar-direct-task-div"  
        style="
          top: {yPosition - formFieldTopPadding}px;
          position: absolute;
          width: 98%; 
          padding-left: 0px; 
          padding-right: 0px;
          box-sizing: border-box;
        "
      >
        <UXFormField
          fieldLabel="Task Name"
          value={newTaskName}
          on:input={(e) => {
            newTaskName = e.detail.value;
            searchTaskTemplates();
          }}
          on:focus-out={() => {
            if (newTaskName === '') {
              isDirectlyCreatingTask = false
            }
          }}
          on:task-entered={(e) => handleEnterKey(e)}
        />

        <!-- Display reusable task templates here -->
        {#key taskTemplateSearchResults}
          {#if $user && newTaskName.length >= 2}
            <div class="core-shadow cast-shadow" style="background-color: white; padding: 6px; border-radius: 12px">   
              {#each taskTemplateSearchResults as taskTemplate}
                <div class="autocomplete-option" 
                  on:click={() => createNewInstanceOfReusableTask(taskTemplate)} 
                  class:option-highlight={taskTemplateSearchResults.length === 1}
                >
                  {taskTemplate.name}
                </div>
              {/each}
            </div>
          {/if}
        {/key}
      </div> 
    {/if}

    <!-- https://svelte.dev/tutorial/update
      "Scrolling is hard to achieve with purely a state-driven way"
    -->

    <!-- A red line that indicates the current time -->
    {#if calendarBeginningDateClassObject.getDate() === new Date().getDate()}
      <div class="current-time-indicator-container" style="
          top: {computeOffsetGeneral({ 
            d1: calendarBeginningDateClassObject, 
            d2: new Date(), 
            pixelsPerMinute 
          })}px;
        "
      > 
       <div style="font-size: 12px; color: var(--location-indicator-color); font-weight: 600;">
        {getTimeInHHMM({ dateClassObj: new Date() })}
        </div>
        <hr 
          style="width: 11vw; border: 2px solid var(--location-indicator-color); border-radius: 5px; width: 100%; margin-top: 2px;"
          bind:this={CurrentTimeIndicator}
        > 
      </div>
    {/if}
  </div>
</div>

<script>
  import { getDateOfToday, getTrueY, computeMillisecsDifference, convertDDMMYYYYToDateClassObject, getTimeInHHMM } from '/src/helpers.js'
  import ReusableTaskElement from '$lib/ReusableTaskElement.svelte'
  import { onMount, beforeUpdate, afterUpdate, tick, createEventDispatcher, onDestroy } from 'svelte'
  import { browser } from '$app/environment';
  import { user, hasInitialScrolled, yPosWithinBlock } from '/src/store.js'
  import { getDateInDDMMYYYY, getDateInMMDD, getRandomID } from '/src/helpers';
  import UXFormField from '$lib/UXFormField.svelte'

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

  let taskTemplateSearchResults = []

  $: pixelsPerMinute = pixelsPerHour / 60
  $: resultantDateClassObject = getResultantDateClassObject(yPosition)

  onMount(async () => {
    if (CurrentTimeIndicator) {
      setTimeout(() => {
        if (CurrentTimeIndicator && !$hasInitialScrolled) {
          CurrentTimeIndicator.scrollIntoView({ behavior: 'smooth', block: 'center'})
          hasInitialScrolled.set(true)
        }
      }, 0) 
    }
  })

  onDestroy(() => {

  })

  function p (...args) {
    console.log(...args)    
  }

  function handleEnterKey (e) {
    if (taskTemplateSearchResults.length === 1) {
      createNewInstanceOfReusableTask(taskTemplateSearchResults[0])
    } else {
      createTaskDirectly(e)
    }
  }

  function searchTaskTemplates () {
    const uniqueSet = new Set()
    const searchQuery = newTaskName
    for (const searchTerm of searchQuery.split(' ')) {
      for (const taskTemplate of $user.reusableTaskTemplates) {
        if (taskTemplate.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          uniqueSet.add(taskTemplate)
        }
      }
    }
    const result = [...uniqueSet]
    taskTemplateSearchResults = result
    return result
  }

  function copyGetTrueY (e) {
    return e.clientY + OverallContainer.scrollTop - OverallContainer.getBoundingClientRect().top - OverallContainer.style.paddingTop
  }

  async function createNewInstanceOfReusableTask (taskObj) {
    const copy = {...taskObj}
    copy.id = getRandomID()
    copy.reusableTemplateID = taskObj.id
    copy.isDone = false
    copy.startDate = getDateInMMDD(resultantDateClassObject)
    copy.startTime = getHHMM(resultantDateClassObject)
    copy.startYYYY = resultantDateClassObject.getFullYear()
    dispatch('new-root-task', copy)
    isDirectlyCreatingTask = false
  }

  async function createTaskDirectly (e) {
    const newTaskName = e.detail.taskName
    if (newTaskName !== '') {
      const newTaskObj = {
        id: getRandomID(),
        name: newTaskName,
        startDate: getDateInMMDD(resultantDateClassObject),
        // deadlineDate: getDateInDDMMYYYY(resultantDateClassObject),
        startTime: getHHMM(resultantDateClassObject),
        startYYYY: resultantDateClassObject.getFullYear()
      }
      dispatch('new-root-task', newTaskObj)
    }
    isDirectlyCreatingTask = false
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
      id: e.dataTransfer.getData('text/plain'),
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

  // now format to hh:mm format to be compatible with old API
  function ensureTwoDigits (number) {
    return (number < 10 ? `0${number}` : `${number}`)
  }

  function getHHMM (dateClassObj) {
    const d = dateClassObj
    const hhmm = ensureTwoDigits(d.getHours()) + ':' + ensureTwoDigits(d.getMinutes())
    return hhmm
  }

</script>

<style lang="scss">
  :root {
    --calendar-day-section-width: max(10vw, 120px); 
  }

  .current-time-indicator-container {
    display: block; 
    align-items: center;
    position: absolute; 
    width: var(--calendar-day-section-width);
    padding-left: 6px;
    padding-right: 6px;
    pointer-events: none;
  }

  .autocomplete-option {
    padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px; font-size: 16px; border-radius: 12px;
  }

  .option-highlight {
    background-color: rgb(240, 240, 240);
  }

  // background-color: rgb(240, 240, 240);
  .autocomplete-option:hover {
    @extend .option-highlight
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

  /* 
    You need the relative scrolling container to be different from `calendar-day-container`,
    so the absolute positionings will count from the right place (no need to fully understand yet) 

    height: 200% is just so it's high enough to contain all the absolute elements

    without border-box, the padding on top will add ON TOP OF 100% height  
  */

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

    /* top: -5px;  */
    /* margin-left: -6px; */
    font-size: 0.7rem;

    /* these CSS properties are copied from `.calendar-time-block`, which used to be separate */
    /* position: absolute; */
    /* height: 90px;
    width: 100%; */
  }

  .visible-line {
    border-top: 1px solid rgb(195, 195, 195);
  }

</style>