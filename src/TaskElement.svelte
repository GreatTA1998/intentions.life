<div 
  on:click={() => dispatch('task-click', { task })}
  class="scheduled-task" 
  class:green={task.isDone}
  style="top: {offsetFromTop}px; 
         height: {height}px; 
         left: {offsetFromLeft}px;
         font-size: {fontSize}rem;"
>
  <div draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)} style="width: 11vw">
    {task.name} 
  </div>

  <!-- Continuation of re-scheduling zone -->
  <!-- border: 2px solid red; -->
  <slot>
    <div  
      style="height: {height - 20 - 10}px; width: 11vw" 
      draggable="true" on:dragstart={(e) => dragstart_handler(e, task.name)}
    >

    </div>
  </slot>

  <!-- Bottom region for adjusting duration -->
  <!-- border: 2px solid black; -->
  <div draggable="true"
    on:dragstart={(e) => mousedown_handler(e)}
    on:dragend={(e) => mouseup_handler(e, task)}
    style="height: 8px; width: 11vw; position: absolute; bottom: 0; left: -3px; cursor: ns-resize;"
  >

  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  export let fontSize = 1
  export let name = ''
  export let offsetFromTop
  export let offsetFromLeft = 0
  export let height = 15 //
  export let duration = 15
  export let task = null
  export let calendarStartTime = ''

  const dispatch = createEventDispatcher()
  let startY = 0
  const pixelsPerMinute = 90/60

  function dragstart_handler(e, taskName) {
    e.dataTransfer.setData("text/plain", taskName)
  }

  function mousedown_handler (e) {
    startY = e.offsetY
  }

  function mouseup_handler (e, task) {
    // alert(`From ${startY} to ${e.offsetY}`)

    // quickfix
    if (!task.duration) {
      task.duration = 10
    }

    const minutesPerPixel = 60 / 90
    const durationChange = (e.offsetY - startY) * minutesPerPixel

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
</style>