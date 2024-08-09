const mariusUserID = "6uIcMMsBEkQ85OINCDADtrygzZx1";
import db from "./connection.js";
import { DateTime } from "luxon";
import {
  writeBatch,
  doc,
  getDocs,
  collection,
  query,
  where,
  limit,
  Timestamp,
} from "firebase/firestore/lite";

// /tasks/getTasksByDateRange/:startDate/:endDate


const getTasksByDateRange = async (startDate, endDate, ) => {
  const q = query(
    collection(db, "users", mariusUserID, "tasks"),
    where("startDateISO", ">=", startDate),
    where("startDateISO", "<=", endDate)
  );
  const querySnapshot = await getDocs(q);
  const tasksArray = querySnapshot.docs.map((doc) => doc.data());
  const IdArray = querySnapshot.docs.map((doc) => doc.id);
  console.log(tasksArray);
};

  test();
