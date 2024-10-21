const { onSchedule } = require('firebase-functions/v2/scheduler');
const functions = require('firebase-functions');
const { checkNotify } = require('./checkNotify');
const { handlePeriodicTask } = require('./handlePeriodicTask');
const { db } = require('./firebase');
const { getFirestore } = require('firebase-admin/firestore');

// This crontab expression breaks down as follows:
// *: Minutes (0-59)
// *: Hours (0-23)
// *: Day of the month (1-31)
// *: Month (1-12)
// *: Day of the week (0-7, where both 0 and 7 represent Sunday)


exports.notifications = onSchedule(
  {
    schedule: '* * * * *', // crontab syntax every min
    region: 'asia-northeast1', // Tokyo region
  },
  async (event) => {
    await checkNotify();
  },
);

exports.periodicTasks = onSchedule(
  {
    schedule: '0 0 * * *', // crontab syntax every day at midnight
    region: 'asia-northeast1', // Tokyo region
  },
  async (event) => {
    functions.logger.info('periodicTasks function excecuting');
    const db = getFirestore('asian-alliance');
    const snapshot = await db.collectionGroup('periodicTasks').get();
    const periodicTasks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, userID: doc.ref.parent.parent.id }));
    for (const periodicTask of periodicTasks) {
      await handlePeriodicTask(periodicTask);
    }
  },
);

// For Testing

// const periodicTaskTest = {
//   name: "test",
//   lastGeneratedTask: "2024-10-25",
//   crontab:  "0 0 * * 1,2,4",  //yearly on october 15th, monday and wednesday: "0 0 * * 1,4",
//   iconUrl: "url",
//   tags: [],
//   id: "88888888",
//   timeZone: "Asia/Tokyo",
//   userID: "88888888",
//   notes: "",
//   notify: "",
//   duration: 30,
//   startTime: "12:00",
// };

// exports.scheduledFunction = functions.https.onRequest(async (req, res) => {
//   const db = getFirestore('asian-alliance');
//   const snapshot = await db.collectionGroup('periodicTasks').get();
//   const periodicTasks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, userID: doc.ref.parent.parent.id }));
//   res.status(200).send('Function executed successfully');
// });
