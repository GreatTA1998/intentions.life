<div 
  on:click={() => dispatch('task-click', { task })}
  on:keydown={() => {}}
  class:green={task.isDone}
  style="
    position: relative;
    height: {height}px; 
    font-size: {fontSize}rem;
  "
  class="scheduled-task" 
>
  <div 
    class="task-name"
    draggable="true" 
    on:dragstart={(e) => dragstart_handler(e, task.id)} 
    class:smallest-text={task.duration === 1}
  >
    {task.name} 
  </div>

  <!-- Continuation of re-scheduling zone -->
  <slot>
    <!-- <div 
      class="task-drag-zone"
      style="height: {height * 7/16}px;" 
      draggable="true" 
      on:dragstart={(e) => dragstart_handler(e, task.id)}
    >

    </div> -->
  </slot>

    <!-- 
      `1vw`: if it's too wide, it overlaps with the task name for short duration tasks 
    -->
    <div draggable="true"
      on:dragstart={(e) => startAdjustingDuration(e)}
      on:dragend={(e) => adjustDuration(e, task)}
      style="
        cursor: ns-resize;
        position: absolute;
        left: -3px; 
        bottom: {0}px;
        height: {height/8}px; 
        min-height: 6px;
        width: 1vw; 
      "
    >
  </div>
</div>

<script>
  // Assumes `task` is hydrated
  import { createEventDispatcher } from 'svelte'
  import { getTrueY } from '/src/helpers.js'

  export let task = null
  export let pixelsPerHour = null

  export let fontSize = 1

  $: height = (pixelsPerHour / 60) * task.duration

  const dispatch = createEventDispatcher()
  let startY = 0

  function dragstart_handler(e, id) {
    e.dataTransfer.setData("text/plain", id)
  }

  function startAdjustingDuration (e) {
    startY = getTrueY(e)
  }

  function adjustDuration (e, task) {
    // quickfix
    if (!task.duration) {
      task.duration = 10
    }

    const hoursPerPixel = 1 / pixelsPerHour
    const minutesPerPixel = 60 * hoursPerPixel

    const newY = getTrueY(e)
    const durationChange = minutesPerPixel * (newY - startY)

    dispatch('task-duration-adjusted', {
      taskName: task.name,
      id: task.id,
      duration: Math.max(1, task.duration + durationChange) // can't have a 0 duration event
    })
  }
</script> 

<style>
  .scheduled-task {
    margin-left: 2px;
    border-left: 2px solid grey;
    padding-left: 2px;
    width: 100%;

    /* font-size: 0.8rem; */
    /* display: inline; */
    /* position: absolute; */
  }

  .green {
    border-left: 2px solid #0085FF;
  }

  .task-drag-zone {
    width: 10vw;
  }

  .task-name {
    font-family: Roboto, sans-serif; 
    width: 11vw; cursor: pointer; font-family: sans-serif; color: #6D6D6D;
  }

  /* Small Devices, Tablets and bigger devices */
  @media only screen and (max-width : 480px) {
    .task-drag-zone {
      width: 150px;
    }
    .task-name {
      width: 150px
    }
  }

  @media only screen and (min-width : 480px) {
    .task-drag-zone {
      width: 11vw;
    }
    .task-name {
      width: 11vw;
    }
  }

  .smallest-text {
    font-size: 0.6rem;
    color: black;
  }
</style>