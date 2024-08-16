<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={() => isPopupOpen = false}>
    <div class="detailed-card-popup">
      <input 
        type="text" 
        bind:value={newTaskName} 
        on:input={(e) => debouncedRenameTemplate(e.target.value)}
        placeholder="Untitled"
        style="width: 100%; font-size: 24px;"
        class="title-underline-input"
      >

      {#key monthlyTemplate}
        <PeriodicMonthlyModule
          {monthlyTemplate}
          on:new-monthly-schedule={(e) => editExistingInstances(e.detail)}
        />
      {/key}
    
      <ManageReusableTasksDurationStartTime
        weeklyTemplate={monthlyTemplate}
        on:weekly-template-update={(e) => updateMonthlyTemplate(e.detail)}
      />

      <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 16px;">
        <span class="material-symbols-outlined" on:click|stopPropagation={properlyDeleteTemplate} 
          style="cursor: pointer; margin-left: auto; right: 0px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
        >
          delete
        </span>
      </div>
    </div>
  </div>
{/if}

<script>
  import { createNewInstancesOfMonthlyRepeatingTasks } from '/src/helpers/periodicRepeat.js'
  import ManageReusableTasksDurationStartTime from '$lib/ManageReusableTasksDurationStartTime.svelte'
  import PeriodicMonthlyModule from '$lib/PeriodicMonthlyModule.svelte'
  import { getRandomID, checkTaskObjSchema, getDateInMMDD, convertMMDDToDateClassObject, computeDayDifference } from '/src/helpers/everythingElse.js'
  import { setFirestoreDoc, deleteFirestoreDoc, getFirestoreCollection, createFirestoreQuery, getFirestoreQuery, updateFirestoreDoc } from '/src/crud.js'
  import { user } from '/src/store.js'
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import _ from 'lodash'

  export let monthlyTemplate = {
    name: '',
    repeatOnDayOfMonth: Array(27).fill(0),
    willRepeatOnLastDay: false,
    repeatGroupID: ''
  }
  export let defaultOrderValue = 1

  const dispatch = createEventDispatcher()

  let isPopupOpen = false

  let repeatGroupID = monthlyTemplate.repeatGroupID
  let newTaskName = monthlyTemplate.name
  
  const debouncedRenameTemplate = _.debounce(
    (newVal) => updateMonthlyTemplate({ name: newVal }), 
    800
  )

  onMount(async () => {
  })

  async function properlyDeleteTemplate () {
    if (confirm('Are you sure? This will delete all "Time Spent" records too. If you just want to stop future repeats, you can set the weekly repeats to no days instead.')) {
      await deleteExistingFutureInstances()
      deleteFirestoreDoc(`/users/${$user.uid}/periodicTasks/${monthlyTemplate.id}`)
      isPopupOpen = false 
    } 
  }

  async function updateMonthlyTemplate (keyValueChanges) {
    console.log("keyValueChanges =", keyValueChanges)
    await updateFirestoreDoc(
      `/users/${$user.uid}/periodicTasks/${monthlyTemplate.id}`, 
      keyValueChanges
    )
    propagateChangeToFutureInstances(keyValueChanges)
  }

  async function propagateChangeToFutureInstances (keyValueChanges) {
    const futureInstances = await getFutureInstances()
    for (const taskInstance of futureInstances) {
      updateFirestoreDoc(
        `/users/${$user.uid}/tasks/${taskInstance.id}`, 
        keyValueChanges
      )
    }
  }

  function getFutureInstances () {
    return new Promise(async (resolve) => {
      const q = createFirestoreQuery({
        collectionPath: `/users/${$user.uid}/tasks`,
        criteriaTerms: ['repeatGroupID', '==', monthlyTemplate.repeatGroupID]
      })

      const allRepeatInstances = await getFirestoreQuery(q)
      const currAndFutureInstances = allRepeatInstances.filter(instance => {
        const d1 = new Date()
        const d2 = convertMMDDToDateClassObject(instance.startDate, instance.startYYYY)
        const dayDiff = computeDayDifference(d1, d2) // dayDiff := d2 - d1 
        return dayDiff >= 0
      })
      resolve(currAndFutureInstances)
    })
  }

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  // effectively a delete + create
  async function editExistingInstances ({ repeatOnDayOfMonth, willRepeatOnLastDay }) {
    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${monthlyTemplate.id}`, {
      repeatOnDayOfMonth,
      willRepeatOnLastDay,
      name: newTaskName
    })

    await deleteExistingFutureInstances()

    const newMonthlyTemplate = {
      repeatOnDayOfMonth,
      willRepeatOnLastDay,
      repeatGroupID: monthlyTemplate.repeatGroupID,
      name: monthlyTemplate.name,
      numOfMonthsInAdvance: 2
    }
    createNewInstancesOfMonthlyRepeatingTasks({ 
      monthlyTemplate: newMonthlyTemplate,
      userDoc: $user
    })
  }  
  
  // find all the repeat groups scheduled from today's date (don't care about the past)
  async function deleteExistingFutureInstances () {
    return new Promise(async (resolve) => {
      const currAndFutureInstances = await getFutureInstances()

      const deleteRequests = []

      // delete all of them, use a Firestore batch
      for (const instance of currAndFutureInstances) {
        deleteRequests.push(
          deleteFirestoreDoc(`/users/${$user.uid}/tasks/${instance.id}`)
        )
      }
      await Promise.all(deleteRequests)
      resolve()
    })
  }
</script>

<style>
  .title-underline-input {
     /* Refer to: https://stackoverflow.com/a/3131082/7812829 */
    background: transparent;
    border: none;
    border-bottom: 1px solid #DBDBDD;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    padding-left: 0px;
    padding-bottom: 6px;
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
 
    /* border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }
</style>