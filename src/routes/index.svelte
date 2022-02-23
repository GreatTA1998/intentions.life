<!-- TODO: 
  1. Drag and drop to calendar with height intervals
  2. Event loops, habits (with counters), repeats and follow-ups 
  3. Deadlines 
  4. Sortable todo
  5. Spatial hierarchy design (like Nototo)
-->
<h1>Life Organizer</h1>
<div style="display: flex;">
  {#if allTasks.length > 0}
    <div style="width: 500px;">
      {#each allTasks as task}
        {#if !task.isDeleted}
          <div style="width: 500px; border: solid; margin-bottom: 25px; padding-left: 0; padding-top: 25px; padding-bottom: 25px; padding-right: 12px; overflow: auto;"
            class="task-container"
          >
            <RecursiveTask 
              on:task-create={(e) => modifyTaskTree(e, task)} 
              on:task-done={updateFirestore}
              on:task-delete={updateFirestore}
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
    </div>
  {/if}

  <CalendarUI {scheduledTasks}/>
</div>

<script>
  import RecursiveTask from '../RecursiveTask.svelte'
  import CalendarUI from '../CalendarUI.svelte'
  import { onMount } from 'svelte'
  import db from '../db.js'
  import { doc, getDoc, updateDoc } from 'firebase/firestore'

  let allTasks = []
  let newTopLevelTask = ''

  async function fetchTasks () { 
    const user = await getDoc(
      doc(db, 'users/GxBbopqXHW0qgjKEwU4z')
    )
    allTasks = user.data().allTasks
  }
  fetchTasks()

  $: scheduledTasks = allTasks.filter(task => task.time !== undefined)

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

