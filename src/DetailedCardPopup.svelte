
  <div id="detailed-card" bind:this={elem} use:clickOutside on:click_outside={handleClickOutside}>
    <div style="display: flex">
      <input 
        type="text" 
        class="google-calendar-event-title" 
        bind:value={titleOfTask} 
        on:input={handleInput2}
        placeholder="Untitled"
        style="width: 97%; margin-left: 10px; margin-right: 10px; box-sizing: border-box;"
      >
        
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 5px; color: black;">
        close
      </span>
    </div>

    <div class="google-calendar-event-time" style="margin-top: 4px; margin-left: 10px;">
      {#if !taskObject.isDone && taskObject.startTime && taskObject.startDate}
        Scheduled for {taskObject.startDate + ' ' + taskObject.startTime}
      {/if}
    </div>

    <div class="google-calendar-event-detail" style="margin-top: 12px; margin-left: 16px;">
      {#if taskObject.daysBeforeRepeating}
        { taskObject.repeatType || ''}  repeats every {taskObject.daysBeforeRepeating} days, 
        completed {taskObject.completionCount || 0} times, 
        missed { taskObject.missedCount || 0} times
      {/if}
    </div>

    {#if taskObject.deadlineDate}
      <div style="margin-left: 16px">
        deadline: {taskObject.deadlineDate} {taskObject.deadlineTime}
      </div>
    {/if}

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

    <div style="display: flex;  margin-left: 10px">
      <div>
        {#if !isSchedulingTask}
          <a on:click={() => isSchedulingTask = true}>
            Schedule
          </a>
        {:else}
          <ReusableDatePicker/>

          <input bind:value={newStartDate} placeholder={getDateOfToday()} style="width: 40px"/>
          <input bind:value={newStartTime} placeholder="13:00" style="width: 40px" on:keypress={detectEnterKey5}/>
        {/if}
        <!-- Repeating tasks -->
        {#if !isTypingRepeatFrequency}
          <a on:click={() => isTypingRepeatFrequency = true} style="margin-left: 0px;">
            Repeat
          </a>
        {:else}
          <div style="display: flex">
            Repeat every 
            <input 
              bind:value={daysBeforeRepeating} 
              style="width: 20px;" 
              placeholder="0" 
              on:keypress={detectEnterKey4}
            > 
            days 
          </div>

          <a on:click={setTaskAsHabit}>
            Habit
          </a>

          <a on:click={setTaskAsEvent}>
            Event
          </a>
        {/if}

        <a on:click={toggleIsGoal} style="margin-left: 0px;">
           Goal
        </a>

        {#if !isTypingDeadline}
          <a on:click={() => isTypingDeadline = true}>
            Deadline
          </a>
        {:else}
          <input bind:value={newDeadlineDate} placeholder={getDateInDDMMYYYY(new Date())} style="width: 80px"/>
          <input bind:value={newDeadlineTime} placeholder="15:00" style="width: 40px" on:keypress={dispatchNewDeadline}/>
        {/if}
      </div>

      <div style="margin-left: auto; margin-right: 35px">
        <!-- class="material-icons" style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;" -->
        <a on:click={confirmDelete}>
          Delete
        </a>

        <!-- I don't care this looks bad -->
        <a on:click={() => dispatch('task-done')}>
          Completed
        </a>
      </div>
    </div>

    <!-- This is the section where you show everything regardless of whether it is scheduled or not -->
    <div style="font-size: 1.2rem; margin-top: 24px; margin-bottom: 12px; margin-left: 12px; font-weight: 600; font-family: roboto, sans-serif;">
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
import RecursiveBulletPoint from './lib/RecursiveBulletPoint.svelte';
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY } from './helpers.js'
import ReusableDatePicker from '$lib/ReusableDatePicker.svelte';

export let taskObject 

let depth = 1

let newStartDate 
let newStartTime

let newDeadlineDate
let newDeadlineTime

let isSchedulingTask = false
let isTypingRepeatFrequency = false
let isTypingDeadline = false
let daysBeforeRepeating = 7

const dispatch = createEventDispatcher()

let notesAboutTask = taskObject.notes || ''
let titleOfTask = taskObject.name || ''
let elem

onDestroy(() => {
  document.removeEventListener('click', (e) => onClickOutsideOrInside(e))
})

const throttledSaveTitle = _.throttle(saveTitle, 500)
const throttledSaveNotes = _.throttle(saveNotes, 500)

function confirmDelete () {
  if (confirm('Are you sure you want to delete the task? This is irreversible.')) {
    dispatch('task-delete')
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
  #detailed-card {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    overflow-y: scroll;
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