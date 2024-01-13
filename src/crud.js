import { getRandomID } from '/src/helpers.js'
import { deleteField, collection, query, orderBy, limit, getDoc, getDocs, getFirestore, updateDoc, arrayUnion, arrayRemove, increment, doc, setDoc, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, } from 'firebase/storage'

// I prefix all Firestore helper functions with `firestore` prefix
// e.g. `firestoreRef` (written by me) vs `ref` (native to library)
// TO-DO: test these functions
export function firestoreRef (path) {
  const db = getFirestore()
  return doc(db, path)
}

export function setFirestoreDoc (path, newObject) {
  return new Promise(async (resolve) => {
    const ref = firestoreRef(path)
    await setDoc(ref, newObject)
    resolve()
  })
}

export function getFirestoreDoc (path) {
  return new Promise(async (resolve, reject) => {
    const ref = firestoreRef(path)
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) {
      resolve(
        { id: snapshot.id, path: snapshot.ref.path, ...snapshot.data() }
      )
    } else {
      reject('Doc doesn not exist for path =', path)
    }
  })
}

export function getFirestoreCollection (path) {
  return new Promise(async (resolve) => {
    const ref = collection(getFirestore(), path)
    const snapshot = await getDocs(ref)
    const data = []
    snapshot.forEach(doc => {
      data.push({ id: doc.id, path: doc.ref.path, ...doc.data() })
    })
    resolve(data)
  })
}

export function getFirestoreQuery (query) { 
  return new Promise(async (resolve) => {
    const snapshot = await getDocs(query)
    const data = []
    snapshot.forEach(doc => {
      data.push({ id: doc.id, path: doc.ref.path, ...doc.data() })
    })
    resolve(data)
  })
}

export function updateFirestoreDoc (path, updateObject) {
  return new Promise(async (resolve) => {
    const ref = firestoreRef(path)
    await updateDoc(ref, updateObject)
    resolve()
  })
}

export function createFirestoreQuery ({ collectionPath, criteriaTerms }) {
  const db = getFirestore()
  const ref = collection(db, collectionPath)
  const q = query(ref, where(criteriaTerms[0], criteriaTerms[1], criteriaTerms[2]))
  return q
}

export function deleteFirestoreDoc (path) {
  return new Promise(async (resolve) => {
    const ref = firestoreRef(path)
    await deleteDoc(ref)
    resolve()
  })
}