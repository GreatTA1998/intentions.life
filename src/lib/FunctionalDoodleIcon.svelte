<div style="position: relative;">
  <!-- pointer-events: none; -->
  <img 
    on:click|stopPropagation={handleSingleOrDoubleClick}
    src={iconTask.iconDataURL} 
    class:clearly-visible={iconTask.isDone}
    class:task-not-done={!iconTask.isDone}
    style="width: 32px; height: 32px; border: 0px solid blue; cursor: pointer;"
    class:radial-glow={iconTask.isDone}
    draggable="true"
    on:dragstart|self={(e) => startDragMove(e, iconTask.id)} 
  >
</div>

<!-- 
  <div style="font-size: 2px;">{iconTask.name}</div>
  <div style="font-size: 2px;">{iconTask.repeatGroupID}</div> 
-->

<script>
  import { 
    whatIsBeingDragged, 
    whatIsBeingDraggedID, 
    whatIsBeingDraggedFullObj,
    yPosWithinBlock
  } from "/src/store.js"
  import { createEventDispatcher } from 'svelte'

  export let iconTask

  let timer
  let delay = 200

  const dispatch = createEventDispatcher()

  function handleSingleOrDoubleClick () {
    if (timer) {
      clearTimeout(timer)
      timer = null
      console.log('double click detected')

      dispatch('task-checkbox-change', { id: iconTask.id, isDone: !iconTask.isDone })
    } 
    else {
      console.log("first click detected")
      timer = setTimeout(() => {
        console.log('handled as single click')
        dispatch('task-click', { task: iconTask })
      
        timer = null
      }, delay)
    }
  }

  function startDragMove (e, id) {
    e.dataTransfer.setData("text/plain", id)

    // record distance from the top of the element
    const rect = e.target.getBoundingClientRect()
    const y = e.clientY - rect.top // y position within el ement

    whatIsBeingDraggedID.set(id)
    whatIsBeingDragged.set('room')
    whatIsBeingDraggedFullObj.set(iconTask)

    yPosWithinBlock.set(y)
  }
</script>

<style>
  .task-not-done {
    filter: grayscale(80%) opacity(0.8) blur(0.8px);
  }

  .clearly-visible {
    opacity: 1;
  }

  .completed-green-glow {
    /* background-color: green; */
    /* content: "";
    position: absolute; */
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    /* width: calc(100% + 40px); 
    height: calc(100% + 40px); */
    background-color: rgba(10, 191, 223, 0.842);
    /* border-radius: 50%; */
    /* box-shadow: 0 0 20px rgba(0, 128, 0, 0.5); */
    /* z-index: -1; */
    /* opacity: 0.5; */
  }

  /* .radial-glow {
    background: radial-gradient(circle, rgba(139, 93, 245, 0.5) 0%, rgba(255, 255, 0, 0) 80%);
    border-radius: 50%;
  } */
</style>