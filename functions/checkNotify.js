const { firebase } = require('./firebase.js');
const functions = require('firebase-functions');
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore');
const { DateTime } = require('luxon');

async function checkNotify() {
  functions.logger.info('scheduledFunction');
  try {
    const db = getFirestore('tokyo-db');
    const usersSnapshot = await db
      .collection('users')
      .where('FCMTokens', '!=', [])
      .get();
    for (const userDoc of usersSnapshot.docs) {
      const tasksSnapshot = await getTodaysTasksSnapshot(userDoc);
      tasksSnapshot.docs.map(
        async (taskDoc) =>
          await handleNotifications(taskDoc.data(), userDoc.data()),
      );
    }
  } catch (error) {
    functions.logger.error('Error in sendTaskNotifications:', error);
  }
}

async function getTodaysTasksSnapshot(userDoc) {
  const safeFirstDateISO = DateTime.now()
    .minus({ days: 1 })
    .toISO()
    .slice(0, 10);
  const safeLastDateISO = DateTime.now().plus({ days: 1 }).toISO().slice(0, 10);
  const tasksSnapshot = await userDoc.ref
    .collection('tasks')
    .where('startDateISO', '>=', safeFirstDateISO)
    .where('startDateISO', '<=', safeLastDateISO)
    .get();
  return tasksSnapshot;
}

function handleNotifications(taskData, userData) {
  if (!shouldNotifyNow(taskData)) return;
  userData.FCMTokens.map(async (token) => {
    const message = {
      notification: {
        title: `${taskData.name} in ${taskData.notify} minutes!`,
        body: `${taskData.name} is coming up in ${taskData.notify} minutes!`,
      },
      token: token,
    };

    try {
      await firebase.messaging().send(message);
      functions.logger.info(
        `Successfully sent notifications for user ${userData.id}, task ${taskData.id}`,
      );
    } catch (error) {
      functions.logger.error(
        `Error sending notifications for user ${userId}, task ${taskDoc.id}:`,
        error,
      );
    }
  });
}

const shouldNotifyNow = (taskData) => {
  const now = DateTime.now().setZone(taskData.timeZone);
  const taskDateTime = DateTime.fromISO(
    `${taskData.startDateISO}T${taskData.startTime}:00`,
  );
  return now.hasSame(
    taskDateTime.minus({ minutes: taskData.notify }),
    'minute',
  );
};

exports.checkNotify = checkNotify;
