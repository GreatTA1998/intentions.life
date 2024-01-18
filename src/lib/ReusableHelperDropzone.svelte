<div bind:this={ReorderDropzone} 
  style="height: 6px; border-radius: 2px; border: 0px solid {colorForDebugging};" 
  on:dragenter={() => {
    if (!isInvalidReorderDrop()) {
      ReorderDropzone.style.background = 'rgb(87, 172, 247)' 
    }
  }}
  on:dragleave={() => ReorderDropzone.style.background = '' }
  on:dragover={(e) => dragover_handler(e)}
  on:drop|stopPropagation={(e) => onReorderDrop(e)}
>

</div>

<script>
  import { 
    whatIsBeingDragged, 
    whatIsBeingDraggedID, 
    whatIsBeingDraggedFullObj,
    user 
  } from '/src/store.js'
  import { updateFirestoreDoc } from '/src/crud.js'
  import { 
    convertDDMMYYYYToDateClassObject, 
    getDateInDDMMYYYY, 
    getTimeInHHMM 
  } from '/src/helpers.js'

  export let ancestorRoomIDs
  export let roomsInThisLevel
  export let idxInThisLevel
  export let parentID = ''
  export let parentObj
  export let colorForDebugging = "red"

  let ReorderDropzone

  $: n = roomsInThisLevel.length

  function isInvalidReorderDrop () {
    return !['room', 'top-level-task-within-this-todo-list'].includes($whatIsBeingDragged) || ancestorRoomIDs.includes($whatIsBeingDraggedID)
  }

  function dragover_handler (e) {
    e.preventDefault()
  }

  async function onReorderDrop (e) {
    e.preventDefault()
    if (isInvalidReorderDrop()) return
    ReorderDropzone.style.background = ''

    const data = e.dataTransfer.getData('text/plain')
    const keyValuePairs = data.split(']')
    const [key1, value1] = keyValuePairs[0].split(':')
    const draggedRoomID = value1

    // before updating `orderValue`, we update
    // the counter showing how many subfolders a folder has
    const droppedRoomDoc = roomsInThisLevel[idxInThisLevel]

    const initialNumericalDifference = 3
    let newVal 


    // TO-DO: need the last drop zone to be manually added
    const dropZoneIdx = idxInThisLevel
    // copy `PopupRearrangeVideos` 
    if (dropZoneIdx === 0) {
      const topOfOrderDoc = roomsInThisLevel[0]
      if (topOfOrderDoc) {
        // halve the value so it never gets to 0 
        newVal = (topOfOrderDoc.orderValue || 3) / 2
        console.log('top zone')
      } else {
        // you're dragging a new subtask into a parent that previously had ZERO children, which is valid
        newVal = 3
      }
    }
    else if (dropZoneIdx === n) {
      const bottomOfOrderDoc = roomsInThisLevel[n-1]
      newVal = (bottomOfOrderDoc.orderValue || 3) + initialNumericalDifference
      // keep track fo the highest possible maxOrdervalue for this $user
      if (!$user.maxOrderValue || $user.maxOrderValue < newVal) {
        await updateFirestoreDoc(`/users/${$user.uid}/`, {
          maxOrderValue: newVal
        })
      }
    }
    else {
      let topNeighborDoc = roomsInThisLevel[dropZoneIdx - 1]
      let botNeighborDoc = roomsInThisLevel[dropZoneIdx]
      const order1 = botNeighborDoc.orderValue || 3
      const order2 = topNeighborDoc.orderValue || 3 + initialNumericalDifference
      newVal = (order1 + order2) / 2
    }

    // FINALLY UPDATE THE TASK ITSELF
    const updateObj = {
      orderValue: newVal
    }

    // edge case: top level task
    if ($whatIsBeingDragged === 'top-level-task-within-this-todo-list' && ancestorRoomIDs.length === 1) {
      // don't override the true parentID of this top level task
    } else {
      updateObj.parentID = parentID
    }

    // TO-DO: let the task its deadline if it is strictly within the interval of 
    // the region e.g. 1 < n <= 7 for this week's to-do
    // 
    // QUICKFIX
    // even if task's old deadline is within invalid, if it's moved to a different deadline interval, it should match 
    // that interval e.g. when you drag from week to month
    const { subtreeDeadlineInMsElapsed } = parentObj
    if (subtreeDeadlineInMsElapsed && subtreeDeadlineInMsElapsed !== Infinity) {
      const d2 = new Date(parentObj.subtreeDeadlineInMsElapsed)
      updateObj.deadlineDate = getDateInDDMMYYYY(d2)
      updateObj.deadlineTime = getTimeInHHMM({ dateClassObj: d2 })
    }

    // when you drag to the to-do list, it always unschedules it from the calendar
    updateObj.startTime = '' 
    updateObj.startDate = ''
    updateObj.startYYYY = ''

    // when destination is the top level 
    // if the task itself is already at the top level (how do you tell)
    updateFirestoreDoc(
      `users/${$user.uid}/tasks/${$whatIsBeingDraggedID}`, 
      updateObj
    )
  }
</script>