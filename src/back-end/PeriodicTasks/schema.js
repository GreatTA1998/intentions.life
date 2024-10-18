
// crontab:
// *: Minutes (0-59)
// *: Hours (0-23)
// *: Day of the month (1-31)
// *: Month (1-12)
// *: Day of the week (0-7, where both 0 and 7 represent Sunday)

const PeriodicTaskSchema = {
    name: "test",
    orderValue: 0,
    lastGeneratedTask: "2024-10-15",
    crontab: "0 0 15 10 *",  //yearly on october 15th
    iconUrl: "url",
    tags: [],
    id: "88888888", //hydrated
    timeZone: "Asia/Tokyo",
    userID: "88888888", //hydrated
    notes: "",
    notify: "",
    duration: 30,
    startTime: "12:00",
    totalTasksCompleted: 0, //hydrated
    TotalMinutesSpent:0, //hydrated
  };
  