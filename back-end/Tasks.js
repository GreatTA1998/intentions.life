import db from "./connection.js";
import {getRandomID} from '/src/helpers.js'
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  updateDoc
} from "firebase/firestore/lite";

const mariusUserID = "6uIcMMsBEkQ85OINCDADtrygzZx1";//TESTING

const getByDateRange = (userUID, startDate, endDate) => {
  const q = query(
    collection(db, "users", userUID, "tasks"),
    where("startDateISO", ">=", startDate),
    where("startDateISO", "<=", endDate)
  );
  return getDocs(q).then(snapshot => snapshot.docs.map((doc) => doc.data()));
};

const getUnschedueled = (userUID) => {
  const q = query(
    collection(db, "users", userUID, "tasks"),
    where("startDateISO", "==", ""),
    where('isDone', "==", false)
  );

  return getDocs(q).then(snapshot =>snapshot.docs.map((doc) => doc.data()));
};

const post = (userUID, task) => {
  return setDoc(doc(db,users, userUID, getRandomID()), task);
} 

const update = (userUID, taskID,  keyValueChanges) => {
  return updateDoc(doc(db,users, userUID, taskID), keyValueChanges);
} 

export default {
    getByDateRange, 
    getUnschedueled,
    post,
    update
}