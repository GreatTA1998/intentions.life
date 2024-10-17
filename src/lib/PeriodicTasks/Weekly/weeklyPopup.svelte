<script>
  import { doodleIcons } from '/src/store.js'
  import IconsDisplay from '../components/IconsDisplay.svelte'
  import PeriodicWeeklyModule from '$lib/PeriodicTasks/Weekly/PeriodicWeeklyModule.svelte'
  import ManageReusableTasksDurationStartTime from '$lib/PeriodicTasks/components/ManageReusableTasksDurationStartTime.svelte'
  import { user, periodicTasks } from '/src/store.js'
  import { onMount, onDestroy } from 'svelte'
  import _ from 'lodash'
  import Icons from '/src/back-end/Icons.js'
  export let weeklyTask
  let isPopupOpen = false
  let newName = weeklyTask.name
  let unsub = null

  const debouncedRenameTask = _.debounce(
    (newVal) => updateWeeklyTemplate({ name: newVal }),
    800
  )

  onMount(async () => {
    $doodleIcons = await Icons.getAvailable($user.uid)
  })

  onDestroy(() => unsub && unsub())

  async function updateWeeklyTemplate(keyValueChanges) {
    PeriodicTasks.updateWithTasks({
      userID: $user.uid,
      id: weeklyTask.id,
      updates: keyValueChanges
    })
    $periodicTasks = $periodicTasks.map((task) =>
      task.id === weeklyTemplate.id ? { ...task, ...keyValueChanges } : task
    )
  }

  function deleteTemplate() {
    if (
      !confirm(
        'Are you sure you want to delete this template and all its future instances?'
      )
    )
      return
    PeriodicTasks.deleteTemplate({ id: weeklyTask.id, uid: $user.uid })
    isPopupOpen = false
  }

  function setIsPopupOpen({ newVal }) {
    isPopupOpen = newVal
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
        bind:value={newName}
        on:input={(e) => debouncedRenameTask(e.target.value)}
        placeholder="Untitled"
        style="width: 100%; font-size: 24px;"
        class="title-underline-input"
      />

      <div style="display: flex; align-items: center; margin-top: 24px;">
        {#key weeklyTask}
          <PeriodicWeeklyModule {weeklyTask} />
        {/key}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class="material-symbols-outlined"
          on:click|stopPropagation={deleteTemplate}
          style="cursor: pointer; margin-left: auto; right: 0px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
        >
          delete
        </span>
      </div>

      <ManageReusableTasksDurationStartTime
        {weeklyTask}
        on:weekly-template-update={(e) => updateWeeklyTemplate(e.detail)}
      />

      <!-- ICON SECTION -->
      <IconsDisplay template={weeklyTask} updateTemplate={updateWeeklyTemplate}/>
    </div>
  </div>
{/if}

<style src="./weeklyPopup.css"></style>
