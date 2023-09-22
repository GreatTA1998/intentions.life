

{#key clickedTask}
  {#if isDetailedCardOpen}
    <DetailedCardPopup 
      taskObject={clickedTask}
      on:task-click={(e) => openDetailedCard(e.detail)}
      on:card-close={() => isDetailedCardOpen = false}
      on:task-done={() => toggleTaskCompleted(clickedTask.id)}
      on:task-delete={() => deleteSubtree(clickedTask.id)}
      on:task-repeat={updateEntireTaskTree}
      on:task-schedule={(e) => scheduleATask(e.detail)}
      on:task-title-update={(e) => changeNameOfATask(e.detail)}
      on:task-notes-update={(e) => changeNotesOfATask(e.detail)}
      on:task-dragged={(e) => changeTaskDeadline(e.detail)}
      on:repeating-tasks-generate={(e) => uploadGeneratedTasks(e.detail)}
    />
  {/if}
{/key}

{#if isJournalPopupOpen}
  <JournalPopup
    {goalsAndPosters}
    isOpen={isJournalPopupOpen}
    journal={userDoc.journal}
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

{#if isBedtimePopupOpen}
  <BedtimePopup
    isOpen={isBedtimePopupOpen}
    on:card-close={() => isBedtimePopupOpen = false}
  />
{/if}

<div id="background-image-holder" style="height: 100vh;">
  <a role="button" on:click={() => isJournalPopupOpen = !isJournalPopupOpen} class="float mika-hover" style="right: 250px; z-index: 10"  
  class:blue-focus={isJournalPopupOpen}>
    <span class="material-icons my-float">
      auto_stories
    </span>
  </a>

  <a role="button" on:click={() => isFinancePopupOpen = !isFinancePopupOpen} class="float mika-hover" style="right: 190px; z-index: 10"
  class:blue-focus={isFinancePopupOpen}>
    <span class="material-icons my-float">
      attach_money
    </span>
  </a>

  <a role="button" on:click={() => isBedtimePopupOpen = !isBedtimePopupOpen} class="float mika-hover" style="right: 130px; z-index: 10"
  class:blue-focus={isBedtimePopupOpen}>
    <span class="material-icons my-float">
      bedtime
    </span>
  </a>

  <div style="display: flex"> 
    <!-- 1st flex child -->
    <div style="width: 70vw">
      <div style="margin-left: 45px; margin-top: 47px; display: flex; align-items: center;">
        <div class="mika-rectangle" on:click={() => currentMode = 'hourMode'}
          class:selected-rectangle={currentMode === 'hourMode'}
        >
          Hour
        </div>
        <div class="mika-rectangle" class:selected-rectangle={currentMode === 'dayMode'} 
          on:click={() => currentMode = 'dayMode'}>
          Day
        </div>
        <div class="mika-rectangle" on:click={() => currentMode = 'weekMode'}
          class:selected-rectangle={currentMode === 'weekMode'} 
        >
          Week
        </div>
        <div class="mika-rectangle" on:click={() => currentMode = 'monthMode'}
          class:selected-rectangle={currentMode === 'monthMode'}  
        >
          Month
        </div>

        <div class="mika-rectangle" on:click={() => currentMode = 'playgroundMode'}
          class:selected-rectangle={currentMode === 'playgroundMode'}  
        >
          Playground
        </div>
      </div>

      <div style="font-family: Inter; font-weight: 600; font-size: 28px; margin-left: 20px; padding: 30px 0px 10px 35px; color: #000000">
        {getDayOfWeek()}, { getNicelyFormattedDate() }, { new Date().getFullYear() }
      </div>

      <div class="flex-container blur">
        <div class="calendar-section-container">
          {#if currentMode === 'hourMode'}
            <HourView
              {allTasks}
              scheduledTasksToday={todayScheduledTasks}
              on:task-done={(e) => toggleTaskCompleted(e.detail.id)}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
              on:task-click={(e) => openDetailedCard(e.detail)}
              on:task-dragged={(e) => changeTaskDeadline(e.detail)}
              on:task-checkbox-change={(e) => toggleTaskCompleted(e.detail.id)}
            />
          {:else if currentMode === 'dayMode'}
            <DayView
              {allTasks}
              scheduledTasksToday={todayScheduledTasks}
              on:task-done={(e) => toggleTaskCompleted(e.detail.id)}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
              on:task-click={(e) => openDetailedCard(e.detail)}
              on:task-dragged={(e) => changeTaskDeadline(e.detail)}
              on:task-checkbox-change={(e) => toggleTaskCompleted(e.detail.id)}
              {futureScheduledTasks}
            />
          {:else if currentMode === 'weekMode'}
            <WeekView
              {allTasks}
              {thisWeekScheduledTasks}
              on:task-click={(e) => openDetailedCard(e.detail)}
              on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-dragged={(e) => changeTaskDeadline(e.detail)}
              on:task-checkbox-change={(e) => toggleTaskCompleted(e.detail.id)}
            />
          {:else if currentMode === 'monthMode'}
            <MonthView
              {allTasks}
              {thisMonthScheduledTasks}
              on:task-click={(e) => openDetailedCard(e.detail)}
              on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-dragged={(e) => changeTaskDeadline(e.detail)}
              on:task-checkbox-change={(e) => toggleTaskCompleted(e.detail.id)}
            />
          {:else if currentMode === 'playgroundMode'}
            <Playground
              {allTasks}
              on:task-node-update={(e) => updateNode({ id: e.detail.id, newDeepValue: e.detail.newDeepValue })}
              on:task-click={(e) => openDetailedCard(e.detail)}
              on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-dragged={(e) => changeTaskDeadline(e.detail)}
              on:task-checkbox-change={(e) => toggleTaskCompleted(e.detail.id)}
            />
          {/if}
        </div>
      </div>
    </div>
    <!-- end of 1st flex child -->

    <div class="todo-container" 
      style="background-color:#F4F4F4; padding-top: 170px;" 
      on:drop={(e) => unscheduleTask(e)}
      on:dragover={(e) => dragover_handler(e)}
    >
      <div class="todo-list">
        {#if allTasks}
          {#each allTasks as task}
            {#if !task.isDeleted}
              <div class="task-container">
                <RecursiveTask 
                  on:task-click={(e) => openDetailedCard(e.detail)}
                  on:task-create={(e) => modifyTaskTree(e, task)} 
                  on:task-done={updateEntireTaskTree}
                  on:task-delete={updateEntireTaskTree}
                  on:task-repeating={updateEntireTaskTree}
                  taskObject={task}
                  depth={1}
                />
              </div>
            {/if}
          {/each}

          <!-- CREATE NEW TASK (invisible but hoverable region) -->
          <div style="height: 300px; width: 200px;"
            on:mouseenter={() => isShowingCreateButton = true}
            on:mouseleave={() => isShowingCreateButton = false}
          >
            {#if isShowingCreateButton}
              {#if !isTypingNewRootTask}
                <div style="font-size: 2rem; color: #000000;" on:click={() => isTypingNewRootTask = true}>
                  New task 
                </div>
              {:else}
                <div style="display: flex; align-content: center; justify-items: center">
                  <input 
                    bind:value={newTopLevelTask} placeholder="Type task..." 
                    on:keypress={detectEnterKey2}
                  >
                </div>
              {/if}
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <!-- End of flexbox -->
  
  <!-- UNDO COMPLETED SNACKBAR -->
  {#if $mostRecentlyDeletedOrCompletedTaskID && countdownRemaining > 0}
    <TheSnackbar on:task-done={(e) => toggleTaskCompleted(e.detail.id)}></TheSnackbar>
  {/if}
</div>

<script>
  export let data
  // RENAME THIS TO USER_UID
  let { userID } = data; // GxBbopqXHW0qgjKEwU4z 
  $: ({ userID } = data); // so it stays in sync when `data` changes

  import UnscheduledTasksForToday from '$lib/UnscheduledTasksForToday.svelte'
  import RecursiveTask from '../../RecursiveTask.svelte'

  // import FutureOverview from '../../lib/FutureOverview.svelte'
  import DetailedCardPopup from '$lib/DetailedCardPopup.svelte'
  import { MIKA_PIXELS_PER_HOUR, PIXELS_PER_HOUR, getNicelyFormattedDate, computeDayDifference, convertDDMMYYYYToDateClassObject } from '../../helpers.js'
  import { onMount } from 'svelte'
  import db from '../../db.js'
  import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
  import { getRandomInt, getDateOfToday, getDateOfTomorrow, getDateInMMDD, getDateInDDMMYYYY, getRandomID } from '../../helpers.js'
  import JournalPopup from '$lib/JournalPopup.svelte'
  import FinancePopup from '$lib/FinancePopup.svelte'
  import BedtimePopup from '$lib/BedtimePopup.svelte'

  import HourView from '$lib/HourView.svelte'
  import DayView from '$lib/DayView.svelte'
  import WeekView from '$lib/WeekView.svelte'
  import MonthView from '$lib/MonthView.svelte'
  import TheSnackbar from '$lib/TheSnackbar.svelte'
  import { mostRecentlyDeletedOrCompletedTaskID, mostRecentlyCompletedTaskName, user } from '/src/store.js'
  import Playground from '$lib/Playground.svelte'

  let snackbarTimeoutID = null
  let countdownRemaining = 0

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  function getDayOfWeek () {
    const today = new Date()
    const options = { weekday: 'long' } // can be short for Mon. instead of Monday
    return new Intl.DateTimeFormat('en-US', options).format(today)
  }

  let currentMode = 'dayMode' // weekMode hourMode monthMode

  let isFinancePopupOpen = false
  let isBedtimePopupOpen = false

  let unsubUserDocListener
  let userDoc = null 
  const userDocPath = `users/${userID}`
  let isTypingNewTask = false
  const habitPoolToResolveConflict = []

  let bgImageURLs = [
    'https://i.imgur.com/ShnqIpJ.jpeg' // airships 
  ]

  let chosenBgImageURL
  let allTasks = null // WARNING, DON'T INITIALIZE TO []
  // I once tried `allTasks = []`, it wiped my entire task tree because it synced the empty [] (which it thinks is fully fetched) with the database.task
  // AF(null) --> unfetched 
  // AF([]) --> fresh new todo-list
  let dateOfToday = getDateOfToday()
  let todayScheduledTasks = []
  let futureScheduledTasks = [] // AF([])
  let thisWeekScheduledTasks = [] 
  let thisMonthScheduledTasks = []

  let newTopLevelTask = ''
  let isTypingNewRootTask = false
  let isShowingCreateButton = false

  let isDetailedCardOpen = false
  let isJournalPopupOpen = false
  let clickedTask = {}
  let goalsAndPosters = ''

  onMount(() => {
    chosenBgImageURL = bgImageURLs[getRandomInt(1)]
    const div = document.getElementById("background-image-holder")
    // div.style['background-image'] = `url(${chosenBgImageURL})`

    listenToTasks()
  })

  // TO-DO: you don't necessarily want to re-run this everytime `allTasks` changes
  $: if (allTasks) {
    collectTodayScheduledTasksToArray()
    collectFutureScheduledTasksToArray()
    collectThisWeekScheduledTasksToArray()
    collectThisMonthScheduledTasksToArray()

    // TO-DO: don't include all the tasks in the future, only if it is bounded by < 7 days for the week view, and < 30 days for the month view

    futureScheduledTasks.sort((task1, task2) => {
      const d1 = new Date(task1.startDate)
      const d2 = new Date(task2.startDate)
      return d1.getTime() - d2.getTime() // most recent to the top??
    })
  }

  async function uploadGeneratedTasks (param) {
    const { allGeneratedTasksToUpload } = param
    const { repeatGroupID, willRepeatOnWeekDayNumber } = allGeneratedTasksToUpload[0]

    // quickfix: the generated tasks have the repeat schedule, but the original task doesn't, so add it here
    traverseAndUpdateTree({
      fulfilsCriteria: task => task.id === repeatGroupID,
      applyFunc: task => {
        console.log('found original task =', task)
        task.willRepeatOnWeekDayNumber = willRepeatOnWeekDayNumber
      }
    })

    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        // `filter` according to MDN docs: empty array will be returned if no child passes the test
        const filter = task.children.filter(child => child.id === repeatGroupID)
        return filter.length === 1      
      }, 
      applyFunc: (task) => {
        task.children = [...task.children, ...allGeneratedTasksToUpload]
      }
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  }

  function changeJournal({ newJournal }) {
    updateDoc(doc(db, userDocPath), {
      journal: newJournal
    })
  }

  // FOR DEBUGGING PURPOSES, TURN IT ON TO TRUE TO RUN SCRIPT ONCE
  let testRunOnce = false

  // DON'T DELETE BELOW: CONVENIENT FOR DEBUGGING
  // let isFirstTime = true
  async function listenToTasks () { 
    try {
      unsubUserDocListener = onSnapshot(doc(db, userDocPath), async snapshot => {
        // don't know why it would fix it
        // const source = snapshot.metadata.hasPendingWrites ? 'Local' : 'Server'
        // if (source === 'Local') {
        //   return
        // }

        userDoc = snapshot.data()

        user.set(userDoc)

        const { lastRanRepeatAtDate } = snapshot.data()
        goalsAndPosters = snapshot.data().goalsAndPosters || ''
        // HANDLE TASKS THAT REPEAT
        // can't use `return` in reactive expression https://github.com/sveltejs/svelte/issues/2828
        
        // yes, this reset algorithm won't run unless you open the app
        // we explicitly assume we'll open organize-life every day : ) which simplifies the code 

        // this is the base case condition, otherwise infinite recursion will happen
        // as we are inside a snapshot listener

        // FOR DEBUGGING
        // console.log('lastRanRepeatDate =', lastRanRepeatAtDate)
        // console.log('and today is =', dateOfToday)
        // console.log("testRunOnce =", testRunOnce)

        if ((lastRanRepeatAtDate !== dateOfToday) || testRunOnce) {
          testRunOnce = false
          console.log('new day, resetting tasks')
          const copy = [...snapshot.data().allTasks]

          // maintainOneWeekPreviewWindowForRepeatingTasks(copy)

          // OLD WAY OF REPEATING TASKS - KEEP SHIFTING THE SAME TASK
          // for (const task of copy) {
          //   recursivelyResetRepeatingTasks(task)
          // }

          console.log("dateOfToday =", dateOfToday)
          updateDoc(doc(db, userDocPath), { 
            allTasks: copy, 
            lastRanRepeatAtDate: dateOfToday // dateOfToday
          })
        }
        allTasks = [...snapshot.data().allTasks]
      })
    } catch (error) {
      alert("Can't retrieve user info, see console for details:", error)
      console.error(error)
    }
  }

  /**
   *  Handle repeating habits e.g. meditate every 3 day, run every 7 days
   *  @see https://explain.mit.edu/mDbUrvjy4pe8Q5s5wyoD/2bePUmmRDGP6KR61Hgqa
   */
  //  TO-DO: 
  //     - Use a date manipulation / date arithmetic library e.g. moment.js
  function recursivelyResetRepeatingTasks (node) {
    // TO-DO: handle repeating events 
    
    // FULL LOGIC FOR HABITS
    // A habit should always repeat regardless of whether it was done or not
    // `daysBeforeRepeating` and `deadlineDate` are the key quantities we will use

    // This can be easily corrected/upgraded by running it once per day with Cloud Functions,
    // but the core logic works

    // for now we ignore hour mode and the implications of more specific `deadlineTime`
    if (node.repeatType === 'habit' && node.daysBeforeRepeating && node.deadlineDate && node.deadlineTime) {
      console.log('habit being reset =', node)
      // update stats for this habit
      if (!node.isDone) {
        node.missedCount = (node.missedCount += 1) || 1
      } else {
        // note: if it's completed, the `completionCount` would've already been updated
      }
      node.isDone = false 
      
      // WE COMPARE deadlineDate + daysBeforeRepeating vs today
      const { daysBeforeRepeating, deadlineDate, deadlineTime } = node

      const [dd, mm, yyyy] = deadlineDate.split('/')
      const d1 = new Date(yyyy, mm - 1, dd) // mm is 0 indxed when initializing (I KNOW)
      d1.setDate(d1.getDate() + Number(daysBeforeRepeating))

      const today = new Date()
   
      const dayDiff = computeDayDifference(d1, today)

      // USEFUL DEBUGGING LOGS
      // if (node.name === 'Exercise') {
        // console.log('d1, d2 =', d1, today)
        // console.log('dayDiff =', dayDiff)
      // }

      if (dayDiff >= 0) { // i.e. today is larger than the next repeating date for the habit
        node.deadlineDate = getDateInDDMMYYYY(today)

        // just because it was scheduled at a particular time a few days ago
        // does not mean you want to do it at exactly the same time today
        node.startDate = ''
        node.startTime = ''

        console.log('successfully shifted new deadline for habit =', node)
        // we leave `deadlineTime` untouched for now
      }
    }
    
    // RECURSIVELY CALL FOR CHILDREN TASKS
    for (const child of node.children) {
      recursivelyResetRepeatingTasks(child)
    }
  }

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

  async function scheduleATask (id, newStartTime, newStartDate) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id, 
      applyFunc: (task) => {
        task.startDate = newStartDate
        task.startTime = newStartTime
      }
    })
    await updateDoc(doc(db, userDocPath), {
      allTasks
    })
  }

  async function changeNotesOfATask ({ id, newNotes }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id, 
      applyFunc: (task) => task.notes = newNotes
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  } 

  async function changeNameOfATask ({ id, newName }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id, 
      applyFunc: (task) => task.name = newName
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  } 

  function collectTodayScheduledTasksToArray () {
    todayScheduledTasks = [] // reset
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.startDate === getDateOfToday() && task.startTime, 
      applyFunc: (task) => todayScheduledTasks = [...todayScheduledTasks, task]
    })
  } 

  // quick-fix for NaN/NaN bug
  function collectFutureScheduledTasksToArray () {
    const yearNumber = new Date().getFullYear()
    futureScheduledTasks = [] // reset 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => { 
        return (task.startDate && task.startDate !== 'NaN/NaN') && 
                 (task.startTime && task.startDate > getDateOfToday()) &&
                   (task.startYYYY === yearNumber.toString())
      }, // 'NaN' quick-fix bug
      applyFunc: (task) => futureScheduledTasks = [...futureScheduledTasks, task]
    })
  }


  function collectThisMonthScheduledTasksToArray () {
    thisMonthScheduledTasks = [] // reset
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        if (!task.startDate) return false
        
        // create d2 date object
        let d2 
        if (task.startDate.length === 5) {
          const yyyy = new Date().getFullYear()
          const [mm, dd] = task.startDate.split('/')
          d2 = new Date(yyyy, mm, dd) 
        } else {
          const [dd, mm, yyyy] = task.startDate.split('/')
          d2 = new Date(yyyy, mm, dd) 
        }
        const today = new Date()

        const d1 = new Date(today.getFullYear(), 1 + today.getMonth(), today.getDate())
        // the reason for +1 see Stackoverflow, getMonth() is zero-indexed which VERY stupid
        // // https://stackoverflow.com/a/18624336

        const dayDiff = computeDayDifference(d1, d2)
        return dayDiff >= 0 && dayDiff <= 30
      }, 
      applyFunc: (task) => thisMonthScheduledTasks = [...thisMonthScheduledTasks, task]
    })
  } 



  // note due to a bug, sometimes `mm` is like 131 instead of a valid hour, 
  // which fucks up the computation

  // note it's not always dd:mm for mat
  // I actually do the US format of 06/14
  // which fucks it up
  function collectThisWeekScheduledTasksToArray () {
    thisWeekScheduledTasks = [] // reset
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        if (!task.startDate) return false
        
        // create d2 date object
        let d2 
        if (task.startDate.length === 5) {
          const yyyy = new Date().getFullYear()
          const [mm, dd] = task.startDate.split('/')
          d2 = new Date(yyyy, mm, dd) 
        } else {
          const [dd, mm, yyyy] = task.startDate.split('/')
          d2 = new Date(yyyy, mm, dd) 
        }
        const today = new Date()

        const d1 = new Date(today.getFullYear(), 1 + today.getMonth(), today.getDate())
        // the reason for +1 see Stackoverflow, getMonth() is zero-indexed which VERY stupid
        // // https://stackoverflow.com/a/18624336

        const dayDiff = computeDayDifference(d1, d2)
        return dayDiff >= 0 && dayDiff <= 7 
      }, 
      applyFunc: (task) => thisWeekScheduledTasks = [...thisWeekScheduledTasks, task]
    })
  } 
  
  async function toggleTaskCompleted (id) {
    traverseAndUpdateTree({ 
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: (task) => { 
        task.isDone = !task.isDone
        if (task.isDone) { 
          task.completionCount = task.completionCount + 1 || 1
          if (task.daysBeforeRepeating) {
            task.lastCompletionDate = getDateOfToday()
          }

          mostRecentlyCompletedTaskName.set(task.name)
          mostRecentlyDeletedOrCompletedTaskID.set(task.id)
          // this code is terrible but my sanity is more important
          countdownRemaining = 10
          snackbarTimeoutID = setTimeout(
            () => { 
              countdownRemaining = 0
              clearTimeout(snackbarTimeoutID)
              snackbarTimeoutID = null
            },
            10000
          )
        }
        else {
          task.completionCount = task.completionCount - 1 || 0 
          // TO-DO: think of consequences of not undoing `lastCompletionDate`
          if (snackbarTimeoutID) {
            clearInterval(snackbarTimeoutID)
          }
          countdownRemaining = 0
        }
      }
    })
    // update database
    await updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
  }


  async function deleteSubtree (id) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.children.filter(child => child.id === id).length >= 1, // inequality is important because sometimes 2 or more tasks have the same name
      applyFunc: (task) => { 
        let idx = null
        // do not use `forEach` it might mutate the array while it iterates even if you use return statements etc. it's unintuitive code
        for (let i = 0; i < task.children.length; i++) {
          if (task.children[i].id === id) {
            idx = i
            break
          }
        }
        if (idx >= 0) { // sometimes `idx` is undefined for some reason, meaning the last item of the array will be deleted
          task.children.splice(idx, 1)
        }
      }
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  }

  /*
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

  async function updateNode ({ id, newDeepValue }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        const filter = task.children.filter(child => child.id === id)
        return filter.length === 1  
      },  // `filter` according to MDN docs: empty array will be returned if no child passes the test
      applyFunc: (task) => {
        const copyOfChildren = [...task.children]
        for (let i = 0; i < copyOfChildren.length; i++) {
          if (copyOfChildren[i].id === id) {
            copyOfChildren[i] = newDeepValue
            task.children = copyOfChildren
            console.log("successfully modified tree")
            return
          }
        }
      }
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  }


  async function changeTaskStartTime ({ id, timeOfDay, dateScheduled }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: (task) => {
        const yearNumber = new Date().getFullYear()
        task.startTime = timeOfDay 
        task.startDate = dateScheduled
        task.startYYYY = yearNumber.toString()
      }
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  }

  async function changeTaskDeadline ({ id, deadlineTime, deadlineDate }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id, 
      applyFunc: (task) => {
        task.deadlineTime = deadlineTime
        task.deadlineDate = deadlineDate
        task.startTime = ''
      }
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  }

  async function changeTaskDuration ({ taskName, id, duration }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: (task) => task.duration = duration
    })
    await updateDoc(doc(db, userDocPath), { 
      allTasks 
    })
  }

  // NOTE: it works by mutating the task nodes directly, it assumes aliasing
  function scheduleHabitsWithoutClashing () {
    // initially deadline is end of day, 00:00
    // but there's already a task there, so the actual deadline becomes 00:00 - task.duration
    // now you just repeat it until no tasks are left
    let trueEndOfDay = 1440 
    const pixelsBetweenEachHabit = 20
    for (const habit of habitPoolToResolveConflict) {
      // convert everything into minutes, so military time 
      // 00:00: start of new day := 0 minutes
      // 24:00: end of new day := 1440 minutes
      trueEndOfDay -= ((habit.duration || 5) + pixelsBetweenEachHabit) // note `.duration` is already in minutes

      // convert to 'hh:mm' format
      const militaryHours = trueEndOfDay / 60
      const integerPart = parseInt(militaryHours)
      const decimalPart = militaryHours - integerPart
      const hh = integerPart
      let mm = Math.round(decimalPart * 60) 
      if (mm < 10) mm = `0${mm}`
      habit.startTime = `${hh}:${mm}`
      console.log(`habit ${habit.name} starts =`, habit.startTime)
    }
  }

  function detectEnterKey2 (e) { 
    if (e.charCode === 13) {
      createTask()
    }
  }

  function createTask () {
    if (!newTopLevelTask) {
      alert("You have to type something first")
    }
    const newValue = [
      ...allTasks, 
      { name: newTopLevelTask,
        duration: 15, // minutes 
        children: [],
        id: getRandomID()
      }
    ]

    updateDoc(
      doc(db, userDocPath),
      { allTasks: newValue }
    )

    newTopLevelTask = ''
    isTypingNewTask = false
  }

  function modifyTaskTree (e, task) {
    // change the reference
    const { updatedChildren } = e.detail
    task.children = [...updatedChildren]

    updateEntireTaskTree()
  }

  // change the pointer to the updatedChildren
  // allTasks' subtree is mutated, and it will correctly reference it,
    
  // but the reactivity system does not KNOW when exactly it has been mutated, 
  function updateEntireTaskTree () {
    updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
  }

  function dragover_handler (e) {
    e.preventDefault()
  }

  // unscheduling back to to-do
  function unscheduleTask (e) {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: (task) => { 
        task.startTime = ''
        task.startDate = ''
        task.deadlineTime = '' 
        task.deadlineDate = ''
      }
    })
    updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
  }

  // WORK IN PROGRESS: node.children will be undefined 
  // because `allTasks` is implicitly passed into 
  // `traverseAndUpdateTree`, and is not yet hydrated from database
  // 
  // I'm considering refactor these functions into a separate file, 
  // and also passing explicit parameters. Might deserve an explanation video. ,
  // as mutations, pointers are a concern with these deeply nested data structures. 
  function maintainOneWeekPreviewWindowForRepeatingTasks () {
    // step 1: collect repeatIDs
    console.log('calling new func')
    const uniqueRepeatIDs = new Set()
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.repeatGroupID,
      applyFunc: (task) => { 
        console.log('the CHOSEN task =', task)
        uniqueRepeatIDs.add(task.repeatGroupID)
      }
    })

    console.log('uniqueRepeatIDs =', uniqueRepeatIDs)

    // step 2
    // check latest member, then run repeat algorithm
    // if the !mmddyyyy.includes() add it to the PARENT of the repeating tasks

    // step 3 
    // update database
  }
</script>

<style>
  .mika-rectangle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 40px;
    color: #0085FF;
    border: 1px solid #F4F4F4;
    background-color: #F4F4F4;
    vertical-align: middle;
    font-family: sans-serif;
    border-radius: 20px;
    margin: 0px 2px;
    padding: 0px;
    font-size: 15px;
  }

  .mika-rectangle:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 40px;
    color: #ffffff;
    background-color: #0085FF;
    border: 1px solid #F4F4F4;
    vertical-align: middle;
    font-family: sans-serif;
    border-radius: 20px;
    margin: 0px 2px;
    transition: all 0.2s ease-out;
  }

  .selected-rectangle {
    background: #0085FF;
    color: white;
  }

  /* Small Devices, Tablets and bigger devices */
  @media only screen and (min-width : 480px) {
    #background-image-holder {
      height: 100vh;
      box-sizing: border-box;
    }
    .todo-container {
      font-family: Roboto, sans-serif;
      width: 30vw;
      height: 100vh;
      padding-top: 15px; 
      padding-left: 20px;
      border: none; 
      border-top: none;
      border-right: none;
    }
    .calendar-section-container {
      background: transparent; 
      width: 45vw;
      height: 50vh;
      border: none; 
      border-left: none;
      border-top: none;
      border-bottom: none;
    }
  }

  @media only screen and (max-width : 480px) {
    .flex-container {
      width: 200%
    }
    .todo-container {
      width: 600px;
      height: 100%;
    }
    .calendar-section-container {
      width: 800px;
      height: 100%;
    }
  }

  .calendar-section-container {
    height: 100vh;
    display: flex; 
    margin-left: 20px;
    justify-content: space-evenly;  
    /*    background-color: white;  */
    box-sizing: border-box;
    padding-top: 40px;
  }

  .flex-container {
    height: 100vh;
    display: flex; 
    padding-top: 0px;
    background: transparent; 
  }

  #background-image-holder {
    /* 0.91 is perfect, literally perfect. The background literally is one-with the white */
    /* linear-gradient is used to make background image more transparent
      NOTE: blur effect is defined in .blur {}
    */
    /* background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.91)), 
    url('https://64.media.tumblr.com/e3c4ae5e8aa3f64b1652bfda70448cc7/tumblr_ptdfkwN1hC1utvtoj_500.jpg'); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .blur {
    backdrop-filter: blur(0px);
    height: 100vh; 
  }

  .todo-container {
    overflow-y: auto;
    overflow-x: auto;
    box-sizing: border-box;
    width: 30vw;
    height: 120vh;
  }

  .todo-list {
    width: 100%; 
    display: flex; 
  }

  .task-container { 
    border: 0px solid; 
    margin-bottom: 25px; 
    padding-left: 0; 
    padding-top: 10px; 
    padding-bottom: 10px; 
    padding-right: 0; 
    overflow: none;
  }
  /* #radio-player-with-art {
    background-image: url('../maplestory-watercolor.jpg')
  } */

  .plus {
    display:inline-block;
    width:35px;
    height:35px;
    background:
      linear-gradient(#fff 0 0),
      linear-gradient(#fff 0 0),
      #000;
    background-position:center;
    background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
  }

  .alt {
    background:
      linear-gradient(#000 0 0),
      linear-gradient(#000 0 0);
    background-position:center;
    background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
  }

  .float{
    position:absolute;
    width: 50px;
    height: 50px;
    top: 45px;
    background-color: #ffffff;  
    border-radius:50px;
    text-align:center;
   /* border: 1px solid #0085FF;*/
  }

  .my-float{
    margin-top: 12px;
  }

  .mika-hover {
    color: #0085FF;
    transition: all 0.2s ease-out;
  }

  .mika-hover:hover{
    color: #ffffff;
    background-color: #0085FF;
   /* border: 1px solid #0085FF; */
    transition: all 0.2s ease-out;
  }

.blue-focus{
  color: #ffffff;
  background-color: #0085FF;
/*  border: 1px solid #0085FF;*/
  transition: all 0.2s ease-out;
}





</style>