 import { getFirestoreCollection } from '/src/crud.js'
 import { createIndividualFirestoreDocForEachTaskInAllTasks } from '/src/helpers.js'
 
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
        await delayTime()
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

  function delayTime () {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 10000)
    })
  }