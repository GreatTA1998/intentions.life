import { db } from "./firestoreConnection";
import { getRandomID } from "/src/helpers/everythingElse.js";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const getByDateRange = (userUID, startDate, endDate) => {
  try {
    const q = query(
      collection(db, "users", userUID, "tasks"),
      where("startDateISO", ">=", startDate),
      where("startDateISO", "<=", endDate)
    );
    return getDocs(q).then((snapshot) =>
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  } catch (err) {
    console.error("Error in getByDateRange", err);
  }
};

const getUnscheduled = (userUID) => {
  const q = query(
    collection(db, "users", userUID, "tasks"),
    where("startDateISO", "==", ""),
    where("isDone", "==", false)
  );

  return getDocs(q).then((snapshot) =>
    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  );
};

const post = (userUID, task) => {
  return setDoc(doc(db, "users", userUID, getRandomID()), task);
};

const update = (userUID, taskID, keyValueChanges) => {
  return updateDoc(doc(db, "users", userUID, taskID), keyValueChanges);
};

const remove = (userUID, taskID) =>
  deleteDoc(doc(db, "users", userUID, taskID));

const getTasksJSONByRange = async (uid, startDate, endDate) => {
  const neededProperties = [
    "duration",
    "isDone",
    "name",
    "notes",
    "startDateISO",
    "startTime",
  ];
  const q = query(
    collection(db, "users", uid, "tasks"),
    where("startDateISO", "!=", ""),
    where("startDateISO", ">=", startDate),
    where("startDateISO", "<=", endDate)
  );
  const getDataArray = (snapshot) => snapshot.docs.map((doc) => doc.data());
  const taskArray = await getDocs(q).then(getDataArray).catch(console.error);

  const reducetoNeeded = (task) =>
    neededProperties.reduce(
      (acc, prop) => ({ [prop]: task[prop] || "", ...acc }),
      {}
    );
  return JSON.stringify(taskArray.map(reducetoNeeded));
};

export default {
  getByDateRange,
  getUnscheduled,
  post,
  update,
  getTasksJSONByRange,
  remove,
};
