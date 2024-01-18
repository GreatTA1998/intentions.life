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
          <div style="width: 70%; height: 100%; overflow-y: auto; overflow-x: auto;" class="round-scrollbar">
            <GrandTreeTodoReusableList
              style="display: flex; justify-content: space-between; background-color: hsl(100deg 66.53% 95.74%); border-radius: 24px; width: 100%;"
              listTitle=""
              allTasksDue={$allTasksDueThisMonth}
              dueInHowManyDays={30}
              cheatToAddPadding={true}
              on:new-root-task
              on:task-unscheduled
              on:subtask-create
              on:task-click
              on:task-dragged
            >
              <div slot="alternative-title" let:openNewTaskInput={openNewTaskInput}
                style="display: flex; align-items: center; font-size: 20px; font-weight: 500;"
              >
                THIS MONTH

                <span on:click={openNewTaskInput} class="material-icons" style="margin-left: 6px; cursor: pointer;">
                  add
                </span>
              </div>

              <div slot="above-list-title">
                <GrandTreeTodoReusableList
                  listTitle="THIS WEEK"
                  allTasksDue={$allTasksDueThisWeek}
                  dueInHowManyDays={7}
                  style="background-color: var(--todo-list-bg-color); width: 300px; border-radius: 24px;"
                  on:new-root-task
                  on:task-unscheduled
                  on:subtask-create
                  on:task-click
                  on:task-dragged
                > 
                  <div slot="below-list-title">
                    <GrandTreeTodoReusableList
                      listTitle="TODAY"
                      allTasksDue={$allTasksDueToday}
                      dueInHowManyDays={1}
                      style="background-color: #4d6c4d; color: white; width: 260px; height: fit-content;"
                      on:new-root-task
                      on:task-unscheduled
                      on:subtask-create
                      on:task-click
                      on:task-dragged
                    />  
                  </div>
                </GrandTreeTodoReusableList>
              </div>
            </GrandTreeTodoReusableList>  
          </div>

          <div style="width: 30%; height: 100%; overflow-x: auto; opacity: 0.8;">
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
  import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'
  import { allTasksDueToday, allTasksDueThisWeek, allTasksDueThisMonth } from '/src/store.js'

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
  width: 96%;
  height: 90%;

  /* 12px (todo list radius) + 12px (padding) for concentric border radii */
  padding: 16px; 
  border-radius: 40px;
  background-color: white;

/*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
}
</style>