<div style="padding: 24px;">
  Uncertain milestones

  Dead-ends, awaiting, following-up, consistent effort, uncertain outcomes

  <button on:click={() => createMilestoneNode({ 
    id: '234', 
    newMilestoneObj: { name: 'Test milestone' }
  })}
  >
    Create milestone
  </button>

  <div style="display: flex">
    {#each allMilestones as milestoneObj, i (milestoneObj.id)}
      <RecursiveTaskElement 
        taskObj={milestoneObj}
        depth={0}
        ancestorRoomIDs={['']}
        doNotShowScheduledTasks={true}
        doNotShowCompletedTasks={true}
        dueInHowManyDays={null}
        on:task-click
        on:task-checkbox-change
        on:task-node-update
        on:subtask-create={(e) => createSubMilestone(e.detail)}
      >
      </RecursiveTaskElement>
    {/each}
  </div> 
</div>

<script>
  import { setFirestoreDoc, updateFirestoreDoc } from "/src/crud.js"
  import { user } from '/src/store.js'
  import { onMount, onDestroy } from 'svelte'
  import { collection, onSnapshot, getFirestore, arrayUnion } from 'firebase/firestore'
  import { checkTaskObjSchema } from '/src/helpers.js'
  import { reconstructTreeInMemory } from "/src/helpers/dataStructures.js"
  import RecursiveTaskElement from '$lib/RecursiveTaskElement.svelte'

  let unsub = null 
  let allMilestones = [] // don't worry about AF

  const milestonesPath = `/users/${$user.uid}/milestones/`

  onMount(() => {
    const ref = collection(getFirestore(), `/users/${$user.uid}/milestones`)
    unsub = onSnapshot(ref, (querySnapshot) => {
      const result = [] 
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data()})
      })
      console.log("result =", result)

      allMilestones = reconstructTreeInMemory(result)
      console.log("allMilestones =", allMilestones)

      // no need to partition it into disjoint, complete sets
      // tasksScheduledOn.set(computeDateToTasksDict(allTasks))
    })
  })

  onDestroy(() => {
    if (unsub) unsub()
  })

  // TO-DO: 
  //   - will need to generate the same tree to represent the hierarchical structure

  // same interface as hierarchical todo-lists, except the database collection is not "tasks" but `uncertainMilestones`
  function createMilestoneNode ({ id, newMilestoneObj }) {
    let newMilestoneObjChecked = checkTaskObjSchema(newMilestoneObj, $user)
    setFirestoreDoc(
      `users/${$user.uid}/milestones/${id}`, 
      newMilestoneObjChecked
    )
    // TO-DO: update a separate counter that keeps track of the `maxOrderValue` within milestones
  }

    
  function updateMilestoneNode ({ id, keyValueChanges }) {
    updateFirestoreDoc(milestonesPath + id, keyValueChanges)
    // very useful for debugging
  }

  // the param is `newTaskObj` to conform to the <RecursiveTaskElement> API,
  // but after that, you see we use `newMilestoneObj`
  function createSubMilestone ({ id, parentID, newTaskObj }) {
    updateMilestoneNode({ id: parentID, keyValueChanges: { children: arrayUnion(id)}})
    createMilestoneNode({ id, newMilestoneObj: newTaskObj })
  }



  // function below for reference
  function createSubtask ({ id, parentID, newTaskObj }) {
    // the parent needs to update its pointers
    updateMilestoneNode({ id: parentID, keyValueChanges: { children: arrayUnion(id)}})
    createMilestoneNode({ id, newTaskObj })
  }
</script>