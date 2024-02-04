<GrandTreeTodoReusableList
  listTitle="TO-DO"
  allTasksDue={$allTasksDueThisWeek}
  dueInHowManyDays={7}
  style="background-color: var(--todo-list-bg-color); border-radius: 16px; outline: 0px solid red;"
  on:new-root-task
  on:task-unscheduled
  on:subtask-create
  on:task-click
  on:task-dragged
  on:task-checkbox-change
> 
  <div slot="below-list-title">
    <!-- <GrandTreeTodoReusableList
      listTitle="TODAY" 
      allTasksDue={$allTasksDueToday}
      dueInHowManyDays={1}
      style="background-color: #4d6c4d; color: white; height: fit-content; border-radius: 12px;"
      on:new-root-task
      on:task-unscheduled
      on:subtask-create
      on:task-click
      on:task-dragged
      on:task-checkbox-change
    />   -->
  </div>
</GrandTreeTodoReusableList>

<script>
  import GrandTreeTodoReusableList from '$lib/GrandTreeTodoReusableList.svelte'
  import { allTasksDueThisWeek, allTasksDueToday } from '/src/store.js'
</script>