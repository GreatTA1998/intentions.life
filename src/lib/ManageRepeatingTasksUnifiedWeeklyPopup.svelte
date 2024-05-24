<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={() => isPopupOpen = false}>
    <div class="detailed-card-popup">
      <input 
        type="text" 
        bind:value={newTaskName} 
        placeholder="Untitled"
        style="margin-left: 12px; width: 100%; box-sizing: border-box; font-size: 24px;"
        class="title-underline-input"
      >

      <div style="display: flex; align-items: center; margin-top: 24px; gap: 8px;">
        <div style="display: flex;">
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

        
        <div style="display: flex; align-items: center;">
          <div>
            Show repeats
          </div>

          <div>
            <input class="underlined-input"
              value={numOfWeeksInAdvance}
              on:input={e => numOfWeeksInAdvance = e.target.value}
            >
          </div>
          weeks into the future
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

      <div style="margin-left: 6px; margin-right: 6px; max-width: 84px;">
        <UXFormField
          fieldLabel="For"
          value={weeklyPeriodicTemplate.duration}
          willAutofocus={false}
          on:input={(e) => debouncedSaveDuration(e)}
        >
          <div slot="append" style="font-weight: 300; color: rgb(60, 60, 60); font-size: 12px;">
            mins.
          </div>
        </UXFormField>
      </div>

      <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 16px;">
        {#if !isEditVersion}
          <ReusableRoundButton on:click={() => createTemplateAndGenerateTasks({ numOfWeeksInAdvance, repeatOnDayOfWeek })}
            backgroundColor="rgb(0, 89, 125)" textColor="white"
          >
            Create repeat template and generate tasks
          </ReusableRoundButton>
        {:else}
          <ReusableRoundButton on:click={editExistingInstances}
            backgroundColor="rgb(0, 89, 125)" textColor="white"
          >
            Modify existing tasks
          </ReusableRoundButton>
        {/if}


        <span class="material-symbols-outlined" on:click|stopPropagation={properlyDeleteTemplate} 
          style="cursor: pointer; margin-left: auto; right: 0px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
        >
          delete
        </span>
      </div>

      <div style="margin-top: 16px;">
        {#if doodleIcons}
          {#each doodleIcons as doodleIcon}
            <img 
              on:click={() => { 
                iconDataURL = doodleIcon.dataURL
                editExistingInstances()
              }}
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
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import _ from 'lodash'

  export let isEditVersion = false
  export let weeklyPeriodicTemplate = {
    name: '',
    repeatOnDayOfWeek: Array(7).fill(0),
    repeatGroupID: '',
    iconDataURL: ''
  }
  export let defaultOrderValue = 1

  //// IMPORTANT
  // `repeatGroupID`: used for modifying instances of a repeating task (name is for legacy reasons)

  // `reusableTemplateID`: for collecting statistics for a task (no reason why it must be this way, it's just legacy reasons)
  
  let allGeneratedTasksToUpload = [] 
  let numOfWeeksInAdvance = 2

  const dispatch = createEventDispatcher()

  let dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  let isPopupOpen = false

  // TO-DO: refactor 
  let repeatOnDayOfWeek = weeklyPeriodicTemplate.repeatOnDayOfWeek
  let repeatGroupID = weeklyPeriodicTemplate.repeatGroupID
  let newTaskName = weeklyPeriodicTemplate.name
  let iconDataURL = weeklyPeriodicTemplate.iconDataURL

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

  async function properlyDeleteTemplate () {
    if (confirm('Are you sure? This will delete all "Time Spent" records too. If you just want to stop future repeats, you can set the weekly repeats to no days instead.')) {
      await deleteExistingFutureInstances()
      deleteFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyPeriodicTemplate.id}`)
      isPopupOpen = false 
    } 
  }

  function handleTaskStartInput (e) {
    const hhmm = e.detail.value
    if (hhmm.length !== 5) return
    if (!hhmm.includes(':')) return

    console.log('hhmm =', hhmm)
    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyPeriodicTemplate.id}`, {
      startTime: hhmm
    })
    alert('success: saved new default start time')
  }

  const debouncedSaveDuration = _.debounce(saveDuration, 1000)

  function saveDuration (e) {
    const newValue = e.detail.value
    if (typeof Number(newValue) !== 'number') {
      return 
    }

    if (!weeklyPeriodicTemplate.id) alert('Create the template first, before adding details')

    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyPeriodicTemplate.id}`, {
      duration: Number(newValue)
    })
    alert('success: saved new duration')
  }



  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }


  // effectively a delete + create
  async function editExistingInstances () {
    // update the template itself
    updateFirestoreDoc(`/users/${$user.uid}/periodicTasks/${weeklyPeriodicTemplate.id}`, {
      repeatOnDayOfWeek,
      name: newTaskName,
      iconDataURL
    })

    await deleteExistingFutureInstances()

    // with a clean slate, generate new ones
    createNewInstancesOfWeeklyRepeatingTasks({
      repeatGroupID: weeklyPeriodicTemplate.repeatGroupID,
      repeatOnDayOfWeek,
    })
  }  

  // find all the repeat groups scheduled from today's date (don't care about the past)
  async function deleteExistingFutureInstances () {
    return new Promise(async (resolve) => {
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

  function createTemplateAndGenerateTasks ({ repeatOnDayOfWeek }) {
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
      repeatOnDayOfWeek
    })
  }

  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfWeeklyRepeatingTasks ({ repeatOnDayOfWeek, repeatGroupID }) {
    if (!numOfWeeksInAdvance) {
      alert(`"Show repeats _ into the future" must be filled`)
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

    console.log('allGeneratedTasksToUpload =', allGeneratedTasksToUpload)
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
      startTime: weeklyPeriodicTemplate.startTime || '',
      startYYYY: new Date().getFullYear(),
      iconDataURL
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

  .underlined-input {
    border: none;
    border-bottom: 2px solid #313131;
    outline: none;
    padding: 4px;
    padding-bottom: 4px;
    font-size: 16px;
    width: 20px;
    margin: 4px;
    font-weight: 500;
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