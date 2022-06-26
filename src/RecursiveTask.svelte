<!-- Recursively display a task and all its subtasks -->
<!-- Check if parent's fixed duration is enough to practically include its children's font sizes `taskObject.duration * 90/60 > children.length * 10  -->
{#if !taskObject.isDeleted && !taskObject.isDone}
  <div 
    draggable="true"
    class="scheduled-task"
    class:black-duration-line={!taskObject.isDone && !(taskObject.startTime && taskObject.startDate)}
    class:orange-duration-line={!taskObject.isDone && taskObject.startTime && taskObject.startDate}
    class:green-duration-line={taskObject.isDone}
    style="
      margin-left: {depth === 1 ? '0' : '20'}px; margin-bottom: 10px; width: {560 * 0.8 ** depth}px; 
      height: {taskObject.duration && !doChildrenHaveDuration 
        && (taskObject.duration * 90/60 > taskObject.children.length * 60 * 0.7 ** depth)
        && (taskObject.duration * 90/60 > 60 * (0.65 ** depth))
        ? `${taskObject.duration * 90/60}px` : '100%'};
    "
    on:dragstart|self={(e) => dragstart_handler(e, taskObject.name)}
    on:pointerenter={showOptions}
    on:pointerleave={hideOptions}
  >
    <div class="current-task-flexbox">
      <div 
        class="keep-on-same-line name-of-task truncate" 
        class:scheduled-orange={!taskObject.isDone && taskObject.startTime && taskObject.startDate}
        class:crossed-out={taskObject.isDone} 
        style="font-size: {4 * (0.68 ** depth)}rem;"
      >
        {#if !isEditingTaskName}
          <div on:click={() => isDetailedCardOpen = true} style="width: 1000px" class="truncate">
            {taskObject.name}
          </div>
        {:else} 
          <input bind:value={newTaskName} on:keypress={detectEnterKey3}>
        {/if}
      </div>

      <CardPopup 
        isOpen={isDetailedCardOpen}
        {taskObject}
        on:card-close={() => isDetailedCardOpen = false}
      />
    
      <div style="width: {200 * (0.9 ** depth)}px; height: 100%">
        {#if isShowingOptions}
          {#if !(isTypingNewTask || isSchedulingTask || isRepeatingTask || isDeletingTask )}  
            <span class="material-icons" on:click={() => isTypingNewTask = true} style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;">
              playlist_add
            </span>
            <!-- 
              <span on:click={markAsDone} class="material-icons" style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;">
                check
              </span>
            -->
          {:else}
            {#if isTypingNewTask}
              <div style="display: flex; align-items: center">
                <input placeholder="Sub-task A" bind:value={newTask} on:keypress={detectEnterKey} style="width: 100%; margin-left: 5px"/>
              </div>
            {:else if isSchedulingTask}
              <input placeholder="03/14" bind:value={scheduledDate} style="width: 40px; margin-left: 14px;"/>
              <input placeholder="13:00" bind:value={scheduledTime} style="width: 40px" on:keypress={detectEnterKey2}/>
            {:else if isRepeatingTask} 
              <div style="display: flex">
                Repeats every <input bind:value={daysBeforeRepeating} style="width: 20px;" placeholder="0" on:keypress={detectEnterKey4}> days 
              </div>
            {:else if isDeletingTask}
              <div style="display: flex; align-items: center; justify-content: space-evenly">
                <div on:click={deleteTask}>Delete</div>
                <div on:click={() => isDeletingTask = false}>Cancel</div>
              </div>
            {/if}
          {/if}
        {/if}
      </div>
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
  import { getDateOfToday } from './helpers'
  import CardPopup from './CardPopup.svelte'

  export let taskObject
  export let depth

  let isDetailedCardOpen = false

  const dispatch = createEventDispatcher()
  let isEditingTaskName = false
  let newTaskName = ''

  let isShowingOptions = false
  let isTypingNewTask = false 
  let newTask = ''

  let isSchedulingTask = false
  let scheduledDate = ''
  let scheduledTime = ''

  let isRepeatingTask = false
  let daysBeforeRepeating = 0

  let isDeletingTask = false

  // if children have duration then it'll contradict the parent's height duration, so childrens take precedence
  $: doChildrenHaveDuration = taskObject.children.filter(child => child.duration).length > 0

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

  function startEditTaskName () {
    isEditingTaskName = true
    newTaskName = taskObject.name
  }

  function detectEnterKey (e) {
    if (e.charCode === 13) {
      if (!newTask) {
        // 
      } 
      else {
        createNewChild(newTask)
      }
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
      isSchedulingTask = false
    }
  }

  function detectEnterKey3 (e) {
    if (e.charCode === 13) {
      if (!newTaskName) {
        alert("Task name can't be empty.")
        return
      }
      taskObject.name = newTaskName
      dispatch('task-done', {})
      newTaskName = ''
      isEditingTaskName = false
    }
  }

  function detectEnterKey4 (e) {
    if (e.charCode === 13) {
      if (!daysBeforeRepeating) {
        alert('Task is reset and will no longer repeat')
        taskObject.daysBeforeRepeating = 0
      } else {
        taskObject.daysBeforeRepeating = daysBeforeRepeating
      }
      dispatch('task-done', {})
      daysBeforeRepeating = 0
      isRepeatingTask = false
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

  function showOptions () {
    isShowingOptions = true
  }

  function hideOptions () {
    isShowingOptions = false
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
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .black-duration-line {
    border-left: 2px solid black;
  }

  .orange-duration-line {
    border-left: 2px solid orange;
  }

  .green-duration-line {
    border-left: 2px solid rgb(212, 250, 156);
  }

  .current-task-flexbox {
    display: flex; 
    align-items: center;
    position: relative; 
    height: 12px;
  }

  .crossed-out {
    /* text-decoration: line-through; */
    color: rgb(183, 228, 115);
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
    /* border-left: 2px solid green; */
    padding-left: 2px;
    font-size: 0.8rem;
  }
</style>
