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
  isYearly: true,
};

const post = ({ userID, task }) => {
  return setDoc(doc(db, "users", userUID, 'periodicTasks'), task);
};

// I would reload all tasks after update on the front end.
const update = async ({ userID, id, updates }) => {
  await updateDoc(doc(db, "users", userID, 'periodicTasks', id), updates);
  const uniqueProperties = ['crontab', 'id', 'userID', 'lastGeneratedTask', 'isYearly'];
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

export { post, update, getTotalTime, get };
