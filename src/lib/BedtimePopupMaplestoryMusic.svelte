<button on:click={toggleMusic}>
  Lofi Maplestory
</button>

<audio bind:this={AudioElem}></audio>

<script>
  import { getRandomInt } from '/src/helpers.js'
  import { onMount } from 'svelte'

  let AudioElem
  let isMusicPlaying = false
  let chosenMusicFile
  let musicFiles = [
    'illiyard-moor.mp3',
    'illiyard-moor-lofi.mp3',
    'ms-leafre-lofi.mp3'
  ]
  chosenMusicFile = musicFiles[getRandomInt(3)]

  onMount(() => {
    AudioElem.src = chosenMusicFile
  })

  function toggleMusic () {
    AudioElem.volume = 0.1
    if (AudioElem.paused) {
      AudioElem.play()
      isMusicPlaying = true
    }
    else {
      AudioElem.pause()
      isMusicPlaying = false
    }
  }
</script>

<style>
  button {
    display: block; 
    margin: auto;
    margin-top: 20px; 
    color: #fff;
  }

  button {
    display: block;
    align-items: center;
    justify-content: center;
    width: 200px; 
    height: 40px;
    color: #0085FF;
    border: 1px solid #F4F4F4;
    background-color: #F4F4F4;
    vertical-align: middle;
    font-family: sans-serif;
    border-radius: 20px;
    margin: auto;
    padding: 0px;
    font-size: 15px;
    margin-top: 10px;
  }

  button:hover, :focus {
    display: block;
    align-items: center;
    justify-content: center;
    width: 200px; 
    height: 40px;
    color: #ffffff;
    background-color: #0085FF;
    border: 1px solid #0085FF;
    vertical-align: middle;
    font-family: sans-serif;
    border-radius: 20px;
    margin: auto;
    transition: all 0.2s ease-out;
    margin-top: 10px;
  }
</style>