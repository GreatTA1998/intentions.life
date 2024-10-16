<GrandTreeTodoReusableList
  listTitle=""
  allTasksDue={$inclusiveWeekTodo}
  dueInHowManyDays={7}
  style="
    background-color: transparent;
    padding-top: var(--main-content-top-margin); 
    border-radius: 16px; 
    height: 2400px;
  "
  willShowCheckbox={false}
  isLargeFont={true}
  isRecursive={false}
  on:new-root-task
  on:task-unscheduled
  on:subtask-create
  on:task-click
  on:task-dragged
  on:task-checkbox-change
  let:startTypingNewTask={startTypingNewTask}
>
  <div on:click={startTypingNewTask} class="floating-button" style="font-size: 48px;">
    <span id="startButton" class="material-symbols-outlined" style="font-size: 48px; font-weight: 600;">
      add
    </span>
  </div>
</GrandTreeTodoReusableList>

<script>
  import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'
  import { inclusiveWeekTodo } from '/src/store.js'
</script>

<style>
  .floating-button {
    position: absolute;
    right: 16px;
    bottom: calc(var(--bottom-navbar-height) + 100px);

    border: 4px solid black;
    height: 72px;
    width: 72px;
    border-radius: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>