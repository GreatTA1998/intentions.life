<video 
  src="/anime-rain-town.mp4" 
  loop="true" 
  autoplay="true" 
  style="height: 100vh; width: 100vw; object-fit: cover; position: fixed; top: 0; bottom: auto; bottom: auto; z-index: 0">
</video>

{#if willMusicAutoplay}
  <audio 
    bind:this={AudioElem} 
    src="/rainsound.mp3" 
    loop="true" 
    autoplay="true"
  >
  </audio>
{/if}

<script>
  export let willMusicAutoplay
  
  import { onMount } from 'svelte'

  let AudioElem

  $: if (AudioElem) {
    AudioElem.volume = 0.2
  }
</script>