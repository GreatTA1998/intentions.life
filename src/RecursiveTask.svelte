<!-- Recursively display a task and all its subtasks -->
{#if !taskObject.isDeleted}
  <div 
    draggable="true"
    class="scheduled-task"
    style="margin-left: 20px; margin-bottom: 10px; width: 100%"
    on:dragstart|self={(e) => dragstart_handler(e, taskObject.name)}
    on:pointerenter={showSubtasks}
    on:pointerleave={hideSubtasks}
  >
    <div class="current-task-flexbox">
      <div 
        class="keep-on-same-line name-of-task" 
        class:scheduled-orange={!taskObject.isDone && taskObject.startTime && taskObject.startDate}
        class:crossed-out={taskObject.isDone} 
        style="font-size: {5 * (0.65 ** depth)}rem;"
      >
        {taskObject.name}
        {#if taskObject.completionCount}
          {taskObject.completionCount}
        {/if}
        {#if !taskObject.isDone && taskObject.startTime && taskObject.startDate}
          {taskObject.startDate + ' ' + taskObject.startTime}
        {/if}
      </div>
      {#if isShowingSubtasks}
        {#if !isTypingNewTask}
          <div on:click={() => isTypingNewTask = true} style="margin-left: 14px; display: flex; align-content: center">
            <div class="plus alt"></div>
          </div>
        {:else}
          <input bind:value={newTask} on:keypress={detectEnterKey} style="width: 100%; margin-left: 5px"/>
        {/if}

        <span on:click={markAsDone} style="margin-left: 10px;">
          &#10003;
        </span>

        <div on:click={toggleRepeating} style="margin-left: 10px">
          {taskObject.isRepeating ? 'unrepeat' : 'repeat'}
        </div>

        {#if !isSchedulingTask}
          <div on:click={() => isSchedulingTask = true} style="margin-left: 14px;">Schedule</div>
        {:else}
          <input placeholder="03/14" bind:value={scheduledDate} style="width: 40px; margin-left: 14px;"/>
          <input placeholder="13:00" bind:value={scheduledTime} style="width: 40px" on:keypress={detectEnterKey2}/>
        {/if}


        <div on:click={deleteTask} style="margin-left: 10px">
          Delete
        </div>
      {/if}
    </div>

    <div style="margin-top: {60 * (0.65 ** depth)}px;">
      {#each taskObject.children as child, i}
        <RecursiveTask 
          taskObject={child}
          on:task-create={(e) => handleGrandchildUpdate(e, i)}
          on:task-done
          on:task-delete
          on:task-repeating
          depth={depth+1}
        />
      {/each}
    </div>
  </div>    
{/if}

<script>
  import RecursiveTask from './RecursiveTask.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import { getDateOfToday } from './helpers';

  export let taskObject
  export let depth

  const dispatch = createEventDispatcher()
  let isShowingSubtasks = false
  let isTypingNewTask = false 
  let newTask = ''

  let isSchedulingTask = false
  let scheduledDate = ''
  let scheduledTime = ''

  function dragstart_handler(e, taskName) {
    e.dataTransfer.setData("text/plain", taskName);
  }

  /**
    * Creates a children payload that correctly reflects changes in grandchildren
    * 
    * @param e the event that contains the modified grandchildren
    * @param i the index of the child that has been modified 
    */
  function handleGrandchildUpdate (e, i) {
    // to avoid confusion, don't mutate taskObject in this component,
    // only let the parent mutate it (even if the side-effects happen to cancel each other out)
    // therefore construct a new payload 
    const childCopy = { ...taskObject.children[i] }
    childCopy.children = e.detail.updatedChildren

    const childrenCopy = [...taskObject.children]
    childrenCopy[i] = childCopy

    sendUpNewChildrenPayload(childrenCopy)
  }

  function detectEnterKey (e) {
    if (e.charCode === 13) {
      createNewChild(newTask)
      newTask = ''
      isTypingNewTask = false
    }
  }

  function detectEnterKey2 (e) {
    if (e.charCode === 13) {
      // do some basic checks, although this is not correct for all cases
      if (scheduledDate.length !== 5 || scheduledTime.length !== 5) {
        alert("Formats must be exact - date is mm:dd and time is hh:mm, resetting")
        taskObject.startDate = ''
        taskObject.scheduledTime = ''
      } 
      else {
        taskObject.startDate = scheduledDate
        taskObject.startTime = scheduledTime
      }
      // TODO: rename to `treeUpdated` or something 
      dispatch('task-done', {})
    }
  }

  function createNewChild (name) {
    sendUpNewChildrenPayload(
      [...taskObject.children, { name, children: [] }]
    )
  }

  function sendUpNewChildrenPayload (payload) {
    dispatch('task-create', {
      updatedChildren: payload
    })
  }

  function showSubtasks () {
    isShowingSubtasks = true
  }

  function hideSubtasks () {
    isShowingSubtasks = false
  }

  function markAsDone () {
    taskObject.isDone = !taskObject.isDone
    if (taskObject.isRepeating) {
      if (!taskObject.isDone) {
        taskObject.completionCount = taskObject.completionCount - 1 || 0 
        taskObject.lastCompletionDate = ''
      } 
      else {
        taskObject.completionCount = taskObject.completionCount + 1 || 1
        taskObject.lastCompletionDate = getDateOfToday()
      }
    }
    dispatch('task-done', {
      // no need to create a payload, you just want to force the parent to manually run `allTasks = [...allTasks]`
    })
  }

  function toggleRepeating () {
    taskObject.isRepeating = !taskObject.isRepeating
    dispatch('task-repeating', {

    })
  }


  function deleteTask () {
    taskObject.isDeleted = !taskObject.isDeleted
    console.log('taskObject.deleted =', taskObject.isDeleted)
    dispatch('task-delete', {

    })
  }
</script>

<style>
  .current-task-flexbox {
    display: flex; 
    align-items: center;
    position: relative; 
    height: 12px;
  }

  .crossed-out {
    text-decoration: line-through;
    color: greenyellow;
    opacity: 60%;
  }

  .scheduled-orange {
    color: orange;
  }

  .keep-on-same-line {
    white-space: nowrap;
  }

  .plus {
    display:inline-block;
    width:30px;
    height:30px;
    
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

  .scheduled-task {
    /* display: inline; */
    /* position: absolute; */
    margin-left: 2px;
    border-left: 2px solid green;
    padding-left: 2px;
    font-size: 0.8rem;
  }
</style>
