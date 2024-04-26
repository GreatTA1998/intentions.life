<div style="padding: 16px;">
  <div style="font-size: 32px;">
    Configure repeating tasks
  </div>

  <div style="margin-bottom: 48px;"></div>

  <div style="font-size: 24px;">
    Weekly
  </div>

  <div style="display: flex;">
    {#each Array(7) as _, i} 
      <div class="day-of-week-circle"></div>
    {/each}
  </div>

  <div style="margin-bottom: 48px;"></div>

  <div style="display: flex; align-items: center;">
    <div style="font-size: 24px;">
      Monthly
    </div>

    <ManageRepeatingTasksUnifiedMonthlyPopup  let:setIsPopupOpen={setIsPopupOpen}>
      <span on:click={() => setIsPopupOpen({ newVal: true })} style="font-size: 26px; margin-left: 8px;">
        +
      </span>
    </ManageRepeatingTasksUnifiedMonthlyPopup>
  </div>

  {#if periodicTasks}
    {#each periodicTasks as periodicTask}
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

          <ManageRepeatingTasksUnifiedMonthlyPopup let:setIsPopupOpen={setIsPopupOpen} isEditVersion={true} monthlyPeriodicTemplate={periodicTask}>
            <div on:click={() => setIsPopupOpen({ newVal: true })}  style="margin-left: 12px; cursor: pointer;">
              {periodicTask.name}
            </div>
          </ManageRepeatingTasksUnifiedMonthlyPopup>
        </div>
      </div>
    {/each}
  {/if}
</div>

<script>
  import ManageRepeatingTasksUnifiedMonthlyPopup from '$lib/ManageRepeatingTasksUnifiedMonthlyPopup.svelte'
  import { getFirestoreCollection } from '/src/crud.js'
  import { onMount, onDestroy } from 'svelte'
  import { user } from '/src/store.js'
  import { collection, onSnapshot } from 'firebase/firestore'
  import db from '/src/db.js'

  let periodicTasks = null
  let unsub = null 

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


  // repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
  function createNewInstancesOfMonthlyRepeatingTasks ({numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay}) {
    const d = new Date() // base case: no need to start from beginning of month
    for (let i = 0; i < numOfMonthsInAdvance; i++) {
      generateRepeatingTasksForSpecificMonth(d, repeatOnDayOfMonth, willRepeatOnLastDay)

      // general case: start from beginning of month
      d.setMonth(d.getMonth() + 1)
      d.setDate(1) 
    }
  }

  function generateRepeatingTasksForSpecificMonth (dateClassObject, repeatOnDayOfMonth, willRepeatOnLastDay) {
    const d = dateClassObject

    // general case: first 28 days
    while (d.getDate() < 28) {
      if (repeatOnDayOfMonth[d.getDate() - 1]) { // getDate() is 1-indexed but `repeatOnDayOfMonth` is 0-indexed
        generateNewTask(d.getDate())
      }
      d.setDate(d.getDate() + 1)
    }

    // edge case: last day (i.e. 28, 29, 30, 31 treated the same)
    if (willRepeatOnLastDay) {
      const lastDay = getLastDayOfMonth(d.getMonth()) // note `getMonth` is zero-indexed
      generateNewTask(lastDay)
    }
  }

  // month is 1-indexed from 1 to 12
  function getLastDayOfMonth (zeroIndexedMonthNumber) {
    const d1 = new Date()
    const d2 = new Date(d1.getFullYear(), zeroIndexedMonthNumber + 1, 0);
    const lastDay = d2.getDate()
    return lastDay
  }

  function generateNewTask (dayOfMonth) {
    console.log('generate new task for =', dayOfMonth)
  }
</script>

<style>
  .day-of-week-circle {
    border-radius: 16px;
    width: 20px; 
    height: 20px;
    border: 2px solid black;
    margin: 4px;
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