<div style="padding: 16px;">
  <div style="font-size: 32px; margin-top: 24px;">
    Configure repeating tasks
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
        <!-- left-side visual -->
        <div style="display: flex;">
          {#each dayOfWeekSymbol as symbol, i} 
            <div class="day-of-week-circle" class:highlighted={weeklyTask.repeatOnDayOfWeek[i]}>
              {symbol}
            </div>
          {/each}
        </div>

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
              <img src={weeklyTask.iconDataURL} style="width: 48px; height: 48px;">
            {/if}

            {weeklyTask.name}
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

  let periodicTasks = null
  let unsub = null 
  let draggedTemplate = null
  let sortedPeriodicTasks= []
  let sortedMonthlyTasks = [] 
  let sortedWeeklyTasks = [] 
  let dayOfWeekSymbol = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  $: if (periodicTasks) {
    sortedPeriodicTasks = periodicTasks.sort((a, b) => a.orderValue - b.orderValue)
    sortedWeeklyTasks = sortedPeriodicTasks.filter(task => task.repeatOnDayOfWeek)
    sortedMonthlyTasks = sortedPeriodicTasks.filter(task => task.repeatOnDayOfMonth)
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
    border-radius: 16px;
    width: 16px; 
    height: 16px;
    margin: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: 1px solid rgb(111, 111, 111);
    /* border: 1px solid rgb(111, 111, 111); */
  }

  .day-of-month-square {
    width: 24px; 
    height: 24px; 
    border: 1px solid black; 
    margin: 0px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  .highlighted {
    background-color: orange;
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