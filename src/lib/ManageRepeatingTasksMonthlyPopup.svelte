<slot {setIsPopupOpen}>

</slot>


{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer">
    <div class="detailed-card-popup" use:clickOutside on:click_outside={() => isPopupOpen = false}>
      <input bind:value={newTaskName}>

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

        <div 
          on:click={() => willRepeatOnLastDay = !willRepeatOnLastDay} 
          class="day-of-month-square" 
          class:highlighted={willRepeatOnLastDay}
          style="width: fit-content;"
        >
          Last day
      </div>

      </div>

      <div>
        Repeat at 19:00 vs flexible time
      </div>


      <button on:click={() => createTemplateAndGenerateTasks({ numOfMonthsInAdvance: 2, repeatOnDayOfMonth, willRepeatOnLastDay: true })}>
        Create repeat template and generate tasks
      </button>
    </div>
  </div>
{/if}

<script>
  import { clickOutside, getRandomID, checkTaskObjSchema, getDateInMMDD } from '/src/helpers.js'
  import { setFirestoreDoc, getFirestoreCollection  } from '/src/crud.js'
  import { user } from '/src/store.js'
  import { onMount } from 'svelte'

  let isPopupOpen = false

  let repeatOnDayOfMonth = Array(27).fill(0)
  let willRepeatOnLastDay = false
  let newTaskName = ''
  let periodicTasks = null
  let repeatGroupID = ''

  onMount(async () => {
    const temp = await getFirestoreCollection(`/users/${$user.uid}/periodicTasks`)
    periodicTasks = temp
  })

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  function createTemplateAndGenerateTasks ({ numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay }) {
    // create template
    const id = getRandomID()
    repeatGroupID = id
    setFirestoreDoc(`/users/${$user.uid}/periodicTasks/${id}`, {
      name: newTaskName,
      repeatOnDayOfMonth,
      willRepeatOnLastDay,
      repeatGroupID: id
    })

    createNewInstancesOfMonthlyRepeatingTasks({ 
      repeatGroupID: id,
      numOfMonthsInAdvance: 2, 
      repeatOnDayOfMonth, 
      willRepeatOnLastDay
    })
  }

  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfMonthlyRepeatingTasks ({numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay }) {
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
        generateNewTask(d.getDate(), d.getMonth())
      }
      d.setDate(d.getDate() + 1)
    }

    // edge case: last day (i.e. 28, 29, 30, 31 treated the same)
    if (willRepeatOnLastDay) {
      const lastDay = getLastDayOfMonth(d.getMonth()) // note `getMonth` is zero-indexed
      generateNewTask(lastDay, d.getMonth())
    }
  }

  // month is 1-indexed from 1 to 12
  function getLastDayOfMonth (zeroIndexedMonthNumber) {
    const d1 = new Date()
    const d2 = new Date(d1.getFullYear(), zeroIndexedMonthNumber + 1, 0);
    const lastDay = d2.getDate()
    return lastDay
  }

  function generateNewTask (dayOfMonth, zeroIndexedMonthNumber) {
    // console.log('generate new task for =', dayOfMonth)
    // console.log('new task name =', newTaskName)
    // console.log('zeroIndexedMonthNumber =', zeroIndexedMonthNumber)
    // BUG: NOT CORRECT
    console.log('dayOfMonth, zeroIndexedMonthNumber =', dayOfMonth, zeroIndexedMonthNumber)

    const d = new Date()
    d.setMonth(zeroIndexedMonthNumber) // MUST set month first, otherwise it thinks the 31st day doesn't exist on the month yet
    d.setDate(dayOfMonth)

    const individualID = getRandomID()

    let newObj = {
      repeatGroupID,
      id: individualID,
      name: newTaskName,
      startTime: '',
      startDate: getDateInMMDD(d), //, MMDD
      startYYYY: new Date().getFullYear()
    } 

    newObj = checkTaskObjSchema(newObj, $user)

    setFirestoreDoc(
      `/users/${$user.uid}/tasks/${individualID}`, 
      newObj
    )
  }
  
</script>

<style>
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
  .detailed-card-popup {
    position: fixed;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 58%;
    overflow-y: auto;
    z-index: 3;
    min-width: 360px;
    
    height: fit-content;

    padding: 24px;
    border-radius: 24px;
    background-color: white;
 
  /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }

</style>