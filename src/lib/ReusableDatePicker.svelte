<div>
  <!-- you're more likely to need to change the day, rather than month,
  so DD:MM format is better than MM:DD -->

  <div style="display: flex; align-items: center;">
    <div style="height: 60px; width: fit-content; overflow-y: auto; overflow-x: hidden;">
      {#each dayChoices as dayChoice}
        <div class:blue-highlight={currentlySelectedDay === dayChoice} 
          on:click={() => currentlySelectedDay = dayChoice}
          style="font-size: 1.5rem;"
        >
          {dayChoice}
        </div>
      {/each}
    </div>

    <!-- <div style="height: 60px; width: fit-content; overflow-y: auto; overflow-x: hidden;"> -->
      {#each monthChoices as monthChoice}
        <div class:blue-highlight={currentlySelectedMonth === monthChoice} 
          on:click={() => currentlySelectedMonth = monthChoice}
          style="margin-left: 10px; font-size: 1.5rem;"
        >
          {monthChoice}
        </div>
      {/each}
    <!-- </div> -->

    <!-- TO-DO: give a range of hours and minutes to pick as well, but leave this for tomorrow
    
    -->

    <button style="margin-left: 10px;" 
      on:click={() => dispatch('date-picked', { 
        selectedMonth: currentlySelectedMonth, selectedDay: currentlySelectedDay
      })}
    >
      Confirm
    </button>
  </div>
</div>

<script>
  import { getDateInMMDD, getMonthNameFromNumber } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'

  let currentlySelectedDate = null
  let currentlySelectedDay = null
  let currentlySelectedMonth = null

  const dispatch = createEventDispatcher()
  const dateChoices = []
  const dayChoices = [] 
  const monthChoices = [] 

  const d = new Date()
  for (let i = 0; i < 6; i++) {
    d.setDate(d.getDate() + 1) // don't include today
    const mmdd = getDateInMMDD(d)
    const [mm, dd] = mmdd.split('/')
    dateChoices.push(dd + '/' + mm)
    dayChoices.push(dd)
    if (monthChoices.length === 0) {
      monthChoices.push(getMonthNameFromNumber(Number(mm)))
    }
  }

  currentlySelectedDate = dateChoices[0]
  currentlySelectedDay = dayChoices[0]
  currentlySelectedMonth = monthChoices[0]
</script>

<style>
  .blue-highlight {
    background-color: rgb(0, 255, 166);
  }
</style>