

{#key clickedTask}
  {#if isDetailedCardOpen}
    <DetailedCardPopup 
      isOpen={isDetailedCardOpen}
      taskObject={clickedTask}
      on:card-close={() => isDetailedCardOpen = false}
      on:task-done={() => markNodeAsDone(clickedTask.id)}
      on:task-delete={() => deleteSubtree(clickedTask.id)}
      on:task-repeat={updateEntireTaskTree}
      on:task-schedule={(e) => scheduleATask(e.detail)}
      on:task-title-update={(e) => changeNameOfATask(e.detail)}
      on:task-notes-update={(e) => changeNotesOfATask(e.detail)}
    />
  {/if}
{/key}

{#if isGoalsAndPostersPopupOpen}
  <GoalsAndPostersPopup
    isOpen={isGoalsAndPostersPopupOpen}
    {goalsAndPosters}
    on:card-close={() => isGoalsAndPostersPopupOpen = false}
    on:goals-and-posters-update={(e) => changeGoalsAndPosters(e.detail)}
  />
{/if}

{#if isJournalPopupOpen}
  <JournalPopup
    isOpen={isJournalPopupOpen}
    journal={userDoc.journal}
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

<div id="background-image-holder" style="height: 100vh;">
  <a role="button" on:click={toggleMusic} class="float  mika-hover" style="bottom: 210px; z-index: 10;">
    <span class="material-icons my-float">
      {isMusicPlaying ? 'music_note' : 'music_off'}
    </span>
  </a>

  <a role="button" on:click={() => isGoalsAndPostersPopupOpen = !isGoalsAndPostersPopupOpen} class="float  mika-hover" style="bottom: 130px; z-index: 10">
    <span class="material-icons my-float">
     flag
    </span>
  </a>

  <a role="button" on:click={() => isJournalPopupOpen = !isJournalPopupOpen} class="float mika-hover" style="bottom: 50px; z-index: 10">
    <span class="material-icons my-float">
      auto_stories
    </span>
  </a>

  <a role="button" on:click={() => isFinancePopupOpen = !isFinancePopupOpen} class="float mika-hover" style="bottom: 290px; z-index: 10">
    <span class="material-icons my-float">
      attach_money
    </span>
  </a>

  <div style="margin-left: 69px; margin-top: 47px; display: flex; align-items: center;">
    <div class="mika-rectangle" class:selected-rectangle={isGirlfriendMode === false} on:click={() => isGirlfriendMode = false}>
      Day
    </div>
    <div class="mika-rectangle" class:selected-rectangle={isGirlfriendMode === true} on:click={() => isGirlfriendMode = true}>
      Week
    </div>
    <div class="mika-rectangle">
      Month
    </div>
  </div>

  <!--  {getDayOfWeek()}, {getDateOfToday()} {new Date().getFullYear()} -->
  <div style="font-family: Inter; font-weight: 700; font-size: 32px; margin-left: 10px; padding: 30px 0px 0px 55px; color: #6D6D6D">
    {getDayOfWeek()}, { getNicelyFormattedDate() }, { new Date().getFullYear() }
  </div>

  <div class="flex-container blur">

  <div class="calendar-section-container">
    <!-- Playground  -->
      <!-- <div style="position: relative">
        {#each todayScheduledTasks as task, i}
          <TaskElement
            {task}
            offsetFromTop={30 * i}
            height={30}
            fontSize={0.8}
            offsetFromLeft={30 * i}
            on:task-click
            on:task-duration-adjusted
          >
        </TaskElement>
        {/each}
    </div> -->


    <!-- <ExperimentalPlayground/> -->

      <CalendarTodayView
        scheduledTasksToday={todayScheduledTasks}
        pixelsPerHour={isGirlfriendMode ? MIKA_PIXELS_PER_HOUR : PIXELS_PER_HOUR }
        on:task-done={(e) => markNodeAsDone(e.detail.id)}
        on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
        on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
        on:task-click={(e) => openDetailedCard(e.detail)}
      />

      <div>
        <div style="display: flex; width: 24vw;">  
          {#if allTasks}
            <UnscheduledTasksForToday
              {allTasks}
              on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
              on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
              on:task-click={(e) => openDetailedCard(e.detail)}
            />
          {/if}

          <div style="width: 2vw"></div>
      
          <FutureOverview
            {futureScheduledTasks}
            on:task-duration-adjusted={(e) => changeTaskDuration(e.detail)}
            on:task-click={(e) => openDetailedCard(e.detail)}
          />
        </div>
      </div>
    </div>

    <div class="todo-container" 
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
          <div style="height: 200px; width: 200px;"
            on:mouseenter={() => isShowingCreateButton = true}
            on:mouseleave={() => isShowingCreateButton = false}
          >
            {#if isShowingCreateButton}
              {#if !isTypingNewRootTask}
                <div style="font-size: 1.5rem; color: grey;" on:click={() => isTypingNewRootTask = true}>
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
</div>

<audio bind:this={AudioElem}></audio>

<script>
  export let data
  let { userID } = data; // GxBbopqXHW0qgjKEwU4z
  $: ({ userID } = data); // so it stays in sync when `data` changes

  import UnscheduledTasksForToday from '$lib/UnscheduledTasksForToday.svelte'
  import RecursiveTask from '../../RecursiveTask.svelte'
  import CalendarTodayView from '../../CalendarTodayView.svelte'
  import FutureOverview from '../../FutureOverview.svelte'
  import DetailedCardPopup from '../../DetailedCardPopup.svelte'
  import { MIKA_PIXELS_PER_HOUR, PIXELS_PER_HOUR, getNicelyFormattedDate } from '../../helpers.js'
  import GoalsAndPostersPopup from '$lib/GoalsAndPostersPopup.svelte'
  import { onMount } from 'svelte'
  import db from '../../db.js'
  import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
  import { getRandomInt, getDateOfToday, getDateOfTomorrow, getDateInMMDD, getRandomID } from '../../helpers.js'
  import JournalPopup from '$lib/JournalPopup.svelte'
  import FinancePopup from '$lib/FinancePopup.svelte'
  import ExperimentalPlayground from '$lib/ExperimentalPlayground.svelte'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
  function getDayOfWeek () {
    const today = new Date()
    const options = { weekday: 'long' } // can be short for Mon. instead of Monday
    return new Intl.DateTimeFormat('en-US', options).format(today)
  }

  let isFinancePopupOpen = false

  let isGirlfriendMode = false

  let unsubUserDocListener
  let userDoc = null 
  const userDocPath = `users/${userID}`
  let isTypingNewTask = false
  const habitPoolToResolveConflict = []

  let AudioElem
  let isMusicPlaying = false
  let chosenMusicFile
  let musicFiles = [
    'illiyard-moor.mp3',
    'illiyard-moor-lofi.mp3',
    'ms-leafre-lofi.mp3'
  ]
  let bgImageURLs = [
    'https://i.imgur.com/ShnqIpJ.jpeg' // airships 
  ]

  let chosenBgImageURL
  let allTasks = null // WARNING, DON'T INITIALIZE TO []
  // I once tried `allTasks = []`, it wiped my entire task tree because it synced the empty [] (which it thinks is fully fetched) with the database.task
  // AF(null) --> unfetched 
  // AF([]) --> fresh new todo-list
  let lastRanRepeatAtDate = ''
  let dateOfToday = getDateOfToday()
  let todayScheduledTasks = []
  let futureScheduledTasks = [] // AF([])

  let newTopLevelTask = ''
  let isTypingNewRootTask = false
  let isShowingCreateButton = false

  let isDetailedCardOpen = false
  let isGoalsAndPostersPopupOpen = false
  let isJournalPopupOpen = false
  let clickedTask = {}
  let goalsAndPosters = ''

  onMount(() => {
    chosenBgImageURL = bgImageURLs[getRandomInt(1)]
    const div = document.getElementById("background-image-holder")
    // div.style['background-image'] = `url(${chosenBgImageURL})`

    chosenMusicFile = musicFiles[getRandomInt(3)]
    AudioElem.src = chosenMusicFile

    listenToTasks()
  })

  // TO-DO: you don't necessarily want to re-run this everytime `allTasks` changes
  $: if (allTasks) {
    collectTodayScheduledTasksToArray()
    collectFutureScheduledTasksToArray()
    futureScheduledTasks.sort((task1, task2) => {
      const d1 = new Date(task1.startDate)
      const d2 = new Date(task2.startDate)
      return d1.getTime() - d2.getTime() // most recent to the top??
    })
  }

  function changeGoalsAndPosters ({ newGoalsAndPosters }) {
    updateDoc(doc(db, userDocPath), {
      goalsAndPosters: newGoalsAndPosters
    })
  }
  
  function changeJournal({ newJournal }) {
    updateDoc(doc(db, userDocPath), {
      journal: newJournal
    })
  }

  // DON'T DELETE BELOW: CONVENIENT FOR DEBUGGING
  // let isFirstTime = true
  async function listenToTasks () { 
    try {
      unsubUserDocListener = onSnapshot(doc(db, userDocPath), async snapshot => {
        userDoc = snapshot.data()
        lastRanRepeatAtDate = snapshot.data().lastRanRepeatAtDate
        goalsAndPosters = snapshot.data().goalsAndPosters || ''
        // HANDLE TASKS THAT REPEAT
        // can't use `return` in reactive expression https://github.com/sveltejs/svelte/issues/2828
        
        // yes, this reset algorithm won't run unless you open the app
        // we explicitly assume we'll open organize-life every day : ) which simplifies the code 

        // this is the base case condition, otherwise infinite recursion will happen
        // as we are inside a snapshot listener
        if (lastRanRepeatAtDate !== dateOfToday) {
        // if (isFirstTime) {
          console.log('new day, resetting tasks')
          // isFirstTime = false
          const copy = [...snapshot.data().allTasks]
          resetScheduledButMissedNonRepeatingTasks(copy) 

          for (const task of copy) {
            recursivelyResetRepeatingTasks(task)
          }
          scheduleHabitsWithoutClashing() // this will mutate tasks in `copy`

          updateDoc(doc(db, userDocPath), { 
            allTasks: copy, 
            lastRanRepeatAtDate: dateOfToday 
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
   *  Schedule it at the end of the day
   *  Visualize "debt" by not allowing overlap 
   *  @see https://explain.mit.edu/mDbUrvjy4pe8Q5s5wyoD/2bePUmmRDGP6KR61Hgqa
   */
  //  TO-DO: 
  //     - Use a date manipulation / date arithmetic library e.g. moment.js
  function recursivelyResetRepeatingTasks (node) {
    // a task can set to repeat, but it has to be scheduled and done once before 
    // it has a `lastCompletionDate` property and will be "auto-shifted" periodically
    // into the future
    // want to be backwards compatible, some of our existing habits aren't initialized
    if (node.daysBeforeRepeating && node.startDate && node.startTime) {
      // `lastCompletionDate` is in mm/dd/yyyy format
      // we don't care if the habit was completed or not, we just record the "missed" batting average
      const d1 = new Date(`${node.startDate}/${node.startYYYY || '2022'}`)
      const d2 = new Date() // use `getDay()` to get 0 to 6 number

      // standardize both dates to 8 am
      // (we only care about new day cycles to reset habits, not the exact time elapsed)
      d1.setHours(8) 
      d1.setMinutes(0)
      d1.setMilliseconds(0)

      d2.setHours(8)
      d2.setMinutes(0)
      d2.setMilliseconds(0)

      const millisec_diff = d2.getTime() - d1.getTime()
      const day_diff = Math.round(millisec_diff / (1000 * 3600 * 24))
      if (Math.round(day_diff) >= node.daysBeforeRepeating) { // WARN: node.daysBeforeRepeating is sometimes a string e.g. "1", which could cause unexpected errors in the future
        if (!node.isDone) {
          node.missedCount = (node.missedCount += 1) || 1
          // note: if it's completed, the `completionCount` would've already been updated
        } else {
          node.isDone = false 
        }

        // construct the date object that reflects the task's startDate
        const dateObject = new Date()
        const mm = parseInt(node.startDate.substring(0, 2)) // setMonth is 0-indexed
        const dd = parseInt(node.startDate.substring(3, 5)) // `setDate` is NOT 0-indexed
        dateObject.setMonth(mm - 1)
        dateObject.setDate(dd)
        
        // shift forward that date by `daysBeforeRepeating`
        // https://stackoverflow.com/a/54844661/7812829
        const newDateObject = new Date(dateObject.getTime() + node.daysBeforeRepeating * 24 * 60 * 60 * 1000)
        node.startDate = getDateInMMDD(newDateObject)

        // TO-DO: this wasn't designed for habits to be pre-scheduled in advance, 
        // its correctness assumed habits would be generated just-in-time each day
        if (node.repeatType === 'habit' && node.startDate === getDateOfToday()) {
          habitPoolToResolveConflict.push(node)
        }
      }
    }
    for (const child of node.children) {
      recursivelyResetRepeatingTasks(child)
    }
  }

  function openDetailedCard ({ task }) {
    clickedTask = task
    isDetailedCardOpen = true
  }

  function toggleMusic () {
    AudioElem.volume = 0.1
    if (AudioElem.paused) {
      AudioElem.play()
      isMusicPlaying = true
    }
    else {
      AudioElem.pause()
      isMusicPlaying = false
    }
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
  
  async function markNodeAsDone (id) {
    traverseAndUpdateTree({ 
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: (task) => { 
        task.isDone = !task.isDone
        if (task.isDone) { 
          task.completionCount = task.completionCount + 1 || 1
          if (task.daysBeforeRepeating) {
            task.lastCompletionDate = getDateOfToday()
          }
        }
        else {
          task.completionCount = task.completionCount - 1 || 0 
          // TO-DO: think of consequences of not undoing `lastCompletionDate`
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

  // TO-DO: make it id-based
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

  async function changeTaskDuration ({ taskName, id, duration }) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: (task) => task.duration = duration
    })
    await updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
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
      }
    })
    updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
  }
</script>

<style>
  .mika-rectangle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 121px; 
    height: 40px;
    color: #6D6D6D;
    border: 1px solid #D9D9D9;
    vertical-align: middle;
    font-family: sans-serif;
  }

  .selected-rectangle {
    background: #6D6D6D;
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
      background: transparent;
      width: 50vw;
      height: 100vh;
      padding-top: 15px; 
      padding-left: 20px;
      border: none; 
      border-top: none;
      border-right: none;
    }
    .calendar-section-container {
      background: transparent; 
      width: 40vw;
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
    margin-left: 50px;
    justify-content: space-evenly; 
    /* background-color: white;  */
    box-sizing: border-box;
    padding-top: 30px;
  }

  .flex-container {
    height: 100vh;
    display: flex; 
    padding-left: 0; 
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
    width: 100vw;
  }

  .todo-container {
    overflow-y: scroll;
    overflow-x: scroll;
    box-sizing: border-box;
  }

  .todo-list {
    width: 100%; 
    display: flex; 
    overflow-x: auto;
  }

  .task-container { 
    border: 0px solid; 
    margin-bottom: 25px; 
    padding-left: 0; 
    padding-top: 16px; 
    padding-bottom: 10px; 
    padding-right: 0; 
    overflow: none;
  }
  /* #radio-player-with-art {
    background-image: url('../maplestory-watercolor.jpg')
  } */

  *::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #aaa; /* or add it to the track */
  }

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
    position:fixed;
    width: 55px;
    height: 55px;
    bottom: 40px;
    right: 40px;
    background-color: transparent;  
    color: #6D6D6D;
    border-radius:50px;
    text-align:center;
    box-shadow: 0px 0px 2px 2px #6D6D6D;
  }

  .my-float{
    margin-top: 15px;
  }

  .mika-hover {
    color: #6D6D6D;
  }

  .mika-hover:hover{
    color: #000;
  }

  .float:hover{
    box-shadow: 0px 0px 2px 2px #000;
  }

</style>