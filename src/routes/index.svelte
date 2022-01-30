<!-- TODO: 
  1. Arrays and objects are not reactive by default, so ensure the UI updates properly as you change the task data structure
  2. UI/CSS challenges 
  3. Drag and drop
  4. All the rest: integrating it with Supabase, Vercel, and deploying it
-->

<h1>Project Y</h1>
<div style="display: flex;">
  <div>
    {#each allTasks as task}
      <RecursiveTask 
        on:task-create={(e) => modifyTaskTree(e, task)} 
        taskObject={task}
      >

      </RecursiveTask>
    {/each}
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

  <div on:click={createTask}>Create task</div>
</div>

<script>
  import RecursiveTask from '../RecursiveTask.svelte'
  import { onMount } from 'svelte'
  // for example, if you have buy airpods, contact Amazon, etc.

  $: scheduledTasks = allTasks.filter(task => task.time !== undefined)

  let allTasks = [{
    name: 'Visit UK friends & family',
    id: 1,
    time: 12,
    children: [{
      name: 'Visit ASR friends',
      id: 2,
      children: []
    }]
  }]

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
    console.log('allTasks is now =', allTasks)
  }

  function modifyTaskTree (e, task) {
    const { updatedChildren } = e.detail
    task.children = [...updatedChildren]
    // change the pointer to the updatedChildren
    // allTasks' subtree is mutated, and it will correctly reference it,
    // but the reactivity system does not KNOW it has been mutated, 
    allTasks = [...allTasks]
  }

  let timesOfTheDay = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
</script>

