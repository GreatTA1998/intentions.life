<div style="display: flex; align-items: center;">
  <span class="material-symbols-outlined my-float" 
    style="font-size: 32px; cursor: pointer;"
    on:click={() => isJournalPopupOpen = !isJournalPopupOpen}
    class:blue-focus={isJournalPopupOpen}
  >
    auto_stories
  </span>

    <!-- color: #091346 -->
  <div style="font-size: 28px; font-weight: 500; margin-left: 12px;">
    {convertMMDDToReadableMonthDayForm(todayMMDD)}
  </div>
</div>


<div style="margin-bottom: 18px;"></div>

<!-- rgb(36, 33, 33) -->
<textarea 
  value={journal[todayMMDD]}
  on:input={handleInput}
  id={todayMMDD}
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

  let isJournalPopupOpen = false
  let localValue = ''
  let cursorPos

  const dispatch = createEventDispatcher()
  const todayMMDD = getDateInMMDD(new Date())
  const debouncedSaveJournalPage = _.debounce(saveJournalPage, 500)

  onMount(() => {
    createTodayJournal()
    localValue = journal[todayMMDD]
  })

  // after each major debounced update on `journal`, we manually restore the cursor position to where it was
  $: restoreCursorPos (journal)  

  function restoreCursorPos (journal) {
    if (cursorPos) {
      const Elem = document.getElementById(todayMMDD)
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
      for (const journalDates of Object.keys(journal)) {
        if (journalDates === todayMMDD) {
          return
        }
      }

    }
    journal[todayMMDD] = ''
    saveJournalPage()
  }

  function saveJournalPage () {
    journal[todayMMDD] = localValue
    dispatch('journal-update', { newJournal: journal })
  }

  function handleInput (e) {
    const relevantInputElement = document.getElementById(todayMMDD)
    cursorPos = relevantInputElement.selectionStart
    localValue = e.target.value
    debouncedSaveJournalPage()
  }
</script>
