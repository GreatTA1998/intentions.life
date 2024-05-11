<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={() => isPopupOpen = false}>
    <div class="detailed-card-popup">
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

      
      <div style="display: flex; align-items: center; padding-top: 8px;">
        <div style="margin: 8px;">
          Designated time
        </div>

        <div style="margin-top: 0px;">
          <UXToggleSwitch on:new-checked-state={(e) => hasSpecificTime = e.detail.isChecked}/>
        </div>

        {#if hasSpecificTime}
          <div style="max-width: 120px; margin-left: 8px;">
            <UXFormField
              fieldLabel="Time (hh:mm)"
              value={''}
              willAutofocus={false}
              on:input={(e) => handleTaskStartInput(e)}
              placeholder="17:30"
            />
          </div>
        {/if}
      </div>

      {#if !isEditVersion}
        <button on:click={() => createTemplateAndGenerateTasks({ numOfMonthsInAdvance: 2, repeatOnDayOfMonth, willRepeatOnLastDay: true })}>
          Create repeat template and generate tasks
        </button>
      {:else}
        <button on:click={editExistingInstances}>
          Modify existing tasks
        </button>
      {/if}

      <button on:click={() => { 
        dispatch('delete');
        isPopupOpen = false 
      }
      }>
        Delete
      </button>
    </div>
  </div>
{/if}

<script>
  import { getRandomID, checkTaskObjSchema, getDateInMMDD, convertMMDDToDateClassObject, computeDayDifference } from '/src/helpers.js'
  import { setFirestoreDoc, deleteFirestoreDoc, getFirestoreCollection, createFirestoreQuery, getFirestoreQuery, updateFirestoreDoc } from '/src/crud.js'
  import { user } from '/src/store.js'
  import { onMount } from 'svelte'
  import UXFormField from '$lib/UXFormField.svelte'
  import UXToggleSwitch from '$lib/UXToggleSwitch.svelte'
  import { createEventDispatcher } from 'svelte'

  export let isEditVersion = false
  export let monthlyPeriodicTemplate = {
    name: '',
    repeatOnDayOfMonth: Array(27).fill(0),
    willRepeatOnLastDay: false,
    repeatGroupID: ''
  }
  export let defaultOrderValue = 1

  const dispatch = createEventDispatcher()

  let isPopupOpen = false

  // TO-DO: refactor 
  let repeatOnDayOfMonth = monthlyPeriodicTemplate.repeatOnDayOfMonth
  let willRepeatOnLastDay = monthlyPeriodicTemplate.willRepeatOnLastDay
  let repeatGroupID = monthlyPeriodicTemplate.repeatGroupID
  let newTaskName = monthlyPeriodicTemplate.name

  let hasSpecificTime = false


  onMount(async () => {
  })

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  // effectively a delete + create
  async function editExistingInstances () {
    // update the template itself
    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${monthlyPeriodicTemplate.id}`, {
      repeatOnDayOfMonth,
      willRepeatOnLastDay,
      name: newTaskName
    })
    // find all the repeat groups scheduled from today's date (don't care about the past)

    const q = createFirestoreQuery({
      collectionPath: `/users/${$user.uid}/tasks`,
      criteriaTerms: ['repeatGroupID', '==', monthlyPeriodicTemplate.repeatGroupID]
    })

    const allRepeatInstances = await getFirestoreQuery(q)
    const currAndFutureInstances = allRepeatInstances.filter(instance => {
      const d1 = new Date()
      const d2 = convertMMDDToDateClassObject(instance.startDate, instance.startYYYY)
      const dayDiff = computeDayDifference(d1, d2) // dayDiff := d2 - d1 
      return dayDiff >= 0
    })

    // delete all of them, use a Firestore batch
    for (const instance of currAndFutureInstances) {
      deleteFirestoreDoc(`/users/${$user.uid}/tasks/${instance.id}`)
    }

    // with a clean slate, generate new ones
    createNewInstancesOfMonthlyRepeatingTasks({
      repeatGroupID: monthlyPeriodicTemplate.repeatGroupID,
      numOfMonthsInAdvance: 2,
      repeatOnDayOfMonth,
      willRepeatOnLastDay 
    })
  }  

  function createTemplateAndGenerateTasks ({ numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay }) {
    // create template
    const id = getRandomID()
    repeatGroupID = id
    setFirestoreDoc(`/users/${$user.uid}/periodicTasks/${id}`, {
      name: newTaskName,
      repeatOnDayOfMonth,
      willRepeatOnLastDay,
      repeatGroupID: id,
      orderValue: defaultOrderValue,
      reusableTemplateID: id
    })

    createNewInstancesOfMonthlyRepeatingTasks({ 
      repeatGroupID: id,
      numOfMonthsInAdvance: 2, 
      repeatOnDayOfMonth, 
      willRepeatOnLastDay
    })
  }

  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfMonthlyRepeatingTasks ({ numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay }) {
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
    // BUG: NOT CORRECT
    const d = new Date()
    d.setMonth(zeroIndexedMonthNumber) // MUST set month first, otherwise it thinks the 31st day doesn't exist on the month yet
    d.setDate(dayOfMonth)

    const individualID = getRandomID()

    let newObj = {
      repeatGroupID,
      id: individualID,
      reusableTemplateID: repeatGroupID,
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