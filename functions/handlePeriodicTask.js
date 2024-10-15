const { firebase } = require('./firebase.js');
const functions = require('firebase-functions');
const { getFirestore } = require('firebase-admin/firestore');
const { DateTime } = require('luxon');
const { parseExpression } = require('cron-parser');
const db = getFirestore('tokyo-db');
const { getRandomID } = require('./utils.js');

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

const handlePeriodicTask = async (periodicTask) => {
    try{
    const db = getFirestore('tokyo-db');
    const startDate = DateTime.fromISO(`${periodicTask.lastGeneratedTask}T${periodicTask.startTime}:00`, { zone: periodicTask.timeZone }).plus({ days: 1 });
    const endDate = DateTime.now().setZone(periodicTask.timeZone).plus({ months: 1 });
    const tasksArray = await buildFutureTasks(periodicTask, new Date(startDate), new Date(endDate));
    console.log(tasksArray);
    const batch = db.batch();

    tasksArray.forEach(task => {
        const taskId = getRandomID()
        const documentPath = `users/${periodicTask.userID}/tasks/${taskId}`;
        console.log(documentPath);
        const taskRef = db.doc(documentPath);
        batch.set(taskRef, task);
    });

    await batch.commit();
    functions.logger.log('Tasks generated for periodic task:', periodicTask.name, "through", endDate.toFormat('yyyy-MM-dd'));
        return;
    } catch (error) {
        console.log('Error in handlePeriodicTask:', error);
    }
}

const buildFutureTasks = async (periodicTask, startDateJS, endDateJS) => {

    const interval = parseExpression(periodicTask.crontab, ({currentDate:startDateJS, endDate:endDateJS, iterator:true }));
    const generatedTasks = [];
    while (true) { // I also smoke and do drugs
        const cronObj = interval.next();
        const ISODate = DateTime.fromJSDate(new Date(cronObj.value.toString())).toFormat('yyyy-MM-dd')
        generatedTasks.push({
            name: periodicTask.name,
            startDateISO: ISODate,
            iconUrl: periodicTask.iconUrl,
            tags: periodicTask.tags,
            periodicTaskId: periodicTask.id,
            timeZone: periodicTask.timeZone,
            notes: periodicTask.notes,
            notify: periodicTask.notify,
            isDone: false,
            imageDownloadURL: "",
            imageFullPath: "",
            duration: periodicTask.duration,
            parentID: "",
            orderValue: "",
            startTime: periodicTask.startTime,
        });
        if (cronObj.done) {
            const documentPath = `users/${periodicTask.userID}/periodicTasks/${periodicTask.id}`;
            console.log(documentPath);
            const periodicTaskRef = db.doc(documentPath);
            await periodicTaskRef.update({ lastGeneratedTask: ISODate }).catch((error) => {
                functions.logger.error('Error in generateTasksForPeriod:', error);
            });
            break;
        }
    }

    return generatedTasks;
};


exports.handlePeriodicTask = handlePeriodicTask;