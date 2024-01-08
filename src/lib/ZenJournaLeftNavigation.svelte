
{#each sortedJournalDates as date}
  <div on:click={() => dispatch('journal-entry-select', { newMMDD: date })} 
    class="drawer-item"
    style="display: flex; align-items: center; width: 100%; font-size: 16px; padding: 6px;" 
    class:blue-highlight={date === currentJournalEntryMMDD}
  >
    <div style="opacity: 0.8;">{convertMMDDToReadableMonthDayForm(date)}</div>
  {#if journalTitleFromMMDD}
    {#if journalTitleFromMMDD[date]}
      <div style="font-weight: 500;">
      :{' ' + journalTitleFromMMDD[date]}
      </div>
    {/if}
  {/if}
  </div>
  <div style="margin-bottom: 6px;"></div>
{/each}

<script>
  export let journal
  export let journalTitleFromMMDD 
  export let currentJournalEntryMMDD

  import { getDateOfToday, getRandomID, clickOutside, convertMMDDToReadableMonthDayForm } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'

  $: sortedJournalDates = [...Object.keys(journal)].sort()

  let currentlySelectedDate = getDateOfToday()
  const dispatch = createEventDispatcher()
</script>

<style>
  .blue-highlight {
    font-weight: 600;
    font-size: 16px;
    background-color: none;
    border: 2px solid rgb(200, 200, 200);
    border-radius: 4px; 
    /* color: #0085FF; */
  }
</style>
