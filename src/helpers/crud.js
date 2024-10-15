import {
  setFirestoreDoc,
  updateFirestoreDoc,
  deleteFirestoreDoc,
} from "/src/helpers/firestoreHelpers.js"
import {
  createOnLocalState,
  updateLocalState,
  deleteFromLocalState,
} from "/src/helpers/maintainState.js"
import { deleteImage } from '/src/helpers/storage.js'
import applyTaskSchema from "/src/helpers/applyTaskSchema.js"
import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { get } from 'svelte/store'
import { user } from '/src/store.js'

export async function createTaskNode({ id, newTaskObj }) {
  // cannot define `tasksPath` outside of the functions because
  // get(user) is not defined when the app starts
  const tasksPath = `/users/${get(user).uid}/tasks/`

  try {
    const newTaskObjChecked = await applyTaskSchema(newTaskObj, get(user))

    setFirestoreDoc(tasksPath + id, newTaskObjChecked) // hope mf doesn't notice :>
    createOnLocalState({ id, createdNode: newTaskObjChecked })
  } catch (error) {
    console.error('error creating task node: ', error)
    console.log('error =', error)
    alert("Database update failed, please reload")
  }
}

export async function updateTaskNode({ id, keyValueChanges }) {
  const tasksPath = `/users/${get(user).uid}/tasks/`

  updateFirestoreDoc(tasksPath + id, keyValueChanges).catch((err) => {
    alert(
      "there was an error in atempting to save changes to the db, please reload "
    );
    console.error("error in updateTaskNode: ", err);
  })
  updateLocalState({ id, keyValueChanges });
}

// THIS IS STILL NOT WORKING: THE ADOPTION IS NOT WORKING, RIGHT NOW ALL THE
// SUBTREE WILL BE GONE FOR SOME REASON
export function deleteTaskNode({ id, parentID, childrenIDs, imageFullPath = "" }) {
  const tasksPath = `/users/${get(user).uid}/tasks/`
  
  if (parentID !== "") {
    updateFirestoreDoc(tasksPath + parentID, {
      childrenIDs: arrayRemove(id),
    })
    // parent will be deleted, so the grandparent will take care of the children
    if (childrenIDs) {
      updateFirestoreDoc(tasksPath + parentID, {
        childrenIDs: arrayUnion(...childrenIDs),
      })
    }
  }

  // temporary to clean up tasks that were created that didn't conform to the schema
  // surprisngly many, keep it in to save time
  if (childrenIDs) {
    for (const childID of childrenIDs) {
      updateFirestoreDoc(tasksPath + childID, {
        parentID: parentID,
      })
    }
  }

  if (imageFullPath) {
    deleteImage({ imageFullPath })
  }

  // now safely delete itself
  deleteFirestoreDoc(tasksPath + id);

  deleteFromLocalState({ id });
}