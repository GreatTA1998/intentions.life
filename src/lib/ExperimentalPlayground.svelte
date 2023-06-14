<div on:click={handleClick} style="overflow-y: scroll;" bind:this={ScrollElement}>
  offsetFromTop { offsetFromTop }
  Distance scrolled { distanceScrolled }
  Mouse position: { mousePosition }

  <div style="height: 200%;"></div>
</div>

<script>
  let offsetFromTop = null
  let distanceScrolled = null 
  let mousePosition = null

  let ScrollElement

  function handleClick (e) {
    mousePosition = e.clientY
    distanceScrolled = ScrollElement.scrollTop
    // offsetFromTop = 
  }
</script>