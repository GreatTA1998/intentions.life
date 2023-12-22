
  <div class="detailed-card-popup" bind:this={elem} use:clickOutside on:click_outside={handleClickOutside}>
    <div style="display: flex; align-items: center;">
      <input 
        type="text" 
        class="google-calendar-event-title" 
        bind:value={titleOfTask} 
        on:input={handleInput2}
        placeholder="Untitled"
        style="width: 100%; box-sizing: border-box;"
      >
    </div>

    <!-- In future, display in readable month / day form -->
    <div
      class:half-invisible={!isScheduled(taskObject)}
      style="margin-top: 12px; font-size: 1.2em; display: flex; align-items: center;"
    >
      <div style="width: 134px;">
        <UXFormField
          fieldLabel="Start"
          value={taskObject.startDate + ' ' + taskObject.startTime}
          placeholder="MM/DD hh:mm"
        />
      </div>

      <div style="margin-left: 6px; margin-right: 6px;">
        
      </div>

      <div style="width: 134px;">
        <UXFormField
          fieldLabel="End"
          value={taskObject.startDate + ' ' + taskObject.startTime}
        />
      </div>

      <!-- startDate -->
      <!-- {#if !isEditingStartDate}
        <div on:click={() => isEditingStartDate = true}
          class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;"
        >
          {taskObject.startDate || 'mm/dd' }
        </div>
      {:else}
        <input bind:value={newStartDate} 
          style="margin-left: 8px; width: 44px;" 
          class="google-calendar-event-time" 
          placeholder={getDateOfToday()}
          autofocus
        >
      {/if} -->

      <!-- startTime -->
      <!-- {#if !isEditingStartTime}
        <div on:click={() => isEditingStartTime = true}
          class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;"
        >
          {taskObject.startTime || 'hh:mm'}
        </div>
      {:else}
        <input 
          bind:value={newStartTime} 
          on:keypress={detectEnterKey5}
          style="margin-left: 8px; width: 44px;" class="google-calendar-event-time" 
          placeholder={getCurrentTimeInHHMM()} 
          autofocus
        >
      {/if} -->

      <!-- <div style="margin-left: 8px;">
        for
      </div> -->

      <!-- TO-DO: can input duration with `!isEditingDuration` -->
      <!-- {#if true}
        <div on:click={() => isEditingDuration = true}
          style="margin-left: 8px; background-color: grey; padding: 4px; color: white;" class="google-calendar-event-time"
        >
          {Math.round(taskObject.duration) || 'n'} minutes
        </div>
      {:else}
        <input style="margin-left: 8px; width: 18px;" 
          class="google-calendar-event-time" 
          placeholder="n"
          autofocus
        >
        <div class="google-calendar-event-time" style="margin-left: 4px;">
          minutes
        </div>
      {/if} -->

      {#if isEditingStartDate || isEditingStartTime}
        <div style="margin-left: 6px; opacity: 0.8">
          (press ENTER to apply changes)
        </div>
      {/if}
    </div>


    <div class:half-invisible={!hasDeadline(taskObject)} 
      style="margin-top: 12px; font-size: 1.2em; display: flex; align-items: center;"
    >
      <UXFormField
        fieldLabel="Deadline"
        value={(taskObject.deadlineDate || '') + (taskObject.deadlineTime || '')}
        placeholder="dd/mm/yyyy hh:mm"
      >
        <span slot="icon" class="material-symbols-outlined" style="margin-right: 4px; font-size: 18px;">
          alarm
        </span>
      </UXFormField>

<!-- 
      Deadline: 
      {#if !isEditingDeadlineDate}
        <div on:click={() => isEditingDeadlineDate = true} class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;">
          {taskObject.deadlineDate || 'dd/mm/yyyy'}
        </div>
      {:else}
        <input bind:value={newDeadlineDate} placeholder={getDateInDDMMYYYY(new Date())} style="width: 77px; margin-left: 8px;" class="google-calendar-event-time"
          autofocus
        >
      {/if} -->
      <!-- getDateInDDMMYYYY(new Date()) -->

      <!-- {#if !isEditingDeadlineTime}
        <div on:click={() => isEditingDeadlineTime = true} 
          class="google-calendar-event-time" style="margin-left: 8px; background-color: grey; padding: 4px; color: white;">
          {taskObject.deadlineTime || 'hh:mm'}
        </div>
      {:else}
        <input 
          placeholder={getCurrentTimeInHHMM()} 
          bind:value={newDeadlineTime} 
          class="google-calendar-event-time" 
          style="margin-left: 8px; width: 40px" 
          on:keypress={dispatchNewDeadline}
          autofocus
        >
      {/if} -->

      {#if isEditingDeadlineDate || isEditingDeadlineTime}
        <div style="margin-left: 6px; opacity: 0.8">
          (press ENTER to apply changes)
        </div>
      {/if}
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

    <div stle="width: 100%; margin-bottom: 24px;">
      <UXFormField fieldLabel="Details"/>

      <!-- cols="48" determines width -->
      <!-- <textarea 
        bind:value={notesAboutTask}
        on:input={handleInput}
        rows="5"
        placeholder="Type in details..."
        style="width: 100%; margin-bottom: 20px; box-sizing: border-box;"
      /> -->
    </div>

    <div style="margin-left: 12px; margin-top: 0px;">
      <DetailedCardPopupRepeat 
        {taskObject}
        on:repeating-tasks-generate
      />
    </div>

    <div style="margin-top: 24px; margin-bottom: 24px; margin-left: 12px;">
      <a style="height: 20px;" on:click={() => dispatch('task-done')}>
        Completed
      </a>

      <a style="height: 20px;" on:click={() => dispatch('task-reusable')}>
        Set as reusable task
      </a>

      <a style="height: 20px;" on:click={confirmDelete}>
        Delete
      </a>
    </div>

    <!-- This is the section where you show everything regardless of whether it is scheduled or not -->
    <div style="font-size: 1.2rem; margin-top: 0px; margin-bottom: 12px; margin-left: 12px; font-weight: 600; font-family: roboto, sans-serif;">
      Full task history
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
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY, getCurrentTimeInHHMM } from '/src/helpers.js'
import ReusableDatePicker from '$lib/ReusableDatePicker.svelte'
import DetailedCardPopupRepeat from '$lib/DetailedCardPopupRepeat.svelte'
import UXFormField from '$lib/UXFormField.svelte'

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
      // why do we mutate it directly,
      // but also pass these event.detail to the parent?
      taskObject.startDate = newStartDate // this will be redundantly set to `newStartDate` at the root parent as well
      taskObject.startTime = newStartTime // this will be redundantly set to `newStartTime` at the root parent as well
      const yearNumber = new Date().getFullYear() 
      // this will reach the database because it's mutated here, and allTasks will be synced to Firebase
      taskObject.startYYYY = yearNumber.toString() 
    }
    dispatch('task-schedule', { id: taskObject.id, newStartDate, newStartTime })

    // reset
    newStartDate = ''
    newStartTime = ''
    isEditingStartDate = false 
    isEditingStartTime = false
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

    // reset
    newDeadlineDate = ''
    newDeadlineTime = ''
    isEditingDeadlineDate = false
    isEditingDeadlineTime = false
  }
}
</script>

<style>
  .half-invisible {
    opacity: 0.5;
  }

  .detailed-card-popup {
    font-size: 14px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    overflow-y: auto;
    z-index: 3;
    min-width: 300px;
    height: 70%;

    padding: 24px;
    border-radius: 24px;
    background-color: white;
 
  /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }

  /* Refer to: https://stackoverflow.com/questions/3131072/how-to-change-input-text-box-style-to-line */
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    /* padding: 10px 0px; */
    padding-bottom: 10px;
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