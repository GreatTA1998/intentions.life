<script>
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'

  export let weeklyTask
  export let updateWeeklyTemplate = () => {}

  let oldSelectedDays = weeklyTask.crontab.split(' ')[4].split(',')
  let dayOfWeekSymbol = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let selectedDays = weeklyTask.crontab.split(' ')[4].split(',')
  let isEditingPeriodicity = false

  const updateCrontab = () => {
    console.log('updateCrontab', selectedDays)
    let updatedCrontab = weeklyTask.crontab.split(' ');
    updatedCrontab[4] = selectedDays.length ? selectedDays.sort().join(',') : '*';
    updatedCrontab = updatedCrontab.join(' ');
    console.log('updatedCrontab', updatedCrontab)
    updateWeeklyTemplate({ crontab: updatedCrontab })
    isEditingPeriodicity = false;
  }

  function handleSelectDay(i) {
    if (selectedDays.includes(i)) {
      selectedDays = selectedDays.filter((day) => day !== i)
    } else {
      selectedDays = [...selectedDays, i]
    }
  }

  $: {
    isEditingPeriodicity = oldSelectedDays.join(',') !== selectedDays.join(',')
  }
</script>

<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
  <div style="display: flex;">
    {#each { length: 7 } as _, i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => handleSelectDay(String(i))}
        class="circle"
        class:not-selected={!selectedDays.includes(String(i))}
        class:highlighted={selectedDays.includes(String(i))}
      >
        {dayOfWeekSymbol[i]}
      </div>
    {/each}
  </div>

  {#if isEditingPeriodicity}
    <ReusableRoundButton
      on:click={updateCrontab}
      backgroundColor="rgb(0, 89, 125)"
      textColor="white"
    >
      Save changes
    </ReusableRoundButton>
  {/if}
</div>

<style>
  /* .underlined-input {
    border: none;
    border-bottom: 2px solid #313131;
    outline: none;
    padding: 4px;
    padding-bottom: 4px;
    font-size: 16px;
    width: 20px;
    margin: 4px;
    font-weight: 500;
  } */

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
