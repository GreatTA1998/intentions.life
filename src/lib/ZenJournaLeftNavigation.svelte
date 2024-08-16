
<div style="height: 100%; overflow-y: auto;">
  {#each sortedJournalDates as date}
    <div on:click={() => dispatch('journal-entry-select', { newMMDD: date })} 
      class="drawer-item"
      style="align-items: center; width: 100%; font-size: 16px; padding: 10px 8px;" 
      class:blue-highlight={date === currentJournalEntryMMDD}
    >
      <div style="opacity: 0.8; font-weight: 300; font-size: 12px; margin-top: 1px;">
        {convertMMDDToReadableMonthDayForm(date)}
      </div>
    {#if journalTitleFromMMDD}
      {#if journalTitleFromMMDD[date]}
        <div style="font-weight: 400;">
        {journalTitleFromMMDD[date]}
        </div>
      {/if}
    {/if}
    </div>
    <div style="margin-bottom: 6px;"></div>
  {/each}
</div>

<script>
  export let journal
  export let journalTitleFromMMDD 
  export let currentJournalEntryMMDD

  import { getDateOfToday, getRandomID, clickOutside, convertMMDDToReadableMonthDayForm } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'

  $: sortedJournalDates = [...Object.keys(journal)].sort()
  
  const dispatch = createEventDispatcher()
</script>

<style>
  .blue-highlight {
    font-weight: 600;
    font-size: 16px;
    background-color: hsla(0, 0%, 0%, 0.346);
    /* border: 1px solid rgb(200, 200, 200); */
    border-radius: 4px; 
    /* color: #0085FF; */
  }

  ::-webkit-scrollbar {
    width: 0px;
  }
</style>
