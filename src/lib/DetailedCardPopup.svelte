
  <div id="detailed-card" bind:this={elem} use:clickOutside on:click_outside={handleClickOutside}>
    <div style="display: flex; align-items: center;">
      <input 
        type="text" 
        class="google-calendar-event-title" 
        bind:value={titleOfTask} 
        on:input={handleInput2}
        placeholder="Untitled"
        style="width: 97%; margin-left: 10px; margin-right: 10px; box-sizing: border-box;"
      >

      <a style="height: 20px;" on:click={confirmDelete}>
        Delete
      </a>
      <!-- TO-DO: completed is not working -->
      <a style="height: 20px;" on:click={() => dispatch('task-done')}>
        Completed
      </a>
    </div>

    <!-- In future, display in readable month / day form -->
    <div
      class:half-invisible={!isScheduled(taskObject)}
      style="margin-left: 10px; margin-top: 5px; font-size: 1.2em; display: flex; align-items: center;"
    >
      Scheduled for: 

      <!-- startDate -->
      {#if !isEditingStartDate}
        <div on:click={() => isEditingStartDate = true}
          class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;"
        >
          {taskObject.startDate || 'mm/dd' }
        </div>
      {:else}
        <input bind:value={newStartDate} 
          style="margin-left: 8px; width: 44px;" 
          class="google-calendar-event-time" 
          placeholder="mm/dd"
        >
      {/if}

      <!-- startTime -->
      {#if !isEditingStartTime}
        <div on:click={() => isEditingStartTime = true}
          class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;"
        >
          {taskObject.startTime || 'hh:mm'}
        </div>
      {:else}
        <input bind:value={newStartTime} 
          on:keypress={detectEnterKey5}
          style="margin-left: 8px; width: 44px;" class="google-calendar-event-time" placeholder="hh:mm" 
        >
      {/if}

      <div style="margin-left: 8px;">
        for
      </div>

      {#if !isEditingDuration}
        <div on:click={() => isEditingDuration = true}
          style="margin-left: 8px; background-color: grey; padding: 4px; color: white;" class="google-calendar-event-time"
        >
          {Math.round(taskObject.duration) || 'n'} minutes
        </div>
      {:else}
        <input style="margin-left: 8px; width: 18px;" class="google-calendar-event-time" placeholder="n">
        <div class="google-calendar-event-time" style="margin-left: 4px;">
          minutes
        </div>
      {/if}
    </div>

    <div class:half-invisible={!hasDeadline(taskObject)} 
      style="margin-left: 10px; margin-top: 5px; font-size: 1.2em; display: flex; align-items: center;"
    >
      Deadline: 
      {#if !isEditingDeadlineDate}
        <div on:click={() => isEditingDeadlineDate = true} class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;">
          {taskObject.deadlineDate || 'dd/mm/yyyy'}
        </div>
      {:else}
        <input bind:value={newDeadlineDate} placeholder={'dd/mm/yyyy'} style="width: 77px; margin-left: 8px;" class="google-calendar-event-time">
      {/if}
      <!-- getDateInDDMMYYYY(new Date()) -->

      {#if !isEditingDeadlineTime}
        <div on:click={() => isEditingDeadlineTime = true} 
          class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;">
          {taskObject.deadlineTime || 'hh:mm'}
        </div>
      {:else}

        <input placeholder="hh:mm" bind:value={newDeadlineTime} class="google-calendar-event-time" style="margin-left: 8px; width: 40px" on:keypress={dispatchNewDeadline}>
      {/if}
    </div>

    <div style="margin-left: 12px; margin-top: 0px;">
      <DetailedCardPopupRepeat 
        {taskObject}
        on:repeating-tasks-generate
      />
    </div>

    <!-- <div class="google-calendar-event-detail" style="margin-top: 12px; margin-left: 16px;">
      {#if taskObject.daysBeforeRepeating}
        { taskObject.repeatType || ''}  repeats every {taskObject.daysBeforeRepeating} days, 
        completed {taskObject.completionCount || 0} times, 
        missed { taskObject.missedCount || 0} times
      {/if}
    </div> -->

    <div style="margin-top: 20px;">

    </div>

    <div stle="float: left; width: 80%">
      <!-- cols="48" determines width -->
      <textarea 
        bind:value={notesAboutTask}
        on:input={handleInput}
        rows="5"
        placeholder="Type in details..."
        style="margin-left: 12px; width: 95%; margin-right: 10px; margin-bottom: 20px; box-sizing: border-box;"
      />
    </div>

    <!-- This is the section where you show everything regardless of whether it is scheduled or not -->
    <div style="font-size: 1.2rem; margin-top: 0px; margin-bottom: 12px; margin-left: 12px; font-weight: 600; font-family: roboto, sans-serif;">
      Full task history:
    </div>

    {#each taskObject.children as child}
      <div style="margin-left: 12px;">
      <RecursiveBulletPoint 
        taskObject={child}
        on:task-click
      >
      
      </RecursiveBulletPoint>
      </div>
    {/each}
  </div>

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import RecursiveBulletPoint from '$lib/RecursiveBulletPoint.svelte'
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY } from '/src/helpers.js'
import ReusableDatePicker from '$lib/ReusableDatePicker.svelte'
import DetailedCardPopupRepeat from '$lib/DetailedCardPopupRepeat.svelte'

export let taskObject 

let depth = 1

let newStartDate 
let newStartTime

let newDeadlineDate
let newDeadlineTime

let isEditingStartTime = false
let isEditingStartDate = false
let isEditingDuration = false

let isEditingDeadlineDate = false
let isEditingDeadlineTime = false

let isTypingRepeatFrequency = false
let daysBeforeRepeating = 7

const dispatch = createEventDispatcher()

let notesAboutTask = taskObject.notes || ''
let titleOfTask = taskObject.name || ''
let elem

function isScheduled (taskObj) {
  return taskObj.startDate && taskObj.startTime && taskObj.startYYYY
}

function hasDeadline (taskObj) {
  return taskObj.deadlineDate && taskObject.deadlineTime
}

onMount(() => {
  // console.log('taskObject =', taskObject)
})

onDestroy(() => {
  
})

const throttledSaveTitle = _.throttle(saveTitle, 500)
const throttledSaveNotes = _.throttle(saveNotes, 500)

function confirmDelete () {
  if (confirm('Are you sure you want to delete the task? This is irreversible.')) {
    dispatch('task-delete')
    dispatch('card-close')
  } 
}

function handleClickOutside (e) {
  dispatch('card-close')
}

function handleInput (e) {
  notesAboutTask = e.target.value
  throttledSaveNotes()
}

const handleInput2 = function (e) {
  titleOfTask = e.target.value
  throttledSaveTitle()
}


function saveNotes () {
  taskObject.notes = notesAboutTask
  dispatch('task-notes-update', { id: taskObject.id, newNotes: notesAboutTask })
}

function saveTitle () {
  dispatch('task-title-update', { id: taskObject.id, newName: titleOfTask })
}

function detectEnterKey4 (e) {
  if (e.charCode === 13) {
    if (!daysBeforeRepeating) {
      alert('Task is reset and will no longer repeat')
      taskObject.daysBeforeRepeating = 0
      taskObject.repeatType = ''
    } 
    else {
      taskObject.daysBeforeRepeating = daysBeforeRepeating
      if (!taskObject.repeatType) {
        taskObject.repeatType = 'habit'
      }
    }
    dispatch('task-repeat')
    daysBeforeRepeating = 0
    isTypingRepeatFrequency = false
  }
}

function detectEnterKey5 (e) {
  if (e.charCode === 13) {
    if (!newStartDate && !newStartTime) {
      taskObject.startDate = '' 
      taskObject.startTime = ''
    }
    else if (!newStartDate || !newStartTime) {
      alert('Need BOTH date and time')
    } 
    else {
      taskObject.startDate = newStartDate
      taskObject.startTime = newStartTime
      const yearNumber = new Date().getFullYear()
      taskObject.startYYYY = yearNumber.toString()
    }
    dispatch('task-schedule', { id: taskObject.id, newStartDate, newStartTime })
    newStartDate = ''
    newStartTime = ''
  }
}

function dispatchNewDeadline (e) {
  if (e.charCode === 13) {
    if (!newDeadlineDate && !newDeadlineTime) {
      taskObject.deadlineDate = '' 
      taskObject.deadlineTime = ''
    }
    else if (!newDeadlineDate || !newDeadlineTime) {
      alert('Need BOTH date and time')
    } 
    else {
      taskObject.deadlineDate = newDeadlineDate
      taskObject.deadlineTime = newDeadlineTime

      // I'll leave these lines in case they're useful 
      const yearNumber = new Date().getFullYear()
      taskObject.startYYYY = yearNumber.toString()
    }

    // `task-dragged` is an unideal name, but good for `unscheduledTasksForToday`
    dispatch('task-dragged', {
      id: taskObject.id,
      timeOfDay: '',
      dateScheduled: getDateOfToday(),
      deadlineTime: newDeadlineTime, // 
      deadlineDate: newDeadlineDate
    })

    newDeadlineDate = ''
    newDeadlineTime = ''
  }
}

function toggleIsGoal () {
  taskObject.isGoal = !taskObject.isGoal // !undefined or !null evaluates to true
  dispatch('task-repeat')
}

function setTaskAsEvent () {
  taskObject.repeatType = 'event'
  // they all just update the Firestore anyway there is no difference
  dispatch('task-repeat')
} 

function setTaskAsHabit () {
  taskObject.repeatType = 'habit'
  dispatch('task-repeat')
}
</script>

<style>
  .half-invisible {
    opacity: 0.5;
  }

  #detailed-card {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    overflow-y: auto;
    z-index: 5;
    min-width: 300px;
    height: 70%;
    border-radius: 10px;
    background-color: white;
 
  /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    padding: 6px;
  }

  /* Refer to: https://stackoverflow.com/questions/3131072/how-to-change-input-text-box-style-to-line */
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    padding: 10px 0px;
  }

  .google-calendar-event-detail {
    font-family: Roboto,Arial,sans-serif;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #3c4043;
  }

  .google-calendar-event-time {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #3c4043;
  }

  .google-calendar-event-title {
    font-family: Roboto,Arial,sans-serif;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #3c4043;
  }

  .selected {
    background-color: indianred;
  }


.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

a {
  font-family: Roboto,Arial,sans-serif;
  flex: 1;
  background-color: #F4F4F4;
  color: #4E4E4E;
  padding-top: 8px; 
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-out;
   border: 1px solid #F4F4F4;
  font-family: sans-serif;
  font-size: 1rem;
  height: 5px;
}

a:hover,
a:focus {
  border: 1px solid orange;
  background-color: orange;
  color: #fff;
}
</style>