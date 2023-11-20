<div style="position: relative; height: 100vh; border: none; solid black; width: 12vw"
  on:drop={(e) => drop_handler(e)}
  on:dragover={(e) => dragover_handler(e)}
>
  <!-- color: #6D6D6D;  -->
  <div style="font-size: 20px; margin-bottom: 40px; font-weight: 500; color: rgb(10, 10, 10)">
    { title }
  </div>

  <div style="height: 70vh">
    {#each tasksDueToday as task, i}
      <ReusableTaskElement
        {task}
        {pixelsPerHour}
        fontSize={0.8}
        on:task-click
        on:task-duration-adjusted
      />
      <br>
    {/each}
  </div>
</div>

<script>
  import { getDateOfToday, getDateInDDMMYYYY } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'
  import ReusableTaskElement from '$lib/ReusableTaskElement.svelte'

  export let allTasks
  export let title = ''

  export let taskCriteria
  export let dropzoneInfo

  export let pixelsPerHour 

  // DEFINE THE CRITERIA FOR UNSCHEDULED TASKS:
  //   IT IS DUE BY TODAY E.G. something that is due by Sunday, counts as being due this week, but does NOT count as being due today
  //   That's it? 

  // there are 2 kinds of deadlines
  //  repeating habits: because you set it as repeating, it effectively is a deadline
  //  actual deadline e.g. you have to submit the tax form to IRS by 3 pm today. This deadline is explicit
  //  have one deadline interface: a habit is a repeating deadline, where you set it to deadline = today at what time


  // DEFINE CRTIERIA FOR UPCOMING THIS WEEK
  //   This includes anything that is scheduled e.g. Korean League this week
  // 

  // WHAT IS THE TIME INTERVAL WITH WHICH YOU CARE?
  // + 7 days. You'd rather go too far than have a discontinous cut-off on Sunday and be blind on Monday

  const dispatch = createEventDispatcher()


  // TO-DO: this scale needs to be consistent with the current mode, e.g. hour, day or week view.

  let tasksDueToday = [] 


  $: if (allTasks) {
    tasksDueToday = []
    traverseAndUpdateTree({
      fulfilsCriteria: taskCriteria,
      applyFunc: (task) => tasksDueToday = [...tasksDueToday, task]
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

  // set deadline for a week from now
  function drop_handler (e) {
    e.preventDefault()

    dispatch('task-dragged', {
      id: e.dataTransfer.getData('text/plain'),
      deadlineDate: dropzoneInfo.deadlineDate,
      deadlineTime: dropzoneInfo.deadlineTime || '23:59'
    })

    // if `task.isRepeating` is true, then there will be a repeating symbol besides the task 
    // and it will be reset by the daily algorithm to have the next deadline for tomorrow
    // keeping track of statistics on habits is helpful for motivation, like keeping score for baseball
  }

  function dragover_handler (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
</script>