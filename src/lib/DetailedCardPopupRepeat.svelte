<div style="display: flex; align-items: center;">
  <div style="font-size: 1.2em; margin-top: 8px;" class:half-transparent={!taskObject.willRepeatOnWeekDayNumber}>
    Repeats every 1 week:
  </div>

  <!-- Don't allow non-scheduled / non-deadline tasks to repeat -->
  {#if (isScheduled(taskObject) || hasDeadline(taskObject))}
 
  {/if}

  <!-- doesn't repeat, setting it to repeat -->
  <div 
    class:half-transparent={!taskObject.willRepeatOnWeekDayNumber && !isChoosingRepeatDays}
    style="display: flex; margin-top: 9px; padding-left: 12px;" on:click={() => {
      if (isScheduled(taskObject) || hasDeadline(taskObject)) {
        isChoosingRepeatDays = true
      } else {
        alert("Cannot repeat a task unless it's already scheduled or has a deadline")
      }
    }}
  >
    {#each {length: 7} as _, i}
      <div 
        on:click={() => willRepeatOnWeekDayNumber[i] = !willRepeatOnWeekDayNumber[i]} 
        class="circle"
        class:highlighted={willRepeatOnWeekDayNumber[i]}
      >
        {dayOfWeekSymbol[i]}
      </div>
    {/each}

    {#if isChoosingRepeatDays}
      <button on:click={generateRepeatedTasks}>
        Apply changes
      </button>
    {/if}
  </div>
</div>

<script>
  import { twoDigits, getRandomID } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'

  export let taskObject

  const dispatch = createEventDispatcher()

  let willRepeatOnWeekDayNumber = taskObject.willRepeatOnWeekDayNumber || [false, false, false, false, false, false, false]
  
  let dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  let isChoosingRepeatDays = false
  let allGeneratedTasksToUpload = []

  function isScheduled (taskObj) {
    return taskObj.startTime && taskObj.startDate && taskObj.startYYYY
  }

  function hasDeadline (taskObj) {
    return taskObj.deadlineDate && taskObj.deadlineTime
  }

  function generateRepeatedTasks () {
    const repeatGroupID = taskObject.id // the first instance of the repeated task will represent the repeatGroupID
    const d = new Date()
    for (let i = 0; i < 7; i++) { // as it's a new feature, try only 7 days foresight window instead of 30 days
      d.setDate(d.getDate() + 1)

      // % gives the remainder, not the modulus, see https://stackoverflow.com/a/17323608/7812829
      function mod (n, m) {
        return ((n % m) + m) % m;
      }
             
      const weekDayNumber = mod(d.getDay() - 1, 7) // for getDay(), Sunday = 0, Monday = 1
      if (willRepeatOnWeekDayNumber[weekDayNumber]) {
        const generatedTask = createRepeatedTask({ dateClassObj: new Date(d.getTime()), repeatGroupID })
        allGeneratedTasksToUpload.push(generatedTask)
      }
    }

    dispatch('repeating-tasks-generate', { allGeneratedTasksToUpload })
    isChoosingRepeatDays = false 
  }

  function createRepeatedTask ({ dateClassObj, repeatGroupID }) {
    const taskObjCopy = {...taskObject}
    taskObjCopy.id = getRandomID()
    taskObjCopy.willRepeatOnWeekDayNumber = [...willRepeatOnWeekDayNumber]
    taskObjCopy.repeatGroupID = repeatGroupID // way to label separate tasks as essentially clones of an original repeating task

    const yyyy = `${dateClassObj.getFullYear()}`
    const mm = twoDigits(dateClassObj.getMonth() + 1) // month is 0-indexed
    const dd = twoDigits(dateClassObj.getDate())

    // CASE 1: DEADLINE
    // deadline takes priority: a deadlined task that repeats but is scheduled, will STILL be treated like a deadline
    if (taskObjCopy.deadlineDate && taskObjCopy.deadlineTime) {
      // set new `deadlineDate` to the dd/mm/yyyy format of `dateClassObj` (but keep the deadline time the same)
      taskObjCopy.deadlineDate = `${dd}/${mm}/${yyyy}`
    }
    // CASE 2: SCHEDULED 
    if (taskObjCopy.startYYYY && taskObjCopy.startDate && taskObjCopy.startTime) {
      taskObjCopy.startYYYY = yyyy
      taskObjCopy.startDate = `${mm}/${dd}` 
    }
    return taskObjCopy
  }
</script>

<style>
  .half-transparent {
    opacity: 0.5; 
  }

  .circle {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background: #000;

    /* extra */
    margin-right: 8px;
  }

  .circle:hover {
    cursor: pointer;
  }

  .highlighted {
    background: orange;
  }

</style>