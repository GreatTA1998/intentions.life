import { getFirestoreCollection, updateFirestoreDoc } from '/src/crud.js'
import { 
  createIndividualFirestoreDocForEachTaskInAllTasks, 
  applyFuncToEveryTreeNode, 
  reconstructTreeInMemory,
  convertDDMMYYYYToDateClassObject,
  getDateInDDMMYYYY,
  getTimeInHHMM,
  helperFunction
} from '/src/helpers.js'

// note: legacy tasks that aren't garbage collected can cause problems
// e.g. deadlineDate === 'NaN NaN NaN'

export async function garbageCollectInvalidTasks (userDoc) {
  const allTaskDocs = await getFirestoreCollection(`/users/${userDoc.uid}/tasks`)
  let i = 0
  for (const taskDoc of allTaskDocs) {
    if (taskDoc.deadlineDate === 'NaN/NaN/NaN') {
      // console.log('taskDoc.name =', taskDoc.name)
      i += 1
      updateFirestoreDoc(`/users/${userDoc.uid}/tasks/${taskDoc.id}`, {
        deadlineDate: '',
        deadlineTime: ''
      })
      await delayTime(1)
    }
  }
  console.log('total i =', i)
}

let totalUpdated = 0

export async function fixInvalidSubtaskDeadlinesForAllUsers () {
  console.log('getting called ')
  const allUsers = await getFirestoreCollection(`/users`)
  console.log('allUsers =', allUsers)
  for (const user of allUsers) {
    fixInvalidSubtaskDeadlines(user)
    await delayTime(10 * 1000)
  }
  console.log('totalUpdated =', totalUpdated)
}

export async function fixInvalidSubtaskDeadlines (userDoc) {
  console.log('fixInvalidForOneUser')
  // construct the memory tree   
  const allTaskDocs = await getFirestoreCollection(`/users/${userDoc.uid}/tasks`)
  const allTasks = reconstructTreeInMemory(allTaskDocs)

  function initializeCorrectDefaultDeadline (node) {
    const d2 = new Date(node.subtreeDeadlineInMsElapsed)
    updateFirestoreDoc(`/users/${userDoc.uid}/tasks/${node.id}`, {
      deadlineDate: getDateInDDMMYYYY(d2),
      deadlineTime: getTimeInHHMM({ dateClassObj: d2 })
    })
    console.log('corrected to =', {
      deadlineDate: getDateInDDMMYYYY(d2),
      deadlineTime: getTimeInHHMM({ dateClassObj: d2 })
    })
    totalUpdated += 1
  }

  for (const rootTree of allTasks) {
    helperFunction({ node: rootTree, applyFunc: (node) => {
      if (!node.deadlineDate) {
        if (node.subtreeDeadlineInMsElapsed !== Infinity) {
          console.log('a node with no deadline but corrected =', node)
          initializeCorrectDefaultDeadline(node)
        }
      }
      else {
        const d1 = convertDDMMYYYYToDateClassObject(node.deadlineDate, node.deadlineTime)
        if (node.subtreeDeadlineInMsElapsed === Infinity) {
          // since subtreeDeadline is not saved on Firestore,  
          // we just let the local value handle it automatically
        }
        if (d1.getTime() > node.subtreeDeadlineInMsElapsed) {
          console.log('subtask with deadline but wrong')
          initializeCorrectDefaultDeadline(node)
        }
      }
    }})

    await delayTime(5)
  }
}

export async function runGrandScript () {
  const allUserDocs = await getFirestoreCollection('/users')
  for (const userDoc of allUserDocs) {
    if (!userDoc.phoneNumber && !userDoc.email) continue
    console.log('handling userDoc =', userDoc.email || userDoc.phoneNumber)
    const allTaskDocs = await getFirestoreCollection(`/users/${userDoc.uid}/tasks`)
    const allTasks = reconstructTreeInMemory(allTaskDocs)
    console.log('allTasks =', allTasks)
    assignOrderValueToEachTask(allTasks, userDoc)
    await delayTime(15 * 1000)
  }
}

export async function assignOrderValueToEachTask (builtMemoryTree, userDoc) {
  applyFuncToEveryTreeNode({ tree: builtMemoryTree, applyFunc: (task) => {
    let i = 33 // if it starts from 0 you cause bugs because order value should never get to 0
    for (const child of task.children) {
      updateFirestoreDoc(`/users/${userDoc.uid}/tasks/${child.id}`, {
        orderValue: i
      })
      console.log('assigning order value i =', i)
      delayTime(1)
      i += 1
    }
  }})
} 

// first update the null pointers
export async function runScript () {
  const allUsers = await getFirestoreCollection(`/users/`)
  for (const userDoc of allUsers) {
    const emailsList = [
      'kaihsueh214@gmail.com',
      'daninge98@gmail.com',
      'lily0931154@gmail.com'
    ]
    if (emailsList.includes(userDoc.email) || (userDoc.phoneNumber && userDoc.phoneNumber === '+16473036039')) {
      console.log('migrating to new data format for userDoc =', userDoc)
      const copyOfData = [...userDoc.allTasks]
      createIndividualFirestoreDocForEachTaskInAllTasks(copyOfData, userDoc)
      await delayTime(10000)
    }
    // THAT'S ONLY FOR ME AS I GENERATED TASK COLLECTIONS WITH NULL POINTERS, OTHER USERS DON'T HAVE THIS PROBLEM
    // const taskDbDocs = await getFirestoreCollection(`/users/${userDoc.uid}/tasks`)
    // console.log("taskDbDocs =", taskDbDocs)
    // for (const firestoreDoc of taskDbDocs) {
    //   if (firestoreDoc.parentID === null) {
    //     console.log('updating null pointer to empty string')
    //     updateFirestoreDoc(`/users/${$user.uid}/tasks/${firestoreDoc.id}`, {
    //       parentID: ""
    //     })
    //     console.log('updating null parent pointer')
    //   }
    // }
  }
  // END OF ONE TIME SCRIPT
}

function delayTime (ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}