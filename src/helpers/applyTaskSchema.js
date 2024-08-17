import {updateFirestoreDoc } from '/src/helpers/crud.js'


const Schema = {
  startTime: "",
  notes: "",
  reusableTemplateID: "",
  lastRanRepeatISO: "",
  parentID: "",
  name: "",
  orderValue: "",
  duration: 30,
  isDone: false,
  imageDownloadURL: "",
  imageFullPath: "",
  startDateISO: "",
  iconURL: "",
};

export default async function applyTaskSchema(task, userDoc) {
  const formatedTask = {};
  for (const [key, value] of Object.entries(Schema)) {
    formatedTask[key] = task[key] || value;
  }
  if (!formatedTask.orderValue) {
    formatedTask.orderValue = await handleOrderValue(userDoc);
  }
  return formatedTask;
}

async function handleOrderValue(userDoc) {
  const newVal = (userDoc.maxOrderValue || 0) + 3;
  const epsilon = Math.random() * 0.5;
  const newOrderValue = newVal + epsilon;
  await updateFirestoreDoc(`/users/${userDoc.uid}`, {
    maxOrderValue: newVal,
  }).catch((err) => console.error("error in handleOrderValue", err));
  return newOrderValue;
}
