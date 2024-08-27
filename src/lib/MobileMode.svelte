{#key clickedTask}
  {#if isDetailedCardOpen}
    <DetailedCardPopup 
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
<!-- style="padding: 6px; background-color: white; display: flex; align-items: center; justify-content: center;" -->
<div class:iphone-se-size={isTesting} 
     class:general-mobile-size={!isTesting}
     class:voice-active-highlight={isUsingVoice}
     style="height: 100dvh; position: relative; display: flex; flex-direction: column;"
>
  {#if activeTabName === 'TODO_VIEW'}
    <div style="font-size: 48px; margin-left: 6px; color: darkgreen;">
      {speechResult}
    </div>

    <div style="overflow-y: auto;">
      <MobileModeTodoList
        on:task-click={(e) => openDetailedCard(e.detail)}
        on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})}

        on:new-root-task={(e) => createNewRootTask(e.detail)}
        on:subtask-create={(e) => createSubtask(e.detail)}
      />
    </div>
  {:else if activeTabName === 'TODAY_VIEW'}
    <MobileModeTodayView
      on:task-click={(e) => openDetailedCard(e.detail)}
    />
  {:else if activeTabName === 'FUTURE_VIEW'}
    <div style="overflow-y: auto;">
      <FutureOverview
        {futureScheduledTasks}
        on:task-duration-adjusted
        on:task-click={(e) => openDetailedCard(e.detail)}
      />
    </div>
  {/if}
  
  {#if activeTabName === 'TODO_VIEW'}
    <VoiceKeywordDetect
      on:voice-start={() => isUsingVoice = true}
      on:voice-end={() => isUsingVoice = false}
      on:new-mic-result={(e) => speechResult = e.detail}
      
      on:new-event-today={(e) => createNewEvent(e.detail)}
      on:new-todo={(e) => createNewTodo(e.detail)}
    />
  {/if}

  <div class="bottom-navbar">
    <div on:click={() => activeTabName = 'TODO_VIEW'} class="bottom-nav-tab" class:active-nav-tab={activeTabName === 'TODO_VIEW'}>
      <div style="text-align: center;">
        <span class="material-symbols-outlined nav-tab-icon">
          summarize
        </span>
        <div class="nav-tab-desc">
          To-do
        </div>
      </div>
    </div>

    <div on:click={() => activeTabName = 'TODAY_VIEW'} class="bottom-nav-tab" class:active-nav-tab={activeTabName === 'TODAY_VIEW'}>
      <div style="text-align: center;">
        <span class="material-symbols-outlined nav-tab-icon">
          sunny
        </span>
        <div class="nav-tab-desc">
          Today
        </div>
      </div>
    </div>

    <!-- on:click={() => activeTabName = 'FUTURE_OVERVIEW'}  -->
    <div class="bottom-nav-tab" on:click={() => activeTabName = 'FUTURE_VIEW'} class:active-nav-tab={activeTabName === 'FUTURE_VIEW'}>
      <div style="text-align: center;">
        <span class=" material-icons nav-tab-icon">
          upcoming
        </span>
        <div class="nav-tab-desc">
          Future
        </div>
      </div>
    </div>

    <div on:click={() => goto(`/${$user.uid}`)} class="bottom-nav-tab">
      <div style="text-align: center;">
        <span class="material-symbols-outlined nav-tab-icon">
          house
        </span>
        <div class="nav-tab-desc">
          Calendar
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import { onSnapshot, collection, arrayUnion, arrayRemove } from 'firebase/firestore'
  import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc, updateFirestoreDoc, deleteFirestoreDoc } from '/src/helpers/crud.js'
  import { 
    convertToISO8061,
    getRandomID, 
    getDateInMMDD, 
    getDateInDDMMYYYY,
    sortByUnscheduledThenByOrderValue
  } from '/src/helpers/everythingElse.js'
  import { 
    user, 
    tasksScheduledOn,
    inclusiveWeekTodo
  } from '/src/store.js'
  import { 
    reconstructTreeInMemory,
    computeDateToTasksDict
  } from '/src/helpers/dataStructures.js'
  import { goto } from '$app/navigation'
  import { onDestroy, onMount } from 'svelte'
  import FutureOverview from '$lib/FutureOverview.svelte'
  import MobileModeTodoList from '$lib/MobileModeTodoList.svelte'
  import MobileModeTodayView from '$lib/MobileModeTodayView.svelte'
  import {db} from '../back-end/firestoreConnection'
  import VoiceKeywordDetect from '$lib/VoiceKeywordDetect.svelte'
  import DetailedCardPopup from '$lib/DetailedCardPopup.svelte'

  let allTasks = []
  let isTesting = false
  let futureScheduledTasks = null
  let activeTabName = 'TODO_VIEW'
  let unsub
  
  let isUsingVoice = false
  let speechResult = ''
  
  let isDetailedCardOpen = false
  let clickedTask = {}
  
  const tasksPath = `/users/${$user.uid}/tasks/`

  let tasksToDisplay = []

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

  ////// copied from <ReusableList/>, refactor in future
  // svelte reactive statements are order sensitive
  
  $: if ($inclusiveWeekTodo.length > 0) {
    computeTasksToDisplay()
  }

  function computeTasksToDisplay () {
    const temp = sortByUnscheduledThenByOrderValue($inclusiveWeekTodo)
    tasksToDisplay = temp.filter(task => !task.isDone)
  }

  ////// 



  function createNewRootTask (newTaskObj) {
    createTaskNodeHelper({ newTaskObj })
  }

  function createSubtask ({ id, parentID, newTaskObj }) {
    // the parent needs to update its pointers
    updateTaskNode({ id: parentID, keyValueChanges: { children: arrayUnion(id)}})
    createTaskNodeHelper({ newTaskObj })
  }

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
    // console.log("updateTaskNode(), keyValueChanges =", keyValueChanges)
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
    createTaskNodeHelper({ newTaskObj })
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

    if (tasksToDisplay.length > 0) {
      newTaskObj.orderValue = (0 + tasksToDisplay[0].orderValue) / 2 

      // quickfix so when multiple tasks are added, they don't have the same `orderValue` which breaks drag-and-drop
      const epsilon = Math.random() * newTaskObj.orderValue 
      newTaskObj.orderValue += epsilon
    } // otherwise the default `orderValue` will be `maxOrder`, handled by `checkTaskObjSchema`


    createTaskNodeHelper({ newTaskObj })
  }

  async function createTaskNodeHelper ({ newTaskObj }) {
  // not rewriting because not sure it will be used in new mobile versionm
    const formatedTask = await applyTaskSchema(newTaskObj, $user);
    return await setFirestoreDoc(
      `/users/${$user.uid}/tasks/${newTaskObj.id}`, formatedTask,
    )
  }

  function computeDataStructuresFromAllTasks (allTasks) {
    // future overview
    collectFutureScheduledTasksToArray()

    // simple week todo
    // inclusiveWeekTodo.set(computeInclusiveWeekTodo(allTasks))
  }

  // quick-fix for NaN/NaN bug
  function collectFutureScheduledTasksToArray () {
    const yearNumber = new Date().getFullYear()
    futureScheduledTasks = [] // reset 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => { 
        if (!task.startDate) return 
        if (task.willRepeatOnWeekDayNumber) return
        const d1 = new Date(convertToISO8061({ mmdd: task.startDate }))
        
        // setHours(hoursValue 0 - 23, minutesValue 0 - 59)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
        if (task.startTime) {
          const [hh, mm] = task.startTime.split(":")
          d1.setHours(Number(hh), Number(mm))
        }
        return (task.startDate && task.startDate !== 'NaN/NaN') && 
                (!task.willRepeatOnWeekDayNumber) &&
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

  .voice-active-highlight {
    background-color: rgb(180, 238, 221);
  }

  .iphone-se-size {
    width: 375px; 
    height: 667px;
    border: 2px solid black;
  }

  .general-mobile-size {
    height: 100vh; 
  }

  .bottom-navbar {
    margin-top: auto;
    width: 100%; 
    height: var(--bottom-navbar-height); 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    background-color: white;
    border-top: 1px solid lightgrey;
  }

  .bottom-nav-tab {
    display: flex; 
    align-items: center;
    justify-content: center;

    height: 100%;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;

    color: rgb(120, 120, 120);
  }

  .active-nav-tab {
    color: rgb(0, 0, 0);
    font-weight: 600;
    border-top: 2px solid rgb(0, 0, 0);
  }

  .nav-tab-desc {
    font-size: 12px;
  }

  .nav-tab-icon {
    font-size: 24px;
  }
</style>