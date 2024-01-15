<span on:click={() => setIsPopupOpen({ newVal: true })} class="material-symbols-outlined my-float" style="font-size: 42px; color: rgb(20, 20, 20); cursor: pointer; margin-left: -4px;">
  summarize
</span>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={handleClickOutside}>
    <div class="my-popup" 
      bind:this={elem} 
    >    
      <div style="overflow: auto; height: 100%; width: 100%;">
        <div style="
          display: flex; 
          height: 100%;
          justify-content: space-between; 
          align-items: start;
          flex-wrap: nowrap;
          "
        >
          <div style="width: 20%;">
            <GrandTreeTodoReusableList
              listTitle="TODAY"
              allTasksDue={allTasksDueToday}
              dueInHowManyDays={1}
              on:new-root-task
              on:task-unscheduled
              on:subtask-create
              on:task-click
              on:task-dragged
            />  

            <!-- 6% height margin looks equivalent to 1% width margin (so separation between all todo lists look equal) -->
            <div style="margin-bottom: 5%;"></div>

            <GrandTreeTodoReusableList
              listTitle="THIS WEEK"
              allTasksDue={allTasksDueThisWeek}
              dueInHowManyDays={7}
              on:new-root-task
              on:task-unscheduled
              on:subtask-create
              on:task-click
              on:task-dragged
            />  
          </div>

          <div style="width: 20%;  height: 100%; overflow-y: auto;" class="round-scrollbar">
            <GrandTreeTodoReusableList
              listTitle="THIS MONTH"
              allTasksDue={allTasksDueThisMonth}
              dueInHowManyDays={30}
              on:new-root-task
              on:task-unscheduled
              on:subtask-create
              on:task-click
              on:task-dragged
            />  
          </div>

          <div style="width: 58%; height: 100%; overflow-x: auto; opacity: 0.8;">
            <slot>
              <!-- GrandTreeTodo will be injected via the parent,, so no interface will need to be changed -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<script>
export let allTasks

import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { computeDayDifference, getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY, convertDDMMYYYYToDateClassObject, getCurrentTimeInHHMM } from '/src/helpers.js'
import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'

let allTasksDueToday = []
let allTasksDueThisWeek = []
let allTasksDueThisMonth = []
let allTasksDueThisYear = []

$: computeTodoMemoryTree(allTasks)

function computeTodoMemoryTree (allTasks) {
  allTasksDueToday = []
  allTasksDueThisWeek = []
  allTasksDueThisMonth = []
  allTasksDueThisYear = []
  for (const parentlessTask of allTasks) {
    helper({ node: parentlessTask })
  }
  console.log('i should be around 1200', i)
}

// parent category is 'DAY', 'WEEK', 'MONTH', 'YEAR'
// recursively scan the ORIGINAL tree, so we separate the scanning tree from the editing tree
//   - node is for scanning 
//   - node is for mutating
let i = 0
function helper ({ node, parentCategory = '', parentObjReference = null }) {
  if (!node.deadlineDate) {
    // be lenient with children that have no due dates, as it wouldn't make sense 
    // that a task due in 3 days has a sub-task that has no due dates
    if (parentObjReference && parentCategory) {
      parentObjReference.children.push(node)
      for (const child of node.children) {
        // a sub-task (i.e. has parentID) can still appear as the top-level task within a to-do,
        // hence no parentObjReference nor parentCategory yet
        helper({ node: child, parentCategory, parentObjReference })
      }
    } 
    else {
      // console.log('give someone else a chance to be head case')
      // a sub-task (i.e. has parentID) can still appear as the top-level task within a to-do,
      // hence no parentObjReference nor parentCategory yet
      for (const child of node.children) {
        helper({ node: child })
      }
    }
  }
  else {
    const shallowCopy = {...node}
    shallowCopy.children = []
    const dueInHowManyDays = computeDayDifference(
      new Date(),
      convertDDMMYYYYToDateClassObject(node.deadlineDate)
    )
    if (dueInHowManyDays <= 1 && dueInHowManyDays >= 0) {
      if (parentCategory === 'DAY' && parentObjReference !== null) {
        parentObjReference.children.push(shallowCopy)
      }
      else allTasksDueToday.push(node)
      
      for (const child of node.children) {
        helper({ node: child, parentCategory: 'DAY', parentObjReference: shallowCopy})
      }
    } 
    else if (dueInHowManyDays <= 7 && dueInHowManyDays >= 0) {
      if (parentCategory === 'WEEK' && parentObjReference !== null) {
        parentObjReference.children.push(shallowCopy)
      }
      else allTasksDueThisWeek.push(shallowCopy)

      // notice we iterate on the original tree that still has a `.children` array preserved
      for (const child of node.children) {
        i += 1
        helper({ node: child, parentCategory: 'WEEK', parentObjReference: shallowCopy})
      }
    }
    else if (dueInHowManyDays <= 31 && dueInHowManyDays >= 0) {
      if (parentCategory === 'MONTH' && parentObjReference !== null) {
        parentObjReference.children.push(shallowCopy)
      } 
      else allTasksDueThisMonth.push(shallowCopy)

      for (const child of node.children) {
        helper({ node: child, parentCategory: 'MONTH', parentObjReference: shallowCopy})
      }
    }
    else if (dueInHowManyDays <= 365 && dueInHowManyDays >= 0) {
      if (parentCategory === 'YEAR' && parentObjReference !== null) {
        parentObjReference.children.push(shallowCopy)
      }
      else allTasksDueThisYear.push(shallowCopy)

      for (const child of node.children) {
        helper({ node: child, parentCategory: 'YEAR', parentObjReference: shallowCopy})
      }
    } 
  }
}

  const dispatch = createEventDispatcher()

  let isPopupOpen = false

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  let elem

  function handleClickOutside (e) {
    isPopupOpen = false
    dispatch('card-close')
  }

  onMount(() => {

  })

  onDestroy(() => {

  })
</script>

<style>
.todo-column-title {
  font-size: 20px; 
  font-weight: 500;
}

.my-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* overflow-y: auto;
  overflow-x: auto; */
  
  /* z-index 3 because the base calendar uses z-index 0, 1, 2 */
  z-index: 3;
  min-width: 300px;
  width: 92%;
  height: 88%;

  /* 12px (todo list radius) + 12px (padding) for concentric border radii */
  padding: 24px; 
  border-radius: 36px;
  background-color: white;

/*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
}
</style>