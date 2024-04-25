import { getRandomID } from '/src/helpers.js'

function createTemplateAndGenerateTasks ({ numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay }, userDoc) {
  // create template
  const id = getRandomID()
  repeatGroupID = id
  setFirestoreDoc(`/users/${userDoc.uid}/periodicTasks/${id}`, {
    name: newTaskName,
    repeatOnDayOfMonth,
    willRepeatOnLastDay,
    repeatGroupID: id
  })

  createNewInstancesOfMonthlyRepeatingTasks({ 
    repeatGroupID: id,
    numOfMonthsInAdvance: 2, 
    repeatOnDayOfMonth, 
    willRepeatOnLastDay
  }, userDoc)
}

// repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
export function createNewInstancesOfMonthlyRepeatingTasks ({ repeatGroupID, numOfMonthsInAdvance = 2, repeatOnDayOfMonth, willRepeatOnLastDay }, userDoc) {
  const d = new Date() // base case: no need to start from beginning of month
  for (let i = 0; i < numOfMonthsInAdvance; i++) {
    generateRepeatingTasksForSpecificMonth(d, repeatOnDayOfMonth, willRepeatOnLastDay, userDoc, repeatGroupID)

    // general case: start from beginning of month
    d.setMonth(d.getMonth() + 1)
    d.setDate(1) 
  }
}

function generateRepeatingTasksForSpecificMonth (dateClassObject, repeatOnDayOfMonth, willRepeatOnLastDay, userDoc, repeatGroupID) {
  const d = dateClassObject

  // general case: first 28 days
  while (d.getDate() < 28) {
    if (repeatOnDayOfMonth[d.getDate() - 1]) { // getDate() is 1-indexed but `repeatOnDayOfMonth` is 0-indexed
      generateNewTask(d.getDate(), d.getMonth(), userDoc, repeatGroupID)
    }
    d.setDate(d.getDate() + 1)
  }

  // edge case: last day (i.e. 28, 29, 30, 31 treated the same)
  if (willRepeatOnLastDay) {
    const lastDay = getLastDayOfMonth(d.getMonth()) // note `getMonth` is zero-indexed
    generateNewTask(lastDay, d.getMonth(), userDoc, repeatGroupID)
  }
}

// month is 1-indexed from 1 to 12
function getLastDayOfMonth (zeroIndexedMonthNumber) {
  const d1 = new Date()
  const d2 = new Date(d1.getFullYear(), zeroIndexedMonthNumber + 1, 0);
  const lastDay = d2.getDate()
  return lastDay
}

function generateNewTask (dayOfMonth, zeroIndexedMonthNumber, userDoc, repeatGroupID) {
  // BUG: NOT CORRECT
  const d = new Date()
  d.setMonth(zeroIndexedMonthNumber) // MUST set month first, otherwise it thinks the 31st day doesn't exist on the month yet
  d.setDate(dayOfMonth)

  const individualID = getRandomID()

  let newObj = {
    repeatGroupID,
    id: individualID,
    name: newTaskName, // taskName is not defined
    startTime: '',
    startDate: getDateInMMDD(d), //, MMDD
    startYYYY: new Date().getFullYear()
  } 

  newObj = checkTaskObjSchema(newObj, userDoc)

  setFirestoreDoc(
    `/users/${userDoc.uid}/tasks/${individualID}`, 
    newObj
  )
}