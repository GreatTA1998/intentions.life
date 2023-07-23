{#if isOpen}
  <div class="my-popup-window" use:clickOutside on:click_outside={() => dispatch('card-close')}>
    <div style="display: flex;">
      <h3 class="google-calendar-event-title"  style="margin-left: 50px; color: #323232;">
        My Journal
      </h3>
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 10px; color: #323232;">
        close
      </span>
    </div>

    <div style="display: flex">
      <div class="journal-left-navigation" style="font-family: Roboto,Arial,sans-serif; font-size:16px; color: #6D6D6D;">
        {#each Object.keys(journal) as date}
          <div on:click={() => currentlySelectedDate = date} class:blue-highlight={date === currentlySelectedDate}>
            {date}
          </div>
        {/each}
      </div>

      <div stle="float: left; width: 80%">
        <!-- cols="48" determines width -->
        <textarea 
          bind:value={journal[currentlySelectedDate]}
          on:input={handleInput}
          rows="30"
          cols="120"
          placeholder="notes"
          style="margin-left: 20px; width: 97%; margin-right: 10px; box-sizing: border-box;"
        />
      </div>
    </div>
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js';

export let journal
export let isOpen = false

const dispatch = createEventDispatcher()
const todayDateMMDD = getDateOfToday()

const throttledSaveJournalPage = _.throttle(saveJournalPage, 500)

createTodayJournal() // won't do anything if it already exists, I know this is bad because it isn't atomic
let currentlySelectedDate = todayDateMMDD

function createTodayJournal () {
  if (!journal) { // backwards compatibility
    journal = {}
  }
  else {
    for (const journalDates of Object.keys(journal)) {
      if (journalDates === todayDateMMDD) {
        return
      }
    }

  }
  journal[todayDateMMDD] = '- Happenings\n\n\n- Grateful for\n\n\n- Findings\n\n\n- Intentions'
  dispatch('journal-update', journal)
}


function handleInput (e) {
  journal[currentlySelectedDate] = e.target.value
  throttledSaveJournalPage()
}

function saveJournalPage () {
  dispatch('journal-update', { newJournal: journal })
}


</script>

<style>
  .blue-highlight {
    font-family: Roboto,Arial,sans-serif;
    font-size: 16px;
    background-color: none;
    color: #0085FF;
  }

  .my-popup-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;

    overflow-y: scroll;
    z-index: 5;
    width: 60%;
    height: 60%;
    min-width: 200px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
    border: 1px solid #000000;
  }

  /* Refer to: https://stackoverflow.com/questions/3131072/how-to-change-input-text-box-style-to-line */
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;

    padding: 2px 0px;
  }

  .google-calendar-event-detail {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #6D6D6D;
  }

  .google-calendar-event-time {
    font-family: serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #3c4043;
  }

  .google-calendar-event-title {
    font-family: Roboto,Arial,sans-serif;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #6D6D6D;
  } 
</style>