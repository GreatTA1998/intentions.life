<div style="height: 60vh; overflow-y: scroll; overflow-x: hidden">
  <div style="width: 12vw; margin-left: 0px; margin-top: 27px; height: 1600px" >
    {#each Object.keys(datesToTasks) as date}
      <div style="margin-bottom: 40px;">
        <div>
          <b>{date}</b>
        </div>

        {#each datesToTasks[date] as task}
          <div on:click={() => dispatch('task-click', { task })} style="display: flex; align-items: center;">
            <div style="font-size: 0.82rem; color: grey;">
              {task.name + ' '}({task.startTime})
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

let datesToTasks = {} 

const dispatch = createEventDispatcher()

$: if (futureScheduledTasks) {
  futureScheduledTasks.sort((t1, t2) => {
    if (t1.startDate !== t2.startDate) return 0
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
  console.log('datesToTasks = ', datesToTasks)
}

function convertToPureMinutes (hhmm) {
  const hh = hhmm.substring(0, 2)
  const mm = hhmm.substring(3, 5)
  console.log(parseInt(hh) * 60 + parseInt(mm))
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
  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
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
