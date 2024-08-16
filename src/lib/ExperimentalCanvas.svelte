
<BasicWhiteboard
  on:new-icon-data-url={(e) => {
    finalDataURL = e.detail.canvas.toDataURL()
    saveDoodleIconToDatabase(finalDataURL)
  }}
/>

<script>
  import { onMount } from 'svelte'
  import ExperimentalCanvasWhiteboard from '$lib/ExperimentalCanvasWhiteboard.svelte'
  import { setFirestoreDoc } from '/src/crud.js'
  import { getRandomID } from '/src/helpers/everythingElse.js'
  import { user } from '/src/store.js'

  function saveDoodleIconToDatabase (dataURL) {  
    const id = getRandomID()
    setFirestoreDoc(`/doodleIcons/${id}`, {
      id,
      dataURL,
      creatorUID: $user.uid
    })
  }

  let finalDataURL = ''

  onMount(() => {

  })

  // This creates patchy dots instead of continuous strokes, so we longer use this
  function reduceFileSize (canvas) {
    const resizedCanvas = document.createElement('canvas');
    const resizedWidth = 48; // Desired width of the resized image
    const resizedHeight = 48; // Desired height of the resized image
    resizedCanvas.width = resizedWidth;
    resizedCanvas.height = resizedHeight;

    // Draw the original canvas onto the resized canvas
    const resizedCtx = resizedCanvas.getContext('2d');
    resizedCtx.drawImage(canvas, 0, 0, resizedWidth, resizedHeight);

    // Save the resized canvas as a data URL
    const resizedDataURL = resizedCanvas.toDataURL('image/png');

    // Do something with the resized data URL, e.g., log it or download it
    console.log(resizedDataURL);
    return resizedDataURL
  }
</script>