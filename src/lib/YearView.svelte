<div>
  <div style="display: flex; align-items: center; margin-left: 24px; margin-top: 16px;">
    <div style="min-width: 160px; font-weight: 600; font-size: 20px;">
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

  <div style="margin-left: 24px; margin-top: 6px; font-weight: 400; color: rgb(80, 80, 80); font-size: 12px;">
    This page displays every task with deadlined subtasks, from longest horizon to shortest horizon. 
  </div>

  <div style="display: flex; flex-wrap: no-wrap; overflow-x: auto; padding-left: 24px; padding-top: 6px; height: fit-content;">
    <FutureOverview
      {futureScheduledTasks}
      on:task-duration-adjusted
      on:task-click
    />

    {#each $longHorizonTasks as longHorizonTask}
      <div style="width: 240px; position: relative; outline: 0px solid red; padding: 12px; overflow-y: hidden; overflow-x: hidden; margin-bottom: 12px;">
        <div class="simple-flex" style="margin-bottom: 6px;">
          <div on:click={() => dispatch('task-click', { task: { rootAncestor: longHorizonTask, ...longHorizonTask } })} class="truncate-to-one-line" style="cursor: pointer; font-weight: 600;">
            {longHorizonTask.name}
          </div>

          <ReusableNewSubtaskComponent
            parentID={longHorizonTask.id}
            on:subtask-create
          />
        </div>
    
        <div style="border-left: 1px solid rgb(200, 200, 200); height: {computeOffset(longHorizonTask)}px; margin-left: 48px; position: relative;">
          {#each longHorizonTask.children as child}
            <div style="font-size: 12px; position: absolute; top: {computeOffset(child)}px; right: 48px; width: 100%; outline: 0px solid red;">
              {readable(child.deadlineDate)}
            </div>

            <div style="position: absolute; top: {computeOffset(child) - 3}px; left: -4px;"> 
              -
            </div>

            <div 
              on:click={() => dispatch('task-click', { task: { rootAncestor: longHorizonTask, ...child } })}
              class="truncate-to-one-line"
              style="width: 100%; font-size: 12px; position: absolute; top: {computeOffset(child)}px; left: 10px; cursor: pointer;"
            >
              {child.name}
            </div>
          {/each}
        </div>

        <div style="font-size: 12px; right: 48px; width: 100%; outline: 0px solid red;">
          {readable(longHorizonTask.deadlineDate)}
        </div>
      </div>
    {/each}
  </div>
</div>


<script>
  import { longHorizonTasks } from '/src/store.js'
  import { 
    convertMMDDToReadableMonthDayForm,
    convertDDMMYYYYToDateClassObject,
    computeDayDifference
  } from '/src/helpers/everythingElse.js'
  import { createEventDispatcher } from 'svelte'
  import { 
    getRandomID,
    getDateInDDMMYYYY, 
    getTimeInHHMM
  } from '/src/helpers/everythingElse.js'
  import UXFormField from '$lib/UXFormField.svelte'
  import ReusableNewSubtaskComponent from '$lib/ReusableNewSubtaskComponent.svelte'
  import FutureOverview from '$lib/FutureOverview.svelte'

  export let futureScheduledTasks

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

    const pixelsPerDay = 12
    const offset = dayDiff * pixelsPerDay

    return offset
  }

  // give it the #1 task's deadline, so won't appear in the back
  function createNewLongHorizonTask (e) {
    if (newRootTaskName === '') {
      isCreatingRootTask = false 
    }

    else {
      const rootTaskID = getRandomID()
      const d = new Date()
      d.setFullYear(d.getFullYear() + 1)

      const newRootTaskObj = {
        deadlineTime: getTimeInHHMM({ dateClassObj: d }),
        deadlineDate: getDateInDDMMYYYY(d),
        id: rootTaskID, 
        name: newRootTaskName,
        parentID: '',
      }

      createDefaultSubtask(rootTaskID)

      dispatch('new-root-task', newRootTaskObj)
      isCreatingRootTask = false 
      newRootTaskName = ''
    }
  }

  function createDefaultSubtask (rootTaskID) {
    const defaultSubtask = {
      parentID: rootTaskID,
      name: 'Edit this default milestone',
      id: getRandomID()
    }

    const d = new Date()
    d.setMonth(d.getMonth() + 1)
    defaultSubtask.deadlineDate = getDateInDDMMYYYY(d)
    defaultSubtask.deadlineTime = getTimeInHHMM({ dateClassObj: d })

    dispatch('subtask-create', {
      id: defaultSubtask.id,
      parentID: rootTaskID,
      newTaskObj: defaultSubtask
    })
  }
</script>

