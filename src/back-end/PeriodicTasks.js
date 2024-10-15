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

// crontab:
// *: Minutes (0-59)
// *: Hours (0-23)
// *: Day of the month (1-31)
// *: Month (1-12)
// *: Day of the week (0-7, where both 0 and 7 represent Sunday)

const PeriodicTaskSchema = {
  name: "",
  lastGeneratedTask: "yyyy-mm-dd",
  crontab: "* * * * *",
  iconUrl: "",
  tags: [],
  
};

const post = (userUID, task) => {
  const id = getRandomID();
  return setDoc(doc(db, "users", userUID, 'periodicTasks', id), task);
};


const get = (userUID) => {
  const q = query(collection(db, "users", userUID, "periodicTasks"));
  return getDocs(q).then((snapshot) =>
    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  );
};



