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
];


const test = async () => {
  const q = query(
    collection(db, "users", "6uIcMMsBEkQ85OINCDADtrygzZx1", "tasks")
  );
  const querySnapshot = await getDocs(q);
  const tasksArray = querySnapshot.docs.map((doc) => doc.data());
  const IdArray = querySnapshot.docs.map((doc) => doc.id);
  //   console.log(tasksArray);
  const results = await updateDB(convert(tasksArray), IdArray);
  console.log(results)
};

test();


function convert(dataArray) {
  return dataArray.map((task) => {
    const newStartDate = {
      startDateISO: task.startDate
        ? `${task.startYYYY}-${task.startDate.split("/")[0]}-${
            task.startDate.split("/")[1]
          }`
        : "",
    };

    return {
      ...nesseryProperties.reduce(
        (a, prop) => ({ ...a, [prop]: task[prop] || "" }),
        {}
      ),
      ...newStartDate,
    };
  });
}

const trace = (x, y) => {
  console.log(x, y);
  return y;
};


const updateDB = async (dataArray, idArray) => {
    try{
        const batch = writeBatch(db);
        idArray.map((id,i)  => {
            const docRef = doc(
                db,
                "users",
                "6uIcMMsBEkQ85OINCDADtrygzZx1",
                "tasks",
                id
              );
              batch.set(docRef, dataArray[i]);
        })
        return await batch.commit();
    }catch(err){
        console.error('error in updateDB', err);
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
