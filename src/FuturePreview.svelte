<div style="height: 77vh; overflow-y: scroll; overflow-x: hidden">
  <!-- Future overview -->

  <div style="width: 12vw; margin-left: 0px; margin-top: 10px; position: relative; height: 1600px" >
    <!-- Task: can just import CSS from <CalendarDayView>  -->
    <div>Fri. Sep. 27</div>
    <div 
      class="scheduled-task" 
      style="top: {20}px; height: {30}px; border-left: 2px solid red;"
    >
      Essay for Ashay
    </div>

    <div 
      class="scheduled-task" 
      style="top: {70}px; height: {15}px; border-left: 2px dashed black;"
    >
    </div>

    <div style="top: 100px; position: absolute">Sat. Feb. 1</div>
    <div 
      class="scheduled-task" 
      style="top: {120}px; height: {93}px;"
    >
      Fly to Singapore
    </div>
  </div>
</div>
  <!-- Broken axis design <Just do a different border-line variant> -->
  <!-- That's it, everything is just a combination of `Task` and `Broken Axis` -->
<script>
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
