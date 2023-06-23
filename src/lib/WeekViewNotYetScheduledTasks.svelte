<div style="position: relative; height: 100vh; border: none; solid black; width: 12vw"
  on:drop={(e) => drop_handler(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
    This week's tasks
  </div>

  {#each tasksDueThisWeek as task, i}
    <TaskElement
      {task}
      disableAbsolutePosition={true}
      offsetFromTop={95 + 30 * i}
      height={(task.duration / (60 * 24)) * pixelsPerDay}
      fontSize={0.8}
      offsetFromLeft={2}
      on:task-click
      on:task-duration-adjusted
    />
    <br>
  {/each}
</div>

<script>
  import { computeDayDifference, convertDDMMYYYYToDateClassObject } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'
  import TaskElement from '/src/TaskElement.svelte'

  export let allTasks
  export let pixelsPerDay

  let tasksDueThisWeek = [] 

  $: if (allTasks) {
    tasksDueThisWeek = [] 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        if (!task.deadlineDate) return

        const diff = computeDayDifference(
          convertDDMMYYYYToDateClassObject(task.deadlineDate), 
          new Date()
        )
        return diff <= 7 && !task.startTime && !task.isDone
      },
      applyFunc: (task) => tasksDueThisWeek = [...tasksDueThisWeek, task]
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

  function drop_handler () {}

  function dragover_handler () {}
</script>