<!--   style="padding: 6px; background-color: white; display: flex; align-items: center; justify-content: center;" -->
<div class:iphone-se-size={isTesting} 
     class:general-mobile-size={!isTesting}
     style="position: relative;"
>
  <div class="page-title">
    My Schedule
  </div>

  <div style="margin-left: 16px; margin-top: 24px;">
    <div style="font-size: 20px;">
      Today
    </div>
    <div style="margin-left: 8px; font-size: 20px;">
      8 pm: call Ben
    </div>
  </div>

  <!-- <FutureOverview
    {futureScheduledTasks}
    on:task-duration-adjusted
    on:task-click
  />
 -->

  <!-- Floating button -->
  <div class="floating-button">
    <span class="material-symbols-outlined" style="font-size: 36px;">
      mic
    </span>
  </div>

  <div style="position: absolute; bottom: 0; width: 100%; height: var(--bottom-navbar-height); display: flex; align-items: center; justify-content: space-between; border: 2px solid black;">
    <div class="bottom-nav-tab" style="border-right: 2px solid black;">
      <span class="material-symbols-outlined nav-tab-icon">
        summarize
      </span>
      <div class="nav-tab-desc">
        to-do
      </div>
    </div>

    <div class="bottom-nav-tab" style="border-left: 2px solid black;">
      <span class="material-symbols-outlined nav-tab-icon">
        contract
      </span>
      <div class="nav-tab-desc">
        schedule
      </div>
    </div>
  </div>
</div>

<script>
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc } from '/src/crud.js'
  import { getRandomID, checkTaskObjSchema, getDateInMMDD, getTimeInHHMM } from '/src/helpers.js'
  import { user } from '/src/store.js'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import FutureOverview from '$lib/FutureOverview.svelte'

  let isTesting = true
  let futureScheduledTasks = null

  onMount(() => {
    // display all the events

    // fetch all the tasks where the startDate and startTime
  })
</script>

<style>
  :root {
    --bottom-navbar-height: 48px;
  }

  .iphone-se-size {
    width: 375px; 
    height: 667px;
    border: 2px solid black;
  }

  .general-mobile-size {
    height: 100vh; 
  }

  .page-title {
    font-size: 24px;
    font-weight: 500;

    margin: 16px;
  }

  .bottom-nav-tab {
    display: flex; 
    align-items: center;
    justify-content: center;

    height: 100%;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .nav-tab-desc {
    margin-left: 8px;

    font-size: 20px;
  }

  .nav-tab-icon {
    font-size: 32px;
  }

  .floating-button {
    position: absolute;
    right: 16px;
    bottom: calc(var(--bottom-navbar-height) + 16px);

    border: 2px solid var(--logo-twig-color);
    height: 72px;
    width: 72px;
    border-radius: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>