<div
  bind:this={ReorderDropzone} 
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
  import { getFirestore, increment, writeBatch, doc } from 'firebase/firestore'
  import { 
    convertDDMMYYYYToDateClassObject, 
    getDateInDDMMYYYY, 
    getTimeInHHMM,
    computeDayDifference
  } from '/src/helpers.js'

  export let ancestorRoomIDs
  export let roomsInThisLevel
  export let idxInThisLevel
  export let parentID = ''
  export let parentObj
  export let colorForDebugging = "red"
  export let dueInHowManyDays // tells us which todo-list we're in

  let ReorderDropzone
  const db = getFirestore()
  let batch = writeBatch(db)

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
      } else {
        // you're dragging a new subtask into a parent that previously had ZERO children, which is valid
        newVal = 3
      }
    }
    else if (dropZoneIdx === n) {
      const bottomOfOrderDoc = roomsInThisLevel[n-1]
      newVal = (bottomOfOrderDoc.orderValue || 0) + initialNumericalDifference
      
      // keep track fo the highest possible maxOrdervalue for this $user
      if (!$user.maxOrderValue || $user.maxOrderValue < newVal) {
        batch.update(
          doc(db, `/users/${$user.uid}/`), {
            maxOrderValue: increment(initialNumericalDifference)
          }
        )
      }

      newVal = Math.max(newVal, $user.maxOrderValue)
    }
    else {
      let topNeighborDoc = roomsInThisLevel[dropZoneIdx - 1]
      let botNeighborDoc = roomsInThisLevel[dropZoneIdx]
      const order1 = botNeighborDoc.orderValue || 3
      const order2 = topNeighborDoc.orderValue || 3 + initialNumericalDifference
      newVal = (order1 + order2) / 2
    }

    // First, we ensure the dragged-dropped task is updated correctly.
    // Then, we recursively ensure the deadlines are valid throughout its subtree.

    // 1. ORDER VALUE (and startTime)
    // only applies to the subtree's root
    const { deadlineDate, deadlineTime, id } = $whatIsBeingDraggedFullObj

    let updateObj = {
      orderValue: newVal,
      deadlineDate,
      deadlineTime,
      id
    }
    
    // 2. UNSCHEDULE: when you drag to the to-do list, it always unschedules it from the calendar
    updateObj.startTime = '' 
    updateObj.startDate = ''
    updateObj.startYYYY = ''

    // 3. DEADLINE
    updateObj = correctDeadlineIfNecessary({ 
      node: updateObj, 
      todoListUpperBound: dueInHowManyDays, 
      parentObj,
      batch
    })

    // 4. PARENTID
    if ($whatIsBeingDragged === 'top-level-task-within-this-todo-list' && ancestorRoomIDs.length === 1) {
      // preserve parent relationship
    } else {
      updateObj.parentID = parentID
    }
    updateObj = breakParentRelationIfNecessary(updateObj)

    // 2. HANDLE SUBTREE DEADLINES
    maintainValidSubtreeDeadlines({ node: $whatIsBeingDraggedFullObj, todoListUpperBound: dueInHowManyDays, parentObj })

    batch.update(
      doc(db, `users/${$user.uid}/tasks/${$whatIsBeingDraggedID}`),
      updateObj
    )

    batch.commit()

    batch = writeBatch(db)
  }

  // break the parent relation only if necessary, so that the task can validly belong in the new todo list
  // `updateObj` is what the dropped task is about to be updated to Firestore
  function breakParentRelationIfNecessary (updateObj) {
    const d1 = convertDDMMYYYYToDateClassObject(updateObj.startDate, updateObj.startTime)
    if (d1.getTime() > updateObj.subtreeDeadlineInMsElapsed) {
      updateObj.parentID = ''
      console.log('manually breaking parent relation')
    }
    return updateObj
  }

  // for each node in the subtree, correct deadlines in necessary such that they'd also belong in the new todo list
  function maintainValidSubtreeDeadlines ({ node, todoListUpperBound, parentObj }) {
    helper({ node, todoListUpperBound, parentObj, batch })
  }

  function helper ({ node, todoListUpperBound, parentObj, batch }) {
    correctDeadlineIfNecessary({ node, todoListUpperBound, parentObj, batch })
    for (const child of node.children) {
      helper({ node: child, todoListUpperBound, parentObj, batch })
    }
  }

  function correctDeadlineIfNecessary ({ node, todoListUpperBound, parentObj, batch }) {
    const shallowCopy = {...node}
    if (!isWithinTodoInterval({ node, todoListUpperBound })) {
      // NOTE: unintuitively, at the top level of the todo,  
      // `parentObj`is still defined, but only 1 property: { subtreeDeadlineInMsElapsed }
      if (parentObj.deadlineDate && parentObj.deadlineTime) {
        shallowCopy.deadlineDate = parentObj.deadlineDate
        shallowCopy.deadlineTime = parentObj.deadlineTime
      } 
      else {
        const d = new Date() 
        d.setHours(0, 0, 0) 
        d.setDate(d.getDate() + todoListUpperBound)
        const ddmmyyyy = getDateInDDMMYYYY(d)
        shallowCopy.deadlineDate = ddmmyyyy
        shallowCopy.deadlineTime = '11:59'
      }
    }
    const { deadlineDate, deadlineTime } = shallowCopy
    const ref = doc(db, `users/${$user.uid}/tasks/${shallowCopy.id}`)

    batch.update(ref, { 
      deadlineDate, 
      deadlineTime
    })

    // this return is sometimes useful, e.g. when we directly call this function
    // for the subtree's root 
    return shallowCopy
  }

  function isWithinTodoInterval ({ node, todoListUpperBound }) {
    const d1 = new Date()
    d1.setHours(0, 0, 0)
    const d2 = convertDDMMYYYYToDateClassObject(node.deadlineDate, node.deadlineTime)

    const n = todoListUpperBound
    const x = computeDayDifference(d1, d2)

    if (n === 1) return x <= 1
    else if (n === 7) return 1 < x && x <= 7
    else if (n === 30) return 7 < x && x <= 30
    else return 30 < x
  }
</script>