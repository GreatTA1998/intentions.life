const user = "6uIcMMsBEkQ85OINCDADtrygzZx1";
import db from "./connection.js";
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

const nesseryProperties = [
  "startTime",
  "notes",
  "iconDataURL",
  "reusableTemplateID",
  "lastRanRepeatISO",
  "parentID",
  "name",
  "orderValue",
  "duration",
  "isDone",
  "imageDownloadURL",
  "imageFullPath",
];

const migrateUserDataToNewFormat = async (userID) => {
  try {
    const q = query(collection(db, "users", userID, "tasks"));
    const querySnapshot = await getDocs(q);
    const tasksArray = querySnapshot.docs.map((doc) => doc.data());
    const IdArray = querySnapshot.docs.map((doc) => doc.id);
    console.log("we got: ", tasksArray.length, IdArray.length);
    const convertedArray = convert(tasksArray);
    return await updateDB(userID, convertedArray, IdArray);
  } catch (err) {
    console.error(err);
  }
};

migrateUserDataToNewFormat("yGVJSutBrnS1156uopQQOBuwpMl2");

// migrateUserDataToNewFormat("6uIcMMsBEkQ85OINCDADtrygzZx1")

function convert(dataArray) {
  const convertedArray = dataArray.map((task) => {
    const newStartDate = {
      startDateISO: task.startDate
        ? `${task.startYYYY}-${task.startDate.split("/")[0]}-${
            task.startDate.split("/")[1]
          }`
        : "",
    };

    const convertedTask = {
      ...nesseryProperties.reduce(
        (a, prop) => ({
          ...a,
          [prop]: task[prop] ? task[prop] : prop === "isDone" ? false : "",
        }),
        {}
      ),
      ...newStartDate,
    };
    return convertedTask;
  });
  return convertedArray;
}

const updateDB = async (userId, dataArray, idArray) => {
  try {
    const batch = writeBatch(db);
    idArray.map((id, i) => {
      if (dataArray[i].iconDataURL) return;
      const docRef = doc(db, "users", userId, "tasks", id);
      batch.set(docRef, dataArray[i]);
    });
    return await batch.commit();
  } catch (err) {
    console.error("error in updateDB", err);
  }
};

async function seedTasks() {
  try {
    console.time("seed");
    const batch = writeBatch(db);
    for (let i = 0; i < 3600; i++) {
      const collectionRef = doc(
        db,
        "users",
        "6uIcMMsBEkQ85OINCDADtrygzZx1",
        "tasks",
        ""
      );
      batch.update(collectionRef, buildRamdomTask());
    }
    await batch.commit();
    console.timeEnd("seed");
    return "";
  } catch (e) {
    console.log("erorr in seedTasks", e);
  }
}
