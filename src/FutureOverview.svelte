<div style="height: 77vh; overflow-y: scroll; overflow-x: hidden">
  <div style="width: 12vw; margin-left: 0px; margin-top: 6px; position: relative; height: 1600px" >
    {#each futureScheduledTasks as task, i}
      <div style="position: absolute; top: {100*i}px">
        {task.startDate}
      </div>

      <div 
        class="scheduled-task" 
        style="top: {20 + (100*i)}px; height: {30}px; border-left: 2px solid red;"
      >
        {task.name}
      </div>
    
      <!-- broken axis -->
      <div 
        class="scheduled-task" 
        style="top: {70 + (100*i)}px; height: {15}px; border-left: 2px dashed black;"
      >
      </div>
    {/each}
  </div>
</div>
  <!-- Broken axis design <Just do a different border-line variant> -->
  <!-- That's it, everything is just a combination of `Task` and `Broken Axis` -->
<script>
export let futureScheduledTasks 

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
</style>
