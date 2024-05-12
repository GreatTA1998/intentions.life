<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={() => isPopupOpen = false}>
    <div class="detailed-card-popup">
      <input bind:value={newTaskName}>

      <div style="display: flex; margin-top: 24px;">
        {#each {length: 7} as _, i}
          <div 
            on:click={() => repeatOnDayOfWeek[i] = !repeatOnDayOfWeek[i]} 
            class="circle"
            class:highlighted={repeatOnDayOfWeek[i]}
          >
            {dayOfWeekSymbol[i]}
          </div>
        {/each}
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

      <div style="display: flex; align-items: center;">
        <div>
          Show repeats
        </div>

        <div style="width: 40px;">
          <UXFormField
            fieldLabel=""
            value={''}
            willAutofocus={false}
            on:input={(e) => handleTaskStartInput(e)}
            placeholder="2"
          />  
        </div>
        weeks into the future
      </div>

      {#if !isEditVersion}
        <button on:click={() => createTemplateAndGenerateTasks({ numOfWeeksInAdvance, repeatOnDayOfWeek })}>
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
      }}
      >
        Delete
      </button>

      <div style="margin-top: 16px;">
        {#if doodleIcons}
          {#each doodleIcons as doodleIcon}
            <img 
              on:click={() => editExistingInstances({ iconDataURL: doodleIcon.dataURL })} 
              src={doodleIcon.dataURL}
              style="width: 48px; height: 48px; cursor: pointer;"
            >
          {/each}
        {/if}
      </div>

      <div style="margin-top: 16px; display: flex; justify-content: center">
        <ExperimentalCanvas/>
      </div>
    </div>
  </div>
{/if}

<script>
  import { 
    getRandomID, 
    checkTaskObjSchema, 
    getDateInMMDD, 
    convertMMDDToDateClassObject, 
    computeDayDifference,
    mod,
    twoDigits
  } from '/src/helpers.js'
  import { setFirestoreDoc, deleteFirestoreDoc, getFirestoreCollection, createFirestoreQuery, getFirestoreQuery, updateFirestoreDoc } from '/src/crud.js'
  import { user } from '/src/store.js'
  import { onMount, onDestroy } from 'svelte'
  import UXFormField from '$lib/UXFormField.svelte'
  import UXToggleSwitch from '$lib/UXToggleSwitch.svelte'
  import ExperimentalCanvas from '$lib/ExperimentalCanvas.svelte'
  import { createEventDispatcher } from 'svelte'
  import { onSnapshot, collection } from 'firebase/firestore'
  import db from '/src/db.js'

  export let isEditVersion = false
  export let weeklyPeriodicTemplate = {
    name: '',
    repeatOnDayOfWeek: Array(7).fill(0),
    repeatGroupID: ''
  }
  export let defaultOrderValue = 1

  const dispatch = createEventDispatcher()

  let dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  let isPopupOpen = false

  // TO-DO: refactor 
  let repeatOnDayOfWeek = weeklyPeriodicTemplate.repeatOnDayOfWeek
  let repeatGroupID = weeklyPeriodicTemplate.repeatGroupID
  let newTaskName = weeklyPeriodicTemplate.name

  let numOfWeeksInAdvance = 2
  let hasSpecificTime = false

  let doodleIcons = null
  let unsub = null 

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

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  // effectively a delete + create
  async function editExistingInstances ({ iconDataURL = '' }) {
    // update the template itself
    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyPeriodicTemplate.id}`, {
      repeatOnDayOfWeek,
      name: newTaskName,
      iconDataURL
    })
    // find all the repeat groups scheduled from today's date (don't care about the past)

    const q = createFirestoreQuery({
      collectionPath: `/users/${$user.uid}/tasks`,
      criteriaTerms: ['repeatGroupID', '==', weeklyPeriodicTemplate.repeatGroupID]
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
    createNewInstancesOfWeeklyRepeatingTasks({
      repeatGroupID: weeklyPeriodicTemplate.repeatGroupID,
      numOfWeeksInAdvance,
      repeatOnDayOfWeek,
      iconDataURL
    })
  }  

  function createTemplateAndGenerateTasks ({ numOfWeeksInAdvance, repeatOnDayOfWeek }) {
    const id = getRandomID()
    repeatGroupID = id

    // create template
    setFirestoreDoc(`/users/${$user.uid}/periodicTasks/${id}`, {
      name: newTaskName,
      repeatOnDayOfWeek,
      repeatGroupID: id,
      orderValue: defaultOrderValue,
      reusableTemplateID: id
    })

    createNewInstancesOfWeeklyRepeatingTasks({ 
      repeatGroupID: id,
      numOfWeeksInAdvance, 
      repeatOnDayOfWeek
    })
  }

  let allGeneratedTasksToUpload = [] 

  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfWeeklyRepeatingTasks ({ numOfWeeksInAdvance = 2, repeatOnDayOfWeek, repeatGroupID, iconDataURL }) {
    const d = new Date()
    for (let i = 0; i < 7 * numOfWeeksInAdvance; i++) {
      const weekDayNumber = mod(d.getDay() - 1, 7) // for getDay(), Sunday = 0, Monday = 1
      if (repeatOnDayOfWeek[weekDayNumber]) {
        const generatedTask = createRepeatedTask({ 
          dateClassObj: new Date(d.getTime()), 
          repeatGroupID 
        })
        allGeneratedTasksToUpload.push({ iconDataURL, ...generatedTask })
      }

      d.setDate(d.getDate() + 1)
    }

    console.log('allGeneratedTasksToUpload =', allGeneratedTasksToUpload)
    for (const task of allGeneratedTasksToUpload) {
      setFirestoreDoc(
        `/users/${$user.uid}/tasks/${task.id}`,
        task
      )
    }
    console.log("success")
  }

  function createRepeatedTask({ dateClassObj, repeatGroupID }) {
    const individualID = getRandomID()
    let taskObjCopy = {
      repeatGroupID,
      id: individualID,
      reusableTemplateID: repeatGroupID,
      name: newTaskName,
      startTime: '',
      startYYYY: new Date().getFullYear()
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

  .circle {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background: #000;

    /* extra */
    margin-right: 8px;
  }

  .circle:hover {
    cursor: pointer;
  }

  .highlighted {
    background: orange;
  }
</style>