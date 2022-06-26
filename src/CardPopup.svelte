{#if isOpen}
  <div class="detailed-card">
    <div style="display: flex">
      <!-- <span class="material-icons" on:click={() => isSchedulingTask = true} style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;">
        schedule
      </span>
      
      <span class="material-icons" on:click={() => isRepeatingTask = true} style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;">
        event_repeat
      </span>

      <span class="material-icons" on:click={() => isDeletingTask = true} style="margin-left: 5px; font-size: {2.5 * (0.7 ** depth)}rem;">
        delete
      </span>   -->
        
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 0">
        close
      </span>
    </div>

    <div class="google-calendar-event-title" style="margin-top: 10px; margin-left: 10px;">
      {taskObject.name}
    </div>

    <div class="google-calendar-event-time" style="margin-top: 4px; margin-left: 10px;">
      {#if !taskObject.isDone && taskObject.startTime && taskObject.startDate}
        Scheduled for {taskObject.startDate + ' ' + taskObject.startTime}
      {/if}
    </div>

    <div class="google-calendar-event-detail" style="margin-top: 12px; margin-left: 16px;">
      {#if taskObject.daysBeforeRepeating}
        Repeats every {taskObject.daysBeforeRepeating} days, completed {taskObject.completionCount || 0} times
      {/if}
    </div>
  </div>
{/if}


<script>
import { createEventDispatcher, onMount } from 'svelte'

export let taskObject 
export let isOpen = false

let depth = 1

const dispatch = createEventDispatcher()
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
    width: 350px; 
    height: 200px; 
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
  }
  .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>