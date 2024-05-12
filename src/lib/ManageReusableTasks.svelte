<div style="padding: 24px;">
  <div style="font-size: 32px; margin-top: 24px;">
    Reusable tasks
  </div>

  <div style="margin-bottom: 48px;"></div>

  {#if periodicTasks}
  <div style="font-size: 24px; margin-bottom: 12px;">
    Weekly

    <ManageRepeatingTasksUnifiedWeeklyPopup  
      let:setIsPopupOpen={setIsPopupOpen}
      defaultOrderValue={sortedWeeklyTasks.length}
    >
      <span on:click={() => setIsPopupOpen({ newVal: true })} style="font-size: 26px; margin-left: 8px;">
        +
      </span>
    </ManageRepeatingTasksUnifiedWeeklyPopup>
  </div>
  
  <!-- at least requires `periodicTasks` to be an `[]` i.e. loading finished, instead of null -->
    {#each sortedWeeklyTasks as weeklyTask, i}
      {#if i === 0}
        <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={0} belowOrder={sortedWeeklyTasks[0].orderValue} />
      <!-- general case drop-zone: must be between 2 tasks-->
      {:else if i > 0 && i < periodicTasks.length}
        <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={sortedWeeklyTasks[i-1].orderValue} belowOrder={sortedWeeklyTasks[i].orderValue} />
      {/if}

      <div style="display: flex; align-items: center;">
        <ManageRepeatingTasksUnifiedWeeklyPopup 
          let:setIsPopupOpen={setIsPopupOpen} 
          isEditVersion={true} 
          weeklyPeriodicTemplate={weeklyTask}
          on:delete={() => deleteTemplate(weeklyTask)}
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
                    <div style="background: green; border-radius: 4px; width: {(getStatsFromTaskID[weeklyTask.id].hourDuration/getStatsFromTaskID[weeklyTask.id].frequency) * 48}px; height: 4px; margin-right: 2px;"></div>
                  {/each}
                </div>      
                <div style="font-weight: 400; font-size: 14px;  margin-top: 8px; color: green">
                  {getStatsFromTaskID[weeklyTask.id].hourDuration} hr
                </div>
              </div>
            {/if}
          </div>
        </ManageRepeatingTasksUnifiedWeeklyPopup>
      </div>

      {#if i === sortedWeeklyTasks.length - 1}
        <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={sortedWeeklyTasks[i].orderValue} belowOrder={sortedWeeklyTasks[i].orderValue + 1}/>
      {/if}
    {/each}


  <div style="margin-bottom: 48px;"></div>
    <div style="display: flex; align-items: center;">
      <div style="font-size: 24px;">
        Monthly
      </div>

      <ManageRepeatingTasksUnifiedMonthlyPopup  
        let:setIsPopupOpen={setIsPopupOpen}
        defaultOrderValue={sortedMonthlyTasks.length}
      >
        <span on:click={() => setIsPopupOpen({ newVal: true })} style="font-size: 26px; margin-left: 8px;">
          +
        </span>
      </ManageRepeatingTasksUnifiedMonthlyPopup>
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
          <!-- start of visual representation -->
          <div style="position: relative; width: 94px; border: 0px solid purple; height: 20px; display: flex; align-items: center;">
            <!-- background interval -->
            <div style="position: relative; width: 94px; height: 1px; background-color: #ccc; display: flex; align-items: center;">
              <span class="tick start"></span>
              <span class="tick end"></span>
            </div>

            <!-- orange circle dots -->
            <div style="position: absolute; display: flex; width: 90px; outline: 0px solid red; align-items: center;">
              {#each Array(27) as _, i}
                {#if periodicTask.repeatOnDayOfMonth[i]}
                  <div style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                      position: absolute; left: {3 * i}px
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

          <ManageRepeatingTasksUnifiedMonthlyPopup 
            let:setIsPopupOpen={setIsPopupOpen} 
            isEditVersion={true} 
            monthlyPeriodicTemplate={periodicTask}
            on:delete={() => deleteTemplate(periodicTask)}
          >
            <div
              on:click={() => setIsPopupOpen({ newVal: true })}  style="margin-left: 12px; cursor: pointer;"
              draggable="true"
              on:dragstart|self={(e) => dragstart_handler(e, periodicTask)}
            >
              {periodicTask.name}
            </div>
          </ManageRepeatingTasksUnifiedMonthlyPopup>
        </div>
      </div>

      {#if i === periodicTasks.length - 1}
        <ReusableSimpleDropzone on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)} aboveOrder={periodicTasks[i].orderValue} belowOrder={periodicTasks[i].orderValue + 1}/>
      {/if}
    {/each}
  {/if}
</div>

<script>
  import ManageRepeatingTasksUnifiedMonthlyPopup from '$lib/ManageRepeatingTasksUnifiedMonthlyPopup.svelte'
  import ManageRepeatingTasksUnifiedWeeklyPopup from '$lib/ManageRepeatingTasksUnifiedWeeklyPopup.svelte'
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

  async function summarizeReusedTasks (reusableTaskTemplates) {    
    for (const taskTemplate of reusableTaskTemplates) {
      const taskInstances = collectTaskInstances({ reusableTemplateID: taskTemplate.id })
      const totalMinutesDuration = taskInstances.reduce((accum, currObj) => accum + currObj.duration, 0)
      const hourDuration = totalMinutesDuration / 60

      getStatsFromTaskID[taskTemplate.id] = { 
        hourDuration: round(hourDuration, 1),
        frequency: taskInstances.length
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

  function deleteTemplate ({ id }) {
    deleteFirestoreDoc(`/users/${$user.uid}/periodicTasks/${id}`)
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