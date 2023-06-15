<!-- Recursively display a task and all its subtasks -->
<!-- Check if parent's fixed duration is enough to practically include its children's font sizes `taskObject.duration * 90/60 > children.length * 10  -->
{#if !taskObject.isDeleted && !taskObject.isDone && !(taskObject.startTime && taskObject.startDate)}
  <div 
    draggable="true"
    class="scheduled-task"
    class:black-duration-line={!taskObject.isDone && !(taskObject.startTime && taskObject.startDate) && !isGoal}
    class:orange-duration-line={!taskObject.isDone && taskObject.startTime && taskObject.startDate}
    class:green-duration-line={taskObject.isDone}
    style="
      margin-left: {depth === 1 ? '0' : '5'}px; 
      margin-bottom: 10px; 
      width: {350 * 0.8 ** depth}px; 
      height: {taskObject.duration && !doChildrenHaveDuration 
        && (taskObject.duration * 90/60 > taskObject.children.length * 60 * 0.7 ** depth)
        && (taskObject.duration * 90/60 > 60 * (0.65 ** depth))
        ? `${taskObject.duration * 90/60}px` : ''};
      padding-left: {10 * 0.8 ** depth}px;
    "
    on:dragstart|self={(e) => dragstart_handler(e, taskObject.id)}
  >
    <div class="current-task-flexbox">
      <div 
        style="
          font-size: {1.26 * (0.8 ** (depth-1))}rem; 
          font-family: Roboto,sans-serif; 
          font-weight: {800 - (100 * depth)};
          color: rgb({20 + depth * 30}, {20 + depth * 30}, {20 + depth * 30});
        "
        class="keep-on-same-line name-of-task" 
        class:scheduled-orange={!taskObject.isDone && taskObject.startTime && taskObject.startDate}
        class:crossed-out={taskObject.isDone} 
      >
        {#if !isEditingTaskName}
          <!-- on:pointerenter={showOptions} -->
          <div style="display: flex; align-items: center;">
            <div 
              on:click={() => dispatch('task-click', { task: taskObject })} 
              class="truncate"
              class:my-uppercase={isGoal}
              class:transparent-grey={isGoal}
              style="max-width: {340 * (0.85 ** depth)}px; color: {depth === 1 ? '#323232' : '#6D6D6D'};"
            >
              {taskObject.name}
            </div>
            <span class="material-icons" on:click={() => isTypingNewTask = true} style="font-size: 1rem;">
              add
            </span>
          </div>     
        {:else} 
          <!-- TO-DO: newTaskName refers to EDIT, not a new sub-task -->
          <input 
            bind:value={newTaskName} 
            on:keypress={detectEnterKey3}
          >
        {/if}
      </div>
    </div>

    <div style="margin-top: {10 * (0.7 ** depth)}px;">
      {#each taskObject.children as child, i}
        <RecursiveTask 
          taskObject={child}
          depth={depth+1}
          on:task-create={(e) => handleGrandchildUpdate(e, i)}
          on:task-click
          on:task-done
          on:task-delete
          on:task-repeating
        />
      {/each}

      {#if isTypingNewTask}
        <div style="display: flex; align-items: center; margin-left: 5px;">
          <input 
            bind:this={newSubtaskInput}
            placeholder="Type sub-task" 
            bind:value={newTask}
            on:keypress={detectEnterKey} 
            style="width: 100%; margin-left: 5px; z-index: 1"
          />
        </div>
      {/if}
    </div>
  </div>    
{/if}

<script>
  import RecursiveTask from './RecursiveTask.svelte'
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import { getDateOfToday, getRandomID } from './helpers'

  export let taskObject
  export let depth

  $: isGoal = !!taskObject.isGoal // !! necessary because `.isGoal` can be undefined

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

  let newSubtaskInput

  // if children have duration then it'll contradict the parent's height duration, so childrens take precedence
  $: doChildrenHaveDuration = taskObject.children.filter(child => child.duration).length > 0

  $: {
    if (isTypingNewTask) {
      tick().then(() => {
        if (newSubtaskInput) {// quick-fix {
          newSubtaskInput.focus()
        }
      })
    }
  }

  function dragstart_handler(e, id) {
    e.dataTransfer.setData("text/plain", id);
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

  function createNewChild (name) {
    sendUpNewChildrenPayload(
      [...taskObject.children, { name, children: [], id: getRandomID() }]
    )
  }

  function sendUpNewChildrenPayload (payload) {
    dispatch('task-create', {
      updatedChildren: payload
    })
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

  function focusOnMount (node) {
    console.log('action found!')
    node.focus()
    // need an "action object"
    return {

    }
  }

</script>

<style>
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 800px
  }

  .black-duration-line {
    border-left: 2px solid rgb(146, 146, 146);
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
    /* max-width: 600px; */
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

  .my-uppercase {
    text-transform: uppercase;
  }
</style>
