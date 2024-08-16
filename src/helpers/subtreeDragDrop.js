import { updateFirestoreDoc } from '/src/crud.js'
import { getFirestore, increment, writeBatch, doc } from 'firebase/firestore'
import { 
  convertDDMMYYYYToDateClassObject, 
  getDateInDDMMYYYY, 
  getTimeInHHMM,
  computeDayDifference
} from '/src/helpers/everythingElse.js'
import db from '/src/db.js'

// break the parent relation only if necessary, so that the task can validly belong in the new todo list
// `updateObj` is what the dropped task is about to be updated to Firestore
export function breakParentRelationIfNecessary (updateObj) {
  const d1 = convertDDMMYYYYToDateClassObject(updateObj.deadlineDate, updateObj.deadlineTime)
  if (d1.getTime() > updateObj.subtreeDeadlineInMsElapsed) {
    updateObj.parentID = ''
  }
  return updateObj
}

// for each node in the subtree, correct deadlines in necessary such that they'd also belong in the new todo list
export function maintainValidSubtreeDeadlines ({ node, todoListUpperBound, parentObj, batch, userDoc }) {
  helper({ node, todoListUpperBound, parentObj, batch, userDoc })
}

export function helper ({ node, todoListUpperBound, parentObj, batch, userDoc }) {
  // DEPRECATE THIS COMPLICATED FEATURE
  // correctDeadlineIfNecessary({ node, todoListUpperBound, parentObj, batch, userDoc })
  for (const child of node.children) {
    helper({ node: child, todoListUpperBound, parentObj, batch, userDoc })
  }
}

export function correctDeadlineIfNecessary ({ node, todoListUpperBound, parentObj, batch, userDoc }) {
  const shallowCopy = {...node}
  const ref = doc(db, `users/${userDoc.uid}/tasks/${shallowCopy.id}`)
  
  // QUICKFIX
  if (todoListUpperBound === 7) {
    const d = new Date() // just set deadline to today, so that it shows up on "This Week's To-do"
    batch.update(ref, { 
      deadlineDate: getDateInDDMMYYYY(d),
      deadlineTime: '23:59'
    })
    shallowCopy.deadlineDate = getDateInDDMMYYYY(d)
    shallowCopy.deadlineTime = '23:59'
    return shallowCopy
  }
  
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
      // notice the -1 because, for example, today's todo is on the same day, but with time set to '11:59'
      d.setDate(d.getDate() + todoListUpperBound - 1) 
      const ddmmyyyy = getDateInDDMMYYYY(d)
      shallowCopy.deadlineDate = ddmmyyyy
      shallowCopy.deadlineTime = '11:59'
    }
  }
  const { deadlineDate, deadlineTime } = shallowCopy

  batch.update(ref, { 
    deadlineDate, 
    deadlineTime
  })

  // this return is sometimes useful, e.g. when we directly call this function
  // for the subtree's root 
  return shallowCopy
}

export function isWithinTodoInterval ({ node, todoListUpperBound }) {
  // quick-fix: to make this function usable with milestone page
  if (todoListUpperBound === Infinity) {
    return true
  }

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