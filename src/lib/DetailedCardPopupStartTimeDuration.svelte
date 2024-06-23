<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; row-gap: 24px; margin-top: 24px; font-size: 1.2em;">
  <div style="display: flex; align-items: start; gap: 16px;" class:half-invisible={!isScheduled(taskObject)}>
    <div>
      <MyDatePicker 
        MMDD={newStartMMDD}
        on:date-selected={(e) => newStartMMDD = e.detail.selectedDate}
      />
        
      <div style="margin-top: 4px;"></div>

      {#if isEditingStartDate}
        <ReusableRoundButton on:click={() => saveStartDate(newStartMMDD)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save</ReusableRoundButton>
      {/if}
    </div>

    <div>
      <MyTimePicker value={newStartHHMM} 
        on:input={(e) => newStartHHMM = e.detail.typedHHMM}
        on:time-selected={(e) => {
          newStartHHMM = e.detail.selectedHHMM;
          taskObject.startTime = newStartHHMM; // quick-fix to not show the save button, additional click
          saveStartTime(e.detail.selectedHHMM);
        }}
      />
      
      <div style="margin-top: 4px;"></div>

      {#if isEditingTaskStart}
        <ReusableRoundButton on:click={() => saveStartTime(newStartHHMM)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save</ReusableRoundButton>
      {/if}
    </div>

    <div style="margin-left: 6px; margin-right: 6px; max-width: 80px;">
      <UXFormField
        fieldLabel="Duration"
        value={Math.round(taskObject.duration)}
        willAutofocus={false}
        on:input={(e) => handleDurationInput(e)}
      >
        <div slot="append" style="font-weight: 300; color: rgb(60, 60, 60); font-size: 12px;">
          min
        </div>
      </UXFormField>
    </div>
  </div>

  {#if isEditingDuration}
    <ReusableRoundButton on:click={() => saveDuration(newDuration)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save changes</ReusableRoundButton>
  {/if}
</div>

<script>
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import UXFormField from '$lib/UXFormField.svelte'
  import { createEventDispatcher } from 'svelte'
  import MyDatePicker from '$lib/MyDatePicker.svelte'
  import MyTimePicker from '$lib/MyTimePicker.svelte'

  export let taskObject

  $: isEditingTaskStart = taskObject.startTime !== newStartHHMM
  $: isEditingStartDate = taskObject.startDate !== newStartMMDD

  let newStartMMDD = taskObject.startDate || ''
  let newStartHHMM = taskObject.startTime || ''

  let isEditingDuration = false
  let newDuration 

  const dispatch = createEventDispatcher()

  function saveStartTime (hhmm) {
    dispatch('task-update', { id: taskObject.id, keyValueChanges: {
      startTime: hhmm
    }})
    isEditingTaskStart = false
  }

  function saveStartDate (MMDD) {
    dispatch('task-update', { id: taskObject.id, keyValueChanges: {
      startDate: MMDD,
    }})
    isEditingStartDate = false
  }
  
  function handleDurationInput (e) {
    isEditingDuration = true
    newDuration = e.detail.value
  }

  function saveDuration (newValue) {
    if (typeof Number(newValue) !== 'number') {
      return 
    }
    dispatch('task-update', { 
      id: taskObject.id, 
      keyValueChanges: { 
        duration: Number(newValue) 
      } 
    })
    isEditingDuration = false
  }

  function isScheduled (taskObj) {
    return taskObj.startDate && taskObj.startTime && taskObj.startYYYY
  }
</script>