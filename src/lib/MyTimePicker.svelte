<div>
  <input 
    value={value} 
    on:input={(e) => selectTime(e.target.value)} 
    on:click={() => isMenuDisplayed = !isMenuDisplayed} 
    style="
      width: 64px; 
      font-size: 16px; 
      text-align: center; 
      height: 30px; 
      border-radius: 4px;
      border: 1px solid lightgrey;
    "
    on:focusout={() => {
      // isMenuDisplayed = false
    }}
  >

  {#if isMenuDisplayed}
    <div class="core-shadow cast-shadow" style="position: absolute; background: white; overflow-y: auto; overflow-x: hidden; width: fit-content;">
      <div class="my-grid">
        {#each hourChoices as hourChoice}
          <div on:click={() => selectTime(hourChoice)}
            class="time-option" 
            class:autoscroll={value === hourChoice}
            class:highlighted-option={value === hourChoice}
          >
            {hourChoice}
          </div>
        {/each}
      </div>
    </div>  
  {/if}
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  export let value = ''

  const dispatch = createEventDispatcher()
  let isMenuDisplayed = false

  const hourChoices = []
  for (let i = 6; i < 24; i++) {
    let hh = i
    if (hh < 10) {
      hh = `0${hh}`
    }
    hourChoices.push(hh + ':' + '00')
    hourChoices.push(hh + ':' + '30')
  }

  function selectTime (hourChoice) {
    dispatch('time-selected', { selectedHHMM: hourChoice })
    isMenuDisplayed = false
  }

</script>


<style lang="scss">
  .option-highlight {
    background-color: rgb(240, 240, 240);
  }

  .time-option:hover {
    @extend .option-highlight
  }

  .highlighted-option {
    background-color: rgb(240, 211, 157);
  }

  .invisible {
    display: none;
  }

  .my-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: fit-content;
    overflow-y: auto;
    height: 280px;
  }

  .time-option {
    padding: 4px 8px;
    font-size: 16px; 

    display: flex; 
    align-items: center;
    justify-content: center;
    width: 100%; 

    border: 1px solid lightgrey; 
    border-radius: 0px; 
  }
</style>