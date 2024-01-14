 import { getFirestoreCollection, updateFirestoreDoc } from '/src/crud.js'
 import { createIndividualFirestoreDocForEachTaskInAllTasks, applyFuncToEveryTreeNode, reconstructTreeInMemory } from '/src/helpers.js'
 
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