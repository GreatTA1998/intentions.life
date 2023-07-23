{#if isOpen}
  <div class="my-popup-window" use:clickOutside on:click_outside={() => dispatch('card-close')}>
    <div style="display: flex;">
      <h1 class="google-calendar-event-title" style="margin-left: 40px">
        Goals & Encouraging Words
      </h1>
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 10px; color: #323232;">
        close
      </span>
    </div>

    <div stle="float: left; width: 80%">
      <!-- cols="48" determines width -->
      <textarea 
        bind:value={notesAboutTask}
        on:input={handleInput}
        rows="30"
        placeholder="Type in here... "
        style="display: block; margin: auto; width: 90%; box-sizing: border-box;"
      />
    </div>
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import RecursiveBulletPoint from './RecursiveBulletPoint.svelte';
import { getDateOfToday, getRandomID, clickOutside } from '../helpers';

export let goalsAndPosters
export let isOpen = false

let depth = 1

let newStartDate 
let newStartTime
let isSchedulingTask = false
let isTypingRepeatFrequency = false
let daysBeforeRepeating = 7

const dispatch = createEventDispatcher()

let notesAboutTask = goalsAndPosters || ''

const throttledSaveTitle = _.throttle(saveTitle, 500)
const throttledSaveNotes = _.throttle(saveNotes, 500)

function handleInput (e) {
  notesAboutTask = e.target.value
  throttledSaveNotes()
}

const handleInput2 = function (e) {
  titleOfTask = e.target.value
  throttledSaveTitle()
}

function saveNotes () {
  dispatch('goals-and-posters-update', { newGoalsAndPosters: notesAboutTask })
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
    }
    dispatch('task-schedule', { id: taskObject.id, newStartDate, newStartTime })
    newStartDate = ''
    newStartTime = ''
  }
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
  .my-popup-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;

    overflow-y: scroll;
    z-index: 5;
    width: 70%;
    height: 70%;
    min-width: 200px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
    border: 1px solid #000;
  }

  /* Refer to: https://stackoverflow.com/questions/3131072/how-to-change-input-text-box-style-to-line */
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;

    padding: 2px 0px;
  }

  .google-calendar-event-detail {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #3c4043;
  }

  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .google-calendar-event-time {
    font-family: serif;
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
  flex: 1;
  background-color: #333;
  color: #fff;
  border: 1px solid;
  padding-top: 2px; 
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s ease-out;

  font-family: sans-serif;
  font-size: 0.9rem;

  margin-top: 2px;
  height: 5px;
}

a:hover,
a:focus {
  background-color: #fff;
  color: #333;
}
</style>