<div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 8px; width: 240px;">
    {#each colors as pencilColor}
      <div class="color-circle"
        on:click={() => color = pencilColor}
        style="background-color: {pencilColor}">
      </div>
      {/each}
      <span class="material-icons" on:click={() => color = getRandomColor()} style="cursor: pointer;">
        casino
      </span>
  </div>

  <canvas id="whiteboard" width="240" height="240"
    on:mousedown={handleStart}
    on:mouseup={handleEnd}
    on:mousemove={handleMove}
    on:touchstart={handleStart}
    on:touchend={handleEnd}
    on:touchmove={handleMove}>
    Your browser does not support the HTML5 canvas tag.
  </canvas>

  <div>
    <button on:click={exportAsDataURL}>Save</button>
    <button on:click={clearBoard}>Clear</button>
  </div>
</div>

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { getRandomColor } from '/src/helpers/everythingElse.js'

  let colors = ['black', 'orange', 'red', 'lightblue', 'blue', 'green']

  onMount(() => {
    canvas = document.getElementById('whiteboard');
    ctx = canvas.getContext('2d');
  })

  const dispatch = createEventDispatcher()

  let drawing = false;
  let color = 'black';
  let prevX = 0;
  let prevY = 0;
  let canvas
  let ctx
  
  function exportAsDataURL () {
    dispatch('new-icon-data-url', { canvas })
  }

  function handleStart(event) {
    event.preventDefault()
    drawing = true;
    draw(event);
  }

  function handleEnd(event) {
    event.preventDefault()
    drawing = false;
    prevX = 0;
    prevY = 0; // Reset previous position
  }

  function handleMove(event) {
    event.preventDefault()
    if (!drawing) return;
    draw(event);
  }

  function draw(event) {
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;

    let x, y;
    if (event.type === 'mousedown' || event.type === 'mouseup' || event.type === 'mousemove') {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    }


    if (drawing) {
      ctx.beginPath();
      if (prevX && prevY) ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    prevX = x;
    prevY = y;
  }

  function clearBoard() {
    const canvas = document.getElementById('whiteboard');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function changeColor(newColor) {
    color = newColor;
  }
</script>

<style>
  #whiteboard {
    border: 1px solid #000;
    cursor: crosshair;
  }

  .color-circle {
    width: 24px; height: 24px; border-radius: 12px;
  }
</style>
