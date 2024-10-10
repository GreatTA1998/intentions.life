<script>
  import UXFormField from "$lib/UXFormField.svelte";
  import { createEventDispatcher } from "svelte";
  import MyJSDatePicker from "$lib/MyJSDatePicker.svelte";
  import MyTimePicker from "$lib/DetailedCardPopup/MyTimePicker.svelte";
  import { DateTime } from "luxon";
  export let taskObject;
  let internalStartTime = taskObject.startTime;
  const dispatch = createEventDispatcher();

  function isScheduled(taskObj) {
    return taskObj.startDate && taskObj.startTime && taskObj.startYYYY;
  }

  function handleChanges(key, value, timeZone) {
    console.log('handleChanges', key, value, timeZone);
    if (typeof Number(value) !== "number") return;
    const taskUpdates = {
      [key]: value,
    };
    if(timeZone) taskUpdates.timeZone = DateTime.local().zoneName
    dispatch("task-update", {
      id: taskObject.id,
      keyValueChanges: taskUpdates,
    });
  }
</script>

<div
  style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; row-gap: 24px; margin-top: 24px; font-size: 1.2em;"
>
  <div
    style="display: flex; align-items: start; gap: 16px;"
    class:half-invisible={!isScheduled(taskObject)}
  >
    <div>
      <MyTimePicker
        value={internalStartTime}
        on:input={(e) => handleChanges("startTime", e.detail.typedHHMM)}
        on:time-selected={(e) => {
          internalStartTime = e.detail.selectedHHMM; // seems like a bug here,
          handleChanges("startTime", e.detail.selectedHHMM);
        }}
      />
    </div>

    <div style="margin-left: 6px; margin-right: 6px; max-width: 80px;">
      <UXFormField
        fieldLabel="Duration"
        value={Math.round(taskObject.duration)}
        willAutofocus={false}
        data-field="duration"
        on:input={(e) => handleChanges("duration", Number(e.detail.value))}
      >
        <div
          slot="append"
          style="font-weight: 300; color: rgb(60, 60, 60); font-size: 12px;"
        >
          min
        </div>
      </UXFormField>
    </div>

    <div style="margin-left: 6px; margin-right: 6px; max-width: 120px;">
      <UXFormField
        fieldLabel="Notification"
        value={taskObject.notify || 'not set'}
        willAutofocus={false}
        on:input={(e) => handleChanges("notify", !isNaN(parseInt(e.detail.value)) ?e.detail.value : '', true)}
      >
        <div
          slot="append"
          style="font-weight: 300; color: rgb(60, 60, 60); font-size: 12px;"
        >
          min before
        </div>
      </UXFormField>
    </div>
  </div>
</div>
