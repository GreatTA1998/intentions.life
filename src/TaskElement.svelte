<div 
  on:click={() => dispatch('task-click', { task })}
  class="scheduled-task clickable-task" 
  class:green={task.isDone}
  style="top: {offsetFromTop}px; 
         height: {height}px; 
         left: {offsetFromLeft}px;
         font-size: {fontSize}rem;"
>
  <div 
    class="task-name"
    draggable="true" 
    on:dragstart={(e) => dragstart_handler(e, task.name)} 
  >
    {task.name} 
  </div>

  <!-- Continuation of re-scheduling zone -->
  <slot>
    <div 
      class="task-drag-zone"
      style="height: {height - 20 - 10}px;" 
      draggable="true" 
      on:dragstart={(e) => dragstart_handler(e, task.name)}
    >

    </div>
  </slot>

  <!-- Bottom region for adjusting duration -->
  <div draggable="true"
    on:dragstart={(e) => mousedown_handler(e)}
    on:dragend={(e) => mouseup_handler(e, task)}
    style="height: {Math.max(height/4, 8)}px; width: 2vw; position: absolute; bottom: 0; left: -3px; cursor: ns-resize;"
  >

  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  export let task = null
  export let fontSize = 1
  export let offsetFromTop
  export let offsetFromLeft = 0
  export let height = 15 

  const dispatch = createEventDispatcher()
  let startY = 0
  const pixelsPerMinute = 90/60

  function dragstart_handler(e, taskName) {
    e.dataTransfer.setData("text/plain", taskName)
  }

  function getTrueY (e) {
    const ScrollContainer = document.getElementById('scroll-container')
    const element = document.getElementById("calendar-day-container")
    
    // compute y-offset
    // TODO: in practice there is a small discrepancy between where the drop is and where the mouse is 
    // because the user aims with the image corner whereas the code reads the precise mouse pointer location
    return  ScrollContainer.scrollTop + e.clientY - element.offsetTop
  }

  function mousedown_handler (e) {
    startY = getTrueY(e) // e.offsetYW
  }

  function mouseup_handler (e, task) {
    const newY = getTrueY(e)

    // quickfix
    if (!task.duration) {
      task.duration = 10
    }

    const minutesPerPixel = 60 / 90
    const durationChange = (newY - startY) * minutesPerPixel

    dispatch('task-duration-adjusted', {
      taskName: task.name,
      duration: Math.max(1, task.duration + durationChange) // can't have a 0 duration event
    })
  }
</script> 

<style>
.scheduled-task {
  /* font-size: 0.8rem; */
  display: inline;
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
  width: 11vw;
}

.task-name {
  width: 11vw; cursor: pointer; font-family: sans-serif; color: rgb(120, 120, 120);
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
</style>