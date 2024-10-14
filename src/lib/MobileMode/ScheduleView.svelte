<div style="padding: 24px;">
  {#each Object.keys(datesToTasks) as date}
    <div style="margin-bottom: 20px;">
      <div>
        <div style="font-size: 14px; margin-bottom: 2px; color: rgb(10, 10, 10); font-weight: 600;">  
          {displayNicely(date)}  
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap;">
        {#each datesToTasks[date].filter(task => !task.startTime && task.iconDataURL) as iconTask}
          <FunctionalDoodleIcon
            {iconTask}
            on:task-click
            on:task-checkbox-change
          />
        {/each}
      </div>

      {#each datesToTasks[date].filter(task => !task.startTime && !task.iconDataURL) as flexibleDayTask}
        <div on:click={() => dispatch('task-click', { task: flexibleDayTask })} 
          style="
            width: var(--calendar-day-section-width); 
            font-size: 12px; 
            display: flex; 
            flex-direction: column;
            gap: 4px; margin-left: 4px; margin-right: 4px; margin-bottom: 4px;
          "
        >
          <ReusableFlexibleDayTask task={flexibleDayTask}
            on:task-click
            on:task-update
            on:task-checkbox-change
          />
        </div>
      {/each}

      {#each filterAndSort(datesToTasks[date]) as task}
        <div
          on:click={() => dispatch('task-click', { task })} 
          style="display: flex; align-items: center; flex-wrap: nowrap; padding: 2px;"
        >
          <div 
            style="font-size: 16px; white-space: nowrap; text-overflow: ellipsis;"
            class:grey-text={task.daysBeforeRepeating}
            class:purple-text={!task.daysBeforeRepeating}
          > 
            <span style="white-space: nowrap; text-overflow: ellipsis; color: rgb(40, 40, 40); font-weight: 400; display: flex;">
              - <div style="color: rgb(90, 90, 90); font-weight: 300; margin-right: 4px;">{task.startTime}</div> {' ' + task.name + ' '}
            </span>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<script>
  export let futureScheduledTasks 

  import { createEventDispatcher } from 'svelte'
  import { getDayOfWeek, convertMMDDToReadableMonthDayForm, pureNumericalHourForm } from '/src/helpers/everythingElse.js'
  import ReusableFlexibleDayTask from '$lib/ReusableFlexibleDayTask.svelte'
  import FunctionalDoodleIcon from '$lib/FunctionalDoodleIcon.svelte'
  import { DateTime } from 'luxon'

  // NOTE: should this be redundant or complementary to the calendar view?
  // The advantage of the schedule view is that it's more space efficient, 
  // whereas the calendar view's photos can easily dominate half a screen on its own.

  // Either way, try making them the same (you might like the visual feedback from the future)
  // just test it out.

  let datesToTasks = {} 

  const dispatch = createEventDispatcher()

    // NOTE: keep for quick reference
  // quick-fix for NaN/NaN bug
  function collectFutureScheduledTasksToArray () {
    const yearNumber = new Date().getFullYear()
    futureScheduledTasks = [] // reset 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => { 
        if (!task.startDate) return 
        if (task.willRepeatOnWeekDayNumber) return
        const d1 = new Date(convertToISO8061({ mmdd: task.startDate }))
        
        // setHours(hoursValue 0 - 23, minutesValue 0 - 59)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
        if (task.startTime) {
          const [hh, mm] = task.startTime.split(":")
          d1.setHours(Number(hh), Number(mm))
        }
        return (task.startDate && task.startDate !== 'NaN/NaN') && 
                (!task.willRepeatOnWeekDayNumber) &&
                    (d1.getTime() >= new Date().getTime()) && 
                      (Number(task.startYYYY) === Number(yearNumber.toString())) // this line is a quickfix because we don't store YYYY values in legacy versions
      }, // 'NaN' quick-fix bug
      applyFunc: (task) => futureScheduledTasks = [...futureScheduledTasks, task]
    })

    // TO-DO: don't include all the tasks in the future, only if it is bounded by < 7 days for the week view, and < 30 days for the month view
    futureScheduledTasks.sort((task1, task2) => {
      const d1 = new Date(task1.startDate)
      const d2 = new Date(task2.startDate)
      return d1.getTime() - d2.getTime() // most recent to the top??
    })
  }

  function displayNicely (mmdd) {
    const noSlash = mmdd.replace('/', ' ')
    const dt = DateTime.fromFormat(noSlash, 'MM dd')

    const dayOfWeek = dt.toFormat('cccc')
    const monthName = dt.toFormat('LLLL')
    const dayOfMonth = dt.toFormat('d')
    return `${dayOfWeek}, ${monthName} ${dayOfMonth}`
  }

  function filterAndSort (tasks) {
    return tasks.filter(t => t.startTime).sort((task1, task2) => {
      return pureNumericalHourForm(task1.startTime) - pureNumericalHourForm(task2.startTime)
    })
  }

  $: if (futureScheduledTasks) {
    futureScheduledTasks.sort((t1, t2) => {
      if (t1.startDate !== t2.startDate) return t1.startDate < t2.startDate ? -1 : 1
      else {
        return convertToPureMinutes(t1.startTime) - convertToPureMinutes(t2.startTime)
      }
    })

    // Nov 13 
    const temp = {} 
    for (const task of futureScheduledTasks) {
      if (!temp[task.startDate]) {
        temp[task.startDate] = [task]
      } else {
        temp[task.startDate].push(task)
      }
    }
    datesToTasks = {...temp}
  }

  function convertToPureMinutes (hhmm) {
    const hh = hhmm.substring(0, 2)
    const mm = hhmm.substring(3, 5)
    return parseInt(hh) * 60 + parseInt(mm)
  }

  const pixelsPerMinute = 90/60
  const minimumContainerHeight = 20

  // Broken-axes will be used relentlessly

  // Shows anything that is SCHEDULED:
  //   - Regular commitment: Repeated tasks scheduled at particular time
  //   - Special deadline: Non-repeated task with deadline
  //   - Special event: Non-repeated scheduled at a particular time
</script>

<style>
  .purple-text {
    color: #6D6D6D;
  }
</style>
