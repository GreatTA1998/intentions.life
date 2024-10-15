const { onSchedule } = require('firebase-functions/v2/scheduler');
const functions = require('firebase-functions');
const { checkNotify } = require('./checkNotify');
const { handlePeriodicTask } = require('./handlePeriodicTask');


// This crontab expression breaks down as follows:
// *: Minutes (0-59)
// *: Hours (0-23)
// *: Day of the month (1-31)
// *: Month (1-12)
// *: Day of the week (0-7, where both 0 and 7 represent Sunday)


// exports.notifications = onSchedule(
//   {
//     schedule: '* * * * *', // crontab syntax every min
//     region: 'asia-northeast1', // Tokyo region
//   },
//   async (event) => {
//     await checkNotify();
//   },
// );

// exports.periodicTasks = onSchedule(
//   {
//     schedule: '0 0 * * *', // crontab syntax every day at midnight
//     region: 'asia-northeast1', // Tokyo region
//   },
//   async (event) => {
//     await checkNotify();
//   },
// );

// For Testing

const periodicTaskTest = {
  name: "test",
  lastGeneratedTask: "2024-10-15",
  crontab: "0 0 * * 1,4",
  iconUrl: "url",
  tags: [],
  id: "88888888",
  timeZone: "Asia/Tokyo",
  userID: "88888888",
  notes: "",
  notify: "",
  duration: 30,
  startTime: "12:00",
};

exports.scheduledFunction = functions.https.onRequest(async (req, res) => {
  console.log('check periodic task is running')
  await handlePeriodicTask(periodicTaskTest);
  res.status(200).send('Function executed successfully');
});
