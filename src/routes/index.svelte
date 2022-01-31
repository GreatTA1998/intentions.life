<!-- TODO: 
  1. Drag and drop to calendar with height intervals
  2. Event loops, habits (with counters), repeats and follow-ups 
  3. Deadlines 
-->
<h1>Project Y</h1>
<div style="display: flex;">
  <div>
    {#each allTasks as task}
      <div style="width: 500px; border: solid; margin-bottom: 25px; padding-left: 0; padding-top: 25px; padding-bottom: 25px; padding-right: 12px;">
        <RecursiveTask 
          on:task-create={(e) => modifyTaskTree(e, task)} 
          taskObject={task}
        >

        </RecursiveTask>
      </div>
    {/each}
    <div on:click={createTask} style="display: flex; align-content: center; justify-items: center">
      <div class="plus alt" style="margin-left: 12px"></div>
      <div style="margin-top: 2px; font-size: 1.65rem;">Create task</div>
    </div>
  </div>

  <!-- Calendar section of today -->
  <div style="margin-left: 200px">
    {#each timesOfTheDay as time}
      <div style="display: flex; margin-bottom: 50px;">
        {time}<hr style="width: 700px; margin-left: 20px;">
        <div id={time}>

        </div>
      </div>
    {/each}
  </div>
</div>

<script>
  import RecursiveTask from '../RecursiveTask.svelte'
  import { onMount } from 'svelte'
  import db from '../db.js'
  import { collection, doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore'

  let allTasks = []

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
    allTasks = [...allTasks, {
      name: 'New task',
      id: 3,
      children: []
    }]
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

    // source of truth should be the database
    allTasks = [...allTasks]
  }

  let timesOfTheDay = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
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

