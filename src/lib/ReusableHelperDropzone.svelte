<div bind:this={ReorderDropzone} 
  style="height: 6px; border-radius: 2px; border: 0px solid {colorForDebugging};" 
  on:dragenter={() => {
    if (!isInvalidReorderDrop()) {
      ReorderDropzone.style.background = 'rgb(87, 172, 247)' 
    }
  }}
  on:dragleave={() => ReorderDropzone.style.background = '' }
  on:dragover={(e) => dragover_handler(e)}
  on:drop={(e) => onReorderDrop(e)}
>

</div>

<script>
  import { whatIsBeingDragged, whatIsBeingDraggedID, user } from '/src/store.js'
  import { updateFirestoreDoc } from '/src/crud.js'

  export let ancestorRoomIDs
  export let roomsInThisLevel
  export let idxInThisLevel
  export let parentID = ''
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

    if ($whatIsBeingDragged === 'top-level-task-within-this-todo-list' && ancestorRoomIDs.length === 1) {
      // don't override the true parentID of this top level task
    } else {
      updateObj.parentID = parentID
    }

    // when destination is the top level 
    // if the task itself is already at the top level (how do you tell)
    updateFirestoreDoc(
      `users/${$user.uid}/tasks/${$whatIsBeingDraggedID}`, 
      updateObj
    )
  }
</script>