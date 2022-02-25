<!-- TODO:  
  4. Sortable todo
  5. Spatial hierarchy design (like Nototo)
-->
  <div style="display: flex; padding-left: 10px;">
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


  <CalendarUI 
    {scheduledTasks}
    on:task-scheduled={(e) => mutateOneNode(e.detail)}
  />

  <div style="width: 100%; padding: 6px;">
    <!-- FUTURE: the tutorial itself is recursive -->
    <h2>All you need is 3 concepts: sub-tasks, scheduled tasks, and repeated tasks.</h2>
      <ul>
        <li>A <b>follow-up</b> is just a scheduled sub-task
        <li>A <b>deadline</b> is just a scheduled task that ends at a particular time (but start time must take the duration of the overall task into account)</li>
        <li>A <b>habit</b> is just a repeated scheduled task</li>
      </ul>

    Differences with normal productivity apps: 
    Because the todo and calendar are free flowing, there is no EVENT. Everything is a "task". So if you have an event, you must tick it off. 
    Scheduled tasks are special in that, they have been designated a time and place. But they can always CHANGE. To change them is just to drag them around.
    All that matters is, you never MISS a task unintentionally. 
  </div>
</div>

<script>
  import RecursiveTask from '../RecursiveTask.svelte'
  import CalendarUI from '../CalendarUI.svelte'
  import { onMount } from 'svelte'
  import db from '../db.js'
  import { doc, getDoc, updateDoc } from 'firebase/firestore'
  import { getDateOfToday } from '../helpers.js'

  let allTasks = []
  let sortedAllTasks = [] 
  let scheduledTasks = []
  let newTopLevelTask = ''

  async function mutateOneNode ({ taskName, timeOfDay, dateOfToday }) {
    // search for the particular node, mutate it, then update the database
    function helper (node) {
      if (node.name === taskName) {
        node.startTime = timeOfDay
        node.startDate = dateOfToday
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
    scheduledTasks = result.filter(task => task.startDate === dateOfToday)

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
      console.log('t2.isDone =', !!t2.isDone)
      console.log('t1.isDone =', !!t1.isDone)
      return !!t1.isDone - !!t2.isDone
    })
  }

  onMount(() => {
    console.log('mounted(), scheduledTasks =', scheduledTasks)
    // for each task, create a div representing it on the calendar, then attach it to the right place

    // const scheduledTasks = allTasks.filter(task => task.time !== undefined)

    for (const task of scheduledTasks) {
      // const newDiv = document.createElement("div");
      // const newContent = document.createTextNode(task.name);
      // newDiv.appendChild(newContent)
      console.log('task.time =', task.time)
      
      // document.getElementById(task.time).appendChild(newContent)

      document.getElementById(task.time).textContent = task.name

      // document.body.insertBefore(newDiv, document.getElementById(task.time))
      console.log('successfully attached')
    }
  })

  function createTask () {
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
  .todo-list {
    width: 100%; 
    overflow-y: scroll;
    height: 100vh;
  }

  .task-container {
    width: 28vw; 
    border: 0px solid; 
    margin-bottom: 25px; 
    padding-left: 0; 
    padding-top: 16px; 
    padding-bottom: 10px; 
    padding-right: 12px; 
    overflow: auto;
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

