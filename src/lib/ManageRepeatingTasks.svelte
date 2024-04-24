<div style="padding: 12px;">
  <div>
    Configure repeating tasks
  </div>

  <div style="margin-bottom: 48px;"></div>

  <!-- How do you add repeating tasks -->
  <!-- TO-DO:
    - Copy existing algorithm for weekly repeats
    - Can be time-specific vs time-flexible
  -->
  Weekly repeat
  <div style="display: flex;">
    {#each Array(7) as _, i} 
      <div class="day-of-week-circle"></div>
    {/each}
  </div>

  
  <div style="margin-bottom: 48px;"></div>

  <div style="font-size: 24px;">
    Monthly
  </div>

  <div class="monthly-periodicity-task" style="margin-top: 12px;">
    <div style="display: flex; align-items: center;">
      <div style="display: flex;">
        {#each Array(27) as _, i}
        <div 
          on:click={() => repeatOnDayOfMonth[i] = !repeatOnDayOfMonth[i]} 
          class="day-of-month-square"
          style="width: 3px; height: 16px; border: 0px solid black;"
          class:highlighted={repeatOnDayOfMonth[i]}
        >

        </div>
        {/each}

        <div 
          on:click={() => willRepeatOnLastDay = !willRepeatOnLastDay} 
          class="day-of-month-square"
          style="width: 3px; height: 16px; border: 0px solid black;"
          class:highlighted={willRepeatOnLastDay}
        >

        </div>
      </div>

      <div>
        Customer update
      </div>
    </div>
  </div>


  <div style="display: flex; margin-top: 24px;">
    {#each Array(27) as _, i}
      <div 
        on:click={() => repeatOnDayOfMonth[i] = !repeatOnDayOfMonth[i]} 
        class="day-of-month-square"
        class:highlighted={repeatOnDayOfMonth[i]}
      >
        {i + 1}
      </div>
    {/each}
  </div>
  <div 
    on:click={() => willRepeatOnLastDay = !willRepeatOnLastDay} 
    class="day-of-month-square" 
    class:highlighted={willRepeatOnLastDay}
    style="width: fit-content;"
  >
    Last day
  </div>

  <div>
    Repeat at 19:00 vs flexible time
  </div>


  <button on:click={() => createNewInstancesOfMonthlyRepeatingTasks({ numOfMonthsInAdvance: 2, repeatOnDayOfMonth, willRepeatOnLastDay: true })}>
    Save and generate tasks
  </button>
</div>

<script>
  let repeatOnDayOfMonth = Array(27).fill(0)
  let willRepeatOnLastDay = false


  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfMonthlyRepeatingTasks ({numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay}) {
    const d = new Date() // base case: no need to start from beginning of month
    for (let i = 0; i < numOfMonthsInAdvance; i++) {
      generateRepeatingTasksForSpecificMonth(d, repeatOnDayOfMonth, willRepeatOnLastDay)

      // general case: start from beginning of month
      d.setMonth(d.getMonth() + 1)
      d.setDate(1) 
    }
  }

  function generateRepeatingTasksForSpecificMonth (dateClassObject, repeatOnDayOfMonth, willRepeatOnLastDay) {
    const d = dateClassObject

    // general case: first 28 days
    while (d.getDate() < 28) {
      if (repeatOnDayOfMonth[d.getDate() - 1]) { // getDate() is 1-indexed but `repeatOnDayOfMonth` is 0-indexed
        generateNewTask(d.getDate())
      }
      d.setDate(d.getDate() + 1)
    }

    // edge case: last day (i.e. 28, 29, 30, 31 treated the same)
    if (willRepeatOnLastDay) {
      const lastDay = getLastDayOfMonth(d.getMonth()) // note `getMonth` is zero-indexed
      generateNewTask(lastDay)
    }
  }

  // month is 1-indexed from 1 to 12
  function getLastDayOfMonth (zeroIndexedMonthNumber) {
    const d1 = new Date()
    const d2 = new Date(d1.getFullYear(), zeroIndexedMonthNumber + 1, 0);
    const lastDay = d2.getDate()
    return lastDay
  }

  function generateNewTask (dayOfMonth) {
    console.log('generate new task for =', dayOfMonth)
  }
</script>

<style>
  .day-of-week-circle {
    border-radius: 16px;
    width: 20px; 
    height: 20px;
    border: 2px solid black;
    margin: 4px;
  }

  .day-of-month-square {
    width: 24px; 
    height: 24px; 
    border: 1px solid black; 
    margin: 0px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  .highlighted {
    background-color: orange;
  }
</style>