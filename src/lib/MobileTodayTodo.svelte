<!-- background-color: var(--todo-list-bg-color);  -->
<GrandTreeTodoReusableList
  listTitle="TO-DO"
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
  on:new-root-task
  on:task-unscheduled
  on:subtask-create
  on:task-click
  on:task-dragged
  on:task-checkbox-change
/>

<script>
  import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'
  import { inclusiveWeekTodo } from '/src/store.js'
</script>