<div class="fullscreen-invisible-modular-popup-layer" style="z-index: 10;">
  <div class="detailed-card-popup" bind:this={elem} use:clickOutside on:click_outside={handleClickOutside}>
    <div style="display: flex; align-items: center;">
      <input
        checked={taskObject.isDone}
        on:change={(e) => {
          dispatch('task-update', {
            keyValueChanges: {
              isDone: e.target.checked,
            },
            id: taskObject.id
          })
        }} 
        type="checkbox" 
        style="zoom: 2.2; margin: 0; margin-right: 6px;"
      >

      <input 
        type="text" 
        bind:value={titleOfTask} 
        on:input={(e) => debouncedSaveTitle(e.target.value)}
        placeholder="Untitled"
        style="width: 100%; box-sizing: border-box; font-size: 24px;"
      >
    </div>

    <!-- In future, display in readable month / day form -->
    <div
      class:half-invisible={!isScheduled(taskObject)}
      style="display: flex; align-items: center; justify-content: space-between; margin-top: 24px; font-size: 1.2em; "
    >
      <div style="display: flex; align-items: center;">
        <div style="width: 134px;">
          <UXFormField
            fieldLabel="Scheduled for"
            value={taskObject.startDate + ' ' + taskObject.startTime}
            on:input={(e) => handleTaskStartInput(e)}
            placeholder="MM/DD hh:mm"
          />
        </div>

        <div style="margin-left: 24px; margin-right: 6px; width: 80px;">
          <UXFormField
            fieldLabel="Minutes"
            value={taskObject.duration}
            on:input={(e) => debouncedSaveDuration(e)}
          >

          </UXFormField>
        </div>

        <!-- <div style="width: 134px;">
          <UXFormField
            fieldLabel="End"
            value={taskObject.startDate + ' ' + taskObject.startTime}
            on:input={(e) => handleTaskEndInput(e)}
          />
        </div> -->
      </div>

      {#if isEditingTaskStart}
        <ReusableRoundButton on:click={() => saveTaskStart(newStartMMDD, newStartHHMM)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save changes</ReusableRoundButton>
      {/if}

      <!-- {#if isEditingTaskEnd}
        <ReusableRoundButton on:click={() => saveTaskEnd(newEndMMDD, newEndHHMM)}>Update task end</ReusableRoundButton>
      {/if} -->

      {#if isEditingDeadline}
        <ReusableRoundButton on:click={() => saveDeadline(newDeadlineDate, newDeadlineTime)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save changes</ReusableRoundButton>
      {/if}

      <!-- 178px is the min. width that fully contains the placeholder text -->
      <div class:half-invisible={!hasDeadline(taskObject)} 
        style="font-size: 1.2em; display: flex; align-items: center; width: 178px;"
      >
        <UXFormField
          fieldLabel="Deadline"
          value={currentDeadlineValue}
          placeholder="dd/mm/yyyy hh:mm"
          on:input={(e) => handleDeadlineInput(e)}
        >
          <span slot="icon" class="material-symbols-outlined" style="margin-right: 4px; font-size: 18px; color: {hasDeadline(taskObject) ? 'red' : ''};">
            alarm
          </span>
        </UXFormField>
      </div>
    </div>

    <div style="width: 100%; margin-top: 24px; margin-bottom: 24px;">
      <UXFormTextArea fieldLabel="Description"
        value={notesAboutTask}
        on:input={(e) => debouncedSaveNotes(e.detail)}
        placeholder=""
      />
    </div>

    <div style="margin-top: 0px; display: flex; align-items: center; justify-content: space-between;">
      <DetailedCardPopupRepeat 
        {taskObject}
        on:repeating-tasks-generate
      />

      <div style="display: flex; align-items: center;">
        <a style="height: 36px; max-width: 240px;"
          on:click={() => {dispatch('task-reusable'); alert('Success, when you click on the calendar and type a task, matching reusable tasks will appear. You can track how much time you spend on this task by visiting the time spent dashboard on the top right.')}}
        >
          Create reusable template
        </a>

        <span class="material-symbols-outlined"  on:click={confirmDelete} style="cursor: pointer; margin-left: 6px; border: 1px solid grey; border-radius: 24px; padding: 4px;">
          delete
        </span>
      </div>
    </div>

    <!-- This is the section where you show everything regardless of whether it is scheduled or not -->
    {#if taskObject.children.length > 0}
      <div style="font-size: 1rem; margin-top: 36px; margin-bottom: 12px; font-weight: 400;">
        Full task history
      </div>

      <div style="max-height: 500px; overflow-y: auto;">
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
    {/if}

    <!-- <div class="google-calendar-event-detail" style="margin-top: 12px; margin-left: 16px;">
      {#if taskObject.daysBeforeRepeating}
        { taskObject.repeatType || ''}  repeats every {taskObject.daysBeforeRepeating} days, 
        completed {taskObject.completionCount || 0} times, 
        missed { taskObject.missedCount || 0} times
      {/if}
    </div> -->
  </div>
</div>

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import RecursiveBulletPoint from '$lib/RecursiveBulletPoint.svelte'
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY, getCurrentTimeInHHMM } from '/src/helpers.js'
import DetailedCardPopupRepeat from '$lib/DetailedCardPopupRepeat.svelte'
import UXFormField from '$lib/UXFormField.svelte'
import UXFormTextArea from '$lib/UXFormTextArea.svelte'
import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
import ReusableDatePicker from '$lib/ReusableDatePicker.svelte'

export let taskObject 

let depth = 1


let newDeadlineDate
let newDeadlineTime

let isEditingTaskStart = false
let newStartMMDD
let newStartHHMM

let isEditingTaskEnd = false
let newEndMMDD
let newEndHHMM 

let isEditingStartDate = false
let isEditingDuration = false

let isEditingDeadlineDate = false
let isEditingDeadlineTime = false
let isEditingDeadline = false

let isTypingRepeatFrequency = false
let daysBeforeRepeating = 7

const initialDeadline = (taskObject.deadlineDate || '') + (taskObject.deadlineDate && taskObject.deadlineTime ? " " : "") + (taskObject.deadlineTime || '')
$: currentDeadlineValue = (taskObject.deadlineDate || '') + (taskObject.deadlineDate && taskObject.deadlineTime ? " " : "") + (taskObject.deadlineTime || '')

const dispatch = createEventDispatcher()

// don't delete yet, as these might be needed for input element bindings
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

})

onDestroy(() => {
  
})

const debouncedSaveTitle = _.debounce(saveTitle, 800)
const debouncedSaveNotes = _.debounce(saveNotes, 1500)
const debouncedSaveDuration = _.debounce(saveDuration, 1000)

function saveDuration (e) {
  const newValue = e.detail.value
  if (typeof Number(newValue) !== 'number') {
    return 
  }
  dispatch('task-update', { 
    id: taskObject.id, 
    keyValueChanges: { 
      duration: Number(newValue) 
    } 
  })
}

function saveTaskStart (MMDD, HHMM) {
  taskObject.startTime = HHMM
  taskObject.startDate = MMDD
  dispatch('task-update', { id: taskObject.id, keyValueChanges: {
    newStartDate: MMDD,
    newStartTime: HHMM
  }})
  isEditingTaskStart = false
}

function saveTaskEnd () {

}

function saveDeadline (DDMMYYYY, HHMM) {
  taskObject.deadlineDate = DDMMYYYY
  taskObject.deadlineTime = HHMM

  dispatch('task-update', { 
    id: taskObject.id, 
    keyValueChanges: {
      deadlineTime: newDeadlineTime, 
      deadlineDate: newDeadlineDate
    }
  })
  isEditingDeadline = false
}

function handleTaskStartInput (e) {
  isEditingTaskStart = true
  const newVal = e.detail.value
  newStartMMDD = newVal.split(" ")[0]
  newStartHHMM = newVal.split(" ")[1]
}

function handleDeadlineInput (e) {
  isEditingDeadline = true
  const newVal = e.detail.value
  newDeadlineDate = newVal.split(" ")[0]
  newDeadlineTime = newVal.split(" ")[1]
}

function confirmDelete () {
  if (confirm('Are you sure you want to delete the task? This is irreversible.')) {
    dispatch('task-delete', {...taskObject})

    console.log('taskObject =', {...taskObject})
    dispatch('card-close')
  } 
}

function handleClickOutside (e) {
  dispatch('card-close')
}

function handleInput (e) {
  debouncedSaveNotes(e.target.value)
}

function saveNotes (newVal) {
  taskObject.notes = newVal
  dispatch('task-update', { id: taskObject.id, keyValueChanges: { notes: newVal }})
}

function saveTitle (newVal) {
  dispatch('task-update', { id: taskObject.id, keyValueChanges: { name: newVal }})
}
</script>

<style>
  .half-invisible {
    opacity: 0.5;
  }

  .detailed-card-popup {
    position: fixed;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 58%;
    overflow-y: auto;
    z-index: 4;
    min-width: 360px;
    
    height: fit-content;

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
    border-bottom: 1px solid #DBDBDD;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    /* padding: 10px 0px; */
    padding-left: 0px;
    padding-bottom: 6px;
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