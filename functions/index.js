const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

exports.scheduledFunctionCrontab = onSchedule(
  {
    schedule: "*/1 * * * *",  // crontab syntax every 10 min
    region: "asia-northeast1", // Tokyo region
  },
  (event) => {
    logger.log("Hello world at");
  }
);
