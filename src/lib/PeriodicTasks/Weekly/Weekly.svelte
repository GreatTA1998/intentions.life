<script>
  import AddWeekly from './AddWeekly.svelte'
  import PeriodicTasks from '/src/back-end/PeriodicTasks.js'
  import WeeklyPopup from './weeklyPopup.svelte'
  import ReusableSimpleDropzone from '../../ReusableSimpleDropzone.svelte'
  import { user, periodicTasks } from '/src/store.js'
  const weeklyTaskWidthInPx = 180
  const dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  let draggedTemplate
  $: weeklyTasks = $periodicTasks
    .filter((task) => PeriodicTasks.getPeriod(task) === 'weekly')
    .sort((a, b) => a.orderValue - b.orderValue)

  function handleDrop(newOrderValue) {
    PeriodicTasks.updateTemplate({
      userID: $user.uid,
      id: draggedTemplate.id,
      updates: { orderValue: newOrderValue }
    })
    $periodicTasks = $periodicTasks
      .map((task) => {
        if (task.id === draggedTemplate.id) {
          return { ...task, orderValue: newOrderValue }
        }
        return task
      })
      .sort((a, b) => a.orderValue - b.orderValue)
  }
</script>

<div>
  <div style="font-size: 24px; margin-bottom: 12px;">
    Weekly
    <AddWeekly let:setIsPopupOpen defaultOrderValue={weeklyTasks.length}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        on:click={() => setIsPopupOpen({ newVal: true })}
        class="add-reusable-task-button"
      >
        +
      </span>
    </AddWeekly>
  </div>

  {#each weeklyTasks as weeklyTask, i (weeklyTask.id)}
    {#if i === 0}
      <ReusableSimpleDropzone
        on:new-order-value={(e) => handleDrop(e.detail)}
        aboveOrder={0}
        belowOrder={weeklyTasks[0].orderValue}
      />
      <!-- general case drop-zone: must be between 2 tasks-->
    {:else if i > 0 && i < weeklyTasks.length}
      <ReusableSimpleDropzone
        on:new-order-value={(e) => handleDrop(e.detail)}
        aboveOrder={weeklyTasks[i - 1].orderValue}
        belowOrder={weeklyTasks[i].orderValue}
      />
    {/if}

    <WeeklyPopup let:setIsPopupOpen weeklyTask={weeklyTask}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => setIsPopupOpen({ newVal: true })}
        style="display: flex; align-items: center; cursor: pointer;"
        draggable="true"
        on:dragstart|self={(e) => (draggedTemplate = weeklyTask)}
      >
        {#if weeklyTask.iconUrl}
          <!-- svelte-ignore a11y-missing-attribute -->
          <img src={weeklyTask.iconUrl} style="width: 60px; height: 60px;" />
        {:else}
          <div style="width: 60px; height: 60px" />
        {/if}

        <div style="width: {weeklyTaskWidthInPx}px;">
          <div style="font-size: 16px; font-color: rgb(120, 120, 120)">
            {weeklyTask.name}
          </div>

          <div style="display: flex; margin-top: 4px;">
            {#each dayOfWeekSymbol as _, i}
              <div class="day-of-week-circle" />
            {/each}
          </div>
        </div>
        <!-- class:highlighted={weeklyTask.repeatOnDayOfWeek[i]} -->

        <!-- Time spent statistics -->
        <!-- {#if getStatsFromTaskID[weeklyTask.id]}
          <div style="margin-left: 8px;">
            <div
              style="display: flex; align-items: center; margin-top: 8px;
              margin-bottom: 0px;">
              {#each { length: getStatsFromTaskID[weeklyTask.id].frequency } as _, i}
                <div
                  style="background: green; border-radius: 4px; width: {getDisplayLength(weeklyTask)}px;
                  height: 3px; margin-right: 2px;" />
              {/each}
            </div>
            <div
              style="font-weight: 400; font-size: 14px; margin-top: 8px; color:
              green">
              {getStatsFromTaskID[weeklyTask.id].hourDuration} hr
            </div>
          </div>
        {/if} -->
      </div>
    </WeeklyPopup>

    {#if i === weeklyTasks.length - 1}
      <ReusableSimpleDropzone
        on:new-order-value={(e) => handleDrop(e.detail)}
        aboveOrder={weeklyTasks[i].orderValue}
        belowOrder={weeklyTasks[i].orderValue + 1}
      />
    {/if}
  {/each}
</div>
