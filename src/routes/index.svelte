<!-- TODO:  
  4. Sortable todo
  5. Spatial hierarchy design (like Nototo)
-->
<div id="background-image-holder" style="height: 100vh; padding-left: 80px; padding-right: 80px;">
  <!-- 300 px  -->
  <div style="height: 80px;"></div>

  <!-- Cannot autoplay music unfortunately, but ability to play/pause might not be so bad -->
  <div on:click={toggleMusic} style="position: absolute; top: 30px; left: 30px;">
    <span  class="material-icons" style="margin-left: auto; margin-right: 0; color: white">
      {isMusicPlaying ? 'music_off' : 'music_note'}
    </span>
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /> -->
  </div>

  <div style="display: flex; padding-left: 0; padding-top: 10px;">
    <div class="fixed-height-container-for-scrolling" style="background-color: white; border: 2px solid green; border-top-left-radius: 20px; border-bottom-left-radius: 20px;">
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
          
          <!-- Invisible, but hoverable region -->
          <div style="height: 100px;"
            on:mouseenter={() => isShowingCreateButton = true}
            on:mouseleave={() => isShowingCreateButton = false}
          >
            {#if isShowingCreateButton}
              {#if !isTypingNewRootTask}
                <div style="font-size: 1.5rem; color: grey;" on:click={() => isTypingNewRootTask = true}>
                  New task 
                </div>
              {:else}
                <div style="display: flex; align-content: center; justify-items: center">
                  <input 
                    bind:value={newTopLevelTask} placeholder="Type task..." 
                    on:keypress={detectEnterKey2}
                  >
                </div>
              {/if}
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <div 
      style="display: flex; justify-content: space-evenly; width: 30vw; border-left: 2px dashed grey;
         background-color: white; border: 2px solid green; border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
    >
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
</div>

<audio bind:this={AudioElem} src="illiyard-moor-lofi.mp3"></audio>

<!-- <iframe src="illiyard-moor-lofi.mp3" allow="autoplay" style="display:none" id="iframeAudio">
</iframe>  -->

<script>
  import RecursiveTask from '../RecursiveTask.svelte'
  import CalendarDayView from '../CalendarDayView.svelte'
  import { onMount } from 'svelte'
  import db from '../db.js'
  import { doc, getDoc, updateDoc } from 'firebase/firestore'
  import { getDateOfToday, getDateOfTomorrow } from '../helpers.js'


  let AudioElem
  let isMusicPlaying = false

  let allTasks = []
  let sortedAllTasks = [] 
  let scheduledTasks = []
  let scheduledTasks2 = []
  let newTopLevelTask = ''
  let isTypingNewRootTask = false
  let isShowingCreateButton = false

  function toggleMusic () {
    AudioElem.volume = 0.1
    if (AudioElem.paused) {
      AudioElem.play()
      isMusicPlaying = true
    }
    else {
      AudioElem.pause()
      isMusicPlaying = false
    }
  }

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

    // RE-THINK THE REPEATING TASKS




    



















    // handle repeating tasks
    for (const task of scheduledTasks) {
      if (task.isRepeating) {
        console.log('task.name =', task.name)
        console.log("last completion date =", task.lastCompletionDate)
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

  function detectEnterKey2 (e) { 
    if (e.charCode === 13) {
      createTask()
    }
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

    newToplevelTask = ''
    isTypingNewTask = false
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
  #background-image-holder {
    background-image: url('maplestory-orange.jpg');
  }

  /* #radio-player-with-art {
    background-image: url('../maplestory-watercolor.jpg')
  } */

  *::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .fixed-height-container-for-scrolling {
    /* background-image: linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.5)), url('../illiyard-moor.jpg'); */
    /* opacity: 0.5; */
    height: 80vh;
    /* overflow-y: scroll; */
    width: 70vw;
  }

  .todo-list {
    width: 100%; 
    height: 80vh;
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
    padding-right: 0; 
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

