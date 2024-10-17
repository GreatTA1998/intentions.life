import { db } from "./firestoreConnection";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// crontab:
// *: Minutes (0-59)
// *: Hours (0-23)
// *: Day of the month (1-31)
// *: Month (1-12)
// *: Day of the week (0-7, where both 0 and 7 represent Sunday)

const PeriodicTaskSchema = {
  name: "test",
  orderValue: 0,
  lastGeneratedTask: "2024-10-15",
  crontab: "0 0 15 10 *",  //yearly on october 15th
  iconUrl: "url",
  tags: [],
  id: "88888888", //hydrated
  timeZone: "Asia/Tokyo",
  userID: "88888888", //hydrated
  notes: "",
  notify: "",
  duration: 30,
  startTime: "12:00",
};

const create = async ({ userID, task }) => {
  const docRef = doc(collection(db, "users", userID, 'periodicTasks'));
  await setDoc(docRef, task);
  return docRef.id;};

const updateTemplate = async ({ userID, id, updates }) => {
  console.log('updateTemplate', userID ,id, updates);
  await updateDoc(doc(db, "users", userID, 'periodicTasks', id), updates);
} 

const updateWithTasks = async ({ userID, id, updates }) => {
  await updateDoc(doc(db, "users", userID, 'periodicTasks', id), updates);
  const uniqueProperties = ['crontab', 'id', 'userID', 'lastGeneratedTask', 'orderValue'];
  for (const property of uniqueProperties) {
    delete updates[property];
  }
  const tasksQuery = query(
    collection(db, "users", userID, "tasks"),
    where('periodicTaskID', '==', id),
    where('startDateISO', '>=', DateTime.now().toFormat('yyyy-MM-dd'))
  );

  const tasksSnapshot = await getDocs(tasksQuery);
  const updatePromises = tasksSnapshot.docs.map(doc =>
    updateDoc(doc.ref, updates)
  );
  return Promise.all(updatePromises);
};

const getTotalTime = async (userID, id) => {
  const q = query(collection(db, "users", userID, "tasks"), where('periodicTaskID', '==', id));
  const snapshot = await getDocs(q)
  return snapshot.docs.reduce((acc, doc) => acc + doc.data().duration, 0);
};

const get = (userID) => {
  const q = query(collection(db, "users", userID, "periodicTasks"));
  return getDocs(q).then((snapshot) =>
    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, userID: doc.ref.parent.parent.id }))
  );
};

const deleteTemplate = async ({ userID, id }) => {
  const tasksQuery = query(
    collection(db, "users", userID, "tasks"),
    where('periodicTaskID', '==', id),
    where('startDateISO', '>=', DateTime.now().toFormat('yyyy-MM-dd'))
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  const deletePromises = tasksSnapshot.docs.map(doc =>
    deleteDoc(doc.ref)
  );
  await Promise.all(deletePromises);
  return deleteDoc(doc(db, "users", userID, "periodicTasks", id));
};

const getPeriod = ({ crontab }) => {
  if(!crontab) return null;
  console.log('crontab', crontab);
    const parts = crontab.split(' ');
    if (parts.length !== 5) throw new Error('Invalid crontab format');
    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    if (dayOfMonth !== '*' && month !== '*' && dayOfWeek === '*') return 'yearly';
    if (dayOfMonth !== '*' && month === '*' && dayOfWeek === '*') return 'monthly';
    if (dayOfMonth === '*' && month === '*' && dayOfWeek !== '*') return 'weekly';
    throw new Error('unknown frequency');
}

export default { create, updateWithTasks, getTotalTime, get, deleteTemplate, getPeriod, updateTemplate, };
