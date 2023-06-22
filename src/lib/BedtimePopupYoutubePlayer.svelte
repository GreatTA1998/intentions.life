
<div id="player"></div>

<input
  type="range"
  min="0"
  max="100"
  step="1"
  on:input={changeVolume}
/>

<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher()

  let player = null

  export let volume

  // everytime `volume` prop changes, set the player's volume
  $: setVolume(volume)

  onMount(() => {
    // 1. This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = initializePlayer
  })

  function initializePlayer() {
    const videoId = 'POASGRhM3wo'
    player = new YT.Player('player', {
      height: 50, 
      width: 50,
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
      },
    })
  }

  function onPlayerReady(event) {
    event.target.playVideo()
    dispatch('initial-volume', { initialVolume: player.getVolume() })
  }

  function changeVolume(event) {
    const newVolume = parseFloat(event.target.value);
    player.setVolume(newVolume);
    dispatch('initial-volume-changed', { initialVolume: newVolume })
  }

  // public function
  function setVolume (newVolume) {
    if (player && player.setVolume) {
      player.setVolume(newVolume)
    }
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }

  function stopVideo() {
    player.stopVideo();
  }
</script>