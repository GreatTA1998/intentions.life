<div style="position: relative; height: 100vh; border: none; solid black; width: 12vw"
  on:drop={(e) => drop_handler(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <div style="font-family: Roboto, sans-serif; font-weight:bold; color: #323232; font-size: 1.2rem; margin-top: 10px;">
    Today's tasks
  </div>

  <div>
    {#each todayUnscheduledTasks as task, i}
      <TaskElement
        {task}
        disableAbsolutePosition={true}
        offsetFromTop={95 + 30 * i}
        height={task.duration * pixelsPerMinute || 30}
        fontSize={0.8}
        offsetFromLeft={2}
        on:task-click
        on:task-duration-adjusted
      />
      <br>
    {/each}
  </div>
</div>

<script>
  import { getDateOfToday } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'
  import TaskElement from '/src/TaskElement.svelte'

  export let allTasks

  const dispatch = createEventDispatcher()
  const pixelsPerHour = 160
  const pixelsPerMinute = pixelsPerHour / 60
  let todayUnscheduledTasks = [] 

  $: if (allTasks) {
    todayUnscheduledTasks = []
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.startDate === getDateOfToday() && !task.startTime, 
      applyFunc: (task) => todayUnscheduledTasks  = [...todayUnscheduledTasks, task]
    })
  }

  function traverseAndUpdateTree ({ fulfilsCriteria, applyFunc }) {
    const artificialRootNode = {
      name: 'root',
      children: allTasks
    }
    helperFunction({ node: artificialRootNode, fulfilsCriteria, applyFunc })
  }

  // useful helper function for task update operations
  function helperFunction ({ node, fulfilsCriteria, applyFunc }) {
    if (fulfilsCriteria(node)) {
      applyFunc(node)
    } 
    for (const child of node.children) {
      helperFunction({ node: child, fulfilsCriteria, applyFunc })
    }
  }

  function drop_handler (e) {
    console.log('drop_handler()')
    e.preventDefault()

    // purposely don't have a scheduled time, because it's an unscheduled task!
    const scheduledTime = '' // e.target.innerText
    dispatch('task-scheduled', {
      id: e.dataTransfer.getData('text/plain'),
      timeOfDay: scheduledTime,
      dateScheduled: getDateOfToday()
    })
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
</script>