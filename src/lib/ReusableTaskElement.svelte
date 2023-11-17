<!-- 
  mika blue color: '#0085FF'
  experimental green: '#509c13'
  Note, the HTML checkbox tick color literally cannot be changed, but it will be automatically white if it "decides" that our chosen background color is dark enough, 
  or vice versa
 -->
<div 
  on:keydown={() => {}}
  class:scheduled-task={!isBulletPoint}
  style="
    position: relative;
    height: {height}px; 
    font-size: {fontSize}rem;
    border-left: {isBulletPoint ? 0 : 2}px solid {task.isDone ? '#509c13' : 'grey'};
    min-height: 12px;
  "
>
  <!-- As long as this parent div is correctly sized, the duration adjusting area 
    will be positioned correctly (it's glued to the bottom of this parent div)

    `min-height` prevents the parent from being super small when it's bullet point mode
  -->
  <div style="display: flex; align-items: center;">
    {#if isBulletPoint}
      <div 
        class:normal-text={!isBulletPoint}
        class:smallest-text={isBulletPoint}
        style="color: {task.isDone ? '#509c13' : 'grey'}; margin-left: 1px; margin-bottom: 5px; margin-right: 2px;"
      >
        <span class="material-icons" style="font-size: 2px;">circle</span>
      </div>
    {/if}

    {#if hasCheckbox}
      <div>
        <!-- `checked` hydrates the initial value 
          `task-checkbox-change` event will just toggle the checkbox, 
          but in case we ever need the new value, it's `e.target.checked`
        -->
        <input type="checkbox" 
          style="
            zoom: {isBulletPoint ? 0.8 : 0.95};
            accent-color: {task.isDone ? '#509c13' : ''}
          "
          checked={task.isDone}
          on:change={(e) => dispatch('task-checkbox-change', {
            isDone: e.target.checked,
            id: task.id
          })}
        >
      </div>
    {/if}

    {#if isBulletPoint}
      <div style="margin-right: 3px"></div>
    {/if}

    <div 
      style="margin-top: 2px;"
      class="task-name"
      draggable="true" 
      on:click={() => dispatch('task-click', { task })}
      on:dragstart={(e) => dragstart_handler(e, task.id)} 
      class:smallest-text={isBulletPoint}
    >
      {task.name} 
    </div>
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
        min-height: 4px;
        width: 0.5vw; 
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
  export let hasCheckbox = false

  export let fontSize = 1

  $: height = (pixelsPerHour / 60) * task.duration
  $: isBulletPoint = height < 10

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
    /* border-left: 2px solid grey; */
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
    width: 11vw; 
    cursor: pointer; 
    font-family: sans-serif; color: #6D6D6D;
  }

  .normal-text {
    font-family: Roboto, sans-serif; 
    font-family: sans-serif; color: #6D6D6D;
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