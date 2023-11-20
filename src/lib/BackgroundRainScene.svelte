<video src="/anime-rain-town.mp4" loop="true" autoplay="true" style="height: calc(100vh - 60px); width: 100vw; object-fit: cover;"></video>
<audio bind:this={AudioElem} src="/rainsound.mp3" loop="true" autoplay="true"></audio>

<script>
  import { onMount } from 'svelte'

  let AudioElem

  onMount(() => {
    AudioElem.volume = 0.2
  })
</script>