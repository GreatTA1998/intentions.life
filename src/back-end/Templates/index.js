import { db } from "../firestoreConnection.js";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { DateTime } from 'luxon';
import { getPeriodFromCrontab, deleteFutureTasks, postFutureTasks, getTotalStats } from './utils.js';
import Joi from 'joi';
import TemplateSchema from '../Schemas/TemplateSchema.js';

const create = async ({ userID, template, templateID }) => {
  Joi.assert(template, TemplateSchema);
  const docRef = doc(db, "users", userID, 'templates', templateID);
  return setDoc(docRef, template);
};

const updateWithTasks = async ({ userID, id, updates }) => {
  if (updates.crontab) {
    updateDoc(doc(db, "users", userID, 'templates', id), { crontab: updates.crontab });
    return Promise.all([
      deleteFutureTasks({ userID, id, fromDate: DateTime.now().toISO()}),
      updates.crontab === '0 0 0 * *' ? Promise.resolve([]) :
        postFutureTasks({ userID, id, fromDate: DateTime.now().toFormat('yyyy-MM-dd') })
    ]);
  }
  await updateDoc(doc(db, "users", userID, 'periodicTasks', id), updates);
  const uniqueProperties = ['crontab', 'id', 'userID', 'lastGeneratedTask', 'orderValue'];
  for (const property of uniqueProperties) {
    delete updates[property];
  }
  const tasksQuery = query(
    collection(db, "users", userID, "tasks"),
    where('periodicTaskId', '==', id),
    where('startDateISO', '>=', DateTime.now().toFormat('yyyy-MM-dd'))
  );

  const tasksSnapshot = await getDocs(tasksQuery);
  const updatePromises = tasksSnapshot.docs.map(doc =>
    updateDoc(doc.ref, updates)
  );
  return Promise.all(updatePromises);
};

const getAll = async (userID) => {
  const q = query(collection(db, "users", userID, "periodicTasks"));
  const snapshot = await getDocs(q)
  const arraywithIds = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, userID: doc.ref.parent.parent.id }))
  for (const periodicTask of arraywithIds) {
    const [totalTasksCompleted, TotalMinutesSpent] = await getTotalStats({ userID, id: periodicTask.id })
    periodicTask.totalTasksCompleted = totalTasksCompleted
    periodicTask.TotalMinutesSpent = TotalMinutesSpent
  }
  return arraywithIds
};

const deleteTemplate = async ({ userID, id }) => {
  const tasksQuery = query(
    collection(db, "users", userID, "tasks"),
    where('periodicTaskId', '==', id),
    where('startDateISO', '>=', DateTime.now().toFormat('yyyy-MM-dd'))
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  const deletePromises = tasksSnapshot.docs.map(doc =>
    deleteDoc(doc.ref)
  );
  await Promise.all(deletePromises);
  return deleteDoc(doc(db, "users", userID, "periodicTasks", id));
};

const generateTaskFromTemplate = async ({template, startDateISO, startTime}) => {
  const task = {
    startTime,
    notes: template.notes,
    periodicTaskId: template.id,
    parentID: "",
    name: template.name,
    orderValue: 0,
    duration: template.duration,
    isDone: false,
    imageDownloadURL: "",
    imageFullPath: "",
    startDateISO,
    iconUrl: template.iconUrl,
    timeZone: template.timeZone,
    notify: template.notify,
  }
  return task
}

export default { create, updateWithTasks, getAll, deleteTemplate, getPeriodFromCrontab, generateTaskFromTemplate };
