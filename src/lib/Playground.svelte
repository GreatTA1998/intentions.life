<div style="border: 2px solid purple; overflow-y: auto; height: 83%">
  <div style="display: flex; margin-left: 48px; overflow-y: hidden;">
    {#each dateClassObjects as dateClassObj, i}
      <div>
        <div 
          style="
            font-family: sans-serif; 
            font-size: 1.4em;
            background-color: {i % 2 === 1 ? '#F8F8F8' : 'white'};
            color: #6D6D6D;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
          "
        >
          ({dateClassObj.toLocaleDateString('en-US', { weekday: 'short' })})
        </div>

        <hr style="margin: 0">

        {#key intForTriggeringRerender}
          <ReusableCalendarView
            backgroundColor={i % 2 === 1 ? '#F8F8F8' : 'white'}
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
  import { MIKA_PIXELS_PER_HOUR, getNicelyFormattedDate, getDateInMMDD } from '/src/helpers'
  import { onMount } from 'svelte'

  export let allTasks
  export let calStartDateClassObj

  let allIncompleteTasks = null
  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 17
  let dateClassObjects = []
  let intForTriggeringRerender = 0

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
    for (let i = 0; i < 4; i++) {
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