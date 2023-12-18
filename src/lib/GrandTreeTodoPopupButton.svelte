<span on:click={() => setIsPopupOpen({ newVal: true })} class="material-symbols-outlined my-float" style="font-size: 42px; color: rgb(20, 20, 20); cursor: pointer; margin-left: -4px;">
  summarize
</span>

{#if isPopupOpen}
  <div id="detailed-card" style="padding: 24px; padding-top: 0px;" bind:this={elem} use:clickOutside on:click_outside={handleClickOutside}>    
    <div style="display: flex; justify-content: space-around; align-items: start; margin-left: 56%;">
      <span class="material-symbols-outlined my-float" style="font-size: 42px; color: rgb(20, 20, 20); cursor: pointer; margin-left: -4px;">
        summarize
      </span>

      <div>
        <GrandTreeTodoReusableList
          listTitle="TODAY"
          {allIncompleteTasks}
          dueInHowManyDays={1}
          on:task-dragged
        />  
      </div>

      <div>
        <GrandTreeTodoReusableList
          listTitle="THIS WEEK"
          {allIncompleteTasks}
          dueInHowManyDays={7}
          on:task-dragged
        />  
      </div>

      <div>
        <GrandTreeTodoReusableList
          listTitle="THIS MONTH"
          {allIncompleteTasks}
          dueInHowManyDays={30}
          on:task-dragged
        />  
      </div>

      <div>
        <slot>
          <!-- GrandTreeTodo will be injected via the parent,, so no interface will need to be changed -->
        </slot>
      </div>
    </div>
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside, getDateInDDMMYYYY, getCurrentTimeInHHMM } from '/src/helpers.js'
import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'

export let listTitle
export let taskObject 
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

#detailed-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  overflow-x: auto;
  z-index: 5;
  min-width: 300px;
  width: 96%;
  height: 96%;
  border-radius: 36px;
  background-color: white;

/*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  padding: 6px;
}
</style>