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
    const usersSnapshot = await db.collection('users').get();
    for (const userDoc of usersSnapshot.docs) {
      const tasksSnapshot = await userDoc.ref.collection('tasks').get();
      tasksSnapshot.docs.map(async (taskDoc) =>
        await handleNotifications(taskDoc.data(), userDoc.data()),
      );
    }
    functions.logger.info(
      `Successfully sent notifications.`,
    );
  } catch (error) {
    functions.logger.error('Error in sendTaskNotifications:', error);
  }
}

function handleNotifications(taskData, userData) {
  if (!taskData.notify || taskData.notify == '') return;
  userData.FCMTokens.map(async (token) => {
    const message = {
      notification: {
        title: 'Task Reminder',
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

exports.checkNotify = checkNotify;
