const user = "6uIcMMsBEkQ85OINCDADtrygzZx1";
import db from "./connection.js";
import {
  writeBatch,
  doc,
  getDocs,
  collection,
  query,
} from "firebase/firestore/lite";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const nesseryProperties = [
  "startTime",
  "notes",
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

// migrateUserDataToNewFormat("yGVJSutBrnS1156uopQQOBuwpMl2"); //Elton

// migrateUserDataToNewFormat("6uIcMMsBEkQ85OINCDADtrygzZx1"); //Marius

async function migrateUserDataToNewFormat(userID) {
  try {
    const q = query(collection(db, "users", userID, "tasks"));
    const querySnapshot = await getDocs(q);
    const tasksArray = querySnapshot.docs.map((doc) => doc.data());
    const IdArray = querySnapshot.docs.map((doc) => doc.id);
    const convertedArray = await convert(tasksArray);
    return await updateDB(userID, convertedArray, IdArray);
  } catch (err) {
    console.error(err);
  }
}

async function convert(dataArray) {
  const iconMap = await buildIconUrlMap();
  const convertedArray = dataArray.map((task) => {
    const newStartDateAndIcon = {
      startDateISO: task.startDate
        ? `${task.startYYYY}-${task.startDate.split("/")[0]}-${
            task.startDate.split("/")[1]
          }`
        : "",
      iconURL: iconMap[task.iconDataURL] ? iconMap[task.iconDataURL] : "",
    };

    const convertedTask = {
      ...nesseryProperties.reduce(
        (a, prop) => ({
          ...a,
          [prop]: task[prop] ? task[prop] : prop === "isDone" ? false : "",
        }),
        {}
      ),
      ...newStartDateAndIcon,
    };
    return convertedTask;
  });
  return convertedArray;
}

const updateDB = async (userId, dataArray, idArray) => {
  try {
    const batch = writeBatch(db);
    idArray.map((id, i) => {
      const docRef = doc(db, "users", userId, "tasks", id);
      batch.set(docRef, dataArray[i]);
    });
    return await batch.commit();
  } catch (err) {
    console.error("error in updateDB", err);
  }
};

async function buildIconUrlMap() {
  const storage = getStorage();
  const q = query(collection(db, "/doodleIcons"));
  const querySnapshot = await getDocs(q);
  const urlArray = await Promise.all(
    querySnapshot.docs.map((doc) =>
      getDownloadURL(
        ref(storage, `gs://project-y-2a061.appspot.com/icons/${doc.id}.png`)
      )
    )
  );
  const iconMap = {};
  querySnapshot.docs.map((doc, i) => {
    iconMap[doc.data().dataURL] = urlArray[i];
  });
  return iconMap;
}
