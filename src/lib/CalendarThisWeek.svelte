<div style="overflow-y: auto; overflow-x: auto; height: 100%; margin-left: 48px;">
  <div style="display: flex; width: fit-content;">
    <!-- <div>
      <span on:click={() => dispatch('calendar-shifted', { days: -1 })} class="material-icons shift-calendar-arrow">
        navigate_before
      </span>
    </div>

    <div>
      <span on:click={() => dispatch('calendar-shifted', { days: 1 })} class="material-icons shift-calendar-arrow">
        keyboard_arrow_right
      </span>
    </div> -->

    {#each dateClassObjects as dateClassObj, i}
      <div>
        <div class="sticky-day-of-week-abbreviation">
          <div>
            <div 
              class="center-flex" 
              style="font-size: 12px; margin-bottom: 4px;" 
              class:orange-highlight={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}
            >
              {dateClassObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
            </div>

            <div 
              class="center-flex" 
              style="font-size: 28px;" 
            >
              <div class="center-flex" style="padding: 8px; width: 48px; height: 48px;" class:highlighted-circle={getDateInDDMMYYYY(dateClassObj) === getDateInDDMMYYYY(new Date())}>
                {dateClassObj.getDate()}
              </div>
            </div>
          </div>
        </div>

        {#key intForTriggeringRerender}
          <ReusableCalendarView
            backgroundColor='rgb(250, 250, 250)'
            willShowTimestamps={i === 0}
            pixelsPerHour={MIKA_PIXELS_PER_HOUR}
            timeBlockDurationInMinutes={60}
            subdivisionsPerBlock={60}
            calendarBeginningDateClassObject={dateClassObj}
            timestamps={timesOfDay}
            scheduledTasks={getScheduledTasks(dateClassObj)}
            on:new-root-task
            on:task-duration-adjusted
            on:task-click
            on:task-scheduled
            on:task-checkbox-change
          />
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
  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 17
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
      // ALWAYS START FROM 7 AM
      independentCopy.setHours(7, 0) // hours, minutes, note it's ZERO-indexed, 0-23, 0-59
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
    let currentHour = 7 // today.getHours() // get the integer i.e. 0 to 23
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
    font-size: 36px; 
    cursor: pointer; 
    height: 40px; 

    position: sticky; 
    top: 0;
    z-index: 1;

    padding-top: 24px;
  }

  .orange-highlight {
    color: #0085FF;
    font-weight: 500;
  }

  .highlighted-circle {
    /* background-color: orange;  */
    background-color: #0085FF;
    color: white;
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