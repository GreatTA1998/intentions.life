<ReusableCalendarView
  pixelsPerHour={MIKA_PIXELS_PER_HOUR}
  timeBlockDurationInMinutes={60}
  subdivisionsPerBlock={60}
  calendarBeginningDateClassObject={dayCalendarBeginningDateClassObject}
  timestamps={timesOfDay}
  scheduledTasks={todayScheduledTasks}
  on:task-duration-adjusted
  on:task-click
  on:task-scheduled
  on:task-checkbox-change
/>

<div>
  <div style="display: flex; width: 20vw;">  
    <ReusableUnscheduledTodoList
      {allTasks}
      pixelsPerHour={MIKA_PIXELS_PER_HOUR}
      title={"Today's to-do"}
      taskCriteria={(task) => task.deadlineDate === getDateInDDMMYYYY(new Date()) && !task.startTime}
      dropzoneInfo={{
        deadlineDate: getDateInDDMMYYYY(new Date()),
        deadlineTime: '23:59'
      }}
      on:task-click
      on:task-duration-adjusted
      on:task-dragged
    />
  </div>
</div>

<script>
  import ReusableCalendarView from './ReusableCalendarView.svelte';
  import ReusableUnscheduledTodoList from '$lib/ReusableUnscheduledTodoList.svelte';

  import { 
    MIKA_PIXELS_PER_HOUR, 
    PIXELS_PER_HOUR, 
    getNicelyFormattedDate, 
    computeDayDifference, 
    convertDDMMYYYYToDateClassObject, 
    getDateInDDMMYYYY 
  } 
    from '/src/helpers.js'

  export let allTasks
  // export let scheduledTasksToday

  let todayScheduledTasks = [] 

  $: if (allTasks) {
    collectTodayScheduledTasksToArray()
  }

  function collectTodayScheduledTasksToArray () {
    todayScheduledTasks = [] // reset
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.startDate === getDateOfToday() && task.startTime, 
      applyFunc: (task) => todayScheduledTasks = [...todayScheduledTasks, task]
    })
  } 

  function traverseAndUpdateTree ({ fulfilsCriteria, applyFunc }) {
    const artificialRootNode = {
      name: 'root',
      children: allTasks
    }
    helperFunction({ node: artificialRootNode, fulfilsCriteria, applyFunc })
  }

  function helperFunction ({ node, fulfilsCriteria, applyFunc }) {
    if (fulfilsCriteria(node)) {
      applyFunc(node)
    } 
    for (const child of node.children) {
      helperFunction({ node: child, fulfilsCriteria, applyFunc })
    }
  }

  let timesOfDay = [] 
  let numOfHourBlocksDisplayed = 17

  function getDayCalendarBeginningDateClassObject () {
    const d = new Date()
    return convertDDMMYYYYToDateClassObject(
      getDateInDDMMYYYY(new Date()), // ddmmyyyy
      `07:00` // hhmm
    )
  }

  let dayCalendarBeginningDateClassObject = getDayCalendarBeginningDateClassObject ()

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
</script>
