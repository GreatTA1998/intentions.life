<div class="future-overview-parent" style="background-color: var(--future-overview-bg-color)">
  <div id="future-overview-scroll-parent" style="width: 100%; height: 100%;">
    <!-- color: #6D6D6D; -->
    <div style="
      white-space: nowrap; 
      margin-bottom: 40px; 
      font-size: 16px;
      display: flex; 
      align-items: center;
    ">
      <div style="font-weight: 600; font-size: 20px; color: rgb(10, 10, 10)">
        UPCOMING SCHEDULE
      </div>
    </div>
    <div class="future-overview-scroll-container">
      {#each Object.keys(datesToTasks) as date}
        <div style="margin-top: 20px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 14px; margin-bottom: 2px; color: rgb(10, 10, 10); font-weight: 600;">    
              {convertMMDDToReadableMonthDayForm(date)} {getDayOfWeek(date).toUpperCase()}
            </div>
          </div>

          {#each datesToTasks[date] as task}
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
  </div>
</div>

<script>
export let futureScheduledTasks 

import { createEventDispatcher } from 'svelte'
import { getDayOfWeek, convertMMDDToReadableMonthDayForm } from '/src/helpers.js'

let datesToTasks = {} 

const dispatch = createEventDispatcher()

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

// (Eveything else hidden)

// TODO:
//   - Figure out what props / data structure
//   - Presentational UI (DONE)
</script>

<style>
  /* Small Devices, Tablets and bigger devices */
  @media only screen and (max-width : 480px) {
    #future-overview-scroll-parent {
      height: 100%; 
      width: 100%;
    }
  }

  @media only screen and (min-width : 480px) {
    #future-overview-scroll-parent {
      /* height: 100vh; */
    }
  }

  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  #future-overview-scroll-parent {
    overflow-x: hidden;
  }

  .future-overview-scroll-container {
    margin-left: 0px; 
    margin-top: 10px; 
    height: 80vh;
  }

  .future-overview-parent {
    width: 332px;
    padding-top: 3vh; 
    padding-left: 1.5vw; 
    padding-right: 1.5vw;
  }

  @media (max-width: 1279.99px) {
    .future-overview-parent {
      min-width: 120px;
      padding-left: 12px; 
      padding-right: 12px;
    }
  }

  .purple-text {
    color: #6D6D6D;
  }
</style>
