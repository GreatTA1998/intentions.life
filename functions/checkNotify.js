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
    const db = getFirestore('tokyo-db');
    const usersSnapshot = await db
      .collection('users')
      .where('FCMTokens', '!=', [])
      .get();

    for (const userDoc of usersSnapshot.docs) {
      const tasksSnapshot = await getTodaysTasksSnapshot(userDoc);
      Promise.all( tasksSnapshot.docs.map(
        (taskDoc) => handleNotifications(taskDoc.data(), userDoc.data()),
      )).catch(error => {
        functions.logger.error('Error in checkNotify:', error);
      });
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
    .where('notify', '!=', '')
    .orderBy('startDateISO')
    .orderBy('notify')
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
    return firebase.messaging().send(message).then(() => {
      functions.logger.info(
        `Successfully sent notifications for user ${userData.id}, task ${taskData.id}`,
      );
    }).catch(error => {
      functions.logger.error('Error in handleNotifications:', error);
    });
  });
}

const shouldNotifyNow = (taskData) => {
    functions.logger.error('shouldNotifyNow', taskData);
    const now = DateTime.now().setZone(taskData.timeZone);
    const taskDateTime = DateTime.fromISO(
      `${taskData.startDateISO}T${taskData.startTime}:00`,
    );
    functions.logger.info('taskData.notify', taskData.notify);
    const notifyMinutes = parseInt(taskData.notify, 10);
    functions.logger.info('notifyMinutes', notifyMinutes);
    if (isNaN(notifyMinutes)||typeof notifyMinutes !== 'string') {
      functions.logger.error('Invalid notify value:', taskData.notify);
      return false;
    }
    return now.hasSame(
      taskDateTime.minus({ minutes: notifyMinutes }),
      'minute',
    );
};

exports.checkNotify = checkNotify;
