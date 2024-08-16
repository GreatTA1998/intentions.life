<img
  src={maplestoryAirshipsBackgroundURL}
  style="height: 100vh; width: 100vw; object-fit: cover; position: fixed; top: 0;"
>
{#if willMusicAutoplay}
  <audio 
    bind:this={AudioElem} 
    autoplay="true" 
    loop="true">
  </audio>
{/if}

<script>
  export let willMusicAutoplay

  import { getRandomInt } from '/src/helpers/everythingElse.js'
  import { onMount } from 'svelte'

  $: if (AudioElem) {
    AudioElem.src = chosenMusicFile
    AudioElem.volume = 0.02
  }

  const maplestoryAirshipsBackgroundURL =  'https://i.imgur.com/ShnqIpJ.jpeg'

  let AudioElem
  let isMusicPlaying = false
  let chosenMusicFile
  let musicFiles = [
    'illiyard-moor.mp3',
    'illiyard-moor-lofi.mp3',
    'ms-leafre-lofi.mp3'
  ]

  const d = new Date()

  // most energetic music is the illiyard-moor none-lofi
  if (d.getHours() < 13 - 1) {
    chosenMusicFile = musicFiles[0]
  }

  // afternoon more laid back
  else if  (d.getHours() >= 13 - 1) {
    chosenMusicFile = musicFiles[1]
  }

  // evening rain for sleep
  else if (d.getHours() >= 19 - 1) {
    chosenMusicFile = musicFiles[2]
  }

  // chosenMusicFile = musicFiles[getRandomInt(3)]

  // onMount(() => {
  //   if (AudioElem) {
  //     AudioElem.src = chosenMusicFile
  //     AudioElem.volume = 0.1
  //   }
  // })

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