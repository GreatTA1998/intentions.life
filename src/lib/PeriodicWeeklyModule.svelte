<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
  <div style="display: flex;">
    {#each {length: 7} as _, i}
      <div 
        on:click={() => repeatOnDayOfWeek[i] = !repeatOnDayOfWeek[i]} 
        class="circle"
        class:not-selected={!repeatOnDayOfWeek[i]}
        class:highlighted={repeatOnDayOfWeek[i]}
      >
        {dayOfWeekSymbol[i]}
      </div>
    {/each}
  </div>
  
  <div style="display: flex; align-items: center;">
    <div>
      Show repeats
    </div>

    <div>
      <input class="underlined-input"
        value={numOfWeeksInAdvance}
        on:input={e => numOfWeeksInAdvance = e.target.value}
      >
    </div>
    weeks ahead
  </div>

  {#if isEditingPeriodicity}
    <ReusableRoundButton on:click={() => {
      dispatch('new-weekly-schedule', { repeatOnDayOfWeek, numOfWeeksInAdvance })
      isEditingPeriodicity = false
    }}
      backgroundColor="rgb(0, 89, 125)" textColor="white"
    >
      Save changes
    </ReusableRoundButton>
  {/if}
</div>

<script>
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import { createEventDispatcher } from 'svelte'

  export let weeklyTemplate
  
  let numOfWeeksInAdvance = weeklyTemplate.numOfWeeksInAdvance || 2
  let repeatOnDayOfWeek = weeklyTemplate.repeatOnDayOfWeek
  const old = [...repeatOnDayOfWeek]
  let dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  let isEditingPeriodicity = false
  const dispatch = createEventDispatcher()

  $: {
    if (areArraysEqual(repeatOnDayOfWeek, old)  
      && weeklyTemplate.numOfWeeksInAdvance === numOfWeeksInAdvance
    ) { 
      isEditingPeriodicity = false
    } else {
      isEditingPeriodicity = true
    }
  }

  function areArraysEqual(a1, a2) {
    var i = a1.length;
    while (i--) {
        if (a1[i] !== a2[i]) return false;
    }
    return true
  }
</script>

<style>
  .underlined-input {
    border: none;
    border-bottom: 2px solid #313131;
    outline: none;
    padding: 4px;
    padding-bottom: 4px;
    font-size: 16px;
    width: 20px;
    margin: 4px;
    font-weight: 500;
  }

  .circle {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;

    /* extra */
    margin-right: 8px;
    cursor: pointer;
  }

  .not-selected {
    color: rgb(160, 160, 160);
    background-color: rgb(100, 100, 100);
    background: #000;
  }

  .highlighted {
    background-color: orange;
    color: black;
    font-weight: 600;
  }
</style>