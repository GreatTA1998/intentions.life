<span on:click={() => setIsPopupOpen({ newVal: true })} class="material-symbols-outlined my-float" style="font-size: 42px; color: rgb(20, 20, 20); cursor: pointer; margin-left: -4px;">
  summarize
</span>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={handleClickOutside}>
    <div class="my-popup" 
      bind:this={elem} 
    >    
      <div style="overflow: auto; height: 100%; width: 100%;">
        <div style="
          display: flex; 
          height: 100%;
          justify-content: space-between; 
          align-items: start;
          flex-wrap: nowrap;
          "
        >
          <div style="width: 20%;">
            <GrandTreeTodoReusableList
              listTitle="TODAY"
              {allIncompleteTasks}
              dueInHowManyDays={1}
              on:new-root-task
              on:task-unscheduled
              on:task-node-update
              on:task-click
              on:task-dragged
            />  

            <!-- 6% height margin looks equivalent to 1% width margin (so separation between all todo lists look equal) -->
            <div style="margin-bottom: 5%;"></div>

            <GrandTreeTodoReusableList
              listTitle="THIS WEEK"
              {allIncompleteTasks}
              dueInHowManyDays={7}
              on:new-root-task
              on:task-unscheduled
              on:task-node-update
              on:task-click
              on:task-dragged
            />  
          </div>

          <div style="width: 20%;  height: 100%; overflow-y: auto;" class="round-scrollbar">
            <GrandTreeTodoReusableList
              listTitle="THIS MONTH"
              {allIncompleteTasks}
              dueInHowManyDays={30}
              on:new-root-task
              on:task-unscheduled
              on:task-node-update
              on:task-click
              on:task-dragged
            />  
          </div>

          <div style="width: 58%; height: 100%; overflow-x: auto;">
            <slot>
              <!-- GrandTreeTodo will be injected via the parent,, so no interface will need to be changed -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY, getCurrentTimeInHHMM } from '/src/helpers.js'
import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'

export let allIncompleteTasks

const dispatch = createEventDispatcher()

let isPopupOpen = false

function setIsPopupOpen ({ newVal }) {
  isPopupOpen = newVal
}

let elem

function handleClickOutside (e) {
  isPopupOpen = false
  dispatch('card-close')
}

onMount(() => {

})

onDestroy(() => {

})
</script>

<style>
.todo-column-title {
  font-size: 20px; 
  font-weight: 500;
}

.my-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* overflow-y: auto;
  overflow-x: auto; */
  
  /* z-index 3 because the base calendar uses z-index 0, 1, 2 */
  z-index: 3;
  min-width: 300px;
  width: 92%;
  height: 88%;

  /* 12px (todo list radius) + 12px (padding) for concentric border radii */
  padding: 24px; 
  border-radius: 36px;
  background-color: white;

/*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
}
</style>