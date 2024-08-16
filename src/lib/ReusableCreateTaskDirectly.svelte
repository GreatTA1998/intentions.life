<UXFormField
  fieldLabel="Task Name"
  value={newTaskName}
  on:input={(e) => {
    newTaskName = e.detail.value;
    searchTaskTemplates();
  }}
  on:focus-out={() => {
    if (newTaskName === '') {
      dispatch('reset')
    }
  }}
  on:task-entered={(e) => handleEnterKey(e)}
/>

<!-- Display reusable task templates here -->
{#key taskTemplateSearchResults}
  {#if $user && newTaskName.length >= 1}
    <div class="core-shadow cast-shadow" style="background-color: white; padding: 6px; border-radius: 12px">   
      {#each taskTemplateSearchResults as taskTemplate}
        <div class="autocomplete-option" 
          on:click={() => createNewInstanceOfReusableTask(taskTemplate)} 
          class:option-highlight={taskTemplateSearchResults.length === 1}
        >
          {#if taskTemplate.iconDataURL}
            <img src={taskTemplate.iconDataURL} style="width: 24px; height: 24px;">
          {/if}

          <div style="margin-left: {taskTemplate.iconDataURL ? '0px' : '12px'}">
            {taskTemplate.name}
          </div>
        </div>
      {/each}
    </div>
  {/if}
{/key}

<script>
  import UXFormField from '$lib/UXFormField.svelte'
  import { getFirestoreCollection } from '/src/helpers/crud.js'
  import { getRandomID, getDateInMMDD, getHHMM } from '/src/helpers/everythingElse.js'
  import { user } from '/src/store.js'
  import { onMount, createEventDispatcher } from 'svelte'
  import { DateTime } from 'luxon'

  export let resultantDateClassObject
  export let newTaskStartTime = '' // hh:mm format

  let taskTemplateSearchResults = []
  let reusableTaskTemplates = null

  let newTaskName = ''

  const dispatch = createEventDispatcher()

  onMount(async () => {
    const temp = await getFirestoreCollection(`/users/${$user.uid}/periodicTasks`)
    reusableTaskTemplates = temp
  })

  function searchTaskTemplates () {
    if (reusableTaskTemplates === null) return 

    const uniqueSet = new Set()
    const searchQuery = newTaskName
    for (const taskTemplate of reusableTaskTemplates) {
      if (taskTemplate.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        uniqueSet.add(taskTemplate)
      }
    }
    const result = [...uniqueSet]
    taskTemplateSearchResults = result
    return result
  }

  function handleEnterKey (e) {
    if (taskTemplateSearchResults.length === 1) {
      createNewInstanceOfReusableTask(taskTemplateSearchResults[0])
    } else {
      createTaskDirectly(e)
    }
  }
  
  async function createNewInstanceOfReusableTask (taskObj) {
    const copy = {...taskObj}
    copy.id = getRandomID()
    copy.reusableTemplateID = taskObj.id
    copy.isDone = false
    copy.startDateISO = DateTime.fromJSDate(resultantDateClassObject).toFormat('yyyy-MM-dd')
    copy.startTime = newTaskStartTime
    dispatch('new-root-task', copy)
    dispatch('reset')
  }

  async function createTaskDirectly (e) {
    const newTaskName = e.detail.taskName
    if (newTaskName !== '') {
      const newTaskObj = {
        id: getRandomID(),
        name: newTaskName,
        startDateISO: DateTime.fromJSDate(resultantDateClassObject).toFormat('yyyy-MM-dd'),
        startTime: newTaskStartTime
      }
      dispatch('new-root-task', newTaskObj)
    }
    dispatch('reset')
  }
</script>

<style lang="scss">
  .autocomplete-option {
    padding-top: 12px; 
    padding-bottom: 12px; 
    padding-left: 4px; 
    padding-right: 12px; 
    font-size: 12px; 
    border-radius: 12px;

    display: flex; 
    align-items: center;
  }

  .option-highlight {
    background-color: rgb(240, 240, 240);
  }

  .autocomplete-option:hover {
    @extend .option-highlight
  }
</style>