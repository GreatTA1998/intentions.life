<slot name="button-slot" setIsPopupOpen={setIsPopupOpen}>
  <span on:click={() => setIsPopupOpen({ newVal: true })} class="material-symbols-outlined my-float" style="font-size: 32px; color: rgb(20, 20, 20); cursor: pointer; margin-left: -4px;">
    summarize
  </span>
</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer" on:click|self={handleClickOutside}>
    <div class="grand-tree-todo-popup" bind:this={elem}>
      <div style="display: flex; height: 100%; overflow-y: auto;">
        <GrandTreeTodoReusableList style="background-color: white; border-radius: 30px; {todoListCSSValues}"
          listTitle="THIS LIFE"
          allTasksDue={[...$allTasksDueThisLife, ...$allTasksDueThisYear]}
          dueInHowManyDays={365}
          enableScrolling
          hasMaxWidth
          on:new-root-task
          on:task-unscheduled
          on:subtask-create
          on:task-click
          on:task-dragged
          on:task-checkbox-change
        >
          <GrandTreeTodoReusableList
            style="border-radius: 24px; background-color: hsl(100deg 66.53% 95.74%); {todoListCSSValues}"
            listTitle="THIS MONTH"
            allTasksDue={$allTasksDueThisMonth}
            dueInHowManyDays={30}
            enableScrolling
            hasMaxWidth
            on:new-root-task
            on:task-unscheduled
            on:subtask-create
            on:task-click
            on:task-dragged
            on:task-checkbox-change
          >   
            <GrandTreeTodoReusableList
              listTitle="THIS WEEK"
              allTasksDue={$allTasksDueThisWeek}
              dueInHowManyDays={7}
              style="background-color: var(--todo-list-bg-color); border-radius: 18px; {todoListCSSValues}"
              enableScrolling
              hasMaxWidth
              on:new-root-task
              on:task-unscheduled
              on:subtask-create
              on:task-click
              on:task-dragged
              on:task-checkbox-change
            > 
                <GrandTreeTodoReusableList
                  listTitle="TODAY" 
                  allTasksDue={$allTasksDueToday}
                  dueInHowManyDays={1}
                  style="background-color: #4d6c4d; color: white; border-radius: 12px; {todoListCSSValues} "
                  enableScrolling
                  hasMaxWidth
                  on:new-root-task
                  on:task-unscheduled
                  on:subtask-create
                  on:task-click
                  on:task-dragged
                  on:task-checkbox-change
                />  
            </GrandTreeTodoReusableList>
          </GrandTreeTodoReusableList>  
        </GrandTreeTodoReusableList>
      </div>
    </div>
  </div>
{/if}

<script>
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
  import _ from 'lodash'
  import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'
  import { allTasksDueToday, allTasksDueThisWeek, allTasksDueThisMonth, allTasksDueThisYear, allTasksDueThisLife } from '/src/store.js'

  const dispatch = createEventDispatcher()
  const todoListCSSValues = `
    display: flex; 
    gap: 1vw;
    justify-content: space-evenly; 
    padding: 2vh 1.5vw; 
    height: 100%;
  `

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
  .grand-tree-todo-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    /* z-index 3 because the base calendar uses z-index 0, 1, 2 */
    z-index: 3;
    min-width: 300px;
    width: 100vw;
    height: 80%;

    border-radius: 30px;
    background-color: white;

  /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }
</style>