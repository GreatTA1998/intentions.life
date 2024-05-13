<!--   style="padding: 6px; background-color: white; display: flex; align-items: center; justify-content: center;" -->
<div class:iphone-se-size={isTesting} 
     class:general-mobile-size={!isTesting}
     style="position: relative;"
>
  {#if activeTabName === 'TODAY_VIEW'}
    <div style="padding: 8px; overflow-y: auto;">
      {#each todayScheduledTasks as eventToday}
        {#if eventToday.iconDataURL}
          <div class:has-already-happened={hasAlreadyHappened(eventToday)} style="display: flex; align-items: center; margin-bottom: 16px;">
            <div style="font-size: 48px;">
              {eventToday.startTime} 
            </div>

            <img src={eventToday.iconDataURL} style="width: 48px; height: 48px;">
          </div>
        {:else}
          <div class:has-already-happened={hasAlreadyHappened(eventToday)} style="margin-bottom: 16px;">
            <div style="font-size: 48px;">
              {eventToday.startTime} 
            </div>
            <div style="font-size: 32px; display: flex; align-items: center; flex-wrap: no-wrap;">
              {eventToday.name}
            </div>
          </div>
        {/if}
      {/each}

  
      <MobileTodayTodo/>
    </div>
    <!-- <NewThisWeekTodo/> -->
  {:else if activeTabName === 'FUTURE_OVERVIEW'}
    <!-- <FutureOverview
      {futureScheduledTasks}
      on:task-duration-adjusted
      on:task-click
    /> -->
  {/if}

  <!-- Floating button -->
  <div class="floating-button">
    <span class="material-symbols-outlined" style="font-size: 48px;">
      mic
    </span>
  </div>

  <div style="position: absolute; bottom: 0; width: 100%; height: var(--bottom-navbar-height); display: flex; align-items: center; justify-content: space-between; border: 2px solid black;">
    <div on:click={() => activeTabName = 'TODAY_VIEW'} class="bottom-nav-tab" style="border-right: 2px solid black;">
      <span class="material-symbols-outlined nav-tab-icon">
        sunny
      </span>
      <div class="nav-tab-desc">
        Today
      </div>
    </div>

    <div on:click={() => activeTabName = 'FUTURE_OVERVIEW'} class="bottom-nav-tab" style="border-left: 2px solid black;">
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
  import { getFirestore, onSnapshot, collection } from 'firebase/firestore'
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc } from '/src/crud.js'
  import { 
    getRandomID, 
    getDateInMMDD, 
    getTimeInHHMM,
    pureNumericalHourForm
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
  import MobileTodayView from '$lib/MobileTodayView.svelte'
  import NewThisWeekTodo from '$lib/NewThisWeekTodo.svelte'
  import MobileTodayTodo from '$lib/MobileTodayTodo.svelte'

  let allTasks = []
  let todayScheduledTasks = []
  let isTesting = true
  let futureScheduledTasks = null
  let activeTabName = 'TODAY_VIEW'
  let unsub

  $: if (allTasks.length > 0) {
    computeDataStructuresFromAllTasks(allTasks)
  }

  onMount(() => {
    // fetch `allTasks`
    const ref = collection(getFirestore(), `/users/${$user.uid}/tasks`)
    unsub = onSnapshot(ref, (querySnapshot) => {
      const result = [] 
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data()})
      })
      allTasks = reconstructTreeInMemory(result)
      console.log('allTasks =', allTasks)

      tasksScheduledOn.set(computeDateToTasksDict(allTasks))
    })

    // display all the events

    // fetch all the tasks where the startDate and startTime
  })

  onDestroy(() => {
    if (unsub) unsub()
  })

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

  .page-title {
    font-size: 24px;
    font-weight: 500;
    color: rgb(120, 120, 120);
    text-transform: uppercase;
    font-weight: 200;

    margin: 24px;
    margin-bottom: 0px;
  }

  .bottom-nav-tab {
    display: flex; 
    align-items: center;
    justify-content: center;

    height: 100%;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .nav-tab-desc {
    margin-left: 8px;

    font-size: 20px;
  }

  .nav-tab-icon {
    font-size: 32px;
  }

  .floating-button {
    position: absolute;
    right: 16px;
    bottom: calc(var(--bottom-navbar-height) + 16px);

    border: 2px solid var(--logo-twig-color);
    height: 72px;
    width: 72px;
    border-radius: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>