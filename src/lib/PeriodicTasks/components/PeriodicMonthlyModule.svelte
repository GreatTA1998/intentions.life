<script>
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import { updateCrontab } from '../utils.js'

  export let template

  let oldSelectedDays = template.crontab.split(' ')[2].split(',')
  let selectedDays = template.crontab.split(' ')[2].split(',')
  let isEditingPeriodicity = false

  function handleSave() {
    updateCrontab({ selectedDays, template, crontabIndex: 2 })
    isEditingPeriodicity = false
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
    <div
      style="position: absolute; display: flex; width: 90px; outline: 0px solid red; align-items: center;"
    >
      {#each Array(27) as _, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={()=>handleSelectDay(String(i))}
          class="day-of-month-square
          class:highlighted={selectedDays.includes(String(i))}
        >
          {i + 1}
        </div>
      {/each}

      <!-- these look like orange dots -->
      <!-- {#each Array(27) as _, i}
          {#if [i]}
            <div style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                position: absolute; 
                left: {3 * i}px
              "
              class="highlighted"
            >
            </div>
          {/if}
        {/each} -->
    </div>
  </div>

  {#if isEditingPeriodicity}
    <ReusableRoundButton
      on:click={handleSave}
      backgroundColor="rgb(0, 89, 125)"
      textColor="white"
    >
      Save changes
    </ReusableRoundButton>
  {/if}
</div>

<div
  style="position: relative; width: 94px; height: 20px; display: flex; align-items: center;"
>
  <div
    style="position: relative; width: 94px; height: 1px; background-color: #ccc; display: flex; align-items: center;"
  >
    <span class="tick start"></span>
    <span class="tick end"></span>
  </div>

  <!-- orange circle dots -->
  <div
    style="position: absolute; display: flex; width: 90px; outline: 0px solid red; align-items: center;"
  >
    {#each Array(27) as _, i}
      {#if periodicTask.repeatOnDayOfMonth[i]}
        <div
          style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                            position: absolute; 
                            left: {3 * i}px
                          "
          class="highlighted"
        ></div>
      {/if}
    {/each}

    {#if periodicTask.willRepeatOnLastDay}
      <div
        style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                          position: absolute; left: {3 * 30}px
                        "
        class="highlighted"
      ></div>
    {/if}
  </div>
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
