import { 
  setFirestoreDoc, 
  deleteFirestoreDoc, 
  createFirestoreQuery, 
  getFirestoreQuery, 
  updateFirestoreDoc 
} from '/src/crud.js'
import { 
  getRandomID, 
  checkTaskObjSchema,  
  convertMMDDToDateClassObject, 
  computeDayDifference, 
  mod,
  twoDigits,
  getDateInMMDD,
} from '/src/helpers.js'

// repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
export function createNewInstancesOfWeeklyRepeatingTasks ({ weeklyTemplate, userDoc }) {
  const { repeatOnDayOfWeek, repeatGroupID, numOfWeeksInAdvance = 1 } = weeklyTemplate
  
  if (!numOfWeeksInAdvance) {
    alert(`"Show repeats _ weeks ahead" must be filled`)
  }
  const allGeneratedTasksToUpload = []

  const d = new Date()
  for (let i = 0; i < 7 * numOfWeeksInAdvance; i++) {
    const weekDayNumber = mod(d.getDay() - 1, 7) // for getDay(), Sunday = 0, Monday = 1
    if (repeatOnDayOfWeek[weekDayNumber]) {
      const generatedTask = createRepeatedTask({
        dateClassObj: new Date(d.getTime()),
        weeklyTemplate,
        userDoc
      })
      allGeneratedTasksToUpload.push({ ...generatedTask })
    }

    d.setDate(d.getDate() + 1)
  }

  for (const task of allGeneratedTasksToUpload) {
    setFirestoreDoc(
      `/users/${userDoc.uid}/tasks/${task.id}`,
      task
    )
  }

  updateFirestoreDoc(`/users/${userDoc.uid}/periodicTasks/${repeatGroupID}`, {
    lastRanRepeatISO: new Date().toISOString()
  })
}

function createRepeatedTask({ dateClassObj, weeklyTemplate, userDoc }) {
  const individualID = getRandomID()
  const { repeatOnDayOfWeek, repeatGroupID, name, duration, startTime = '', iconDataURL = '' } = weeklyTemplate
  let taskObjCopy = {
    repeatGroupID,
    id: individualID,
    reusableTemplateID: repeatGroupID,
    name,
    duration,
    startTime,
    startYYYY: new Date().getFullYear(),
    iconDataURL
    // `startDate` will be hydrated later by the 2nd `if` statement
  }

  taskObjCopy.id = getRandomID()
  taskObjCopy.repeatOnDayOfWeek = [...repeatOnDayOfWeek]
  taskObjCopy.repeatGroupID = repeatGroupID // way to label separate tasks as essentially clones of an original repeating task

  const yyyy = `${dateClassObj.getFullYear()}`
  const mm = twoDigits(dateClassObj.getMonth() + 1) // month is 0-indexed
  const dd = twoDigits(dateClassObj.getDate())

  taskObjCopy.startDate = `${mm}/${dd}`

  /// NOTE THESE IF STATEMENTS OPERATE *INDEPENDENTLY*
  // CASE 1: DEADLINE
  // deadline takes priority: a deadlined task that repeats but is scheduled, will STILL be treated like a deadline
  if (taskObjCopy.deadlineDate && taskObjCopy.deadlineTime) {
    // set new `deadlineDate` to the dd/mm/yyyy format of `dateClassObj` (but keep the deadline time the same)
    taskObjCopy.deadlineDate = `${dd}/${mm}/${yyyy}`
  }
  // CASE 2: SCHEDULED 
  if (taskObjCopy.startYYYY && taskObjCopy.startDate && taskObjCopy.startTime) {
    taskObjCopy.startYYYY = yyyy
    taskObjCopy.startDate = `${mm}/${dd}`
  }
  taskObjCopy = checkTaskObjSchema(taskObjCopy, userDoc)
  return taskObjCopy
}


///// BELOW ARE FOIR MONTHLY
// repeatOnDaysOfMonth: [0, 0, 0, 1, ... 0, 1]
export function createNewInstancesOfMonthlyRepeatingTasks ({ monthlyTemplate, userDoc }) {
  const { numOfMonthsInAdvance = 2, repeatGroupID } = monthlyTemplate

  const d = new Date() // base case: no need to start from beginning of month
  for (let i = 0; i < numOfMonthsInAdvance; i++) {
    generateRepeatingTasksForSpecificMonth({ dateClassObject: d, monthlyTemplate, userDoc })

    // general case: start from beginning of month
    d.setMonth(d.getMonth() + 1)
    d.setDate(1) 
  }

  updateFirestoreDoc(`/users/${userDoc.uid}/periodicTasks/${repeatGroupID}`, {
    lastRanRepeatISO: new Date().toISOString()
  })
}

function generateRepeatingTasksForSpecificMonth ({ dateClassObject, monthlyTemplate, userDoc }) {
  const d = dateClassObject
  const { repeatOnDayOfMonth, willRepeatOnLastDay, repeatGroupID } = monthlyTemplate

  // general case: first 28 days
  while (d.getDate() < 28) {
    if (repeatOnDayOfMonth[d.getDate() - 1]) { // getDate() is 1-indexed but `repeatOnDayOfMonth` is 0-indexed
      generateNewTask(d.getDate(), d.getMonth(), monthlyTemplate, userDoc)
    }
    d.setDate(d.getDate() + 1)
  }

  // edge case: last day (i.e. 28, 29, 30, 31 treated the same)
  if (willRepeatOnLastDay) {
    const lastDay = getLastDayOfMonth(d.getMonth()) // note `getMonth` is zero-indexed
    generateNewTask(lastDay, d.getMonth(), monthlyTemplate, userDoc)
  }
}

// month is 1-indexed from 1 to 12
function getLastDayOfMonth (zeroIndexedMonthNumber) {
  const d1 = new Date()
  const d2 = new Date(d1.getFullYear(), zeroIndexedMonthNumber + 1, 0);
  const lastDay = d2.getDate()
  return lastDay
}

function generateNewTask (dayOfMonth, zeroIndexedMonthNumber, monthlyTemplate, userDoc) {
  const { repeatGroupID, name } = monthlyTemplate

  // BUG: NOT CORRECT
  const d = new Date()
  d.setMonth(zeroIndexedMonthNumber) // MUST set month first, otherwise it thinks the 31st day doesn't exist on the month yet
  d.setDate(dayOfMonth)

  const individualID = getRandomID()

  let newObj = {
    repeatGroupID,
    id: individualID,
    reusableTemplateID: repeatGroupID,
    name,
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