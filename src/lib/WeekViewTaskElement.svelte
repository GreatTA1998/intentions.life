<!-- offset from top  -->
{#if offsetFromTop || disableAbsolutePosition}
  <div 
    on:click={() => dispatch('task-click', { task })}
    class="scheduled-task clickable-task" 
    class:green={task.isDone}
    style="top: {disableAbsolutePosition ? '0;' : `${offsetFromTop}px`};
          position: {disableAbsolutePosition ? 'static' : 'absolute'};
          height: {height}px; 
          left: {offsetFromLeft}px;
          font-size: {fontSize}rem;
          "
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
      <div 
        class="task-drag-zone"
        style="height: {height - 20 - 10}px;" 
        draggable="true" 
        on:dragstart={(e) => dragstart_handler(e, task.id)}
      >

      </div>
    </slot>

    <!-- Bottom region for adjusting duration -->
    <div draggable="true"
      on:dragstart={(e) => mousedown_handler(e)}
      on:dragend={(e) => mouseup_handler(e, task)}
      style="height: {height/8}px; width: 2vw; position: absolute; bottom: 0; left: -3px; cursor: ns-resize;"
    >

    </div>
  </div>
{/if}

<script>
  import { createEventDispatcher } from 'svelte'
  import { getTrueY, computeOffset } from '/src/helpers.js'

  export let pixelsPerDay
  export let task = null
  export let fontSize = 1
  export let offsetFromLeft = 0
  export let height
  export let disableAbsolutePosition = false

  export let offsetFromTop

  const dispatch = createEventDispatcher()
  let startY = 0
  const pixelsPerMinute = 90/60

  function dragstart_handler(e, id) {
    e.dataTransfer.setData("text/plain", id)
  }

  function mousedown_handler (e) {
    startY = getTrueY(e)
  }

  function mouseup_handler (e, task) {
    const newY = getTrueY(e)

    // quickfix
    if (!task.duration) {
      task.duration = 10
    }

    const daysPerPixel = 1 / pixelsPerDay
    const minutesPerPixel = 24 * 60 * daysPerPixel

    // const minutesPerPixel = 1 / pixelsPerDay
    // const minutesPerPixel = 60 / PIXELS_PER_HOUR
    const durationChange = (newY - startY) * minutesPerPixel

    dispatch('task-duration-adjusted', {
      taskName: task.name,
      id: task.id,
      duration: Math.max(1, task.duration + durationChange) // can't have a 0 duration event
    })
  }
</script> 

<style>
.scheduled-task {
  /* font-size: 0.8rem; */
  /* display: inline; */
  position: absolute;
  margin-left: 2px;
  border-left: 2px solid grey;
  padding-left: 2px;
  width: 100%;
}

.green {
  border-left: 2px solid green;
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