const { onSchedule } = require('firebase-functions/v2/scheduler');
const functions = require('firebase-functions');
const { checkNotify } = require('./checkNotify');

exports.scheduledFunctionCrontab = onSchedule(
  {
    schedule: '* * * * *', // crontab syntax every min
    region: 'asia-northeast1', // Tokyo region
  },
  async (event) => {
    console.log('running check notiffy');
    await checkNotify();
  },
);

// For Testing
// exports.scheduledFunction = functions.https.onRequest(async (req, res) => {
//   console.log('check Notify is running')
//   await checkNotify();
//   res.status(200).send('Function executed successfully');
// });
