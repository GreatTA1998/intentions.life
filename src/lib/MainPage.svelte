

{#key clickedTask}
  {#if isDetailedCardOpen}
    <DetailedCardPopup 
      taskObject={clickedTask}
      on:task-update={(e) => updateTaskNode(e.detail)}
      on:task-reusable={() => createReusableTaskTemplate(clickedTask.id)}
      on:repeating-tasks-generate={(e) => uploadGeneratedTasks(e.detail)}
      on:task-click={(e) => openDetailedCard(e.detail)}
      on:card-close={() => isDetailedCardOpen = false}
      on:task-delete={(e) => deleteTaskNode(e.detail)}
      on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})} 
    />
  {/if}
{/key}

{#if isJournalPopupOpen}
  <JournalPopup
    goalsAndPosters={$user.goalsAndPosters}
    isOpen={isJournalPopupOpen}
    journal={$user.journal}
    {userID}
    on:card-close={() => isJournalPopupOpen = false}
    on:journal-update={(e) => changeJournal(e.detail)}
  />
{/if}

{#if isFinancePopupOpen}
  <FinancePopup
    isOpen={isFinancePopupOpen}
    on:card-close={() => isFinancePopupOpen = false}
  />
{/if}


<!-- UNDO COMPLETED SNACKBAR -->
{#if $mostRecentlyCompletedTaskID}
  <TheSnackbar on:undo-task-completion={() => {
    updateTaskNode({ 
      id: $mostRecentlyCompletedTaskID,
      keyValueChanges: {
        isDone: false
      }
    })
    mostRecentlyCompletedTaskID.set('')
  }}>
  </TheSnackbar>
{/if}

<!-- Copy & paste snackbar -->
{#if $showSnackbar}
  <TheSnackbar>Email copied to clipboard successfully.</TheSnackbar>
{/if}

<NavbarAndContentWrapper>
  <div slot="navbar" class="top-navbar" class:transparent-glow-navbar={currentMode === 'Day'} style="padding-left: 2vw; padding-right: 2vw;">
    <GrandTreeTodoPopupButton let:setIsPopupOpen={setIsPopupOpen}
      on:new-root-task={(e) => createNewRootTask(e.detail)}
      on:task-unscheduled={(e) => unscheduleTask(e)}
      on:task-click={(e) => openDetailedCard(e.detail)}
      on:subtask-create={(e) => createSubtask(e.detail)}
      on:task-dragged={(e) => changeTaskDeadline(e.detail)}
      on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})}
    > 
      <img slot="button-slot" on:click={() => handleLogoClick(setIsPopupOpen)}
        src="trueoutput-square-nobg.png" 
        style="width: 38px; height: 38px; margin-right: 6px; margin-left: -4px; cursor: pointer;"
      >
    </GrandTreeTodoPopupButton>

    <div class="day-week-toggle-segment">
      <!-- quickfix so pressing home ALWAYS recalibrates you to today's region -->
      <div on:click={async () => { 
          currentMode = ''
          await tick()
          hasInitialScrolled.set(false)
          currentMode = 'Week'
        }}
        class="ux-tab-item" 
        class:active-ux-tab={currentMode === 'Week'} 
        class:transparent-inactive-tab={currentMode === 'Day'}
      >
       <span class="material-symbols-outlined" style="font-size: 32px;">
        house
        </span>
      </div>

      <div on:click={() => currentMode = 'ManageRepeats'}
        class="ux-tab-item" 
        class:active-ux-tab={currentMode === 'ManageRepeats'} 
        class:transparent-inactive-tab={currentMode === 'Day'}
      >
        <span class="material-symbols-outlined" class:blue-icon={currentMode === 'Dashboard'} style="font-size: 32px;">
          restart_alt
        </span>
      </div>
      

      <div on:click={() => currentMode = 'Year'}
        class="ux-tab-item" 
        class:active-ux-tab={currentMode === 'Year'} 
        class:transparent-inactive-tab={currentMode === 'Day'}
      >
        <span class="material-symbols-outlined" style="font-size: 36px;">
          sports_score
          </span>
      </div>
    </div>

    <!-- 
      KEEP THIS SO YOU CAN MIGRATE THIS TO YOUR JOURNAL APP
    <div on:click={() => currentMode = 'Day'}
      class="ux-tab-item hide-for-mobile" 
      class:transparent-glow-tab={currentMode === 'Day'} 
      style="margin-right: 8px;"
    >
      <span on:click={() => currentMode === 'Day' ? currentMode = 'Week' : currentMode = 'Day'} class="material-symbols-outlined"
        style="font-size: 30px; margin-top: 4px; color: black;"  
      >
        menu_book
      </span>
    </div> -->

    <span on:click={() => goto(`/${$user.uid}/camera`)} class="material-symbols-outlined mika-hover" style="margin-right: 32px; font-size: 30px; cursor: pointer;">
      photo
    </span>

    <PopupCustomerSupport let:setIsPopupOpen={setIsPopupOpen}>
      <span on:click={() => setIsPopupOpen({ newVal: true })}  class="material-symbols-outlined mika-hover" style="font-size: 32px; cursor: pointer;">
        support_agent
      </span>
    </PopupCustomerSupport>
  </div>

  <!-- position: relative; -->
  <div slot="content" style="display: flex; flex-grow: 1; height: 100%;">
      {#if currentMode === 'ManageRepeats'}
        <ManageReusableTasks {allTasks}/>
      {:else if currentMode === 'Day'}
        <!-- Show daytime art from 5 am - 7 pm, note `.getHours()` is 0-indexed from 0 to 23 -->
        {#if new Date().getHours() > 5 && new Date().getHours() < 18} 
          <BedtimePopupMaplestoryMusic willMusicAutoplay={$user.willMusicAutoplay}/>
        {:else} 
          <BackgroundRainScene willMusicAutoplay={$user.willMusicAutoplay}/>
        {/if}

        <div class="container-for-float-cards">
          <div class="glow-card-hover-effect rounded-card" style="width: 36%;">
            <ZenJournalLeftNavigation 
              journal={$user.journal} 
              journalTitleFromMMDD={$user.journalTitleFromMMDD}
              {currentJournalEntryMMDD}
              on:toggle-music-autoplay={(e) => updateMusicAutoplay(e)}
              on:journal-entry-select={(e) => currentJournalEntryMMDD = e.detail.newMMDD}
            />
          </div>

          <div class="glow-card-hover-effect rounded-card" style="margin-left: 4%; width: 60%;">
            {#key currentJournalEntryMMDD}
              <ZenJournal 
                journal={$user.journal}
                journalTitleFromMMDD={$user.journalTitleFromMMDD}
                {currentJournalEntryMMDD}
                willMusicAutoplay={$user.willMusicAutoplay}
                on:toggle-music-autoplay={(e) => updateMusicAutoplay(e)}
                on:journal-update={(e) => changeJournal(e.detail)}
                on:journal-entry-title-update={(e) => updateJournalEntryTitle(e.detail)}
              />
            {/key}
          </div>
        </div>
      
      <!-- WEEK MODE -->
      {:else if (currentMode === 'Week')}
        <!-- 1st flex child -->
        <div class="todo-container">
          <NewThisWeekTodo
            on:new-root-task={(e) => createNewRootTask(e.detail)}
            on:task-unscheduled={(e) => putTaskToThisWeekTodo(e)}
            on:task-click={(e) => openDetailedCard(e.detail)}
            on:subtask-create={(e) => createSubtask(e.detail)}
            on:task-dragged={(e) => changeTaskDeadline(e.detail)}
            on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})}
          />
        </div>
        
        <!-- 2nd flex child -->
        <div class="the-only-scrollable-container calendar-section-flex-child"> 
          {#if allTasks.length > 0}    
            <NewCalendarThisWeek
              {calStartDateClassObj}
              on:calendar-shifted={(e) => incrementDateClassObj({ days: e.detail.days})}
              on:new-root-task={(e) => createNewRootTask(e.detail)}
              on:task-click={(e) => openDetailedCard(e.detail)}
              on:task-update={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: e.detail.keyValueChanges })}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-dragged={(e) => changeTaskDeadline(e.detail)}
              on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})} 
            /> 
          {/if}
        </div>
      <!-- END OF WEEK MODE SECTION -->
      
      {:else if currentMode === 'Year'}
        <UncertainMilestones/>

        <!-- <YearView 
          {futureScheduledTasks}
          on:task-click={(e) => openDetailedCard(e.detail)}
          on:new-root-task={(e) => createNewRootTask(e.detail)}
          on:subtask-create={(e) => createSubtask(e.detail)}
        /> -->
      {/if}
  </div>
