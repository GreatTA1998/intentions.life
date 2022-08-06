{#if isOpen}
  <div class="detailed-card">
    <div style="display: flex">
      <div class="google-calendar-event-title" style="margin-top: 10px; margin-left: 10px;">
        {taskObject.name}
      </div>
        
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 0">
        close
      </span>
    </div>

    <div class="google-calendar-event-time" style="margin-top: 4px; margin-left: 10px;">
      {#if !taskObject.isDone && taskObject.startTime && taskObject.startDate}
        Scheduled for {taskObject.startDate + ' ' + taskObject.startTime}
      {:else}
        {#if !isSchedulingTask}
        <button on:click={() => isSchedulingTask = true}>
          Schedule
        </button>
        {:else}
          <input bind:value={newStartDate} placeholder="12/31" style="width: 40px"/>
          <input bind:value={newStartTime} placeholder="19:45" style="width: 40px" on:keypress={detectEnterKey5}/>
        {/if}
      {/if}
    </div>

    <div class="google-calendar-event-detail" style="margin-top: 12px; margin-left: 16px;">
      {#if taskObject.daysBeforeRepeating}
        Repeats every {taskObject.daysBeforeRepeating} days, completed {taskObject.completionCount || 0} times
      {:else if taskObject.repeatsOnDaysOfWeek}
        Repeats {taskObject.repeatsOnDaysOfWeek}
      {/if}
    </div>

    <textarea 
      bind:value={notesAboutTask}
      on:input={handleInput}
      cols="48" 
      placeholder="notes"
      style="margin-left: 10px;"
    />

    <div style="display: flex; margin-left: 6px">
      <div>
        <!-- Repeating tasks -->
        {#if !isTypingRepeatFrequency}
        <button on:click={() => isTypingRepeatFrequency = true} style="margin-left: 5px;">
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
  </div>
{/if}

<script>
import { createEventDispatcher, onMount } from 'svelte'
import _ from 'lodash'

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

const handleInput = _.throttle(e => {
  notesAboutTask = e.target.value;
  saveNotes()
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

  .detailed-card {
    z-index: 5;
    position: absolute;
    width: 400px; 
    height: 250px; 
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
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