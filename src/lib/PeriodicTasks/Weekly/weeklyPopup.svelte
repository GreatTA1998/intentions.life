<script>
  import { createNewInstancesOfWeeklyRepeatingTasks } from "/src/helpers/periodicRepeat.js";
  import { doodleIcons } from "/src/store.js";
  import BasicWhiteboard from "$lib/PeriodicTasks/components/BasicWhiteboard.svelte";
  import PremiumPopup from "$lib/PeriodicTasks/components/PremiumPopup.svelte";
  import PeriodicWeeklyModule from "$lib/PeriodicTasks/Weekly/PeriodicWeeklyModule.svelte";
  import ManageReusableTasksDurationStartTime from "$lib/ManageReusableTasksDurationStartTime.svelte";
  import {
    convertMMDDToDateClassObject,
    computeDayDifference,
  } from "/src/helpers/everythingElse.js";
  import { user } from "/src/store.js";
  import { onMount, onDestroy } from "svelte";
  import _ from "lodash";
  import Icons from "/src/back-end/Icons.js";
  export let weeklyTemplate = {
    name: "",
    repeatOnDayOfWeek: Array(7).fill(0),
    repeatGroupID: "",
    iconDataURL: "",
    duration: 30,
  };

  let isShowingPremiumPopup = false;
  let isPopupOpen = false;
  let repeatOnDayOfWeek = weeklyTemplate.repeatOnDayOfWeek;
  let repeatGroupID = weeklyTemplate.repeatGroupID;
  let newTaskName = weeklyTemplate.name;

  let unsub = null;

  const debouncedRenameTask = _.debounce(
    (newVal) => updateWeeklyTemplate({ name: newVal }),
    800,
  );

  onMount(async () => {
    $doodleIcons = await Icons.getAvailableIcons($user.uid);
  });

  onDestroy(() => {
    if (unsub) unsub();
  });

  async function updateWeeklyTemplate(keyValueChanges) {
    await updateFirestoreDoc(
      `/users/${$user.uid}/periodicTasks/${weeklyTemplate.id}`,
      keyValueChanges,
    );
    propagateChangeToFutureInstances(keyValueChanges);
  }


  function handleDeleteIcon({id, url}) {
    if (confirm("Are you sure you want to delete this icon?")) {
     Icons.deleteRecursively({id, uid: $user.uid, url});
     $doodleIcons = $doodleIcons.filter(icon => icon.id !== id);
    }
  }

  function deleteTemplate() {
    console.log("deleting weekly template");
    if (!confirm("Are you sure you want to delete this template and all its future instances?")) return 
    PeriodicTasks.deleteTemplate({id: weeklyTemplate.id, uid: $user.uid});

    isPopupOpen = false;
  }

  function setIsPopupOpen({ newVal }) {
    isPopupOpen = newVal;
  }
 
</script>

<slot {setIsPopupOpen}></slot>

{#if isPopupOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fullscreen-invisible-modular-popup-layer"
    on:click|self={() => (isPopupOpen = false)}
  >
    <div class="detailed-card-popup">
      <input
        type="text"
        bind:value={newTaskName}
        on:input={(e) => debouncedRenameTask(e.target.value)}
        placeholder="Untitled"
        style="width: 100%; font-size: 24px;"
        class="title-underline-input"
      />

      <div style="display: flex; align-items: center; margin-top: 24px;">
        {#key weeklyTemplate}
          <PeriodicWeeklyModule
            {weeklyTemplate}
            on:new-weekly-schedule={(e) => editExistingInstances(e.detail)}
          />
        {/key}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class="material-symbols-outlined"
          on:click|stopPropagation={deleteWeeklyTemplate}
          style="cursor: pointer; margin-left: auto; right: 0px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
        >
          delete
        </span>
      </div>

      <ManageReusableTasksDurationStartTime
        {weeklyTemplate}
        on:weekly-template-update={(e) => updateWeeklyTemplate(e.detail)}
      />

      <!-- ICON SECTION -->
      {#if !$user.isSubscriber}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => (isShowingPremiumPopup = !isShowingPremiumPopup)}
          style=""
          class="premium-intro-button"
        >
          <span class="material-symbols-outlined" style="margin-right: 4px;">
            forest
          </span>

          <div style="font-weight: 600;">Get doodle icons</div>
        </div>
        {#if isShowingPremiumPopup}
          <PremiumPopup />
        {/if}
      {:else}
        <div
          style="margin-top: 16px; display: flex; width: 100%; flex-wrap: wrap;"
        >
          {#if $doodleIcons}
            {#each $doodleIcons as doodleIcon}
              <div>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                  on:click={() =>
                    updateWeeklyTemplate({ iconURL: doodleIcon.url })}
                  src={doodleIcon.url}
                  style="width: 48px; height: 48px; cursor: pointer;"
                  class:orange-border={weeklyTemplate.iconUrl ===
                    doodleIcon.url}
                />
                {#if doodleIcon.createdBy === $user.uid}
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    on:click={() => {
                      console.log('doodleIcon', doodleIcon);
                      handleDeleteIcon({id: doodleIcon.id, url: doodleIcon.url})}
                    }
                    style="cursor: pointer; font-size: 14px;"
                  >
                    Delete
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>

        <div style="margin-top: 16px; display: flex; justify-content: center">
          <BasicWhiteboard />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style src="./weeklyPopup.css"></style>