</NavbarAndContentWrapper>

<script>
  import { 
    computeDayDifference, 
    getDateOfToday, 
    getDateInDDMMYYYY, 
    generateRepeatedTasks, 
    checkTaskObjSchema,
    convertToISO8061
  } from '/src/helpers.js'
  import { 
    computeYearViewTimelines, 
    reconstructTreeInMemory,
    computeDateToTasksDict,
    computeTodoMemoryTrees,
    computeInclusiveWeekTodo
  } from '/src/helpers/dataStructures.js'
  import { 
    mostRecentlyCompletedTaskID, 
    user, 
    showSnackbar, 
    allTasksDueToday,
    allTasksDueThisWeek,
    allTasksDueThisMonth,
    allTasksDueThisYear,
    allTasksDueThisLife,
    longHorizonTasks,
    tasksScheduledOn,
    inclusiveWeekTodo,
    hasInitialScrolled
  } from '/src/store.js'
  import JournalPopup from '$lib/JournalPopup.svelte'
  import FinancePopup from '$lib/FinancePopup.svelte'
  import BedtimePopupMaplestoryMusic from '$lib/BedtimePopupMaplestoryMusic.svelte'
  import TheSnackbar from '$lib/TheSnackbar.svelte'
  import NewCalendarThisWeek from '$lib/NewCalendarThisWeek.svelte'
  import BackgroundRainScene from '$lib/BackgroundRainScene.svelte'
  import GrandTreeTodoPopupButton from '$lib/GrandTreeTodoPopupButton.svelte'
  import PopupCustomerSupport from '$lib/PopupCustomerSupport.svelte'
  import NavbarAndContentWrapper from '$lib/NavbarAndContentWrapper.svelte'
  import DetailedCardPopup from '$lib/DetailedCardPopup.svelte'
  import YearView from '$lib/YearView.svelte'
  import ZenJournal from '$lib/ZenJournal.svelte'
  import ZenJournalLeftNavigation from '$lib/ZenJournaLeftNavigation.svelte'
  import ManageReusableTasks from '$lib/ManageReusableTasks.svelte'
  import UncertainMilestones from '$lib/UncertainMilestones.svelte'

  import { onDestroy, onMount, tick } from 'svelte'
  import { goto } from '$app/navigation';
  import { getAuth, signOut } from 'firebase/auth'
  import db from '/src/db.js'
  import { doc, collection, getFirestore, updateDoc, arrayUnion, onSnapshot, arrayRemove, increment } from 'firebase/firestore'
  import { setFirestoreDoc, updateFirestoreDoc, deleteFirestoreDoc, getFirestoreCollection } from '/src/crud.js'
  import NewThisWeekTodo from '$lib/NewThisWeekTodo.svelte'
  import { garbageCollectInvalidTasks } from '/src/scripts.js'
  import { deleteObject, getStorage, ref } from 'firebase/storage'
  
  let currentMode = 'Week' // weekMode hourMode monthMode
  const userDocPath = `users/${$user.uid}`

  let isFinancePopupOpen = false
  let isDetailedCardOpen = false
  let isJournalPopupOpen = false

  let calStartDateClassObj = new Date()
  let currentJournalEntryMMDD = getDateOfToday()
  let dateOfToday = getDateOfToday()

  let allTasks = []
  let futureScheduledTasks = [] // AF([])

  let clickedTask = {}
  let isInitialFetch = true
  let unsub

  $: if (allTasks.length > 0) {
    computeDataStructuresFromAllTasks(allTasks)
  }

  function handleLogoClick (setIsPopupOpen) {
    if (!$user.email && !$user.phoneNumber) {
      signOutOnFirebase();
      goto('/');
    } else {
      setIsPopupOpen({ newVal: true })
    }
  }

  function signOutOnFirebase () {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  function createSubtask ({ id, parentID, newTaskObj }) {
    // the parent needs to update its pointers
    updateTaskNode({ id: parentID, keyValueChanges: { children: arrayUnion(id)}})
    createTaskNode({ id, newTaskObj })
  }

  function computeDataStructuresFromAllTasks (allTasks) {
    // future overview
    collectFutureScheduledTasksToArray()

    // grand tree todo
    const todoMemoryTrees = computeTodoMemoryTrees(allTasks)
    allTasksDueToday.set(todoMemoryTrees[0])
    allTasksDueThisWeek.set(todoMemoryTrees[1])
    allTasksDueThisMonth.set(todoMemoryTrees[2])
    allTasksDueThisYear.set(todoMemoryTrees[3])
    allTasksDueThisLife.set(todoMemoryTrees[4])

    // simple week todo
    inclusiveWeekTodo.set(computeInclusiveWeekTodo(allTasks))

    // year timeline view
    longHorizonTasks.set(computeYearViewTimelines(allTasks))
  }

  onMount(async () => {
    // garbageCollectInvalidTasks($user)
    // return
    const ref = collection(getFirestore(), `/users/${$user.uid}/tasks`)
    unsub = onSnapshot(ref, (querySnapshot) => {
      const result = [] 
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data()})
      })

      allTasks = reconstructTreeInMemory(result)

      tasksScheduledOn.set(computeDateToTasksDict(allTasks))

      // RE-WRITE / INTEGRATE THIS WHEN READY
      if (isInitialFetch) {
        isInitialFetch = false
        // TO-DO: properly DEPRECATE
        // maintainOneWeekPreviewWindowForRepeatingTasks(allTasks)
      }
    })
    // can't use `return` in reactive expression https://github.com/sveltejs/svelte/issues/2828  
  })

  onDestroy(() => {
    if (unsub) unsub()
  })

  const tasksPath = `/users/${$user.uid}/tasks/`

  async function createTaskNode ({ id, newTaskObj }) {
    const newTaskObjChecked = checkTaskObjSchema(newTaskObj, $user)
    setFirestoreDoc(tasksPath + id, newTaskObjChecked)

    // this below operation is redundant because checkTaskObjSchema 
    // will always update the `maxOrderValue` so it remains correct 
    // not just for Create operations, but for updates and deletes 
    updateFirestoreDoc(`users/${$user.uid}`, {
      maxOrderValue: increment(3)
    })
  }

  function updateTaskNode ({ id, keyValueChanges }) {
    updateFirestoreDoc(tasksPath + id, keyValueChanges)
    // very useful for debugging
  }

  // THIS IS STILL NOT WORKING: THE ADOPTION IS NOT WORKING, RIGHT NOW ALL THE 
  // SUBTREE WILL BE GONE FOR SOME REASON
  function deleteTaskNode ({ id, parentID, childrenIDs, imageDownloadURL = '', imageFullPath = ''}) {
    if (parentID !== "") {
      updateFirestoreDoc(tasksPath + parentID, {
        childrenIDs: arrayRemove(id)
      })
      // parent will be deleted, so the grandparent will take care of the children
      if (childrenIDs) {
        updateFirestoreDoc(tasksPath + parentID, {
          childrenIDs: arrayUnion(...childrenIDs)
        })
      }
    }

    // temporary to clean up tasks that were created that didn't conform to the schema
    // surprisngly many, keep it in to save time
    if (childrenIDs) {
      for (const childID of childrenIDs) {
        updateFirestoreDoc(tasksPath + childID, {
          "parentID": parentID
        })
      }
    }

    // TO-DO: handle pointerless images
    if (imageFullPath) {
      const storage = getStorage()
      deleteObject(ref(storage, imageFullPath))
    }

    // now safely delete itself
    deleteFirestoreDoc(tasksPath + id)
  }

  function updateMusicAutoplay (e) {
    const { newVal } = e.detail
    updateDoc(doc(db, userDocPath), {
      willMusicAutoplay: newVal
    }) 
    // quickfix
    // userDoc.willMusicAutoplay = newVal
    // userDoc = userDoc
  }

  function updateJournalEntryTitle ({ entryMMDD, newTitle }) {
    let updateObj = {}
    if ($user.journalTitleFromMMDD) updateObj = {...$user.journalTitleFromMMDD} 
    
    updateObj[entryMMDD] = newTitle    
    updateDoc(doc(db, userDocPath), {
      journalTitleFromMMDD: updateObj
    }) 
  }   

  function incrementDateClassObj ({ days }) {
    const d = calStartDateClassObj 
    const offset = days * (24*60*60*1000)
    d.setTime(d.getTime() + offset)
    calStartDateClassObj = d // to manually trigger reactivity
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  function getDayOfWeek (dateClassObj) {
    // const today = new Date()
    const options = { weekday: 'long' } // can be short for Mon. instead of Monday
    return new Intl.DateTimeFormat('en-US', options).format(dateClassObj)
  }

  function changeJournal({ newJournal }) {
    updateDoc(doc(db, userDocPath), {
      journal: newJournal
    })
  }

  // FOR DEBUGGING PURPOSES, TURN IT ON TO TRUE TO RUN SCRIPT ONCE
  let testRunOnce = false

  function openDetailedCard ({ task }) {
    clickedTask = task
    isDetailedCardOpen = true
  }

  function traverseAndUpdateTree ({ fulfilsCriteria, applyFunc }) {
    const artificialRootNode = {
      name: 'root',
      children: allTasks
    }
    helperFunction({ node: artificialRootNode, fulfilsCriteria, applyFunc })
  }

  // useful helper function for task update operations
  function helperFunction ({ node, fulfilsCriteria, applyFunc }) {
    if (fulfilsCriteria(node)) {
      applyFunc(node)
    } 
    for (const child of node.children) {
      helperFunction({ node: child, fulfilsCriteria, applyFunc })
    }
  }

  // quick-fix for NaN/NaN bug
  function collectFutureScheduledTasksToArray () {
    const yearNumber = new Date().getFullYear()
    futureScheduledTasks = [] // reset 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => { 
        if (!task.startTime || !task.startDate) return 
        if (task.willRepeatOnWeekDayNumber) return
        const d1 = new Date(convertToISO8061({ mmdd: task.startDate }))
        
        // setHours(hoursValue 0 - 23, minutesValue 0 - 59)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
        const [hh, mm] = task.startTime.split(":")
        d1.setHours(Number(hh), Number(mm))
        return (task.startDate && task.startDate !== 'NaN/NaN') && 
                (!task.willRepeatOnWeekDayNumber) &&
                  (task.startTime) &&
                    (d1.getTime() >= new Date().getTime()) && 
                      (Number(task.startYYYY) === Number(yearNumber.toString())) // this line is a quickfix because we don't store YYYY values in legacy versions
      }, // 'NaN' quick-fix bug
      applyFunc: (task) => futureScheduledTasks = [...futureScheduledTasks, task]
    })

    // TO-DO: don't include all the tasks in the future, only if it is bounded by < 7 days for the week view, and < 30 days for the month view
    futureScheduledTasks.sort((task1, task2) => {
      const d1 = new Date(task1.startDate)
      const d2 = new Date(task2.startDate)
      return d1.getTime() - d2.getTime() // most recent to the top??
    })
  }
  
  async function createReusableTaskTemplate (id) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id, 
      applyFunc: async (task) => {
        const userRef = doc(db, userDocPath)
        await updateDoc(userRef, {
          reusableTaskTemplates: arrayUnion(task)
        })
      }
    })
  }

  /*
  // TODO: IMPLEMENT THIS LOGIC
    When a task is scheduled but missed, there are 2 possibilities:
      - It's a special i.e. non-repeating event: return it to the to-do
      - It's a repeating event: just increment the miss count 
  */
  async function resetScheduledButMissedNonRepeatingTasks (taskTree) {
    const rootNode = {
      name: 'root 2',
      children: taskTree
    }
    helperFunction({
      node: rootNode,
      fulfilsCriteria: (task) => task.startDate < dateOfToday,
      applyFunc: (task) => {
        // handle one-off tasks that isn't done - this will return to the to-do
        if (!task.daysBeforeRepeating && !task.isDone) {
          task.startDate = ''
          task.startTime = ''
          // this means the task will re-appear on the unscheduled todo-list
        }
      }
    })
  }

  async function changeTaskStartTime ({ id, timeOfDay, dateScheduled }) {
    updateTaskNode({ id, keyValueChanges: {
      startTime: timeOfDay,
      startDate: dateScheduled, 
      startYYYY: new Date().getFullYear().toString()
    }})
  }

  async function changeTaskDeadline ({ id, deadlineTime, deadlineDate }) {
    updateTaskNode({ id, keyValueChanges: {
      "deadlineTime": deadlineTime,
      "deadlineDate": deadlineDate
    }})
  }

  function createNewRootTask (newTaskObj) {
    createTaskNode({ 
      id: newTaskObj.id, 
      newTaskObj: newTaskObj
    })
  }

  // mvoe to this week's todo
  function putTaskToThisWeekTodo (e) {
    e.preventDefault()
    // for backwards compatibility
    let id
    if (e.detail.id) {
      id = e.detail.id
    } else {
      id = e.dataTransfer.getData('text/plain')
    }
    // get next week's date class object
    const d = new Date()
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1)
    }

    updateTaskNode({ id, keyValueChanges: {
      startTime: '',
      startDate: '',
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '07:00'
    }})
  }

  // TO-DO: also refactor this
  // unscheduling back to grand to-do
  function transformToLifeTask (e) {
    e.preventDefault()
    // for backwards compatibility
    let id
    if (e.detail.id) {
      id = e.detail.id
    } else {
      id = e.dataTransfer.getData('text/plain')
    }
    updateTaskNode({ id, keyValueChanges: {
      startTime: '',
      startDate: '',
      deadlineDate: '',
      deadlineTime: '',
      parentID: '', // this is a quickfix, in the future handle data in This Life Todo properly
      isDone: false
    }})
  }

  // for tasks dragged into a todo-list
  function unscheduleTask (e) {
    e.preventDefault()
    // for backwards compatibility
    let id
    if (e.detail.id) {
      id = e.detail.id
    } else {
      id = e.dataTransfer.getData('text/plain')
    }
    updateTaskNode({ id, keyValueChanges: {
      startTime: '',
      startDate: '',
      isDone: false
    }})
  }

  // WORK IN PROGRESS: node.children will be undefined 
  // because `allTasks` is implicitly passed into 
  // `traverseAndUpdateTree`, and is not yet hydrated from database
  // 
  // I'm considering refactor these functions into a separate file, 
  // and also passing explicit parameters. Might deserve an explanation video. ,
  // as mutations, pointers are a concern with these deeply nested data structures. 
  function maintainOneWeekPreviewWindowForRepeatingTasks () {
    const uniqueRepeatIDs = new Set()
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.repeatGroupID,
      applyFunc: (task) => { 
        uniqueRepeatIDs.add(task.repeatGroupID)
      }
    })

    // STEP 2: for each repeated task, check if it's necessary to extend the preview window
    // https://www.explanations.app/KsPz7BOExANWvkaauNKE/i4udjmZVtXToD9JKyMCD
    for (const repeatID of [...uniqueRepeatIDs]) {
      traverseAndUpdateTree({
        fulfilsCriteria: (task) => task.id === repeatID, 
        applyFunc: (originalTask) => {
          const daysWithoutRepeating = computeDayDifference(new Date(originalTask.lastRanRepeatAtIsoString), new Date())
          if (7 <= daysWithoutRepeating || !originalTask.lastRanRepeatAtIsoString) {
            const allGeneratedTasksToUpload = generateRepeatedTasks(originalTask)
            uploadGeneratedTasks({ 
              allGeneratedTasksToUpload, 
              repeatGroupID: repeatID,
              willRepeatOnWeekDayNumber: originalTask.willRepeatOnWeekDayNumber
            }) 
          }
        }
      })
    }
  }

  async function uploadGeneratedTasks ({ allGeneratedTasksToUpload, repeatGroupID, willRepeatOnWeekDayNumber }) {
    // quickfix: the generated tasks have the repeat schedule, but the original task doesn't, so add it here
    updateTaskNode({ id: repeatGroupID, keyValueChanges: {
      "willRepeatOnWeekDayNumber": willRepeatOnWeekDayNumber,
      lastRanRepeatAtIsoString: new Date().toISOString()
    }})

    for (const generatedTask of allGeneratedTasksToUpload) {
      createTaskNode({ id: generatedTask.id, newTaskObj: generatedTask })
    }
  }
