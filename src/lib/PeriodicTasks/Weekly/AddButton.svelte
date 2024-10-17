<script>
  import { user, periodicTasks } from '/src/store.js'
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import { DateTime } from 'luxon'
  import PeriodicTasks from '/src/back-end/PeriodicTasks.js'

  export let defaultOrderValue = 1
  let isPopupOpen = false
  let newTaskName = ''

  const setIsPopupOpen = ({ newVal }) => (isPopupOpen = newVal)

  async function createWeeklyTemplate() {
    const newTask = {
      name: newTaskName,
      duration: 5,
      orderValue: defaultOrderValue + Math.random() * 0.5,
      crontab: '0 0 * * 0',
      timeZone: DateTime.now().zoneName,
      notes: '',
      notify: '',
      startTime: '12:00',
      lastGeneratedTask: DateTime.now().toFormat('yyyy-MM-dd'),
      iconUrl: '',
      tags: ""
    }
    const id = await PeriodicTasks.create({ userID: $user.uid, task: newTask })
    newTask.id = id
    $periodicTasks = ([...$periodicTasks, { ...newTask, id, userID: $user.uid }])
    newTaskName = ''
    isPopupOpen = false
  }
</script>

<slot {setIsPopupOpen} />

{#if isPopupOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fullscreen-invisible-modular-popup-layer"
    on:click|self={() => (isPopupOpen = false)}
  >
    <div class="detailed-card-popup">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="text"
        bind:value={newTaskName}
        placeholder="Untitled"
        style="margin-left: 12px; width: 100%; font-size: 24px;"
        class="title-underline-input"
        autofocus
      />

      <div
        style="display: flex; justify-content: space-between; width: 100%;
        margin-top: 16px;"
      >
        <ReusableRoundButton
          on:click={createWeeklyTemplate}
          backgroundColor="rgb(0, 89, 125)"
          textColor="white"
        >
          Create template
        </ReusableRoundButton>
      </div>
    </div>
  </div>
{/if}

<style>
  .title-underline-input {
    /* Refer to: https://stackoverflow.com/a/3131082/7812829 */
    background: transparent;
    border: none;
    border-bottom: 1px solid #dbdbdd;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    padding-left: 0px;
    padding-bottom: 6px;
  }

  .detailed-card-popup {
    position: fixed;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 58%;
    overflow-y: auto;
    z-index: 3;
    min-width: 360px;

    height: fit-content;

    padding: 24px;
    border-radius: 24px;
    background-color: white;

    /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    box-shadow: 0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }
</style>
