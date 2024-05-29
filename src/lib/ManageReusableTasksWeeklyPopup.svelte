<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={() => isPopupOpen = false}>
    <div class="detailed-card-popup">
      <input 
        type="text" 
        bind:value={newTaskName} 
        on:input={(e) => debouncedRenameTask(e.target.value)}
        placeholder="Untitled"
        style="margin-left: 12px; width: 100%; font-size: 24px;"
        class="title-underline-input"
      >

      {#key weeklyTemplate}
        <PeriodicWeeklyModule
          {weeklyTemplate}
          on:new-weekly-schedule={(e) => editExistingInstances(e.detail)}
        />
      {/key}

      <ManageReusableTasksWeeklyPopupDurationStartTime
        {weeklyTemplate}
        on:weekly-template-update={(e) => updateWeeklyTemplate(e.detail)}
      />
      
      <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 16px;">
        <span class="material-symbols-outlined" on:click|stopPropagation={properlyDeleteTemplate} 
          style="cursor: pointer; margin-left: auto; right: 0px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
        >
          delete
        </span>
      </div>

      <!-- ICON SECTION -->
      {#if !$user.isSubscriber}
        <div on:click={() => isShowingPremiumPopup = !isShowingPremiumPopup} style="" class="premium-intro-button">
          <span class="material-symbols-outlined" style="margin-right: 4px;">
            forest
          </span>
         
          <div style="font-weight: 500;">
            Use intentions.life visual
          </div>
        </div>
        {#if isShowingPremiumPopup}
          <PremiumPopup/>
        {/if}
      {:else}
        <div style="margin-top: 16px; display: flex; width: 100%; flex-wrap: wrap;">
          {#if doodleIcons}
            {#each doodleIcons as doodleIcon}
              <div>
                <img 
                  on:click={() => updateWeeklyTemplate({ iconDataURL: doodleIcon.dataURL })}
                  src={doodleIcon.dataURL}
                  style="width: 48px; height: 48px; cursor: pointer;"
                  class:orange-border={weeklyTemplate.iconDataURL === doodleIcon.dataURL}
                >
                
                {#if weeklyTemplate.iconDataURL === doodleIcon.dataURL && hasPermission(weeklyTemplate)}
                  <div on:click={() => handleDelete(doodleIcon.id)} style="cursor: pointer; font-size: 14px;">
                    Delete
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>

        <div style="margin-top: 16px; display: flex; justify-content: center">
          <ExperimentalCanvas/>
        </div>
      {/if}
    </div>
  </div>
{/if}

<script>
  import PremiumPopup from '$lib/PremiumPopup.svelte'
  import PeriodicWeeklyModule from '$lib/PeriodicWeeklyModule.svelte'
  import ManageReusableTasksWeeklyPopupDurationStartTime from '$lib/ManageReusableTasksWeeklyPopupDurationStartTime.svelte'
  import { 
    getRandomID, 
    checkTaskObjSchema,  
    convertMMDDToDateClassObject, 
    computeDayDifference, 
    mod,
    twoDigits
  } from '/src/helpers.js'
  import { 
    setFirestoreDoc, 
    deleteFirestoreDoc, 
    createFirestoreQuery, 
    getFirestoreQuery, 
    updateFirestoreDoc 
  } from '/src/crud.js'
  import { user } from '/src/store.js'
  import { onMount, onDestroy } from 'svelte'
  import ExperimentalCanvas from '$lib/ExperimentalCanvas.svelte'
  import { onSnapshot, collection } from 'firebase/firestore'
  import db from '/src/db.js'
  import _ from 'lodash'

  export let weeklyTemplate = {
    name: '',
    repeatOnDayOfWeek: Array(7).fill(0),
    repeatGroupID: '',
    iconDataURL: '',
    duration: 30
  }
  export let defaultOrderValue = 1

  let isShowingPremiumPopup = false
  let allGeneratedTasksToUpload = [] 
  let isPopupOpen = false

  let repeatOnDayOfWeek = weeklyTemplate.repeatOnDayOfWeek
  let repeatGroupID = weeklyTemplate.repeatGroupID
  let newTaskName = weeklyTemplate.name

  let doodleIcons = null
  let unsub = null 

  const debouncedRenameTask = _.debounce(
    (newVal) => updateWeeklyTemplate({ name: newVal }), 
    800
  )

  onMount(async () => {
    const ref = collection(db, `/doodleIcons`)
    unsub = onSnapshot(ref, (collectionSnap) => {
      const temp = []
      collectionSnap.forEach((doc) => {
        temp.push({ 
          id: doc.id,
          ...doc.data()
        })
      })
      doodleIcons = temp
    })
  })

  onDestroy(() => {
    if (unsub) unsub()
  }) 

  async function updateWeeklyTemplate (keyValueChanges) {
    console.log('keyValueChanges =', keyValueChanges)
    await updateFirestoreDoc(
      `/users/${$user.uid}/periodicTasks/${weeklyTemplate.id}`, 
      keyValueChanges
    )
    propagateChangeToFutureInstances(keyValueChanges)
  }

  // a general function
  async function propagateChangeToFutureInstances (keyValueChanges) {
    const futureInstances = await getFutureInstances()
    for (const taskInstance of futureInstances) {
      updateFirestoreDoc(
        `/users/${$user.uid}/tasks/${taskInstance.id}`, 
        keyValueChanges
      )
    }
  }

  function hasPermission (weeklyTemplate) {
    // find the `doodleIconDoc` first
    let iconDoc = null
    for (let doodleIcon of doodleIcons) {
      if (doodleIcon.dataURL === weeklyTemplate.iconDataURL) {
        iconDoc = doodleIcon
        break
      }
    }

    // now check creatorUID
    if (!iconDoc.creatorUID) return true
    else return iconDoc.creatorUID === $user.uid
  }

  function handleDelete (id) {
    if (id && confirm('Are you sure you want to delete this icon?')) {
      deleteFirestoreDoc(`/doodleIcons/${id}`)
    }
  }

  async function properlyDeleteTemplate () {
    if (confirm('Are you sure? This will delete all "Time Spent" records too. If you just want to stop future repeats, you can set the weekly repeats to no days instead.')) {
      await deleteExistingFutureInstances()
      deleteFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyTemplate.id}`)
      isPopupOpen = false 
    } 
  }


  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }


  // effectively a delete + create
  async function editExistingInstances ({ repeatOnDayOfWeek, numOfWeeksInAdvance }) {
    // update the template itself
    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyTemplate.id}`, {
      repeatOnDayOfWeek,
      name: newTaskName,
      iconDataURL: weeklyTemplate.iconDataURL || '',
      numOfWeeksInAdvance
    })

    await deleteExistingFutureInstances()

    // with a clean slate, generate new ones
    createNewInstancesOfWeeklyRepeatingTasks({
      repeatGroupID: weeklyTemplate.repeatGroupID,
      repeatOnDayOfWeek,
      numOfWeeksInAdvance
    })
  }  

  function getFutureInstances () {
    return new Promise(async (resolve) => {
      const q = createFirestoreQuery({
        collectionPath: `/users/${$user.uid}/tasks`,
        criteriaTerms: ['repeatGroupID', '==', weeklyTemplate.repeatGroupID]
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

  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfWeeklyRepeatingTasks ({ repeatOnDayOfWeek, repeatGroupID, numOfWeeksInAdvance }) {
    if (!numOfWeeksInAdvance) {
      alert(`"Show repeats _ weeks ahead" must be filled`)
    }
    allGeneratedTasksToUpload = []

    const d = new Date()
    for (let i = 0; i < 7 * numOfWeeksInAdvance; i++) {
      const weekDayNumber = mod(d.getDay() - 1, 7) // for getDay(), Sunday = 0, Monday = 1
      if (repeatOnDayOfWeek[weekDayNumber]) {
        const generatedTask = createRepeatedTask({ 
          dateClassObj: new Date(d.getTime()), 
          repeatGroupID 
        })
        allGeneratedTasksToUpload.push({ ...generatedTask })
      }

      d.setDate(d.getDate() + 1)
    }

    for (const task of allGeneratedTasksToUpload) {
      setFirestoreDoc(
        `/users/${$user.uid}/tasks/${task.id}`,
        task
      )
    }
  }

  function createRepeatedTask({ dateClassObj, repeatGroupID }) {
    const individualID = getRandomID()
    let taskObjCopy = {
      repeatGroupID,
      id: individualID,
      reusableTemplateID: repeatGroupID,
      name: newTaskName,
      startTime: weeklyTemplate.startTime || '',
      startYYYY: new Date().getFullYear(),
      iconDataURL: weeklyTemplate.iconDataURL || ''
      // `startDate` will be hydrated later by the 2nd `if` statement
    }

    taskObjCopy.id = getRandomID()
    taskObjCopy.repeatOnDayOfWeek = [...repeatOnDayOfWeek]
    taskObjCopy.repeatGroupID = repeatGroupID // way to label separate tasks as essentially clones of an original repeating task

    const yyyy = `${dateClassObj.getFullYear()}`
    const mm = twoDigits(dateClassObj.getMonth() + 1) // month is 0-indexed
    const dd = twoDigits(dateClassObj.getDate())

    taskObjCopy.startDate = `${mm}/${dd}`

    /// NOTE THESE IF STATEMENTS OPERATE *INDEPENDENTLY*
    // CASE 1: DEADLINE
    // deadline takes priority: a deadlined task that repeats but is scheduled, will STILL be treated like a deadline
    if (taskObjCopy.deadlineDate && taskObjCopy.deadlineTime) {
      // set new `deadlineDate` to the dd/mm/yyyy format of `dateClassObj` (but keep the deadline time the same)
      taskObjCopy.deadlineDate = `${dd}/${mm}/${yyyy}`
    }
    // CASE 2: SCHEDULED 
    if (taskObjCopy.startYYYY && taskObjCopy.startDate && taskObjCopy.startTime) {
      taskObjCopy.startYYYY = yyyy
      taskObjCopy.startDate = `${mm}/${dd}`
    }
    taskObjCopy = checkTaskObjSchema(taskObjCopy, $user)
    return taskObjCopy
  }
</script>

<style>
  .premium-intro-button {
    display: flex; align-items: center; color: #541d69;
    font-size: 16px;
  }

  .orange-border {
    /* border: 4px solid orange; */
    border: 1px solid var(--logo-twig-color);
    background-image: 
      linear-gradient(90deg, rgba(200,200,200,0.8) 1px, transparent 0), 
      linear-gradient(180deg, rgba(200,200,200,0.8) 1px, transparent 0);
    background-size: 12px 12px; /* Adjust the size of the pattern */
  }

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