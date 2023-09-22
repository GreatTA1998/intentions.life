<h1>
  Playground
  <!-- {#if timesOfDay.length > 0} -->
  <div style="display: flex; margin-left: 400px;">
    {#each dateClassObjects as dateClassObj, i}
      <div>
        <!-- {getNicelyFormattedDate(dateClassObj)} -->
        <div style="font-family: sans-serif">
          {dateClassObj.toLocaleDateString('en-US', { weekday: 'short' })}.
        </div>

        <!-- -->
        {#key intForTriggeringRerender}
          <ReusableCalendarView
            willShowTimestamps={i === 0}
            pixelsPerHour={MIKA_PIXELS_PER_HOUR}
            timeBlockDurationInMinutes={60}
            subdivisionsPerBlock={60}
            calendarBeginningDateClassObject={dateClassObj}
            timestamps={timesOfDay}
            scheduledTasks={getScheduledTasks(dateClassObj)}
            on:task-duration-adjusted
            on:task-click
            on:task-scheduled
            on:task-checkbox-change
          />
        {/key}
      </div>
    {/each}
      
    <PlaygroundThisWeekTodo 
      {allIncompleteTasks}
      on:task-node-update
      on:task-click
    />
  </div>

  <!-- <CopyOfDayView
    allTasks
    scheduledTasksToday
  /> -->
  <!-- TO-DO: 
    1. Multiple Day Views,
    2. Hierarchical this week's todo
  -->
</h1>

<script>
  import DayView from '$lib/DayView.svelte'
  import CopyOfDayView from '$lib/CopyOfDayView.svelte'
  import ReusableCalendarView from '$lib/ReusableCalendarView.svelte'
  import { MIKA_PIXELS_PER_HOUR, getNicelyFormattedDate, getDateInMMDD } from '/src/helpers'
  import { onMount } from 'svelte'
  import PlaygroundThisWeekTodo from '$lib/PlaygroundThisWeekTodo.svelte'

  export let allTasks

  let allIncompleteTasks = null
  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 17
  let dateClassObjects = []
  let intForTriggeringRerender = 0

  onMount(() => {
    getDateClassObjects()
    getTimesOfDay()
  })

  // whenever reactivity triggers
  $: if (allTasks) {
    intForTriggeringRerender += 1
    allIncompleteTasks = filterIncompleteTasks(allTasks)
  }

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

  function getDateClassObjects () {
    let d = new Date()
    // dateClassObjects.push(d)
    for (let i = 0; i < 4; i++) {
      const independentCopy = new Date()
      independentCopy.setDate(d.getDate() + i) // quickfix: for some reason we're off by 1-index, will investigate
      dateClassObjects.push(independentCopy)
    }
    dateClassObjects = dateClassObjects // manually trigger reactivity
    console.log('dateClassObjects =', dateClassObjects)
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