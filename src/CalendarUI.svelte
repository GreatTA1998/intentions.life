<div style="width: 100%; margin-left: 20px;">
  {#each ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'] as timeOfDay}
    <div style="display: flex;">
      <div class="time-indicator">
        {timeOfDay}
      </div>

      <div class="calendar-time-block">
        <!-- we inject scheduled tasks here -->

        <!-- example: 
          <div class="scheduled-task" style="top: 7px; height: 20px">
            Meditate
          </div>
          <div class="scheduled-task" style="top: 55px; height: 40px">
            Surprise the motherfucker
          </div>
        -->
      </div>
    </div>
  {/each}
</div>

<script>
  import { onMount } from 'svelte'

  export let scheduledTasks 

  onMount(async () => {
    // designate the calendar as dropzones
    const { Droppable } = await import('@shopify/draggable')
    const droppable = new Droppable(document.querySelectorAll('.calendar-time-block'), {
      draggable: '.item',
      dropzone: '.dropzone'
    });
    console.log('Droppable =', Droppable)

    droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
    droppable.on('droppable:returned', () => console.log('droppable:returned'));

    for (const task of scheduledTasks) {
      // create <div> with the `scheduled-task` class
      // height = duration, `top` position property = its actual timing
    }
  })
</script>

<style>
  .calendar-time-block {
    height: 100px;
    width: 100%;
    position: relative;
    border-top: solid;
  }

  .time-indicator {
    position: relative; 
    top: -5px; 
    margin-right: 4px;
    font-size: 0.7rem;
  }

  .scheduled-task {
    display: inline;
    position: absolute;
    margin-left: 2px;
    border-left: 2px solid green;
    padding-left: 2px;
    font-size: 0.8rem;
    width: 100%;
  }
</style>