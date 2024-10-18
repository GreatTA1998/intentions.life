<script>
  import { onMount } from 'svelte'
  import { getRandomColor } from '/src/helpers/everythingElse.js'
  import { user } from '/src/store.js'
  import { doodleIcons } from '/src/store.js'
  import Icons from '/src/back-end/Icons.js'
  import { getRandomID } from '/src/helpers/everythingElse.js'
  let colors = ['black', 'orange', 'red', 'lightblue', 'blue', 'green']
  let name = ''
  let tags = ''
  let isShareable = false
  onMount(() => {
    canvas = document.getElementById('whiteboard')
    ctx = canvas.getContext('2d')
  })

  let drawing = false
  let color = 'black'
  let prevX = 0
  let prevY = 0
  let canvas
  let ctx

  function handleSave() {
    const dataURL = canvas.toDataURL()
    Icons.uploadIconDataURL({
      createdBy: $user.uid,
      id: getRandomID(),
      name,
      dataURL,
      isShareable,
      tags
    })
      .then((newIcon) => {
        $doodleIcons = [...$doodleIcons, newIcon]
        clearBoard()
      })
      .catch((err) =>
        console.error('error in BasicWhiteboard.svelte handleSave,', err)
      )
  }

  function handleStart(event) {
    event.preventDefault()
    drawing = true
    draw(event)
  }

  function handleEnd(event) {
    event.preventDefault()
    drawing = false
    prevX = 0
    prevY = 0 // Reset previous position
  }

  function handleMove(event) {
    event.preventDefault()
    if (!drawing) return
    draw(event)
  }

  function draw(event) {
    const rect = canvas.getBoundingClientRect()
    ctx.strokeStyle = color
    ctx.lineWidth = 6

    let x, y
    if (
      event.type === 'mousedown' ||
      event.type === 'mouseup' ||
      event.type === 'mousemove'
    ) {
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    } else if (
      event.type === 'touchstart' ||
      event.type === 'touchend' ||
      event.type === 'touchmove'
    ) {
      x = event.touches[0].clientX - rect.left
      y = event.touches[0].clientY - rect.top
    }

    if (drawing) {
      ctx.beginPath()
      if (prevX && prevY) ctx.moveTo(prevX, prevY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    prevX = x
    prevY = y
  }

  function clearBoard() {
    const canvas = document.getElementById('whiteboard')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    name = ''
    tags = ''
    isShareable = false
  }

  function changeColor(newColor) {
    color = newColor
  }
</script>

<div style="display: flex; ">
  <div>
    <div
      style="display: flex; justify-content: space-around; margin-bottom: 8px; width: 240px;"
    >
      {#each colors as pencilColor}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="color-circle"
          on:click={() => (color = pencilColor)}
          style="background-color: {pencilColor}"
        ></div>
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        class="material-icons"
        on:click={() => (color = getRandomColor())}
        style="cursor: pointer;"
      >
        casino
      </span>
    </div>

    <canvas
      id="whiteboard"
      width="240"
      height="240"
      on:mousedown={handleStart}
      on:mouseup={handleEnd}
      on:mousemove={handleMove}
      on:touchstart={handleStart}
      on:touchend={handleEnd}
      on:touchmove={handleMove}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
    <div>
   
      <button on:click={clearBoard}>Clear</button>
      {#if name}
      <button class="save-button" on:click={handleSave}>Save</button>
    {/if}
    </div>
  </div>
  <div class="input-container">
    <label for="name">Name:</label>
    <input id="name" type="text" bind:value={name} placeholder="funny-moves" />
    
    <label for="tags">Tags:</label>
    <input id="tags" type="text" bind:value={tags} placeholder="e.g. funny, moves, doodle" />
    
    <label for="public">Public:</label>
    <input id="public" type="checkbox" bind:checked={isShareable} />
  </div>
 
</div>

<style>
  #whiteboard {
    border: 1px solid #000;
    cursor: crosshair;
  }

  .color-circle {
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
  .input-container {
    margin-left: 20px;
    margin-top: 50px;
    display: grid;
    max-height: 100px;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
  }

  .input-container label {
    text-align: left;
  }

  .input-container input[type="text"] {
    width: 100%;
  }

  .input-container input[type="checkbox"] {
    justify-self: start;
  }
  button {
    padding: 8px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    background-color: #f8fafc;
    color: #64748b; 
  }

  button:hover {
    background-color: #e2e8f0;
    color: #1e293b;
  }

  .save-button {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  .save-button:hover {
    background-color: #2563eb;
    border-color: #2563eb;
  }
</style>
