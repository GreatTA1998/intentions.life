<div id="future-overview-scroll-parent" style="width: 100%; height: 100%;">
  <!-- color: #6D6D6D; -->
  <div style="
    white-space: nowrap; 
    margin-bottom: 40px; 
    font-size: 16px;
    display: flex; 
    align-items: center;
  ">
    <div style="font-weight: 500; color: rgb(10, 10, 10)">
      UPCOMING
    </div>
    <div style="color: rgb(80, 80, 80); margin-left: 6px; font-weight: 300;">
      EVENTS
    </div>
    <!-- <span class="material-symbols-outlined" style="font-size: 32px; margin-left: 4px;">
      event
    </span>  -->
  </div>
  <div class="future-overview-scroll-container">
    {#each Object.keys(datesToTasks) as date}
      <div style="margin-top: 20px; margin-bottom: 20px;">
        <div>
          <div style="font-size: 14px; margin-bottom: 2px; color: rgb(80, 80, 80); font-weight: 300;">    
            {convertMMDDToReadableMonthDayForm(date)} {getDayOfWeek(date).toUpperCase()}
          </div>
        </div>

        {#each datesToTasks[date] as task}
          <div
            on:click={() => dispatch('task-click', { task })} 
            style="display: flex; align-items: center; flex-wrap: nowrap; padding: 2px;"
          >
            <div 
              style="font-size: 14px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
              class:grey-text={task.daysBeforeRepeating}
              class:purple-text={!task.daysBeforeRepeating}
            >
              <span style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden; color: rgb(10, 10, 10); font-weight: 400;">
                -{' ' + task.name + ' '}
              </span>({task.startTime})
            </div>
          </div>
        {/each}
      </div>
    {/each}
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
      width: 200px;
    }
  }

  @media only screen and (min-width : 480px) {
    #future-overview-scroll-parent {
      height: 100vh;
      width: 10vw; 
    }
  }

  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  #future-overview-scroll-parent {
    overflow-y: scroll; 
    overflow-x: hidden;
  }

  .future-overview-scroll-container {
    margin-left: 0px; 
    margin-top: 10px; 
    height: 80vh;
  }

  .black-text {
    color: #6D6D6D;
  }

  .purple-text {
    color: #6D6D6D;
  }

  .scheduled-task {
    display: inline;
    position: absolute;
    margin-left: 2px;
    border-left: 2px solid grey;
    padding-left: 2px;
    font-size: 0.8rem;
    width: 100%;
  }

  .broken-axis {
    display: inline;
    height: 20px;
    /* position: absolute; */
    margin-left: 2px;
    border-left: 2px dashed black;
    padding-left: 2px;
    font-size: 0.8rem;
    width: 100%;
  }
</style>
