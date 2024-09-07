const { onSchedule } = require('firebase-functions/v2/scheduler');
const { logger } = require('firebase-functions');
const { db } = require('./firestoreConnection');
const functions = require('firebase-functions');
const { checkNotify } = require('./checkNotify');

// exports.scheduledFunctionCrontab = onSchedule(
//   {
//     schedule: '*/1 * * * *', // crontab syntax every 10 min
//     region: 'asia-northeast1', // Tokyo region
//   },
//   async (event) => {
//     await checkNotify();
//   },
// );
exports.scheduledFunction = functions.https.onRequest(async (req, res) => {
  await checkNotify();
  res.status(200).send('Function executed successfully');
});
