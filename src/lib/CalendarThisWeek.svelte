<div style="padding-left: 24px;">
  <div style="display: flex; width: fit-content;">
    <div style="position: relative;">
      <div style="margin-left: 0px; margin-top: 12px; font-size: 18px; display: flex;">
        <div>
          {new Date().toLocaleString('en-US', { month: 'short'})}
        </div>
        <div style="margin-left: 8px; font-weight: 300; color: rgb(80, 80, 80)">
          {new Date().toLocaleString('en-US', { year: 'numeric'})}
        </div>

        <div style="display: flex; margin-left: 6px;">
          <div>
              <span on:click={() => dispatch('calendar-shifted', { days: -1 })} class="material-icons shift-calendar-arrow">
                navigate_before
              </span>
            </div>
    
            <div>
              <span on:click={() => dispatch('calendar-shifted', { days: 1 })} class="material-icons shift-calendar-arrow">
                keyboard_arrow_right
              </span>
            </div>
          </div>
      </div>
    </div>
  

    {#each dateClassObjects as dateClassObj, i}
      <div>
        <div class="sticky-day-of-week-abbreviation">
          <div>
            <div 
              class="center-flex" 
              style="font-size: 16px; margin-bottom: 0px; font-weight: 500" 
              class:orange-highlight={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
            >
              {dateClassObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
            </div>

            <div 
              class="center-flex" 
              style="font-size: 16px; font-weight: 300" 
            >
              <div class="center-flex" 
                style="padding: 8px; width: 48px; height: 48px;" 
                class:orange-highlight={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
                class:highlighted-circle={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
              >
                {dateClassObj.getDate()}
              </div>
            </div>
          </div>
        </div>

        {#key intForTriggeringRerender}
          {#if timesOfDay.length !== 0}
            <ReusableCalendarView
              calendarBeginningDateClassObject={dateClassObj}
              scheduledTasks={getScheduledTasks(dateClassObj)}
              timestamps={timesOfDay}
              backgroundColor='rgb(250, 250, 250)'
              willShowTimestamps={i === 0}
              pixelsPerHour={MIKA_PIXELS_PER_HOUR}
              timeBlockDurationInMinutes={60}
              subdivisionsPerBlock={60}
              on:new-root-task
              on:task-duration-adjusted
              on:task-click
              on:task-scheduled
              on:task-checkbox-change
            />
          {/if}
        {/key}
      </div>
    {/each}
  </div>
</div>

<script>
  import ReusableCalendarView from '$lib/ReusableCalendarView.svelte'
  import { MIKA_PIXELS_PER_HOUR, getDateInMMDD, getDateInDDMMYYYY } from '/src/helpers'
  import { onMount, createEventDispatcher } from 'svelte'

  export let allTasks
  export let calStartDateClassObj

  let allIncompleteTasks = null
  // NOTE: timesOfDay should start from 00:00, so dateClassObjects also need to start from 00:00 military time
  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 24
  let dateClassObjects = []
  let intForTriggeringRerender = 0

  const dispatch = createEventDispatcher()

  $: getDateClassObjects(calStartDateClassObj)

  $: if (allTasks) {
    intForTriggeringRerender += 1
    allIncompleteTasks = filterIncompleteTasks(allTasks)
  }

  onMount(() => {
    // Default start date is today, if left, you shift calStartDateClassObj
    getTimesOfDay()
  })

  function filterIncompleteTasks (tasksArray) {
    let output = []
    const copy = [...tasksArray]
    traverseAndUpdateTree({
      tree: copy,
      fulfilsCriteria: (task) => {
        // make an independent copy
        const filteredChildren = task.children.filter(t => t.isCompleted === false)
        task.children = filteredChildren
      },
      applyFunc: (task) => output.push(task) // output = [...output, task]
    })
    output = copy
    return output
  }

  function getDateClassObjects (dateClassObj) {
    dateClassObjects = []
    let d = dateClassObj
    // dateClassObjects.push(d)
    for (let i = 0; i < 7; i++) {
      const independentCopy = new Date()
      independentCopy.setDate(d.getDate() + i) // quickfix: for some reason we're off by 1-index, will investigate
      // no longer start from 7 am, or else there will be missing hours
      independentCopy.setHours(0, 0, 0) // hours, minutes, seconds, note it's ZERO-indexed, 0-23, 0-59
      dateClassObjects.push(independentCopy)
    }
    dateClassObjects = dateClassObjects // manually trigger reactivity)
  }
  
  function getScheduledTasks (dateClassObj) {
    let output = []
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.startDate === getDateInMMDD(dateClassObj) && task.startTime, 
      applyFunc: (task) => output.push(task) // output = [...output, task]
    })
    return output
  }

  function traverseAndUpdateTree ({ fulfilsCriteria, applyFunc, tree = allTasks }) {
    const artificialRootNode = {
      name: 'root',
      children: tree
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

  function getTimesOfDay () {
    let currentHour = 0 // today.getHours() // get the integer i.e. 0 to 23
    // now generate 16 hours of time (so it covers, for example, 8 am - midnight)
    for (let i = 0; i < numOfHourBlocksDisplayed; i++) {
      if (currentHour === 24) {
        currentHour = 0
      }
      if (currentHour < 10) {
        timesOfDay.push('0' + currentHour + ':00')
      } else {
        timesOfDay.push(currentHour + ':00')
      }

      currentHour += 1
    }
    timesOfDay = timesOfDay
  }

</script>

<style>
  .shift-calendar-arrow {
    font-size: 18px; 
    cursor: pointer; 
    height: 40px; 

    position: sticky; 
    top: 0;
    z-index: 1;

    padding-top: 0px;
  }

  .orange-highlight {
    color: black;
  }

  .highlighted-circle {
    border-radius: 25px;
  }

  .center-flex {
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  .sticky-day-of-week-abbreviation {
    font-size: 1.4em;
    background-color: rgb(250, 250, 250);
    color: #6D6D6D;
    height: 100px;
    
    position: sticky; 
    top: 0;
    z-index: 1;
  }
</style>