<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div id="detailed-card" style="padding: 24px" bind:this={elem} use:clickOutside on:click_outside={handleClickOutside}>    
    <div style="display: flex; justify-content: space-around; align-items: center;">
      <span class="material-symbols-outlined my-float" style="font-size: 42px; color: rgb(20, 20, 20); cursor: pointer; margin-left: -4px;">
        summarize
      </span>

      <!-- Every todo list just needs the filtered tasks,
          you write the logic, re-use it 2 times for week and month. 

          For today, you want it to be different (that it actually reflects time)

          For year, you want it to be the work-life-fun-tree
      -->
      <div class="todo-column-title">
        Today
      </div>

      <div class="todo-column-title">
        This week
      </div>

      <div class="todo-column-title">
        This month
      </div>

      <div class="todo-column-title">
        This year
      </div>
    </div>
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import RecursiveBulletPoint from '$lib/RecursiveBulletPoint.svelte'
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY, getCurrentTimeInHHMM } from '/src/helpers.js'
import ReusableDatePicker from '$lib/ReusableDatePicker.svelte'
import DetailedCardPopupRepeat from '$lib/DetailedCardPopupRepeat.svelte'

export let taskObject 

let isPopupOpen = false

function setIsPopupOpen ({ newVal }) {
  isPopupOpen = newVal
}

let elem

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
  isPopupOpen = false
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
.todo-column-title {
  font-size: 20px; 
  font-weight: 500;
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