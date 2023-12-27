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
  bind:value={journal[todayMMDD]}
  on:input={handleInput}
  class="reset-textarea" 
  name="hide" placeholder="Write anything..." 
  style="color: white; background-color: transparent; width: 100%; height: 90%; font-size: 16px;"
/>

<script>
  import { convertMMDDToReadableMonthDayForm, getDateInMMDD } from '/src/helpers.js'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  export let journal

  let isJournalPopupOpen = false

  const dispatch = createEventDispatcher()
  const todayMMDD = getDateInMMDD(new Date())
  // const throttledSaveJournalPage = _.throttle(saveJournalPage, 500)
  const debouncedSaveJournalPage = _.debounce(saveJournalPage, 500)

  onMount(() => {
    createTodayJournal()
  })

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
    dispatch('journal-update', { newJournal: journal })
  }

  // make it debounce
  function handleInput (e) {
    journal[todayMMDD] = e.target.value
    debouncedSaveJournalPage()
  }
</script>
