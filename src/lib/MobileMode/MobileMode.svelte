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
      <ListView
        on:task-click={(e) => openDetailedCard(e.detail)}
        on:task-checkbox-change={(e) => updateTaskNode({ id: e.detail.id, keyValueChanges: { isDone: e.detail.isDone }})}

        on:new-root-task={(e) => createNewRootTask(e.detail)}
        on:subtask-create={(e) => createSubtask(e.detail)}
      />
    </div>

    <VoiceKeywordDetect
      on:voice-start={() => isUsingVoice = true}
      on:voice-end={() => isUsingVoice = false}
      on:new-mic-result={(e) => speechResult = e.detail}
      
      on:new-event-today={(e) => createNewEvent(e.detail)}
      on:new-todo={(e) => createNewTodo(e.detail)}
    />
  {:else if activeTabName === 'TODAY_VIEW'}
    <div style="overflow-y: auto;">
      <CalendarView
        on:task-click={(e) => openDetailedCard(e.detail)}
      />  
    </div>

    <FloatingButtonWrapper>
      <MultiPhotoUploader/>
    </FloatingButtonWrapper>
  {:else if activeTabName === 'FUTURE_VIEW'}
    <div style="overflow-y: auto;">
      <ScheduleView
        {futureScheduledTasks}
        on:task-duration-adjusted
        on:task-click={(e) => openDetailedCard(e.detail)}
      />
    </div>
  {/if}

  <div class="bottom-navbar">
    <div on:click={() => activeTabName = 'TODO_VIEW'} class="bottom-nav-tab" class:active-nav-tab={activeTabName === 'TODO_VIEW'}>
      <div style="text-align: center;">
        <span class="material-symbols-outlined nav-tab-icon">
          summarize
        </span>
        <div class="nav-tab-desc">
          To-do List
        </div>
      </div>
    </div>

    <div on:click={() => activeTabName = 'TODAY_VIEW'} class="bottom-nav-tab" class:active-nav-tab={activeTabName === 'TODAY_VIEW'}>
      <div style="text-align: center;">
        <span class="material-symbols-outlined nav-tab-icon">
          sunny
        </span>
        <div class="nav-tab-desc">
          Calendar View
        </div>
      </div>
    </div>

    <div class="bottom-nav-tab" on:click={() => activeTabName = 'FUTURE_VIEW'} class:active-nav-tab={activeTabName === 'FUTURE_VIEW'}>
      <div style="text-align: center;">
        <span class=" material-icons nav-tab-icon">
          upcoming
        </span>
        <div class="nav-tab-desc">
          Future Overview
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import { onSnapshot, collection, arrayUnion, arrayRemove } from 'firebase/firestore'
  import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc, updateFirestoreDoc, deleteFirestoreDoc } from '/src/helpers/firestoreHelpers.js'
  import { 
    getRandomID, 
    getDateInMMDD, 
    getDateInDDMMYYYY,
    sortByUnscheduledThenByOrderValue
  } from '/src/helpers/everythingElse.js'
  import { 
    user, 
    inclusiveWeekTodo
  } from '/src/store.js'
  import { onDestroy, onMount } from 'svelte'
  import ScheduleView from '$lib/MobileMode/ScheduleView.svelte'
  import ListView from '$lib/MobileMode/ListView.svelte'
  import CalendarView from '$lib/MobileMode/CalendarView.svelte'
  import VoiceKeywordDetect from '$lib/VoiceKeywordDetect.svelte'
  import DetailedCardPopup from '$lib/DetailedCardPopup/DetailedCardPopup.svelte'
  import MultiPhotoUploader from '$lib/MultiPhotoUploader.svelte'
  import FloatingButtonWrapper from './FloatingButtonWrapper.svelte'
  import { createTaskNode, updateTaskNode, deleteTaskNode } from '/src/helpers/crud.js'

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

  onMount(() => {})

  onDestroy(() => {
    if (unsub) unsub()
  })

  function createNewRootTask (newTaskObj) {
    // note: `newTaskObj` should NOT have an `id` (violates the schema), so this is a quickfix
    createTaskNode({ id: newTaskObj.id, newTaskObj })
  }

  function createSubtask ({ id, newTaskObj }) {
    createTaskNode({ id, newTaskObj })
  }

  function createNewEvent ({ name, startTime }) {
    const newTaskObj = {
      name,
      parentID: "",
      startTime,
      startDate: getDateInMMDD(new Date())
    }
    createTaskNode({ id: getRandomID(), newTaskObj })
  }

  function createNewTodo ({ name }) {
    const dueInHowManyDays = 7
    const d = new Date()
    d.setDate(d.getDate() + dueInHowManyDays - 1)

    const newTaskObj = {
      name,
      parentID: "",
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '23:59'
    }

    if (tasksToDisplay.length > 0) {
      newTaskObj.orderValue = (0 + tasksToDisplay[0].orderValue) / 2 

      // quickfix so when multiple tasks are added, they don't have the same `orderValue` which breaks drag-and-drop
      const epsilon = Math.random() * newTaskObj.orderValue 
      newTaskObj.orderValue += epsilon
    } // otherwise the default `orderValue` will be `maxOrder`, handled by `checkTaskObjSchema`

    createTaskNode({ id: getRandomID(), newTaskObj })
  }

  function openDetailedCard ({ task }) {
    clickedTask = task 
    isDetailedCardOpen = true
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