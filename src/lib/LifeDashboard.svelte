<div style="width: 100vw;">
  <!-- Top section, spans horizontally -->
  <div style="display: flex; padding: 24px; width: 100vw;">
    <!-- <div class="rounded-card" style="margin-right: 24px; width: 50vw; height: 440px;">
      <div style="color: rgb(40, 40, 40); display: flex; align-items: center">
        <span class="material-symbols-outlined" style="margin-right: 6px">
          work
        </span>
        REVENUE EARNED THIS MONTH
      </div>

      <div style="display: flex; height: 200px; align-items: start;">
        <div style="display: flex; align-items: center; margin-top: 12px; margin-right: 24px;">
          <div style="font-size: 20px; color: red;">$</div>
          <div style="font-size: 72px; color: red;">
            0
          </div>
        </div>

        <MRRLineGraph/>
      </div>
    </div> -->

    <!-- <div style="width: 40vw;" class="rounded-card">
      <FinancePopupNoPopup/>
    </div> -->

    <div style="background-color: transparent; width: 100%; display: flex; justify-content: left; padding: 24px;">
      <!-- Loved Ones Dashboard in future updates -->

      <div class="rounded-card" style="margin-left: 24px; width: 100%;">
        <div style="display: flex; align-items: center;">
        <div style="text-transform: uppercase; color: rgb(40, 40, 40); display: flex; align-items: center;">
          <span class="material-symbols-outlined" style="margin-right: 6px;">
            timer
          </span>

          TIME SPENT
        </div>
          <div style="font-size: 14px; margin-left: 8px;">
            this week
          </div>
        </div>

        <div style="margin-top: 24px;"></div>

        {#each templatedTasksThisWeek as templateTask}
          <div style="font-weight: 500; font-size: 16px;">
            {templateTask.name}
          </div>
          <div style="display: flex; align-items: center; margin-top: 2px; margin-bottom: 24px;">
            {#each {length: templateTask.frequency} as _, i}
              <div style="background: green; border-radius: 4px; width: {(templateTask.hourDuration/templateTask.frequency) * 48}px; height: 4px; margin-right: 2px;"></div>
            {/each}
            
            <div style="font-weight: 400; font-size: 14px; margin-left: 4px;">
              {templateTask.hourDuration} hr
            </div>
          </div>      
        {/each}
      </div>
    </div>

  </div>
  <!-- End of top section flexbox -->

</div>

<script>
  import { onMount } from 'svelte'
  import { user } from '/src/store.js'
  import { applyFuncToEveryTreeNode, round } from '/src/helpers.js'
  import _ from 'lodash'
  import { updateFirestoreDoc } from '/src/crud.js'
  import MRRLineGraph from '$lib/MRRLineGraph.svelte'
  import FinancePopupNoPopup from '$lib/FinancePopupNoPopup.svelte'

  export let allTasks 
  
  let templatedTasksThisWeek = []
  // create a video explaining how debounced functions work
  const debouncedUpdateUserDoc = _.debounce(updateUserDoc, 500)

  onMount(() => {
    summarizeReusedTasks()
  })

  function updateUserDoc ({ propertyName, newValue }) {
    const updateObj = {}
    updateObj[propertyName] = newValue
    console.log("updateObj =", updateObj)
    updateFirestoreDoc(`users/${$user.uid}`, updateObj)
  }

  // write a function that loops through each reusableTaskTemplate
  function summarizeReusedTasks () {
    for (const taskTemplate of $user.reusableTaskTemplates) {
      // you need a way to traverse through the entire tree
      const taskInstances = collectTaskInstances({ reusableTemplateID: taskTemplate.id })
      const totalMinutesDuration = taskInstances.reduce((accum, currObj) => accum + currObj.duration, 0)
      const hourDuration = totalMinutesDuration / 60
      const stats = {
        name: taskTemplate.name,
        hourDuration: round(hourDuration, 1),
        frequency: taskInstances.length
      }
      templatedTasksThisWeek = [...templatedTasksThisWeek, stats]
    }
    templatedTasksThisWeek.sort((task1, task2) => {
      return task2.hourDuration - task1.hourDuration
    })
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

  // write a general debounce function that lets you update a particular user property to a new value
  // call it debouncedUpdateUserDoc ({ propertyName, newValue })
</script>

<style>
  .rounded-card {
    border-radius: 40px; 
    width: 460px; 
    height: 100%;
    padding: 24px;
    border: 2px solid grey;
  }

  .section-title {
    font-weight: 600;
    font-size: 20px;
  }

  .section-description {
    font-size: 16px;
    font-weight: 400;
  }

  input {
    all: unset;
  }
</style>