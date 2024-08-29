<script>
    import ReusableRoundButton from "$lib/ReusableRoundButton.svelte";
    import UXFormField from "$lib/UXFormField.svelte";
    import { createEventDispatcher } from "svelte";
    import MyJSDatePicker from "$lib/MyJSDatePicker.svelte";
    import MyTimePicker from "$lib/MyTimePicker.svelte";
  
    export let taskObject;
  
    // NOTE: this has an edge case where you can't "save changes" if you switch back to your previous date
    // because `taskObject.startTime` has a reactivity caveat
    // QUICKFIX: just close the popup and do it again
    $: isEditingTaskStart = taskObject.startTime !== newStartHHMM;
    $: isEditingStartDate = taskObject.startDate !== newStartMMDD;
  
    taskObject.startDateISO.split("");
    let newStartMMDD = getMMDD(taskObject.startDateISO) || "";
    let newStartYYYY = getYYYY(taskObject);
  
    let newStartHHMM = taskObject.startTime || "";
  
    let isEditingDuration = false;
    let newDuration;
  
    let isEditingNotify = false;
    let newNotify;
  
    const dispatch = createEventDispatcher();
  
    function getYYYY(taskObject) {
      if (!taskObject.startDateISO) return "";
      else {
        taskObject.startDateISO.split("-")[0];
      }
    }
  
    function getMMDD(startDateISO) {
      const [yyyy, mm, dd] = startDateISO.split("-");
      return `${mm}/${dd}`;
    }
  
    function saveStartTime(hhmm) {
      dispatch("task-update", {
        id: taskObject.id,
        keyValueChanges: {
          startTime: hhmm,
        },
      });
      isEditingTaskStart = false;
    }
  
    function saveStartDateAndYear(MMDD, YYYY) {
      dispatch("task-update", {
        id: taskObject.id,
        keyValueChanges: {
          startDate: MMDD,
          startYYYY: YYYY,
        },
      });
      isEditingStartDate = false;
    }
  
    function handleDurationInput(e) {
      isEditingDuration = true;
      newDuration = e.detail.value;
    }
  
    function handleNotifyInput(e) {
      isEditingNotify = true;
      newNotify = e.detail.value;
    }
  
    function saveDuration(newValue) {
      if (typeof Number(newValue) !== "number") {
        return;
      }
      dispatch("task-update", {
        id: taskObject.id,
        keyValueChanges: {
          duration: Number(newValue),
        },
      });
      isEditingDuration = false;
    }
  
    function saveNotify(newValue) {
      if (typeof Number(newValue) !== "number") return;
      dispatch("task-update", {
        id: taskObject.id,
        keyValueChanges: {
          notify: newValue,
        },
      });
      isEditingNotify = false;
    }
  
    function isScheduled(taskObj) {
      return taskObj.startDate && taskObj.startTime && taskObj.startYYYY;
    }
  </script>
  
  <div
    style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; row-gap: 24px; margin-top: 24px; font-size: 1.2em;"
  >
    <div
      style="display: flex; align-items: start; gap: 16px;"
      class:half-invisible={!isScheduled(taskObject)}
    >
      <!-- TODO: Deprecate or refactor Currently not working
      Since drag and drop is working, maybe no need for manual entry? -->
      <!-- <div>
        <MyJSDatePicker
          MMDD={newStartMMDD}
          YYYY={newStartYYYY}
          on:date-selected={(e) => { 
            newStartMMDD = e.detail.selectedDate
            newStartYYYY = e.detail.selectedYear
          }}
        />
        <div style="margin-top: 4px;"></div>
        TODO: Deprecate or refactor Currently not working
        Since drag and drop is working, maybe no need for manual entry?
        {#if isEditingStartDate}
          <ReusableRoundButton 
            on:click={() => saveStartDateAndYear(newStartMMDD, newStartYYYY)}
            backgroundColor="rgb(0, 89, 125)" textColor="white"
          >
            Save
          </ReusableRoundButton>
        {/if}
      </div> -->
  
      <div>
        <MyTimePicker
          value={newStartHHMM}
          on:input={(e) => (newStartHHMM = e.detail.typedHHMM)}
          on:time-selected={(e) => {
            newStartHHMM = e.detail.selectedHHMM;
            taskObject.startTime = newStartHHMM; // quick-fix to not show the save button, additional click
            saveStartTime(e.detail.selectedHHMM);
          }}
        />
  
        <div style="margin-top: 4px;"></div>
  
        {#if isEditingTaskStart}
          <ReusableRoundButton
            on:click={() => saveStartTime(newStartHHMM)}
            backgroundColor="rgb(0, 89, 125)"
            textColor="white">Save Start Time</ReusableRoundButton
          >
        {/if}
      </div>
  
      <div style="margin-left: 6px; margin-right: 6px; max-width: 80px;">
        <UXFormField
          fieldLabel="Duration"
          value={Math.round(taskObject.duration)}
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
  
      <div style="margin-left: 6px; margin-right: 6px; max-width: 120px;">
        <UXFormField
          fieldLabel="Notify"
          value={Math.round(taskObject.notify)}
          willAutofocus={false}
          on:input={(e) => handleNotifyInput(e)}
        >
          <div
            slot="append"
            style="font-weight: 300; color: rgb(60, 60, 60); font-size: 12px;"
          >
            min before
          </div>
        </UXFormField>
      </div>
      {#if isEditingNotify}
        <ReusableRoundButton
          on:click={() => saveNotify(newNotify)}
          backgroundColor="rgb(0, 89, 125)"
          textColor="white">Save Notify Time</ReusableRoundButton
        >
      {/if}
    </div>
  
    {#if isEditingDuration}
      <ReusableRoundButton
        on:click={() => saveDuration(newDuration)}
        backgroundColor="rgb(0, 89, 125)"
        textColor="white">Save Duration</ReusableRoundButton
      >
    {/if}
  </div>
  