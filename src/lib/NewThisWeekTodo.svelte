<GrandTreeTodoReusableList
  listTitle="THIS WEEK'S TO-DO"
  allTasksDue={$inclusiveWeekTodo}
  dueInHowManyDays={7}
  style="padding-top: var(--main-content-top-margin); background-color: var(--todo-list-bg-color); border-radius: 16px; outline: 0px solid red; height: 100%;"
  willShowCheckbox={false}
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