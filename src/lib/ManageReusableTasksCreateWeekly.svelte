<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={() => isPopupOpen = false}>
    <div class="detailed-card-popup">
      <input 
        type="text" 
        bind:value={newTaskName} 
        placeholder="Untitled"
        style="margin-left: 12px; width: 100%; font-size: 24px;"
        class="title-underline-input"
        autofocus
      >
      
      <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 16px;">
        <ReusableRoundButton on:click={createWeeklyTemplate}
          backgroundColor="rgb(0, 89, 125)" textColor="white"
        >
          Create template
        </ReusableRoundButton>
      </div>
    </div>
  </div>
{/if}

<script>
  import { 
    getRandomID, 
  } from '/src/helpers/everythingElse.js'
  import { 
    setFirestoreDoc, 
  } from '/src/helpers/crud.js'
  import { user } from '/src/store.js'
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
  import _ from 'lodash'

  export let defaultOrderValue = 1

  //// IMPORTANT
  // `repeatGroupID`: used for modifying instances of a repeating task (name is for legacy reasons)
  // `reusableTemplateID`: for collecting statistics for a task (no reason why it must be this way, it's just legacy reasons)
  
  let isPopupOpen = false
  let newTaskName = ''

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  function createWeeklyTemplate () {
    const id = getRandomID()

    setFirestoreDoc(`/users/${$user.uid}/periodicTasks/${id}`, {
      name: newTaskName,
      repeatOnDayOfWeek: Array(7).fill(0),
      numOfWeeksInAdvance: 2,
      repeatGroupID: id,
      reusableTemplateID: id,
      duration: 5,
      orderValue: defaultOrderValue + Math.random() * 0.5
    })

    newTaskName = ''
    isPopupOpen = false
  }
</script>

<style>
  .title-underline-input {
     /* Refer to: https://stackoverflow.com/a/3131082/7812829 */
    background: transparent;
    border: none;
    border-bottom: 1px solid #DBDBDD;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    padding-left: 0px;
    padding-bottom: 6px;
  }

  .detailed-card-popup {
    position: fixed;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 58%;
    overflow-y: auto;
    z-index: 3;
    min-width: 360px;
    
    height: fit-content;

    padding: 24px;
    border-radius: 24px;
    background-color: white;
 
  /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }
</style>