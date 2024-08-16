// import db from "./connection.js";
import db from "../db";
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

const mariusUserID = "6uIcMMsBEkQ85OINCDADtrygzZx1"; //TESTING

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
  return setDoc(doc(db, users, userUID, getRandomID()), task);
};

const update = (userUID, taskID, keyValueChanges) => {
  return updateDoc(doc(db, users, userUID, taskID), keyValueChanges);
};

// function getRandomID() {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let autoId = "";
//   for (let i = 0; i < 20; i++) {
//     autoId += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return autoId;
// }

export default {
  getByDateRange,
  getUnscheduled,
  post,
  update,
};
