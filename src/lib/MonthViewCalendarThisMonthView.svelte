<div id="scroll-container" style="position: relative; width: 13vw">
  <div id="calendar-month-container" 
    style="height: {pixelsPerWeek * numOfWeekBlocksDisplayed}px; 
      font-family: Roboto, sans-serif; 
      margin-bottom: 1px; 
      color: #6D6D6D;
    "
    on:drop={(e) => drop_handler(e)}
    on:dragover={(e) => dragover_handler(e)}
  >

    {#if weeksOfMonth}
      {#each weeksOfMonth as dayOfWeek, i}
        <div class="timestamp-number" style="top: {-6 + 6 + (pixelsPerWeek * i)}px;">
          {dayOfWeek}
        </div>
      {/each}
    {/if}

    <!-- important: this offsets the fact that the timestamp needs a -6 margin to not be cut off from the top edge of the container -->
    <div style="margin-top: 6px;"></div>

    {#each {length: 60 * numOfWeekBlocksDisplayed} as _, i}
      <div 
        class:visible-line={(i % 60) === 0}
        style="height: {pixelsPerWeek / 60}px; box-sizing: border-box; margin-right: 0; margin-left: auto; width: 82%"
        class:highlighted-background={highlightedMinute === i}
        on:dragenter={() => highlightedMinute = i}
        on:dragend={() => console.log('dragend') }
        on:dragover={(e) => dragover_handler(e)}
      >
      </div>
    {/each}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getDateInMMDD, getDateOfToday, getTrueY } from '../helpers.js'
  import WeekViewTaskElement from './WeekViewTaskElement.svelte'

  export let scheduledTasksThisMonth
  export let pixelsPerWeek

  let weeksOfMonth = ['week 1/4', 'week 2/4', 'week 3/4', 'week 4/4']
  const dispatch = createEventDispatcher()
  const numOfWeekBlocksDisplayed = 4

  let highlightedMinute = null

  function dragover_handler (e) {

  }

  function drop_handler (e) {

  }

  function drag_handler (e) {

  }


</script>

<style>
  /* Notion scrollbar styles */
  ::-webkit-scrollbar {
    background: transparent;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #D3D1CB;
  }
  ::-webkit-scrollbar-track {
    background: #EDECE9;
  }
  
  * {
    box-sizing: border-box;
  }
  
  
  .highlighted-background {
    background: rgb(82, 180, 251);
  }
  
  /* 
    You need the relative scrolling container to be different from `calendar-month-container`,
    so the absolute positionings will count from the right place (no need to fully understand yet) 
  
    height: 200% is just so it's high enough to contain all the absolute elements
  
    without border-box, the padding on top will add ON TOP OF 100% height  
  */
  @media only screen and (max-width : 480px) {
    #scroll-container {
      width: 200px;
    }
    #calendar-month-container {
      width: 100px;
    }
  }
  
  @media only screen and (min-width : 480px) {
    #scroll-container {
      width: 12vw;
    }
    #calendar-month-container {
      width: 12vw;
    }
  } 
  
  
  #scroll-container {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    /* padding-top: 22px;  */
    box-sizing: border-box;
  }
  
    .green-text {
      color: #0085FF;
    }
  
    .red-text {
      font-family: Roboto, Arial,sans-serif;
      color: red;
    }
  
    /* VERDICT: absolute works
    "Independence" is the best word you can ever hear in programming */
    .timestamp-number {
      top: -5px; 
      margin-right: 4px;
      font-size: 0.7rem;
  
      /* these CSS properties are copied from `.calendar-time-block`, which used to be separate */
      position: absolute;
      /* height: 90px;
      width: 100%; */
    }
  
    .visible-line {
      border-top: 1px solid rgb(195, 195, 195);
    }
  </style>