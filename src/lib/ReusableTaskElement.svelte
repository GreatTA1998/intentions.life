<div 
  bind:this={TaskElem}
  on:click={() => dispatch('task-click', { task })}
  draggable="true" 
  on:dragstart|self={(e) => startDragMove(e, task.id)} 
  on:drag={(e) => preventResizing(e)}

  on:touchstart={() => {}}
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

  function startDragMove (e, id) {
    const rect = e.target.getBoundingClientRect()
    TaskElem.style.width = rect.width + 'px'
    // IT TURNS OUT BOTH ARE NECESSARY
    // INITIAL WIDTH: 188PX
    // FINAL WIDTH: 188PX
    console.log("TaskElem.style.width =", TaskElem.style.width)
    // TaskElem.style.height = rect.height + 'px'

    e.dataTransfer.setData("text/plain", id)

    // record distance from the top of the element
    const y = e.clientY - rect.top // y position within el ement

    whatIsBeingDraggedID.set(id)
    whatIsBeingDragged.set('room')
    whatIsBeingDraggedFullObj.set(task)

    yPosWithinBlock.set(y)
  }

  function preventResizing (e) {
    TaskElem.style.opacity = 0.5;
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
    /* prevent the long press behavior */
    -webkit-touch-callout: none;
    -webkit-transform: none !important;
    border: 2px solid red;
    touch-action: none; /* Prevent default touch behaviors */
    user-select: none; /* Prevent text selection */
    will-change: transform; /* Gives browser a heads-up for optimization */
  }

  .claude-draggable-item:active {
    cursor: grabbing; 
  }

  .calendar-block {
    /* 
      hard-coded to be 188px = 94% width of parent, so iOS doesn't shrink the element during drag-and-drop
      
      Tried 120px (GOOD)
      Tried 154px (GOOD)
      Tried 157.25px 
      Tried 160.5px (DOESN'T SHRINK BUT AFFECTED BY PRESS)
      Tried 167px (DOESN'T SHRINK BUT UNPREDICTABLE OFFSET)
      Tried 180px (FAIL)
      Tried 187px (FAIL)
      Tried 188px (FAIL)
    */
    width: 157.25px; 
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