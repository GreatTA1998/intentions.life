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

let datesToTasks = {} 

const dispatch = createEventDispatcher()

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
