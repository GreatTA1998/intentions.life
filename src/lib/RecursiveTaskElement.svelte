<!-- 
  The goal is for this to be used on the calendar, todo-list...everywhere
    1. It is hierarchical
    2. It also has duration (NOTE: right now it doesn't)
      (note, consider whether you want to display duration visualizations
      for the future preview and the all-time todo list - it could be useful to turn off 
      visualization as a prop)

  Other notes: 
    Previously, we deprecated the duration lines for the all-time todo tree, because it violates the principle of 
    "do not distort or misrepresent data".

    However, we will now keep duration visualization units consistent, pixelsPerHour will be the same for all elements on the screen. 
    But the duration visualization is a big part, so I'm guessing, YES. Assume all clients who use <RecursiveTaskElement/> will have a scale.R

    This task will include checkboxes 

    Hierarchy based on tags, rather than a tree with high `h`

    Directly add tasks to the calendar, the `allTasks` array should have length 1000 instead of 3 over the years.
-->
<div 
  class:hide-subtree={
    (taskObj.startDate && doNotShowScheduledTasks)
    ||
    (taskObj.isDone && doNotShowCompletedTasks)
  }
  style=" 
    width: 100%;
    font-weight: {depthAdjustedFontWeight};
  "

  on:mouseenter={() => isMouseHoveringOnTaskName = true}
  on:mouseleave={() => isMouseHoveringOnTaskName = false}
>
  <slot name="dropzone-above-task-name">

  </slot>
  <div 
    draggable="true"
    on:dragstart|self={(e) => dragstart_handler(e, taskObj.id)}
    style="
    display: flex; 
    align-items: center; 
    opacity: {taskObj.isDone ? '0.6' : '1'};
  ">
    <!--  no more fixed width: width: calc(100% - 30px); 
        min-width and height to make it easy to delete legacy tasks with no titles
    -->
    <div 
      on:click={() => dispatch('task-click', { task: taskObj })}
      style="
        min-width: 30px; 
        max-width: 320px;
        font-size: {depthAdjustedFontSize}em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: {taskObj.startDate && taskObj.startTime ? 'rgb(160, 160, 160)' : 'black'};
        display: flex;
        align-items: center;
      "
    >   
      {#if willShowCheckbox}
        <div style="margin-left: 2px;">
          <ReusableCheckbox 
            value={taskObj.isDone}
            on:change={(e) => handleCheckboxChange(e)}
          />
        </div>
      {/if}
      <div class="truncate-to-one-line" class:cross-out-todo={taskObj.isDone} style="margin-top: -1px; margin-left: 4px;">
        {taskObj.name}
      </div>
    </div>
    {#if isMouseHoveringOnTaskName}
      <span 
        style="
          font-size: 1.2rem;
          margin-left: 4px;
          cursor: pointer;
        "
        class="material-icons" 
        on:click={() => isTypingNewSubtask = true}
      >
        add
      </span>
    {/if}
  </div>

  <!-- the 6px compensates for the fact there is only 1 dropzone for the first child but 2 dropzones (reorder + sub-reorder) for the 2nd child onwards -->
  <div style="margin-left: 32px; padding-top: 6px;">
    {#each taskObj.children as subtaskObj, i}
      <RecursiveTaskElement 
        taskObj={subtaskObj}
        depth={depth+1}
        {doNotShowScheduledTasks}
        {doNotShowCompletedTasks}
        {willShowCheckbox}
        parentID={taskObj.id}
        {dueInHowManyDays}
        ancestorRoomIDs={[taskObj.id, ...ancestorRoomIDs]}
        on:task-click
        on:subtask-create
        on:task-checkbox-change
      > 
        <div slot="dropzone-above-task-name"> 
          {#if taskObj.children.length > 0}
            <ReusableHelperDropzone
              ancestorRoomIDs={[taskObj.id, ...ancestorRoomIDs]}
              roomsInThisLevel={taskObj.children}
              idxInThisLevel={i}
              parentID={taskObj.id}
              {colorForDebugging}
            /> 
          {/if}
        </div>
      </RecursiveTaskElement>
    {/each}
    
    <ReusableHelperDropzone
      ancestorRoomIDs={[taskObj.id, ...ancestorRoomIDs]}
      roomsInThisLevel={taskObj.children}
      idxInThisLevel={taskObj.children.length}
      parentID={taskObj.id}
      {colorForDebugging}
    /> 
    
    <!-- 
      If this task level has a deadline, new sub-tasks should also be 
      initialized with the same deadline
    -->
    {#if isTypingNewSubtask}
      <input 
        bind:this={NewSubtaskInput}
        placeholder="Type sub-task" 
        bind:value={newSubtaskStringValue}
        on:keypress={(e) => handleKeypress(e)} 
        style="width: 100%; margin-left: 5px; z-index: 1"
      />
    {/if}
  </div>
</div>

<script>
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import ReusableCheckbox from '$lib/ReusableCheckbox.svelte'
  import ReusableHelperDropzone from '$lib/ReusableHelperDropzone.svelte'
  import { getDateInDDMMYYYY, convertDDMMYYYYToDateClassObject, computeDayDifference, getRandomID, getRandomColor } from '/src/helpers'
  import { createEventDispatcher, tick } from 'svelte'
  import { mostRecentlyCompletedTaskID, whatIsBeingDragged, whatIsBeingDraggedID } from '/src/store.js'

  export let taskObj
  export let depth 
  export let doNotShowScheduledTasks = false
  export let doNotShowCompletedTasks = false
  export let willShowCheckbox = true
  // ancestorRoomIDs prevent a parent from becoming its own parent,
  // creating an infinite cycle that will not get rendered by Svelte
  export let ancestorRoomIDs
  export let colorForDebugging = getRandomColor()
  export let dueInHowManyDays = null
  export let parentID = ''

  let NewSubtaskInput
  let newSubtaskStringValue = ''
  let isTypingNewSubtask = false
  let isMouseHoveringOnTaskName = false
  let isTaskDueSoonOrOverdue = false

  let depthAdjustedFontSize 

  const dispatch = createEventDispatcher()

  $: if (depth >= 0) {
    switch (depth) {
      case 0:
        depthAdjustedFontSize = 0.5
        break
      default: 
        depthAdjustedFontSize = 0.4
    }
  }
  
  // depthAdjustedFontSize = 1 * (0.6 ** (depth)
  $: depthAdjustedFontWeight = 400 - (depth * 0) + (200 * Math.max(1 - depth, 0))

  $: {
    if (isTypingNewSubtask) {
      tick().then(() => {
        if (NewSubtaskInput) {// quick-fix {
          NewSubtaskInput.focus()
        }
      })
    }
  }

  // calculate if a task is 1 day before the deadline / overdue
  $: if (taskObj.deadlineDate && taskObj.deadlineTime) {
    const d1 = new Date()
    const d2 = convertDDMMYYYYToDateClassObject(taskObj.deadlineDate, taskObj.deadlineTime)

    const dayDiff = computeDayDifference(d1, d2)
    if (dayDiff <= 1) {
      isTaskDueSoonOrOverdue = true
    }
  }

  // the other place to pay attention to is <DetailedCardPopup/>
  // but the idea is still the same, provide an "undo"
  // for root level tasks because they disappear on completion
  function handleCheckboxChange (e) {
    if (depth === 0) {
      mostRecentlyCompletedTaskID.set(taskObj.id)
    }
    dispatch('task-checkbox-change', {
      id: taskObj.id,
      isDone: e.target.checked
    })
  }

  function dragstart_handler(e, id) {
    e.dataTransfer.setData("text/plain", id);

    if (depth === 0) whatIsBeingDragged.set("top-level-task-within-this-todo-list")
    else whatIsBeingDragged.set("room")
  
    whatIsBeingDraggedID.set(id)
  }

  function handleKeypress (e) {
    if (e.key === 'Enter') {
      if (newSubtaskStringValue === '') {
        isTypingNewSubtask = false
      }
      else {
        createSubtask(newSubtaskStringValue)
        newSubtaskStringValue = ''
      } 
    } 
  }

  function createSubtask (name) {
    const newTaskID = getRandomID()
    const subtaskObj = {
      id: newTaskID,
      parentID: taskObj.id, 
      name,
      duration: 1
    }
    
    if (dueInHowManyDays !== null) {
      const d = new Date()
      for (let i = 0; i < dueInHowManyDays; i++) {
        d.setDate(d.getDate() + 1)
      }       
      subtaskObj.deadlineDate = getDateInDDMMYYYY(d)
      subtaskObj.deadlineTime = '07:00'
    }

    dispatch('subtask-create', {
      id: newTaskID,
      parentID: taskObj.id,
      newTaskObj: subtaskObj
    })
  }
</script>

<style>
  .cross-out-todo {
    text-decoration: line-through;
  }

  .hide-subtree {
    display: none;
  }
</style>