<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer">
    <div class="detailed-card-popup" use:clickOutside on:click_outside={() => isPopupOpen = false}>
      <input bind:value={taskObject.name} style="font-size: 20px;">

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
              value={taskObject.startDate || '' + ' ' + taskObject.startTime || ''}
              willAutofocus={false}
              on:input={(e) => handleTaskStartInput(e)}
              placeholder="17:30"
            />
          </div>
        {/if}
      </div>

      <!-- on:click={() => createTemplateAndGenerateTasks({ numOfMonthsInAdvance: 2, repeatOnDayOfMonth, willRepeatOnLastDay: true })} -->
      <!-- EDIT = DELETE + GENERATE -->
      <button on:click={editExistingInstances}>
        Save changes
      </button>
    </div>
  </div>
{/if}

<script>
  import { clickOutside, getRandomID, convertMMDDToDateClassObject } from '/src/helpers.js'
  import { setFirestoreDoc, getFirestoreCollection, getFirestoreQuery, createFirestoreQuery, deleteFirestoreDoc  } from '/src/crud.js'
  import { user } from '/src/store.js'
  import { onMount } from 'svelte'
  import UXFormField from '$lib/UXFormField.svelte'
  import UXToggleSwitch from '$lib/UXToggleSwitch.svelte'
  import { createNewInstancesOfMonthlyRepeatingTasks } from '/src/helpers/periodicRepeat.js'

  // TODO: rename to `periodicTaskTemplate`
  export let taskObject

  let isPopupOpen = false
  let hasSpecificTime = false

  let repeatOnDayOfMonth = taskObject.repeatOnDayOfMonth
  let willRepeatOnLastDay = taskObject.willRepeatOnLastDay
  let newTaskName = ''

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  // effectively a delete + create
  async function editExistingInstances () {
    // find all the repeat groups scheduled from today's date (don't care about the past)

    const q = createFirestoreQuery({
      collectionPath: `/users/${$user.uid}/tasks`,
      criteriaTerms: ['repeatGroupID', '==', taskObject.repeatGroupID] // TO-DO: rename `taskObject`
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
      console.log("about to delete instance =", instance)
      // deleteFirestoreDoc(`/users/${$user.uid}/tasks/${instance.id}`)
    }

    // with a clean slate, generate new ones
    createNewInstancesOfMonthlyRepeatingTasks({
      repeatGroupID: taskObject.repeatGroupID, // TODO: rename `taskObject`
      numOfMonthsInAdvance: 2,
      repeatOnDayOfMonth,
      willRepeatOnLastDay 
    }, $user)
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