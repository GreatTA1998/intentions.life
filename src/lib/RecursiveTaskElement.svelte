<!-- TO-DO:
  Previously, we deprecated the duration lines for unscheduled tasks, because it violates the principle of 
  "do not distort or misrepresent data"

  However, we will now keep duration visualization units consistent, pixelsPerHour will be the same for all elements on the screen. 
  But the duration visualization is a big part, so I'm guessing, YES. Assume all clients who use <RecursiveTaskElement/> will have a scale.RecursiveTaskElement.RecursiveTaskElement
  We can iterate if we change our minds. 

  This task will include checkboxes 

  Hierarchy based on tags, rather than a tree with high `h`

  Directly add tasks to the calendar, the `allTasks` array should have length 1000 instead of 3 over the years.
-->
{#if 
  !(doNotShowScheduledTasks && (taskObj.startDate && taskObj.startTime)) &&
  !(doNotShowCompletedTasks && taskObj.isDone)
}
  <div 
    style="
      font-family: sans-serif; 
      font-size: {depthAdjustedFontSize}em;
    "
    draggable="true"
    on:dragstart|self={(e) => dragstart_handler(e, taskObj.id)}

    on:mouseenter={() => isMouseHoveringOnTaskName = true}
    on:mouseleave={() => isMouseHoveringOnTaskName = false}
  >
    <div style="display: flex; align-items: center; min-height: 24px;">
      <div on:click={() => dispatch('task-click', { task: taskObj })}>
        {taskObj.name}
      </div>
      {#if isMouseHoveringOnTaskName}
        <span 
          style="
            font-size: 1.2rem;
            margin-left: 4px;
          "
          class="material-icons" 
          on:click={() => isTypingNewSubtask = true}>
          add
        </span>
      {/if}
    </div>

    <div style="margin-left: 20px;">
      {#each taskObj.children as subtaskObj, i}
        <RecursiveTaskElement 
          taskObj={subtaskObj}
          depth={depth+1}
          doNotShowScheduledTasks
          on:task-click
          on:task-node-update
        />
      {/each}

      <!-- on:task-create={(e) => handleGrandchildUpdate(e, i)} -->

      <!-- If this task level has a deadline, creating new sub-tasks will also be 
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
{/if}

<script>
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'
  import { getDateInDDMMYYYY, getRandomID } from '/src/helpers'
  import { createEventDispatcher, tick } from 'svelte'

  export let taskObj
  export let depth
  export let doNotShowScheduledTasks = false
  export let doNotShowCompletedTasks = false

  let NewSubtaskInput
  let newSubtaskStringValue = ''
  let isTypingNewSubtask = false
  let isMouseHoveringOnTaskName = false

  $: depthAdjustedFontSize = 1.6 * (0.8 ** (depth + 1))

  const dispatch = createEventDispatcher()

  $: {
    if (isTypingNewSubtask) {
      tick().then(() => {
        if (NewSubtaskInput) {// quick-fix {
          NewSubtaskInput.focus()
        }
      })
    }
  }

  function dragstart_handler(e, id) {
    e.dataTransfer.setData("text/plain", id);
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
    const d = new Date()
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1)
    }
    const newSubtaskObj = {
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '07:00',
      id: getRandomID(),
      name,
      children: []
    }

    const copyOfTaskObj = {...taskObj}
    copyOfTaskObj.children = [...taskObj.children, newSubtaskObj]
    dispatch('task-node-update', {
      id: taskObj.id,
      newDeepValue: copyOfTaskObj
    })
    console.log('dispatched task-node-update =', taskObj.id)
  }

  function handleGrandchildUpdate (e, i) {
    // to avoid confusion, don't mutate taskObject in this component,
    // only let the parent mutate it (even if the side-effects happen to cancel each other out)
    // therefore construct a new payload 
    const childCopy = { ...taskObj.children[i] }
    childCopy.children = e.detail.updatedChildren

    const childrenCopy = [...taskObj.children]
    childrenCopy[i] = childCopy

    dispatch('task-create', {
      updatedChildren: childrenCopy
    })
  }
</script>