{#key clickedTask}
  {#if isDetailedCardOpen}
    <MobileDetailedCardPopup 
      taskObject={clickedTask}
      on:card-close={() => isDetailedCardOpen = false}
      on:task-delete={(e) => deleteTaskNode(e.detail)}
      on:task-click={(e) => openDetailedCard(e.detail)}
      on:task-update={(e) => updateTaskNode(e.detail)}
      on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})} 
    />
  {/if}
{/key}

<!-- Reason for 100dvh: https://stackoverflow.com/a/75648985/7812829 -->
<!--   style="padding: 6px; background-color: white; display: flex; align-items: center; justify-content: center;" -->
<div class:iphone-se-size={isTesting} 
     class:general-mobile-size={!isTesting}
     class:voice-active-highlight={isUsingVoice}
     style="height: 100dvh; position: relative; display: flex; flex-direction: column-reverse;"
>
  {#if activeTabName === 'TODAY_VIEW'}
    <div style="padding: 0px; overflow-y: auto;">
      {#each todayScheduledTasks as eventToday, i}
        {#if i === idxOfTimeIndicator}
          <div style="border: 4px solid var(--location-indicator-color); border-radius: 0px;
          width: 100%; margin-top: 8px; margin-bottom: 8px;">

          </div>
        {/if}

        {#if eventToday.iconDataURL}
          <div on:click={() => openDetailedCard({ task: eventToday })}
            class="today-event"
            class:has-already-happened={hasAlreadyHappened(eventToday)} 
            class:night-time={isNightTime(eventToday)}
            style="display: flex; align-items: center; margin-bottom: 0px;"
          >
            <div class="event-scheduled-time">
              {eventToday.startTime} 
            </div>

            <img src={eventToday.iconDataURL} style="width: 48px; height: 48px;">
          </div>
        {:else}
          <div on:click={() => openDetailedCard({ task: eventToday })}
            class="today-event"
            class:has-already-happened={hasAlreadyHappened(eventToday)} 
            class:night-time={isNightTime(eventToday)}
            style="margin-bottom: 0px;"
          >
            <div class="event-scheduled-time">
              {eventToday.startTime} 
            </div>
            <div style="font-size: 24px; display: flex; align-items: center; flex-wrap: no-wrap;">
              {eventToday.name}
            </div>
          </div>
        {/if}
      {/each}

      <MobileTodayTodo
        on:task-click={(e) => openDetailedCard(e.detail)}
        on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})}

        on:new-root-task
        on:task-unscheduled
        on:subtask-create
        on:task-dragged
      />
      
      <!-- TO-DO: display completed tasks below -->
    </div>
  {:else if activeTabName === 'FUTURE_OVERVIEW'}
    <!-- <FutureOverview
      {futureScheduledTasks}
      on:task-duration-adjusted
      on:task-click
    /> -->
  {/if}

  <VoiceKeywordDetect
    on:voice-start={() => isUsingVoice = true}
    on:voice-end={() => isUsingVoice = false}
    
    on:new-event-today={(e) => createNewEvent(e.detail)}
    on:new-todo={(e) => createNewTodo(e.detail)}
  />

  <div style="
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    height: var(--bottom-navbar-height); 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    border: 2px solid black;
    background-color: grey;
    "  
  >
    <div on:click={() => activeTabName = 'TODAY_VIEW'} class="bottom-nav-tab" style="border-right: 2px solid black;">
      <span class="material-symbols-outlined nav-tab-icon">
        sunny
      </span>
      <div class="nav-tab-desc">
        Today
      </div>
    </div>

    <!-- on:click={() => activeTabName = 'FUTURE_OVERVIEW'}  -->
    <div class="bottom-nav-tab" style="border-left: 2px solid black;">
      <span class=" material-icons nav-tab-icon">
        upcoming
      </span>
      <div class="nav-tab-desc">
        Future
      </div>
    </div>
  </div>
</div>

<script>
  import { getFirestore, onSnapshot, collection, arrayUnion, arrayRemove } from 'firebase/firestore'
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc, updateFirestoreDoc, deleteFirestoreDoc } from '/src/crud.js'
  import { 
    getRandomID, 
    getDateInMMDD, 
    getDateInDDMMYYYY,
    getTimeInHHMM,
    pureNumericalHourForm,
    checkTaskObjSchema
  } from '/src/helpers.js'
  import { 
    user, 
    tasksScheduledOn,
    inclusiveWeekTodo
  } from '/src/store.js'
  import { 
    computeInclusiveWeekTodo,
    reconstructTreeInMemory,
    computeDateToTasksDict
  } from '/src/helpers/dataStructures.js'
  import { goto } from '$app/navigation'
  import { onDestroy, onMount } from 'svelte'
  import FutureOverview from '$lib/FutureOverview.svelte'
  import MobileTodayTodo from '$lib/MobileTodayTodo.svelte'
  import db from '/src/db.js'
  import VoiceKeywordDetect from '$lib/VoiceKeywordDetect.svelte'
  import MobileDetailedCardPopup from '$lib/MobileDetailedCardPopup.svelte'

  let allTasks = []
  let todayScheduledTasks = []
  let isTesting = false
  let futureScheduledTasks = null
  let activeTabName = 'TODAY_VIEW'
  let unsub
  let idxOfTimeIndicator = 0
  
  let isUsingVoice = false
  
  let isDetailedCardOpen = false
  let clickedTask = {}
  
  const tasksPath = `/users/${$user.uid}/tasks/`

  $: if (allTasks.length > 0) {
    computeDataStructuresFromAllTasks(allTasks)
  }

  onMount(() => {
    // fetch `allTasks`
    const ref = collection(db, `/users/${$user.uid}/tasks`)
    unsub = onSnapshot(ref, (querySnapshot) => {
      const result = [] 
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data()})
      })
      allTasks = reconstructTreeInMemory(result)
      tasksScheduledOn.set(computeDateToTasksDict(allTasks))
    })
  })

  onDestroy(() => {
    if (unsub) unsub()
  })

  function openDetailedCard ({ task }) {
    clickedTask = task 
    isDetailedCardOpen = true
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

  function updateTaskNode ({ id, keyValueChanges }) {
    updateFirestoreDoc(tasksPath + id, keyValueChanges)
    // very useful for debugging
  }

  function createNewEvent ({ name, startTime }) {
    // createTaskNodeHelper()
    const newTaskObj = {
      name,
      parentID: "",
      startTime,
      startDate: getDateInMMDD(new Date()),
      id: getRandomID()
    }
    createTaskNodeHelper(newTaskObj)
  }

  function createNewTodo ({ name }) {
    const dueInHowManyDays = 7
    const d = new Date()
    d.setDate(d.getDate() + dueInHowManyDays - 1)

    const newTaskObj = {
      name,
      parentID: "",
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '23:59',
      id: getRandomID(),
    }
    createTaskNodeHelper(newTaskObj)
  }

  function createTaskNodeHelper (newTaskObj) {
    setFirestoreDoc(
      `/users/${$user.uid}/tasks/${newTaskObj.id}`,
      checkTaskObjSchema(newTaskObj, $user)
    )
  }

  function isNightTime (eventTask) {
    const sevenPM = new Date()
    sevenPM.setHours(19) // 7 pm
    const nightHHMM = getTimeInHHMM({ dateClassObj: sevenPM })
    return pureNumericalHourForm(eventTask.startTime) > pureNumericalHourForm(nightHHMM) 
  }

  function hasAlreadyHappened (eventTask) {
    const nowHHMM = getTimeInHHMM({ dateClassObj: new Date() })
    return pureNumericalHourForm(nowHHMM) > pureNumericalHourForm(eventTask.startTime)
  }

  function computeDataStructuresFromAllTasks (allTasks) {
    // future overview
    // collectFutureScheduledTasksToArray()
    
    collectTodayScheduledTasksToArray()

    // grand tree todo
    // const todoMemoryTrees = computeTodoMemoryTrees(allTasks)
    // allTasksDueToday.set(todoMemoryTrees[0])
    // allTasksDueThisWeek.set(todoMemoryTrees[1])
    // allTasksDueThisMonth.set(todoMemoryTrees[2])
    // allTasksDueThisYear.set(todoMemoryTrees[3])
    // allTasksDueThisLife.set(todoMemoryTrees[4])

    // simple week todo
    inclusiveWeekTodo.set(computeInclusiveWeekTodo(allTasks))
  }

  function collectTodayScheduledTasksToArray () {
    todayScheduledTasks = [] // reset 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => { 
        const todayMMDD = getDateInMMDD(new Date())
        return task.startDate === todayMMDD && task.startTime
      }, 
      applyFunc: (task) => todayScheduledTasks = [...todayScheduledTasks, task]
    })

    // TO-DO: don't include all the tasks in the future, only if it is bounded by < 7 days for the week view, and < 30 days for the month view
    todayScheduledTasks.sort((task1, task2) => {
      return pureNumericalHourForm(task1.startTime) - pureNumericalHourForm(task2.startTime)
      // const d1 = new Date(task1.startTime)
      // const d2 = new Date(task2.startTime)
      // return d1.getTime() - d2.getTime() // most recent to the top??
    })


    // bonus: display current time (brown line)
    for (let i = 0; i < todayScheduledTasks.length; i++) {
      if (!hasAlreadyHappened(todayScheduledTasks[i])) {
        idxOfTimeIndicator = i
        return
      }
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

</script>

<style>
  :root {
    --bottom-navbar-height: 48px;
  }

  .today-event {
    padding: 8px;
    /* border-radius: 8px; */
    border: 1px solid grey;
  }

  .night-time {
    background-color: rgb(40, 40, 40);
    color: white;
  }

  .voice-active-highlight {
    background-color: orange;
  }

  .event-scheduled-time {
    font-size: 32px; 
    font-weight: 600;
  }

  .has-already-happened {
    opacity: 0.5;
  }

  .iphone-se-size {
    width: 375px; 
    height: 667px;
    border: 2px solid black;
  }

  .general-mobile-size {
    height: 100vh; 
  }

  .bottom-nav-tab {
    display: flex; 
    align-items: center;
    justify-content: center;

    height: 100%;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;

    color: white;
  }

  .nav-tab-desc {
    margin-left: 8px;

    font-size: 20px;
  }

  .nav-tab-icon {
    font-size: 32px;
  }
</style>