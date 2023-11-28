<div style="font-size: 28px; font-weight: 500; color: #091346">
  {convertMMDDToReadableMonthDayForm(todayMMDD)}
</div>

<div style="margin-bottom: 18px;"></div>

<textarea 
  bind:value={journal[todayMMDD]}
  on:input={handleInput}
  class="reset-textarea" 
  name="hide" placeholder="Write anything..." 
  style="background-color: transparent; width: 100%; height: 90%; font-size: 16px; color: rgb(36, 33, 33)"
/>

<script>
  import { convertMMDDToReadableMonthDayForm, getDateInMMDD } from '/src/helpers.js'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  export let journal

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
    dispatch('journal-update', journal)
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
