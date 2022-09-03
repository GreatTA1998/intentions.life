<div style="height: 60vh; overflow-y: scroll; overflow-x: hidden">
  <div style="width: 12vw; margin-left: 0px; margin-top: 27px; position: relative; height: 1600px" >
    {#each futureScheduledTasks as task, i}
      <div style="position: relative; height: {minimumContainerHeight + (task.duration * pixelsPerMinute || 15)}px; margin-top: 25px;">
        <div>
          <b>{task.startDate}</b>
        </div>

        <TaskElement  
          {task}
          fontSize={0.8}
          offsetFromTop={20}
          height={task.duration * pixelsPerMinute || 15}
          on:task-click
          on:task-duration-adjusted
        />
      </div>
      <div class="broken-axis"></div>

    {/each}
  </div>
</div>
  <!-- Broken axis design <Just do a different border-line variant> -->
  <!-- That's it, everything is just a combination of `Task` and `Broken Axis` -->
<script>
import TaskElement from './TaskElement.svelte'

export let futureScheduledTasks 

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
