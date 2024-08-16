<div style="display: flex; align-items: center;">
  <!-- <span class="material-symbols-outlined my-float" 
    style="font-size: 32px; cursor: pointer;"
    on:click={() => isJournalPopupOpen = !isJournalPopupOpen}
    class:blue-focus={isJournalPopupOpen}
  >
    auto_stories
  </span> -->

    <!-- color: #091346 -->
</div>

<div style="font-size: 16px; font-weight: 300; margin-left: 3px; margin-bottom: 2px; opacity: 0.8">
  {convertMMDDToReadableMonthDayForm(currentJournalEntryMMDD)}
</div>

<div style="display: flex; align-items: center;">
  <input 
    value={localTitle}
    on:input={handleTitleInput}
    class="reset-input"
    type="text" 
    style="width: 100%; box-sizing: border-box; font-size: 28px; background: transparent; color: white; border-bottom: 1px solid hsl(200,90%,40%,0.4); padding-bottom: 6px; font-weight: 500; margin-right: 12px;"
  >
    {#if willMusicAutoplay}
      <span class="material-symbols-outlined" on:click={() => dispatch('toggle-music-autoplay', { newVal: false })} style="cursor: pointer; font-size: 32px">
        music_cast
      </span> 
    {:else}
      <span class="material-symbols-outlined" on:click={() => dispatch('toggle-music-autoplay', { newVal: true })} style="cursor: pointer; color: rgb(180, 180, 180)">
        music_off
      </span> 
    {/if}
</div>


<div style="margin-bottom: 24px;"></div>

<!-- rgb(36, 33, 33) -->
<textarea 
  value={journal[currentJournalEntryMMDD]}
  on:input={handleInput}
  id={currentJournalEntryMMDD}
  class="reset-textarea" 
  name="hide" placeholder="Write anything..." 
  style="color: white; background-color: transparent; width: 100%; height: 90%; font-size: 16px;"
/>

<script>
  import { convertMMDDToReadableMonthDayForm, getDateInMMDD } from '/src/helpers.js'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { createEventDispatcher, afterUpdate } from 'svelte'

  export let journal
  export let journalTitleFromMMDD
  export let currentJournalEntryMMDD
  export let willMusicAutoplay

  let isJournalPopupOpen = false
  let localTitle = ''
  let localValue = ''
  let cursorPos

  const dispatch = createEventDispatcher()

  const debouncedSaveJournalPage = _.debounce(saveJournalPage, 500)
  const debouncedSaveJournalEntryTitle = _.debounce(saveJournalEntryTitle, 500) 

  onMount(() => {
    createTodayJournal()
    localValue = journal[currentJournalEntryMMDD]

    if (journalTitleFromMMDD) {
      if (journalTitleFromMMDD[currentJournalEntryMMDD]) {
        localTitle = journalTitleFromMMDD[currentJournalEntryMMDD] 
      }
    }
  })

  // after each major debounced update on `journal`, we manually restore the cursor position to where it was
  $: restoreCursorPos (journal)  

  function restoreCursorPos (journal) {
    if (cursorPos) {
      const Elem = document.getElementById(currentJournalEntryMMDD)
      Elem.selectionEnd = cursorPos
    }
  }

  // checks if it exists already for today's date, if not it will initialize a new 
  // journal as empty string''
  function createTodayJournal () {
    if (!journal) { // backwards compatibility
      journal = {}
    }
    else {
      // don't create a blank journal if the journal already exists hence `return` 
      for (const journalDates of Object.keys(journal)) {
        if (journalDates === currentJournalEntryMMDD) {
          return
        }
      }
    }
    saveJournalPage()
  }

  function saveJournalEntryTitle () {
    dispatch('journal-entry-title-update', { entryMMDD: currentJournalEntryMMDD, newTitle: localTitle })
  }

  function saveJournalPage () {
    journal[currentJournalEntryMMDD] = localValue
    dispatch('journal-update', { newJournal: journal })
  }

  function handleTitleInput (e) {
    localTitle = e.target.value
    debouncedSaveJournalEntryTitle()
  }

  function handleInput (e) {
    const relevantInputElement = document.getElementById(currentJournalEntryMMDD)
    cursorPos = relevantInputElement.selectionStart
    localValue = e.target.value
    debouncedSaveJournalPage()
  }
</script>

<style>
  .reset-input {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
  }

  ::-webkit-scrollbar {
    width: 0px;
  }
</style>