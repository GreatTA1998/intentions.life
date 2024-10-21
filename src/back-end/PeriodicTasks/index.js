import { db } from "../firestoreConnection";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { DateTime } from 'luxon';
import { getPeriodFromCrontab, deleteFutureTasks, postFutureTasks, getTotalStats } from './utils.js';


const create = async ({ userID, task }) => {
  const docRef = doc(collection(db, "users", userID, 'periodicTasks'));
  await setDoc(docRef, task);
  return docRef.id;
};

const updateTemplate = async ({ userID, id, updates }) => {
  await updateDoc(doc(db, "users", userID, 'periodicTasks', id), updates);
}

const updateWithTasks = async ({ userID, id, updates }) => {
  if (updates.crontab) {
    await updateDoc(doc(db, "users", userID, 'periodicTasks', id), { crontab: updates.crontab });
    const [_, posted] = await Promise.all([
      deleteFutureTasks({ userID, id, fromDate: DateTime.now().toFormat('yyyy-MM-dd') }),
      postFutureTasks({ userID, id, fromDate: DateTime.now().toFormat('yyyy-MM-dd') })
    ]);
    console.log("posted", posted);
    return posted;
  }
  await updateDoc(doc(db, "users", userID, 'periodicTasks', id), updates);
  const uniqueProperties = ['crontab', 'id', 'userID', 'lastGeneratedTask', 'orderValue'];
  for (const property of uniqueProperties) {
    delete updates[property];
  }
  const tasksQuery = query(
    collection(db, "users", userID, "tasks"),
    where('periodicTaskId', '==', id),
    where('startDateISO', '>=', DateTime.now().toFormat('yyyy-MM-dd'))
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  const updatePromises = tasksSnapshot.docs.map(doc =>
    updateDoc(doc.ref, updates)
  );
  Promise.all(updatePromises);
  return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), ...updates }))
};


const getAll = async (userID) => {
  const q = query(collection(db, "users", userID, "periodicTasks"));
  const snapshot = await getDocs(q)
  const arraywithIds = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, userID: doc.ref.parent.parent.id }))
  for (const periodicTask of arraywithIds) {
    const [totalTasksCompleted, TotalMinutesSpent] = await getTotalStats({ userID, id: periodicTask.id })
    periodicTask.totalTasksCompleted = totalTasksCompleted
    periodicTask.TotalMinutesSpent = TotalMinutesSpent
  }
  return arraywithIds
};

const deleteTemplate = async ({ userID, id }) => {
  const tasksQuery = query(
    collection(db, "users", userID, "tasks"),
    where('periodicTaskId', '==', id),
    where('startDateISO', '>=', DateTime.now().toFormat('yyyy-MM-dd'))
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  const deletePromises = tasksSnapshot.docs.map(doc =>
    deleteDoc(doc.ref)
  );
  await Promise.all(deletePromises);
  return deleteDoc(doc(db, "users", userID, "periodicTasks", id));
};

export default { create, updateWithTasks, getAll, deleteTemplate, getPeriodFromCrontab, updateTemplate, };
