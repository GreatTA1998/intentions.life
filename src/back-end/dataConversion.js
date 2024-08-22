const user = "6uIcMMsBEkQ85OINCDADtrygzZx1";
import db from "./db.js";
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

runConversionForAllUsers();
async function runConversionForAllUsers() {
  try {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    const userIDArray = querySnapshot.docs.map((doc) => doc.id);
    for (const id of userIDArray) {
      await migrateUserDataToNewFormat(id);
    }
  } catch (err) {
    console.error("error in runConversionForAllUsers", err);
  }
}
async function migrateUserDataToNewFormat(userID) {
  try {
    console.log("workin on uid: ", userID);
    const q = query(collection(db, "users", userID, "tasks"));
    const querySnapshot = await getDocs(q);
    const tasksArray = querySnapshot.docs.map((doc) => doc.data());
    const IdArray = querySnapshot.docs.map((doc) => doc.id);
    const convertedArray = await convert(tasksArray);
    return await updateDB(userID, convertedArray, IdArray);
  } catch (err) {
    console.error(" error in migrateUserData", err);
  }
}

async function convert(dataArray) {
  try {
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
  } catch (err) {
    console.error("error in convert, ", err);
  }
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
  try {
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
  } catch (err) {
    console.error("error in buildIconUrlMap", err);
  }
}
