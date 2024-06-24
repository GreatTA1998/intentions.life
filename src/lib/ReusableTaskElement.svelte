<!-- 
  mika blue color: '#0085FF'
  experimental green: '#509c13'
  Note, the HTML checkbox tick color literally cannot be changed, but it will be automatically white if it "decides" that our chosen background color is dark enough, 
  or vice versa
 -->
<div 
  bind:this={TaskElem}
  on:click={() => dispatch('task-click', { task })}
  draggable="true" 
  on:dragstart|self={(e) => startDragMove(e, task.id)} 
  on:drag={(e) => preventResizing(e)}

  on:touchstart|preventDefault={() => {}}
  on:touchmove|preventDefault={() => {}}
  class="claude-draggable-item"
  class:calendar-block={!isBulletPoint}
  style="
    position: relative;
    height: {height}px; 
    min-height: 12px;
    font-size: {fontSize}rem;
    opacity: {task.isDone ? '0.9' : '0.7'};
    background-color: {isBulletPoint ? '' : 'var(--experimental-black)'};
    background-image: {task.imageDownloadURL ? `url(${task.imageDownloadURL})` : ''};
    background-size: contain;
    background-repeat: no-repeat;
    padding-left: {isBulletPoint ? '0px' : 'var(--left-padding)'};
    padding-right: var(--left-padding);

    display: flex; flex-direction: column;
  " 
  on:keydown={() => {}}
>
  <!-- As long as this parent div is correctly sized, the duration adjusting area 
    will be positioned correctly (it's glued to the bottom of this parent div)

    `min-height` prevents the parent from being super small when it's bullet point mode
  -->
  <div style="display: flex; align-items: center; width: 100%;">
    {#if isBulletPoint}
      <span class="material-icons" 
        style="
          font-size: 2px; 
          margin-right: calc(var(--left-padding) - 2px);
          color: {task.isDone ? '#509c13' : 'rgb(20, 20, 20)'}; 
        "
      >
        circle
      </span>
    {/if}

    {#if hasCheckbox}
      <div>
        <!-- `checked` hydrates the initial value 
          `task-checkbox-change` event will just toggle the checkbox, 
          but in case we ever need the new value, it's `e.target.checked`
        -->
        <ReusableCheckbox
          value={task.isDone}
          on:change={(e) => dispatch('task-checkbox-change', {
            id: task.id,
            isDone: e.target.checked
          })}
        />
      </div>
    {/if}

    {#if task.iconDataURL}
      <img src={task.iconDataURL} style="pointer-events: none; width: 32px; height: 32px;">
    {:else}
      <div class="task-name truncate-to-one-line" style="color: {isBulletPoint ? '' : 'white'}">
        {task.name}
      </div>
    {/if}
  </div>
  <!-- End of task name flexbox -->

  {#if !isBulletPoint}
    <div style="flex-grow: 1; overflow: hidden; margin-top: 6px;">
      <div style="font-size: 12px; font-weight: 300; color: {isBulletPoint ? '' : 'white'};">
        {task.notes || ''}
      </div>
    </div>
  {/if}

    <!-- 
      `1vw`: if it's too wide, it overlaps with the task name for short duration tasks 
    -->
    <!-- on:drop preventDefault so that the calendar doesn't think we're scheduling a task -->
    <div draggable="true"
      on:dragstart={(e) => startAdjustingDuration(e)}
      on:dragend={(e) => adjustDuration(e, task)}
      style="
        cursor: ns-resize;
        position: absolute;
        left: -3px; 
        bottom: {0}px;
        height: {height/12}px; 
        min-height: 3px;
        width: {isBulletPoint ? '20%' : '100%'}; 
      "
    >
  </div>
</div>

<script>
  // Assumes `task` is hydrated
  import { createEventDispatcher } from 'svelte'
  import { getTrueY } from '/src/helpers.js'
  import { yPosWithinBlock, whatIsBeingDragged, whatIsBeingDraggedID, whatIsBeingDraggedFullObj } from '/src/store.js'
  import ReusableCheckbox from '$lib/ReusableCheckbox.svelte'

  export let task = null
  export let pixelsPerHour = null
  export let hasCheckbox = false

  export let fontSize = 1

  let TaskElem
  let initialX, initialY
  let realX, realY

  $: height = (pixelsPerHour / 60) * task.duration
  $: isBulletPoint = height < 24 // 24px is exactly enough to not crop the checkbox and the task name

  const dispatch = createEventDispatcher()
  let startY = 0

  const createImage = (width, height) => {

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'
      ctx.fillRect(0, 0, width, height)

      const img = new Image(width, height)
      img.src = canvas.toDataURL()

      return img
    }

  function startDragMove (e, id) {
    e.dataTransfer.setData("text/plain", id)

    // record distance from the top of the element
    const rect = e.target.getBoundingClientRect()
    const y = e.clientY - rect.top // y position within el ement

    whatIsBeingDraggedID.set(id)
    whatIsBeingDragged.set('room')
    whatIsBeingDraggedFullObj.set(task)

    yPosWithinBlock.set(y)

    initialX = e.clientX
    initialY = e.clientY


    var crt = TaskElem.cloneNode(true);
    crt.style.backgroundColor = "red";
    console.log('crt =', crt)
    console.log('rect.width =', rect.width)
    console.log("rect =", rect)
    crt.style.width = rect.width + 'px'
    crt.style.height = rect.height + 'px'
    console.log("crt.style.width =", crt.style.width)
    console.log("crt.style.jheight =", crt.style.height)
    // crt.style.display = 'none';
    document.body.appendChild(crt);
    // document.body.appendChild(crt);
    // const rect = TaskElem.getBoundingClientRect();

    const offsetX = 0
    const offsetY = 0
    // e.dataTransfer.setDragImage(crt, offsetX, offsetY);

    // hide the cloned element
    // crt.style.display = "none";
    // document.body.removeChild(crt)


    // empty image
    // const emptyImage = createImage(24, 24)
    // e.dataTransfer.setDragImage(emptyImage, 0, 0);


    console.log("TaskElem =", TaskElem)
    console.log("TaskElem.style.top =", TaskElem.style.top)
  }

  function preventResizing (e) {
    e.preventDefault()
    e.stopPropagation()
    
    // realX = e.clientX - initialX;
    // realY = e.clientY - initialY;
    TaskElem.style.opacity = 0.5;
    // TaskElem.style.transform = `translate(${realX}px, ${realY}px)`;
    // console.log("realx, realY =", realX, realY)
    // e.preventDefault()
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

    dispatch('task-update', {
      id: task.id,
      keyValueChanges: {
        duration: Math.max(1, task.duration + durationChange) // can't have a 0 duration event
      }      
    })
  }
</script> 

<style>
  :root {
    --left-padding: 6px;
    --default-task-color: hsla(210, 20%, 36%, 0.6);

    --experimental-black: hsla(0, 100%, 0%, 0.6);
    --experimental-purple: hsla(248, 53%, 58%, 0.6);
    --experimental-red: hsla(0, 100%, 50%, 0.6);
  }

  .claude-draggable-item {
    border: 2px solid red;
    touch-action: none; /* Prevent default touch behaviors */
    user-select: none; /* Prevent text selection */
    will-change: transform; /* Gives browser a heads-up for optimization */
  }

  .claude-draggable-item:active {
    cursor: grabbing; 
  }

  .calendar-block {
    width: 100%;
    padding-top: var(--left-padding);
    cursor: pointer;
    border-radius: var(--left-padding);
  }

  .task-name {
    margin-top: -1px; 
    margin-left: 4px; 
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer; 
    color: rgb(0, 0, 0);
  }
</style>