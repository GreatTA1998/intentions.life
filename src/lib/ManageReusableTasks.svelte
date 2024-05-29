<div style="padding: 48px;">
  <div style="font-size: 32px; margin-bottom: 48px;">
    Reusable Tasks
  </div>

  {#if periodicTasks}
    <div style="display: flex;">
      <div>
        <div style="font-size: 24px; margin-bottom: 12px;">
          Frequent

          <ManageReusableTasksCreateWeekly  
            let:setIsPopupOpen={setIsPopupOpen}
            defaultOrderValue={sortedWeeklyTasks.length}
          >
            <span on:click={() => setIsPopupOpen({ newVal: true })} class="add-reusable-task-button">
              +
            </span>
          </ManageReusableTasksCreateWeekly>
        </div>
      
        <!-- at least requires `periodicTasks` to be an `[]` i.e. loading finished, instead of null -->
        {#each sortedWeeklyTasks as weeklyTask, i}
          {#if i === 0}
            <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={0} belowOrder={sortedWeeklyTasks[0].orderValue} />
          <!-- general case drop-zone: must be between 2 tasks-->
          {:else if i > 0 && i < periodicTasks.length}
            <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={sortedWeeklyTasks[i-1].orderValue} belowOrder={sortedWeeklyTasks[i].orderValue} />
          {/if}

          <div style="display: flex; align-items: center; cursor: pointer;">
            <ManageReusableTasksWeeklyPopup 
              let:setIsPopupOpen={setIsPopupOpen} 
              weeklyTemplate={weeklyTask}
            >
              <div on:click={() => setIsPopupOpen({ newVal: true })} 
                style="margin-left: 8px; display: flex; align-items: center;"
                draggable="true"
                on:dragstart|self={(e) => dragstart_handler(e, weeklyTask)}  
              > 
                {#if weeklyTask.iconDataURL}
                  <img src={weeklyTask.iconDataURL} style="width: 60px; height: 60px;">
                {:else}
                  <div style="width: 60px; height: 60px"></div>
                {/if}

                <div style="width: 180px;">
                  <div style="font-size: 16px; font-color: rgb(120, 120, 120)">
                    <!-- {weeklyTask.orderValue}  -->
                    {weeklyTask.name}
                  </div>

                  <div style="display: flex; margin-top: 4px;">
                    {#each dayOfWeekSymbol as _, i} 
                      <div class="day-of-week-circle" class:highlighted={weeklyTask.repeatOnDayOfWeek[i]}>
                      </div>
                    {/each}
                  </div>
                </div>

                <!-- Time spent statistics -->
                {#if getStatsFromTaskID[weeklyTask.id]}
                  <div style="margin-left: 8px;">
                    <div style="display: flex; align-items: center; margin-top: 8px; margin-bottom: 0px;">
                      {#each {length: getStatsFromTaskID[weeklyTask.id].frequency} as _, i}
                        <div style="background: green; border-radius: 4px; 
                          width: {getDisplayLength(weeklyTask)}px; height: 4px; margin-right: 2px;"></div>
                      {/each}
                    </div>      
                    <div style="font-weight: 400; font-size: 14px;  margin-top: 8px; color: green">
                      {getStatsFromTaskID[weeklyTask.id].hourDuration} hr
                    </div>
                  </div>
                {/if}
              </div>
            </ManageReusableTasksWeeklyPopup>
          </div>

          {#if i === sortedWeeklyTasks.length - 1}
            <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={sortedWeeklyTasks[i].orderValue} belowOrder={sortedWeeklyTasks[i].orderValue + 1}/>
          {/if}
        {/each}
      </div>
      
        <!-- MONTHLY SECTION -->
        <div style="margin-left: 96px;">

        <div style="display: flex; align-items: center;">
          <div style="font-size: 24px;">
            Monthly
          </div>

          <ManageReusableTasksCreateMonthly  
            let:setIsPopupOpen={setIsPopupOpen}
            defaultOrderValue={sortedMonthlyTasks.length}
          >
            <span on:click={() => setIsPopupOpen({ newVal: true })} class="add-reusable-task-button">
              +
            </span>
          </ManageReusableTasksCreateMonthly>
        </div>

        {#each sortedMonthlyTasks as periodicTask, i}
          {#if i === 0}
            <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={0} belowOrder={periodicTasks[0].orderValue} />
          <!-- general case drop-zone: must be between 2 tasks-->
          {:else if i > 0 && i < periodicTasks.length}
            <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={periodicTasks[i-1].orderValue} belowOrder={periodicTasks[i].orderValue} />
          {/if}

          <div class="monthly-periodicity-task" style="margin-top: 12px;">
            <div style="display: flex; align-items: center; position: relative;">
              <div style="position: relative; width: 94px; height: 20px; display: flex; align-items: center;">
                <div style="position: relative; width: 94px; height: 1px; background-color: #ccc; display: flex; align-items: center;">
                  <span class="tick start"></span>
                  <span class="tick end"></span>
                </div>

                <!-- orange circle dots -->
                <div style="position: absolute; display: flex; width: 90px; outline: 0px solid red; align-items: center;">
                  {#each Array(27) as _, i}
                    {#if periodicTask.repeatOnDayOfMonth[i]}
                      <div style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                          position: absolute; 
                          left: {3 * i}px
                        "
                        class="highlighted"
                      >
                      </div>
                    {/if}
                  {/each}
                  
                  {#if periodicTask.willRepeatOnLastDay}
                    <div 
                      style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                        position: absolute; left: {3 * 30}px
                      "
                      class="highlighted"
                    >
                    </div>
                  {/if}
                </div>
              </div>
              <!-- end of visual representation -->

              <ManageReusableTasksMonthlyPopup 
                let:setIsPopupOpen={setIsPopupOpen} 
                isEditVersion={true} 
                monthlyPeriodicTemplate={periodicTask}
              >
                <div
                  on:click={() => setIsPopupOpen({ newVal: true })}  style="margin-left: 12px; cursor: pointer;"
                  draggable="true"
                  on:dragstart|self={(e) => dragstart_handler(e, periodicTask)}
                >
                  {periodicTask.name}
                </div>
              </ManageReusableTasksMonthlyPopup>
            </div>
          </div>

          {#if i === periodicTasks.length - 1}
            <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={periodicTasks[i].orderValue} belowOrder={periodicTasks[i].orderValue + 1}/>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<script>
  import ManageReusableTasksMonthlyPopup from '$lib/ManageReusableTasksMonthlyPopup.svelte'
  import ManageReusableTasksWeeklyPopup from '$lib/ManageReusableTasksWeeklyPopup.svelte'
  import ManageReusableTasksCreateWeekly from '$lib/ManageReusableTasksCreateWeekly.svelte'
  import ManageReusableTasksCreateMonthly from '$lib/ManageReusableTasksCreateMonthly.svelte'
  import ReusableSimpleDropzone from '$lib/ReusableSimpleDropzone.svelte'
  import { updateFirestoreDoc, deleteFirestoreDoc } from '/src/crud.js'
  import { onMount, onDestroy } from 'svelte'
  import { user } from '/src/store.js'
  import { collection, onSnapshot } from 'firebase/firestore'
  import db from '/src/db.js'
  import { applyFuncToEveryTreeNode, round } from '/src/helpers.js'

  export let allTasks // needed for TimeSpent dashboard

  let periodicTasks = null
  let unsub = null 
  let draggedTemplate = null
  let sortedPeriodicTasks= []
  let sortedMonthlyTasks = [] 
  let sortedWeeklyTasks = [] 
  let dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  let getStatsFromTaskID = {} 
  let maxHourDuration = 0

  $: if (periodicTasks) {
    sortedPeriodicTasks = periodicTasks.sort((a, b) => a.orderValue - b.orderValue)
    sortedWeeklyTasks = sortedPeriodicTasks.filter(task => task.repeatOnDayOfWeek)
    sortedMonthlyTasks = sortedPeriodicTasks.filter(task => task.repeatOnDayOfMonth)

    summarizeReusedTasks(periodicTasks)
  }

  onMount(async () => {
    const ref = collection(db, `/users/${$user.uid}/periodicTasks`)
    unsub = onSnapshot(ref, (collectionSnap) => {
      const temp = []
      collectionSnap.forEach((doc) => {
        temp.push({ 
          id: doc.id,
          ...doc.data()
        })
      })
      periodicTasks = temp
    })
  })

  onDestroy(() => {
    if (unsub) unsub()
  })

  function getDisplayLength (weeklyTask) {
    const weeklySectionWidth = 560
    const pixelsPerHour = weeklySectionWidth / maxHourDuration
    const accurateLength = (getStatsFromTaskID[weeklyTask.id].hourDuration/getStatsFromTaskID[weeklyTask.id].frequency) * pixelsPerHour
    return accurateLength
  }

  async function summarizeReusedTasks (reusableTaskTemplates) {    
    for (const taskTemplate of reusableTaskTemplates) {
      const taskInstances = collectTaskInstances({ reusableTemplateID: taskTemplate.id })
      const totalMinutesDuration = taskInstances.reduce((accum, currObj) => accum + currObj.duration, 0)
      const hourDuration = totalMinutesDuration / 60

      getStatsFromTaskID[taskTemplate.id] = { 
        hourDuration: round(hourDuration, 1),
        frequency: taskInstances.length
      }
      if (hourDuration > maxHourDuration) {
        maxHourDuration = hourDuration
      }
    }
  }

  function collectTaskInstances ({ reusableTemplateID }) {
    const id = reusableTemplateID
    const allTasksCopy = [...allTasks]
    const output = [] 
    applyFuncToEveryTreeNode({ 
      tree: allTasksCopy,
      applyFunc: (node) => {
        if (node.reusableTemplateID === id || node.id === id) {
          if (node.isDone) {
            output.push(node)
          }
        }
      }
    })
    return output
  }

  function dragstart_handler (e, monthlyPeriodicTemplate) {
    draggedTemplate = monthlyPeriodicTemplate
  }

  function updateOrderOfDraggedTemplate (newVal) {
    updateFirestoreDoc(`users/${$user.uid}/periodicTasks/${draggedTemplate.id}`, {
      orderValue: newVal
    })
  }
</script>

<style>
  .add-reusable-task-button {
    font-size: 26px; 
    margin-left: 8px;
    cursor: pointer;
  }

  .day-of-week-circle {
    border-radius: 2px;
    background-color: rgb(223, 223, 223);
    width: 4px; 
    height: 4px;
    margin: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: 1px solid rgb(111, 111, 111);
  }

  .highlighted {
    background-color: orange;
    border: none;
  }

  .tick {
    position: absolute;
    width: 2px; /* 1px looks nicer, but is inconsistently rendered by the browser */
    height: 10px; /* Adjust the tick height */
    background-color: #c6c6c6; /* Set the tick color */
    margin-bottom: -12pxpx;
  }

  .start {
    left: 0; /* Position the start tick at the beginning */
  }

  .end {
    right: 0; /* Position the end tick at the end */
  }
</style>