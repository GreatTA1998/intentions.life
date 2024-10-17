<script>
  import UXFormField from '$lib/UXFormField.svelte'
  import UXToggleSwitch from '$lib/UXToggleSwitch.svelte'
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'

  export let weeklyTask
  export let updateWeeklyTemplate

  let isEditingTaskStart = false
  let isEditingDuration = false
  let newDuration = weeklyTask.duration
  let newStartHHMM = weeklyTask.startTime
  let hasSpecificTime = weeklyTask.startTime

  function saveDuration() {
    updateWeeklyTemplate({ duration: newDuration })
    isEditingDuration = false
  }

  function saveStartTime() {
    updateWeeklyTemplate({ startTime: newStartHHMM })
    isEditingTaskStart = false
  }

  function handleDurationInput(e) {
    isEditingDuration = true
    newDuration = Number(e.detail.value)
  }

  function handleTaskStartInput(e) {
    isEditingTaskStart = true
    const hhmm = e.detail.value
    newStartHHMM = hhmm
  }

  function isScheduled(taskObj) {
    return taskObj.startDate && taskObj.startTime && taskObj.startYYYY
  }
</script>

<div
  style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; row-gap: 24px; margin-top: 24px; font-size: 1.2em;"
>
  <div
    style="display: flex; align-items: center;"
    class:half-invisible={!isScheduled(weeklyTask)}
  >
    <div style="margin-left: 6px; margin-right: 6px; max-width: 80px;">
      <UXFormField
        fieldLabel="Duration"
        value={Math.round(weeklyTask.duration)}
        willAutofocus={false}
        on:input={(e) => handleDurationInput(e)}
      >
        <div
          slot="append"
          style="font-weight: 300; color: rgb(60, 60, 60); font-size: 12px;"
        >
          min
        </div>
      </UXFormField>
    </div>

    <div style="margin-top: 0px; margin-left: 16px;">
      <div style="font-size: 14px; rgb(100, 100, 100); margin-bottom: 8px;">
        start time
      </div>
      <div>
        <UXToggleSwitch
          isChecked={weeklyTask.startTime}
          on:new-checked-state={(e) => (hasSpecificTime = e.detail.isChecked)}
        />
      </div>
    </div>

    {#if hasSpecificTime}
      <div style="max-width: 70px; margin-left: 8px;">
        <UXFormField
          fieldLabel="hh:mm"
          value={weeklyTask.startTime}
          willAutofocus={false}
          on:input={(e) => handleTaskStartInput(e)}
          placeholder="17:30"
        />
      </div>
    {/if}
  </div>

  {#if isEditingTaskStart}
    <ReusableRoundButton
      on:click={saveStartTime}
      backgroundColor="rgb(0, 89, 125)"
      textColor="white"
    >
      Save changes
    </ReusableRoundButton>
  {/if}

  {#if isEditingDuration}
    <ReusableRoundButton
      on:click={saveDuration}
      backgroundColor="rgb(0, 89, 125)"
      textColor="white"
    >
      Save changes
    </ReusableRoundButton>
  {/if}
</div>
