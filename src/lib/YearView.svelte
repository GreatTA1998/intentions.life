<div>
  <div style="display: flex; align-items: center; margin-left: 24px; margin-top: 48px;">
    <div style="min-width: 160px; font-weight: 600; font-size: 24px;">
      Long-horizon tasks
    </div>

    <div on:click={() => isCreatingRootTask = true} class="new-task-icon" style="margin-bottom: 4px; margin-left: 6px;">
      +
    </div>

    {#if isCreatingRootTask}
      <UXFormField
        fieldLabel="Task Name (long horizon)"
        value={newRootTaskName}
        on:input={(e) => {
          newRootTaskName = e.detail.value;
        }}
        on:focus-out={() => {
          if (newRootTaskName === '') {
            isCreatingRootTask = false
          }
        }}
        on:task-entered={(e) => createNewLongHorizonTask(e)}
      />
    {/if}
  </div>

  <div style="margin-left: 24px; margin-top: 6px; font-weight: 400; color: rgb(80, 80, 80)">
    All tasks with deadlined subtasks will be shown below.
    Drag-and-drop is not yet supported, but you can change task deadlines by clicking its name.
  </div>

  <div style="display: flex; flex-wrap: no-wrap; overflow-x: auto; padding-left: 48px; padding-top: 36px; height: 600%">
    {#each $longHorizonTasks as task}
      <div style="min-width: 280px; position: relative; outline: 0px solid red; padding: 12px; margin-right: 48px; overflow-y: hidden; overflow-x: hidden; margin-bottom: 12px;">
        <div class="simple-flex" style="margin-bottom: 6px;">
          <div on:click={() => dispatch('task-click', { task })} style="cursor: pointer; font-weight: 600;">
            {task.name}
          </div>

          <div class="new-task-icon" style="margin-bottom: 6px;">
            +
          </div>
        </div>

        <div style="border-left: 1px solid rgb(200, 200, 200); height: {computeOffset(task)}px; margin-left: 48px; position: relative;">
          {#each task.children as child}
            <div style="font-size: 12px; position: absolute; top: {computeOffset(child)}px; right: 48px; width: 100%; outline: 0px solid red;">
              {readable(child.deadlineDate)}
            </div>

            <div style="position: absolute; top: {computeOffset(child) - 3}px; left: -4px;"> 
              -
            </div>

            <div 
              on:click={() => dispatch('task-click', { task: child })}
              style="font-size: 12px; position: absolute; top: {computeOffset(child)}px; left: 10px; cursor: pointer;"
            >
              {child.name}
            </div>
          {/each}
        </div>

        <div style="font-size: 12px; right: 48px; width: 100%; outline: 0px solid red;">
          {readable(task.deadlineDate)}
        </div>
      </div>
    {/each}
  </div>
</div>
<!-- 
<div>
  Optional: aggregation for one-off deadlines with no tree branches
</div>

<div>
  Optional: aggregation calendar
</div> -->

<script>
  import { longHorizonTasks } from '/src/store.js'
  import { 
    convertMMDDToReadableMonthDayForm,
    convertDDMMYYYYToDateClassObject,
    computeDayDifference
  } from '/src/helpers.js'
  import { createEventDispatcher } from 'svelte'
  import { getRandomID } from '/src/helpers.js'
  import UXFormField from '$lib/UXFormField.svelte'


  let isCreatingRootTask = false
  let newRootTaskName = ''
  const dispatch = createEventDispatcher()

  function readable (DDMMYYYY) {
    const [dd, mm, yyyy] = DDMMYYYY.split('/')
    return convertMMDDToReadableMonthDayForm(`${mm}/${dd}`)
  }

  function computeOffset ({ deadlineDate, deadlineTime }) {
    const d1 = new Date(`${new Date().getFullYear()}-01-01`)
    const d2 = convertDDMMYYYYToDateClassObject(deadlineDate, deadlineTime)
    const dayDiff = computeDayDifference(d1, d2)

    const pixelsPerDay = 6
    const offset = dayDiff * pixelsPerDay

    return offset
  }

  // create a component that handles its own focus() cycle and unfocus cycle
  // perhaps use


  // give it the #1 task's deadline, so won't appear in the back
  function createNewLongHorizonTask (e) {
    const longestHorizonTask = $longHorizonTasks[0]

    const newRootTaskObj = {
      id: getRandomID(), 
      deadlineDate: longestHorizonTask.deadlineDate,
      deadlineTime: longestHorizonTask.deadlineTime,
      // name: '', // create a simple input
      parentID: '',
    }
  }
</script>

