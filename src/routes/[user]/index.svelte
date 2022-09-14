<script context="module">
  export function load ({ params }) {
    return {
      props: {
        userID: params.user // my user ID: GxBbopqXHW0qgjKEwU4z
      }
    }
  }  
</script>

{#key clickedTask}
  <DetailedCardPopup 
    isOpen={isDetailedCardOpen}
    taskObject={clickedTask}
    on:card-close={() => isDetailedCardOpen = false}
    on:task-done={() => markNodeAsDone(clickedTask.name)}
    on:task-delete={() => deleteSubtree(clickedTask.name)}
    on:task-repeat={updateFirestoreAndTriggerReactivity}
    on:task-schedule={updateFirestoreAndTriggerReactivity}
    on:task-title-update={updateFirestoreAndTriggerReactivity}
    on:task-notes-update={updateFirestoreAndTriggerReactivity}
  />
{/key}

<div id="background-image-holder" style="height: 100vh; padding-left: 120px; padding-right: 120px;">
  <div style="height: 10vh"></div>

  <a role="button" on:click={toggleMusic} class="float">
    <span class="material-icons my-float" style="color: white">
      {isMusicPlaying ? 'music_note' : 'music_off'}
    </span>
  </a>

  <div style="display: flex; padding-left: 0; padding-top: 0px;">
    <div class="todo-container">
      <div class="todo-list">
        {#if allTasks}
          {#each allTasks as task}
            {#if !task.isDeleted}
              <div class="task-container">
                <RecursiveTask 
                  on:task-click={(e) => openDetailedCard(e.detail)}
                  on:task-create={(e) => modifyTaskTree(e, task)} 
                  on:task-done={updateFirestoreAndTriggerReactivity}
                  on:task-delete={updateFirestoreAndTriggerReactivity}
                  on:task-repeating={updateFirestoreAndTriggerReactivity}
                  taskObject={task}
                  depth={1}
                />
              </div>
            {/if}
          {/each}
          
          <!-- CREATE NEW TASK (invisible but hoverable region) -->
          <div style="height: 100%; width: 200px"
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

      <CalendarDayView
        scheduledTasksToday={todayScheduledTasks}
        on:task-done={(e) => markNodeAsDone(e.detail.taskName)}
        on:task-scheduled={(e) => mutateOneNode(e.detail)}
        on:task-duration-adjusted={(e) => mutateOneNode2(e.detail)}
        on:task-click={(e) => openDetailedCard(e.detail)}
      />

      
      <FutureOverview2
        {futureScheduledTasks}
        on:task-duration-adjusted={(e) => mutateOneNode2(e.detail)}
        on:task-click={(e) => openDetailedCard(e.detail)}
      />

      <!-- 
      <FutureOverview
        {futureScheduledTasks}
        on:task-duration-adjusted={(e) => mutateOneNode2(e.detail)}
        on:task-click={(e) => openDetailedCard(e.detail)}
      /> -->
    </div>
  </div>
</div>

<audio bind:this={AudioElem}></audio>

<script>
  export let userID // GxBbopqXHW0qgjKEwU4z

  import RecursiveTask from '../../RecursiveTask.svelte'
  import CalendarDayView from '../../CalendarDayView.svelte'
  import FutureOverview from '../../FutureOverview.svelte'
  import FutureOverview2 from '../../FutureOverview2.svelte'
  import DetailedCardPopup from '../../DetailedCardPopup.svelte'
  import { onMount } from 'svelte'
  import db from '../../db.js'
  import { doc, getDoc, updateDoc } from 'firebase/firestore'
  import { getDateOfToday, getDateOfTomorrow } from '../../helpers.js'
  import TaskElement from '../../TaskElement.svelte'

  const userDocPath = `users/${userID}`
  let isTypingNewTask = false

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let chosenMusicFile
  let musicFiles = [
    'illiyard-moor.mp3',
    'ms-leafre-lofi.mp3'
  ]

  let AudioElem
  let isMusicPlaying = false

  // let background images 
  let bgImageURLs = [
    'https://i.imgur.com/ShnqIpJ.jpeg', // airships 
    // 'https://i.imgur.com/fBRcIsg.jpeg', //https://images7.alphacoders.com/751/751199.jpg', // https://wall.alphacoders.com/tag/kimi-no-na-wa.-wallpapers 
                                                      // https://images7.alphacoders.com/751/751199.jpg
    'https://i.imgur.com/rzkUMW8.jpeg', // cute monsters
    // 'https://i.imgur.com/ifP3xPg.jpeg' // forest (too dark I think)
  ]
  let chosenBgImageURL

  onMount(() => {
    chosenBgImageURL = bgImageURLs[getRandomInt(2)]
    const div = document.getElementById("background-image-holder")
    div.style['background-image'] = `url(${chosenBgImageURL})`

    chosenMusicFile = musicFiles[getRandomInt(2)]
    AudioElem.src = chosenMusicFile

    fetchTasks()
  })

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
  let clickedTask = {}


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

  // useful helper function for task update operations
  function traverseAndUpdateTree ({ node, fulfilsCriteria, applyFunc }) {
    if (fulfilsCriteria(node)) {
      applyFunc(node)
    } 
    for (const child of node.children) {
      traverseAndUpdateTree({ node: child, fulfilsCriteria, applyFunc })
    }
  }

  function collectTodayScheduledTasksToArray () {
    todayScheduledTasks = []
    for (const task of allTasks) {
      traverseAndUpdateTree({
        node: task,
        fulfilsCriteria: (task) => task.startDate === getDateOfToday() && task.startTime, 
        applyFunc: (task) => todayScheduledTasks.push(task)
      })
    }
  } 

  function collectFutureScheduledTasksToArray () {
    futureScheduledTasks = [] 
    for (const task of allTasks) {
      traverseAndUpdateTree({
        node: task,
        fulfilsCriteria: (task) => task.startDate && task.startTime && task.startDate > getDateOfToday(),
        applyFunc: (task) => futureScheduledTasks.push(task)
      })
    }
  }

  async function markNodeAsDone (name) {
    for (const task of allTasks) {
      traverseAndUpdateTree({ 
        node: task, 
        fulfilsCriteria: (task) => task.name === name,
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
    }
    // update database
    await updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
    allTasks = [...allTasks]
  }

  async function deleteSubtree (name) {
    let root = { 
      name: 'root',
      children: allTasks
    }
    traverseAndUpdateTree({
      node: root,
      fulfilsCriteria: (task) => task.children.filter(c => c.name === name).length >= 1, // inequality is important because sometimes 2 or more tasks have the same name
      applyFunc: (task) => { 
        let idx = null
        // do not use `forEach` it might mutate the array while it iterates even if you use return statements etc. it's unintuitive code
        for (let i = 0; i < task.children.length; i++) {
          if (task.children[i].name === name) {
            idx = i
            break
          }
        }
        if (idx >= 0) { // sometimes `idx` is undefined for some reason, meaning the last item of the array will be deleted
          task.children.splice(idx, 1)
        }
      }
    })

    await updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
    allTasks = [...allTasks]
  }


  async function recollectScheduledButIncompletedTasks () {
    let root = { 
      name: 'root',
      children: allTasks
    }
    traverseAndUpdateTree({
      node: root,
      fulfilsCriteria: (task) => task.startDate < dateOfToday && !task.isDone,
      applyFunc: (task) => {
        task.startDate = ''
        task.startTime = ''
        // this means the task will re-appear on the unscheduled todo-list
      }
    })
  }

  async function mutateOneNode ({ taskName, timeOfDay, dateScheduled }) {
    // search for the particular node, mutate it, then update the database
    function helper (node) {
      if (node.name === taskName) {
        node.startTime = timeOfDay
        node.startDate = dateScheduled
        return true
      }
      else {
        for (const child of node.children) {
          if (helper(child)) return true
        }
        return false
      }
    }

    for (const task of allTasks) {
      if (helper(task)) { // the sub-task only exists in ONE of the root tasks, so only one of the `helper()` calls will return true
        break
      }
    }

    await updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )

    // manually trigger reactivity because mutations can't be detected
    allTasks = [...allTasks]
  }

  async function mutateOneNode2 ({ taskName, duration }) {
    // search for the particular node, mutate it, then update the database
    function helper (node) {
      if (node.name === taskName) {
        node.duration = duration
        return true
      }
      else {
        for (const child of node.children) {
          if (helper(child)) return true
        }
        return false
      }
    }

    for (const task of allTasks) {
      if (helper(task)) { // the sub-task only exists in ONE of the root tasks, so only one of the `helper()` calls will return true
        break
      }
    }

    await updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )

    // manually trigger reactivity because mutations can't be detected
    allTasks = [...allTasks]
  }

  async function fetchTasks () { 
    const user = await getDoc(
      doc(db, userDocPath)
    )
    if (user.exists()) {
      allTasks = user.data().allTasks
      lastRanRepeatAtDate = user.data().lastRanRepeatAtDate
    }
    else {
      alert('Cannot find user')
    }
  }

  $: if (allTasks) {
    collectTodayScheduledTasksToArray()

    collectFutureScheduledTasksToArray()
    // sort it from earliest to latest
    futureScheduledTasks.sort((task1, task2) => {
      const d1 = new Date(task1.startDate)
      const d2 = new Date(task2.startDate)

      return d1.getTime() - d2.getTime()
    })

    // HANDLE TASKS THAT REPEAT
    // can't use `return` in reactive expression https://github.com/sveltejs/svelte/issues/2828
    if (lastRanRepeatAtDate !== dateOfToday) {
      console.log('new day, running repeat algorithm and process un-finished tasks')
      
      recollectScheduledButIncompletedTasks()

      //  1. Handle repeating Twitch streams e.g. Mon, Wed, Fri 7 pm
      //  Figure out if it's Wednesday or Saturday etc. with `Date.getDate()` method 
      //  If it is, place it at 7 pm. Easiest game of my life.
      const today = new Date() // use `getDay()` to get 0 to 6 number
      const habitPoolToResolveConflict = []
      
      // TODO: deprecate. You can represent week-based repeating events by decomposing it into regular repeating events
      // mutate repeating tasks
      function recursivelyRepeatTasks (node) {
        if (node.repeatsOnDaysOfWeek) {
          if (node.repeatsOnDaysOfWeek[today.getDay()]) { 
            if (node.lastCompletionDate !== dateOfToday) {
              node.isDone = false
              node.startDate = dateOfToday
              if (!node.startTime) {
                habitPoolToResolveConflict.push(node)
              }
            }
          }
        }
        for (const child of node.children) {
          recursivelyRepeatTasks(child)
        }
      }

      // actually call the function on the root nodes
      for (const task of allTasks) {
        recursivelyRepeatTasks(task)
      }

      //  #2 Handle repeating habits e.g. meditate every 3 day, run every 7 days
      //  Schedule it at the end of the day
      //  Visualize "debt" by not allowing overlap 
      function recursivelyRepeatTasks2 (node) {
        // a task can set to repeat, but it has to be scheduled and done once before 
        // it has a `lastCompletionDate` property and will be "auto-shifted" periodically
        // into the future
        if (node.daysBeforeRepeating && node.lastCompletionDate) {
          // `lastCompletionDate` is in mm/dd/yyyy format
          const d1 = new Date(`${node.lastCompletionDate}/2022`)
          const d2 = new Date()
          const millisec_diff = d2.getTime() - d1.getTime()
          const day_diff = Math.ceil(millisec_diff / (1000 * 3600 * 24))
          if (day_diff >= node.daysBeforeRepeating) {
            node.isDone = false 
            node.startDate = dateOfToday 
            if (!node.startTime) {
              habitPoolToResolveConflict.push(node)
            }
          }
        }
        for (const child of node.children) {
          recursivelyRepeatTasks2(child)
        }
      }

      // actually call the function on root nodes of tree
      for (const task of allTasks) {
        recursivelyRepeatTasks2(task)
      }

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

      // UPDATE FIRESTORE
      updateDoc(
        doc(db, userDocPath),
        { allTasks, lastRanRepeatAtDate: dateOfToday  }
      )
      allTasks = [...allTasks]
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
        children: [] 
      }
    ]

    updateDoc(
      doc(db, userDocPath),
      { allTasks: newValue }
    )
    
    allTasks = [...newValue]

    newTopLevelTask = ''
    isTypingNewTask = false
  }

  function modifyTaskTree (e, task) {
    // change the reference
    const { updatedChildren } = e.detail
    task.children = [...updatedChildren]

    updateFirestoreAndTriggerReactivity()
  }

  // change the pointer to the updatedChildren
  // allTasks' subtree is mutated, and it will correctly reference it,
    
  // but the reactivity system does not KNOW when exactly it has been mutated, 
  function updateFirestoreAndTriggerReactivity () {
    // NOTE: `allTasks` has been mutated (and is already correct), but the reactivity system doesn't know that
    updateDoc(
      doc(db, userDocPath),
      { allTasks }
    )
    allTasks = [...allTasks]
  }
</script>

<style>
  .calendar-section-container {
    display: flex; 
    justify-content: space-evenly; 
    width: 36vw; 
    height: 60vh;
    background-color: white; 
    border: 1px solid green; 
    border-top-right-radius: 20px; 
    border-bottom-right-radius: 20px;
    padding-left: 8px;
    box-sizing: border-box;
  }

  .todo-container {
    height: 60vh;
    width: 70vw;
    background-color: white; 
    border: 1px solid green; 
    border-top-left-radius: 20px; 
    border-bottom-left-radius: 20px; 
    padding-top: 14px; 
    padding-left: 30px;
    overflow-y: scroll;
    overflow-x: scroll;
    box-sizing: border-box;
    /* background-image: linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.5)), url('../illiyard-moor.jpg'); */
    /* opacity: 0.5; */
  }

  .todo-list {
    width: 100%; 
    /* height: 77vh; */
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

  #background-image-holder {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-image: url('maplestory-orange.jpg'); */
    /* background-image: url('https://i.imgur.com/ShnqIpJ.jpeg'); */
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
    width:60px;
    height:60px;
    top:40px;
    left:40px;
    background-color: grey;  
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 0px 0px 2px 2px white;
  }

  .my-float{
    margin-top: 19px;
  }
</style>