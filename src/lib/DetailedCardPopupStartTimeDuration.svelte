<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; row-gap: 24px; margin-top: 24px; font-size: 1.2em;">
  <div style="display: flex; align-items: center;" class:half-invisible={!isScheduled(taskObject)}>
    <div style="max-width: 140px;">
      <UXFormField
        fieldLabel="MM/DD hh:mm"
        value={taskObject.startDate + ' ' + taskObject.startTime}
        willAutofocus={false}
        on:input={(e) => handleTaskStartInput(e)}
        placeholder="MM/dd hh:mm"
      />
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

  {#if isEditingTaskStart}
    <ReusableRoundButton on:click={() => saveTaskStart(newStartMMDD, newStartHHMM)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save changes</ReusableRoundButton>
  {/if}

  {#if isEditingDuration}
    <ReusableRoundButton on:click={() => saveDuration(newDuration)} backgroundColor="rgb(0, 89, 125)" textColor="white">Save changes</ReusableRoundButton>
  {/if}
</div>

<script>
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import UXFormField from '$lib/UXFormField.svelte'
  import { createEventDispatcher } from 'svelte'

  export let taskObject

  let isEditingTaskStart = false 
  let newStartMMDD
  let newStartHHMM

  let isEditingDuration = false
  let newDuration 

  const dispatch = createEventDispatcher()

  function handleTaskStartInput (e) {
    isEditingTaskStart = true
    const newVal = e.detail.value
    newStartMMDD = newVal.split(" ")[0]
    newStartHHMM = newVal.split(" ")[1]

    // quickfix for space bar causing time to be ignored (I ran into it as well, not just dad)
    if (newVal[0] === ' ') {
      alert('Empty space detected at the start _12/31 15:00, please delete.')
    }
  }

  function saveTaskStart (MMDD, HHMM) {
    dispatch('task-update', { id: taskObject.id, keyValueChanges: {
      startDate: MMDD,
      startTime: HHMM,
      startYYYY: new Date().getFullYear()
    }})
    isEditingTaskStart = false
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