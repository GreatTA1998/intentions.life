const { DateTime } = require('luxon');

const test = () => {
  const now = DateTime.now();
  const nowZone = now.zoneName;
  console.log('now:', now, 'nowZone:', nowZone);
  const nowInTaipei = now.setZone('Asia/Taipei');
  console.log('nowInTaipei:', nowInTaipei);
};

const test2 = (task) => {
  const now = DateTime.now();
  if (DateTime.fromISO(task.startDateIso).hasSame(now, 'day')) {
    console.log('same day');
  } else {
    console.log('not same day');
  }
};

const test3 = (taskData) => {
    const now = DateTime.now().setZone(taskData.timezone);
    const taskDateTime = DateTime.fromISO(`${taskData.startDateISO}T${taskData.startTime}:00`)
  console.log(DateTime.now().minus({days: 1}).toISO().slice(0,10))
    // console.log(now.hasSame(taskDateTime.minus({minutes: taskData.notify}), 'minute'));
};

test3({ startTime: '17:02', notify: 10, startDateISO: '2024-09-10', timezone: 'Asia/Taipei' });
