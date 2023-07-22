<div id="future-overview-scroll-parent" style="width: 15vw;">
  <!-- color: #6D6D6D; -->
  <div style="white-space: nowrap; 
    margin-bottom: 40px; 
    font-family: 'Inter';
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
  ">
    Upcoming tasks
  </div>
  <div class="future-overview-scroll-container">
    {#each Object.keys(datesToTasks) as date}
      <div style="margin-top: 20px; margin-bottom: 20px;">
        <div>
          <div style="font-family:Roboto, sans-serif; ; font-size: 1rem; margin-bottom: 2px; color:#6D6D6D">
            {date} {getDayOfWeek(date)}.
          </div>
        </div>

        {#each datesToTasks[date] as task}
          <div
            on:click={() => dispatch('task-click', { task })} 
            style="display: flex; align-items: center; flex-wrap: nowrap;"
          >
            <div 
              style="font-family: sans-serif; font-size: 0.8rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
              class:grey-text={task.daysBeforeRepeating}
              class:purple-text={!task.daysBeforeRepeating}
            >
              <span style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{task.name + ' '}</span>({task.startTime})
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
import { getDayOfWeek } from './helpers.js'

let datesToTasks = {} 

const dispatch = createEventDispatcher()

$: if (futureScheduledTasks) {
  futureScheduledTasks.sort((t1, t2) => {
    if (t1.startDate !== t2.startDate) return t1.startDate < t2.startDate ? -1 : 1
    else {
      return convertToPureMinutes(t1.startTime) - convertToPureMinutes(t2.startTime)
    }
  })

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
