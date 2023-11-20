{#if isOpen}
  <div class="my-popup-window" use:clickOutside on:click_outside={() => dispatch('card-close')}>
    <div style="display: flex;">
      <h3 class="google-calendar-event-title"  style="margin-left: 40px; margin-top: 40px; margin-bottom: 40px; color: #000;">
        Daily Notes
      </h3>
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 10px; color: #323232;">
        close
      </span>
    </div>

    {#if isGoalsAndPostersPopupOpen}
      <JournalPopupGoalsAndPosters
        isOpen={isGoalsAndPostersPopupOpen}
        {goalsAndPosters}
        on:card-close={() => isGoalsAndPostersPopupOpen = false}
        on:goals-and-posters-update={(e) => changeGoalsAndPosters(e.detail)}
      />
    {/if}

    <div style="display: flex">
      <div class="journal-left-navigation" style="font-family: Roboto,Arial,sans-serif; font-size:16px; color: #6D6D6D; margin-left: 40px;">        
        <div on:click={() => isGoalsAndPostersPopupOpen = true} class:blue-highlight={isGoalsAndPostersPopupOpen}>
          Goals
        </div>

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
          cols="150"
          placeholder="notes"
          style="margin-left: 20px; width: 88%; margin-right: 10px; box-sizing: border-box;"
        />
      </div>
    </div>
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js'
import JournalPopupGoalsAndPosters from './JournalPopupGoalsAndPosters.svelte';
import db from '/src/db.js'
import { doc, updateDoc } from 'firebase/firestore'

export let journal
export let isOpen = false

// props needed for <GoalsAndPostersPopup/>
export let userID
export let goalsAndPosters

const dispatch = createEventDispatcher()
const todayDateMMDD = getDateOfToday()

const throttledSaveJournalPage = _.throttle(saveJournalPage, 500)

let isGoalsAndPostersPopupOpen = true

createTodayJournal() // won't do anything if it already exists, I know this is bad because it isn't atomic
let currentlySelectedDate = todayDateMMDD

const userDocPath = `users/${userID}`

function changeGoalsAndPosters ({ newGoalsAndPosters }) {
  updateDoc(doc(db, userDocPath), {
    goalsAndPosters: newGoalsAndPosters
  })
}

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
  journal[todayDateMMDD] = ''
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
    font-weight: 600;
    font-size: 16px;
    background-color: none;
    color: #0085FF;
    margin-left: 10px;
  }


  .my-popup-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;

    overflow-y: scroll;
    z-index: 5;
    width: 70%;
    height: 70%;
    min-width: 200px;
    border-radius: 10px;
    background-color: white;
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    padding: 6px;
  
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
    font-weight: 600;
    letter-spacing: .2px;
    line-height: 20px;
    color: #6D6D6D;
  } 
</style>