</script>

<style>  
  .todo-container {
    min-width: 360px; 
    background-color: var(--todo-list-bg-color);
    font-size: 2em;
    overflow-y: auto;
  }

  .rounded-card {
    /* border-radius: 36px; */
    padding: 24px;
    border-radius: 6px;
  }

  .rounded-card::webkit-scrollbar {
    width: 0px;
  }

  .container-for-float-cards {
    margin: auto;  
    height: 70%;
    min-width: 800px;
    width: 70%;
    max-width: 1200px;
    z-index: 1; 
    display: flex;
  }

  .the-only-scrollable-container {
    position: relative;
    overflow: auto; 
  }

  .calendar-section-flex-child {
    background-color: var(--calendar-bg-color);
  }

  .day-week-toggle-segment {
    display: flex; 
    margin-left: 64px;
    width: fit-content; 
    justify-content: space-evenly; 
    border-bottom: 0px solid rgb(200, 200, 200);
    margin: auto;
  }

  
  .ux-tab-item {
    box-sizing: border-box;
    height: 60px;
    width: 72px;
    display: flex; 
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    color: rgb(120, 120, 120);
    font-weight: 300;
  }

  .transparent-glow-tab {
    color: white;
    font-weight: 500;
    border-bottom: 1px solid white;
  }

  .transparent-inactive-tab {
    color: black;
    font-weight: 400;
  }

  .active-ux-tab {
    border-bottom: 1px solid var(--location-indicator-color);
    color: var(--location-indicator-color);
    font-weight: 500;
  }

  .transparent-glow-navbar {
    background-color: rgba(150, 150, 150, 0.1);
    border-bottom: none;
  }

  .glow-card-hover-effect {
    /* BOX SHADOW */
    /* #48abe0; was the original glow box shadow color */
    /* box-shadow: 0 0 48px 15px #3b3b3b;   */
    box-shadow: 0 0 48px 15px #ffffff3b;  

    /* Additional ways to blend the cards to the background suggested by Claude AI */
    /* 90% opacity without affecting children */
    background-color: rgba(40, 40, 40, 0.75);
    color: white;
  } 

  .mika-hover {
    transition: all 0s ease-out;
  }

  .mika-hover:hover{
    color: #0085FF;
    /* background-color: #0085FF; */
    /* border: 1px solid #0085FF; */
    transition: all 0.2s ease-out;
  }

  .blue-icon {
    color: #0085FF;
  }

  /* #radio-player-with-art {
    background-image: url('../maplestory-watercolor.jpg')
  } */
  
  @media (max-width: 1279.99px) {
    .todo-container {
      min-width: 280px;
    }
  }

  @media (max-width: 767.99px) {
    .todo-container {
      min-width: 200px;
    }

    .hide-for-mobile {
      display: none;
    }
  }
</style>