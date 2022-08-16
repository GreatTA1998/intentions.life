{#if isOpen}
  <div class="detailed-card">
    <div style="display: flex">
      <input 
        type="text" 
        class="google-calendar-event-title" 
        bind:value={titleOfTask} 
        on:input={handleInput2}
        style="width: 90%; margin-left: 10px"
      >
        
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 0">
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
        Repeats every {taskObject.daysBeforeRepeating} days, completed {taskObject.completionCount || 0} times
      {:else if taskObject.repeatsOnDaysOfWeek}
        Repeats {taskObject.repeatsOnDaysOfWeek}
      {/if}
    </div>

    <div stle="float: left; width: 80%">
      <!-- cols="48" determines width -->
      <textarea 
        bind:value={notesAboutTask}
        on:input={handleInput}

        placeholder="notes"
        style="margin-left: 10px; width: 100%; max-width: 90%;"
      />
    </div>

    <div style="display: flex; margin-left: 10px">
      <div>
        {#if !isSchedulingTask}
          <button on:click={() => isSchedulingTask = true}>
            Schedule
          </button>
        {:else}
          <input bind:value={newStartDate} placeholder="12/31" style="width: 40px"/>
          <input bind:value={newStartTime} placeholder="19:45" style="width: 40px" on:keypress={detectEnterKey5}/>
        {/if}
        <!-- Repeating tasks -->
        {#if !isTypingRepeatFrequency}
          <button on:click={() => isTypingRepeatFrequency = true} style="margin-left: 0px;">
            Repeat task
          </button>
        {:else}
          <!-- TODO: design repeat menu -->
          <!-- Can't choose both -->
          <div style="display: flex">
            Repeats every <input bind:value={daysBeforeRepeating} style="width: 20px;" placeholder="0" on:keypress={detectEnterKey4}> days 
          </div>

          <div style="display: flex">
            <div>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 1 })}
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[0]}"
              >
                M
              </button>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 2 })}
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[1]}"  
              >
                T
              </button>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 3 })}
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[2]}"  
              >
                W
              </button>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 4 })}
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[3]}"
              >
                R
              </button>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 5 })}
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[4]}"  
              >
                F
              </button>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 6 })} 
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[5]}"
              >
                S
              </button>
              <button on:click={() => repeatOnDayOfWeek({ dayNumber: 7 })} 
                class:selected="{taskObject.repeatsOnDaysOfWeek && taskObject.repeatsOnDaysOfWeek[6]}"
              >
                S
              </button>
            </div>
          </div>
        {/if}
      </div>
      <div style="margin-left: auto; margin-right: 16px">
        <!-- class="material-icons" style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;" -->
        <button on:click={() => dispatch('task-delete')}>
          Delete
        </button>

        <!-- I don't care this looks bad -->
        <button on:click={() => dispatch('task-done')}>
          Done
        </button>
      </div>
    </div>

    <!-- This is the section where you show everything regardless of whether it is scheduled or not -->
    <div style="font-size: 1rem; margin-top: 12px; margin-left: 12px">
      Full task history
    </div>

    {#each taskObject.children as child}
      <div style="margin-left: 12px;">
      <RecursiveBulletPoint taskObject={child}>
      
      </RecursiveBulletPoint>
      </div>
    {/each}
  </div>
{/if}

<script>
import { createEventDispatcher, onMount } from 'svelte'
import _ from 'lodash'
import RecursiveBulletPoint from './RecursiveBulletPoint.svelte';

export let taskObject 
export let isOpen = false

let depth = 1

let newStartDate 
let newStartTime
let isSchedulingTask = false
let isTypingRepeatFrequency = false
let daysBeforeRepeating = 7

const dispatch = createEventDispatcher()

let notesAboutTask = taskObject.notes || ''
let titleOfTask = taskObject.name || ''

console.log('detailed card popup taskObject =', taskObject)

const handleInput = _.throttle(e => {
  notesAboutTask = e.target.value;
  saveNotes()
}, 500) // milliseconds

const handleInput2 = _.throttle(e => {
  titleOfTask = e.target.value;
  saveTitle()
}, 500) // milliseconds

function repeatOnDayOfWeek ({ dayNumber }) {
  if (!taskObject.repeatsOnDaysOfWeek) {
    taskObject.repeatsOnDaysOfWeek = [false,false,false,false,false,false,false]
  } 
  taskObject.repeatsOnDaysOfWeek[dayNumber - 1] = !taskObject.repeatsOnDaysOfWeek[dayNumber - 1]
  
  // dispatch the event so it updates the database
  dispatch('task-repeat')
}

function saveNotes () {
  taskObject.notes = notesAboutTask
  dispatch('task-notes-update')
}

function saveTitle () {
  taskObject.name = titleOfTask 
  dispatch('task-title-update')
}

function detectEnterKey4 (e) {
  if (e.charCode === 13) {
    if (!daysBeforeRepeating) {
      alert('Task is reset and will no longer repeat')
      taskObject.daysBeforeRepeating = 0
    } else {
      taskObject.daysBeforeRepeating = daysBeforeRepeating
    }
    dispatch('task-repeat')
    daysBeforeRepeating = 0
    isTypingRepeatFrequency = false
  }
}

function detectEnterKey5 (e) {
  if (e.charCode === 13) {
    if (!newStartDate || !newStartTime) {
      alert('Need BOTH date and time')
    } else {
      taskObject.startDate = newStartDate
      taskObject.startTime = newStartTime
    }
    dispatch('task-schedule')
    newStartDate = ''
    newStartTime = ''
  }
}
</script>

<style>
  .detailed-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;

    overflow-y: scroll;
    z-index: 5;
    width: 80%;
    height: 50%;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
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
    font-size: 18px;
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
</style>