<!-- TODO:  
  4. Sortable todo
  5. Spatial hierarchy design (like Nototo)
-->

<svelte:body class="no-margin"></svelte:body>

<div style="display: flex; padding-left: 10px; padding-top: 10px;">
  <div class="fixed-height-container-for-scrolling">
    <div class="todo-list">
      {#if allTasks.length > 0}
        {#each allTasks as task}
          {#if !task.isDeleted}
            <div class="task-container">
              <RecursiveTask 
                on:task-create={(e) => modifyTaskTree(e, task)} 
                on:task-done={updateFirestore}
                on:task-delete={updateFirestore}
                on:task-repeating={updateFirestore}
                taskObject={task}
                depth={1}
              >

              </RecursiveTask>
            </div>
          {/if}
        {/each}
        
        <div style="display: flex; align-content: center; justify-items: center">
          <div class="plus alt" style="margin-left: 12px"></div>
          <input bind:value={newTopLevelTask} placeholder="Type task...">
          <div on:click={createTask} style="margin-top: 2px; font-size: 1.65rem;">
            Create task
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div style="display: flex; justify-content: space-evenly; width: 30vw; border-left: 2px dashed grey">
    <CalendarDayView
      {scheduledTasks}
      on:task-scheduled={(e) => mutateOneNode(e.detail)}
      on:task-duration-adjusted={(e) => mutateOneNode2(e.detail)}
      getDate={getDateOfToday}
    />

    <CalendarDayView
      scheduledTasks={scheduledTasks2}
      on:task-scheduled={(e) => mutateOneNode(e.detail)}
      on:task-duration-adjusted={(e) => mutateOneNode2(e.detail)}
      getDate={getDateOfTomorrow}
    /> 
  </div>
</div>

<script>
  import RecursiveTask from '../RecursiveTask.svelte'
  import CalendarDayView from '../CalendarDayView.svelte'
  import { onMount } from 'svelte'
  import db from '../db.js'
  import { doc, getDoc, updateDoc } from 'firebase/firestore'
  import { getDateOfToday, getDateOfTomorrow } from '../helpers.js'

  let allTasks = []
  let sortedAllTasks = [] 
  let scheduledTasks = []
  let scheduledTasks2 = []
  let newTopLevelTask = ''

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
          if (helper(child)) {
            return true
          }
        }
        return false
      }
    }

    for (const task of allTasks) {
      if (helper(task)) { // the sub-task only exists in ONE of the root tasks, so only one of the `helper()` calls will return true
        console.log('successfully mutated allTasks, =', allTasks)
        break
      }
    }

    await updateDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z'),
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
          if (helper(child)) {
            return true
          }
        }
        return false
      }
    }

    for (const task of allTasks) {
      if (helper(task)) { // the sub-task only exists in ONE of the root tasks, so only one of the `helper()` calls will return true
        console.log('successfully mutated allTasks, =', allTasks)
        break
      }
    }

    await updateDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z'),
      { allTasks }
    )

    // manually trigger reactivity because mutations can't be detected
    allTasks = [...allTasks]
  }


  async function fetchTasks () { 
    const user = await getDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z')
    )
    allTasks = user.data().allTasks
  }
  fetchTasks()


  $: if (allTasks) {
    const result = [] 

    function recursivelyFindScheduledTasks (node) {
      if (node.startTime !== undefined) {
        result.push(node)
      }
      for (const child of node.children) {
        recursivelyFindScheduledTasks(child)
      }
    }

    for (const task of allTasks) {
      recursivelyFindScheduledTasks(task)
    }

    // now filter for tasks that are scheduled for the DATE TODAY
    const dateOfToday = getDateOfToday()
    scheduledTasks = result.filter(task => task.startDate === dateOfToday && !task.isDeleted)

    const dateOfTomorrow = getDateOfTomorrow()
    scheduledTasks2 = result.filter(task => task.startDate === dateOfTomorrow && !task.isDeleted)
    console.log('scheduledTasks2 =', scheduledTasks2)

    // handle repeating tasks
    for (const task of scheduledTasks) {
      if (task.isRepeating) {
        if (task.lastCompletionDate !== dateOfToday) {
          task.startDate = dateOfToday
          task.isDone = false 
        }
      }
    }

    // finished tasks go to the bottom
    sortedAllTasks = allTasks.sort((t1, t2) => {
      return !!t1.isDone - !!t2.isDone // `isDone` can be undefined, which screws up the subtraction
    })
  }

  function createTask () {
    if (!newTopLevelTask) {
      alert("You have to type something first")
    }
    const newValue = [
      ...allTasks, 
      { name: newTopLevelTask, 
        children: [] 
      }
    ]

    updateDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z'),
      { allTasks: newValue }
    )
    
    allTasks = [...newValue]
  }

  function modifyTaskTree (e, task) {
    // change the reference
    const { updatedChildren } = e.detail
    task.children = [...updatedChildren]

    updateDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z'),
      { allTasks }
    )

    // change the pointer to the updatedChildren
    // allTasks' subtree is mutated, and it will correctly reference it,
    
    // but the reactivity system does not KNOW when exactly it has been mutated, 
    allTasks = [...allTasks]
  }

  function updateFirestore () {
    console.log("updateFirestore()")
    // NOTE: `allTasks` has been mutated (and is already correct), but the reactivity system doesn't know that
    updateDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z'),
      { allTasks }
    )
    allTasks = [...allTasks]
  }
</script>

<style>
  *::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .fixed-height-container-for-scrolling {
    height: 100vh;
    overflow-y: scroll;
    width: 70vw;
  }

  .todo-list {
    width: 100%; 
    height: 300vh;
    display: flex; 
    flex-wrap: wrap; 
    flex-direction: column
  }

  .task-container { 
    border: 0px solid; 
    margin-bottom: 25px; 
    padding-left: 0; 
    padding-top: 16px; 
    padding-bottom: 10px; 
    padding-right: 12px; 
    overflow: none;
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
</style>

