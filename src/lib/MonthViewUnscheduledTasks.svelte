<div style="position: relative; height: 100vh; border: none; solid black; width: 12vw"
  on:drop={(e) => drop_handler(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <div style="font-family: Inter;font-size: 16px; margin-bottom: 12px;">
    This month's tasks
  </div>

  {#each tasksDueThisWeek as task, i}
    <ReusableTaskElement
      {task}
      pixelsPerHour={pixelsPerDay / 24 }
      fontSize={0.8}
      on:task-click
      on:task-duration-adjusted
    />
    <br>
  {/each}
</div>

<script>
  import { computeDayDifference, convertDDMMYYYYToDateClassObject, getDateInDDMMYYYY } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'
  import ReusableTaskElement from './ReusableTaskElement.svelte'

  export let allTasks
  export let pixelsPerDay

  const dispatch = createEventDispatcher()
  let tasksDueThisWeek = [] 

  $: if (allTasks) {
    tasksDueThisWeek = [] 
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        if (!task.deadlineDate) return

        // I thought it's d2 - d1, so the task.deadlineDate is 1 week out or 1 month out,
        // but it's within 7 from today
        const diff = computeDayDifference(
          new Date(),
          convertDDMMYYYYToDateClassObject(task.deadlineDate)
        )
        return diff <= 30 && !task.startTime && !task.isDone
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

  function drop_handler (e) {
    e.preventDefault()

    // https://stackoverflow.com/a/1025712/7812829
    const d = new Date()  
    const endOfWeek = new Date(d.getTime() + 6 * 24 * 60 * 60 * 1000)
    const ddmmyyyy = getDateInDDMMYYYY(endOfWeek)

    dispatch('task-dragged', {
      id: e.dataTransfer.getData('text/plain'),
      timeOfDay: '', // reset `startTime` if dragged from calendar
      deadlineTime: '23:59', // 
      deadlineDate: ddmmyyyy
    })
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
</script>