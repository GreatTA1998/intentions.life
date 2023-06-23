<div>
  <!-- TO-DO: figure out reliable auto-scrolling to the current option, and you can re-use that throughout the app -->

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

    {#each monthChoices as monthChoice}
      <div class:blue-highlight={currentlySelectedMonth === monthChoice} 
        on:click={() => currentlySelectedMonth = monthChoice}
        style="margin-left: 10px; font-size: 1.5rem;"
      >
        {monthChoice}
      </div>
    {/each}

    <div style="margin-left: 30px;"></div>

    <div style="height: 60px; width: fit-content; overflow-y: auto; overflow-x: hidden;">
      {#each hourChoices as hourChoice}
        <div class:blue-highlight={currentlySelectedHour === hourChoice} 
          on:click={() => currentlySelectedHour = hourChoice}
          style="font-size: 1.5rem;"
        >
          {hourChoice}
        </div>
      {/each}
    </div>

    <div style="height: 60px; width: fit-content; overflow-y: auto; overflow-x: hidden;">
      {#each minuteChoices as minuteChoice}
        <div class:blue-highlight={currentlySelectedMinute === minuteChoice} 
          on:click={() => currentlySelectedMinute = minuteChoice}
          style="font-size: 1.5rem;"
        >
          {minuteChoice}
        </div>
      {/each}
    </div>


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
  let currentlySelectedHour = null
  let currentlySelectedMinute = null

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

  const hourChoices = []
  for (let i = 0; i < 24; i++) {
    let hh = i
    if (hh < 10) {
      hh = `0${hh}`
    }
    hourChoices.push(hh)
  }

  const minuteChoices = []
  for (let i = 0; i <= 60; i++) {
    let mm = i
    if (mm < 10) {
      mm = `0${mm}`
    }
    minuteChoices.push(mm)
  } 
  
  currentlySelectedDate = dateChoices[0]
  currentlySelectedDay = dayChoices[0]
  currentlySelectedMonth = monthChoices[0]
  currentlySelectedHour = hourChoices[12] //   // do the default at 13:00 so it's not too far a scroll no matter what
  currentlySelectedMinute = '00'
</script>

<style>
  .blue-highlight {
    background-color: rgb(0, 255, 166);
  }
</style>