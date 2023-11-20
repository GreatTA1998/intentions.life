// how far, INCLUDING SCROLL, the actual position on the calendar is
// // containerDistanceFromTopOfPage should be fixed, and not be affected by scrolling
// so it's the e.clientY + initialOffset + scrollOffset 

// e.clientY := coordinates relative to VIEWPORT, so doesn't matter if root page is scrolled

export function getTrueY (e) {
  const ScrollContainers = document.getElementsByClassName('scroll-container')
  const ScrollContainer = ScrollContainers[0]
  return e.clientY + ScrollContainer.scrollTop - ScrollContainer.getBoundingClientRect().top - ScrollContainer.style.paddingTop
}

export const MIKA_PIXELS_PER_HOUR = 100
export const MIKA_PIXELS_PER_MINUTE = MIKA_PIXELS_PER_HOUR / 60

export const PIXELS_PER_HOUR = 600
export const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60

// compute's the offset from top if the task is displayed absolutely (not used if positioned statically e.g. "in today's unscheduled tasks")
export function computeOffset ({ startTime }, pxPerHour, calendarStartTime) {
  if (!calendarStartTime) {
    return
  }

  // compute how many hours ahead of calendar's starting hour
  // TODO: this breaks when the scheduled time is "lower" than the calendar's startTime i.e. need to pad 24 on top of it
  const hh = startTime.slice(0, 2)
  const mm = startTime.slice(3, 5)

  const hoursOffset = Number(hh) + (Number(mm) / 60) - parseInt(calendarStartTime.substring(0, 2)) // 8 refers to "8 am"

  // offsetFromTop = hoursOffset * pxPerHour
  // console.log('offsetFromTop =', offsetFromTop)
  return (hoursOffset * pxPerHour) || 1 // quickfix so computeOffset doesn't return a falsy value
}

/** Dispatch event on click outside of node */
// Thank god for the person who wrote took 30 minutes of debugging and still no avail
// https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
export function clickOutside (node) {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }
	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getDayOfWeek (MMDDString) {
  const d = new Date()
  d.setMonth(parseInt(MMDDString.substring(0, 2)) - 1) // `-1` because setMonth() is 0-indexed whereas MMDD is 1-indexed
  d.setDate(parseInt(MMDDString.substring(3, 5))) // MMDDString.substring(3, 5)
  return new Intl.DateTimeFormat(
    'en-US', 
    { weekday: 'short' }
  ).format(d)
}

// copied from chatGPT
export function getNicelyFormattedDate (dateClassObj = new Date()) {  
  const options = { 
    month: 'long',  // Display the full month name (e.g., "April")
    day: 'numeric', // Display the day of the month (e.g., "16")
    ordinal: 'numeric' // Display the ordinal suffix (e.g., "th")
  }
  const formattedDate = dateClassObj.toLocaleDateString('en-US', options)
  const suffix = getDaySuffix(dateClassObj.getDate())
  return formattedDate + suffix
}

function getDaySuffix (day) {
  if (day >= 11 && day <= 13) {
    return 'th'
  }
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default: 
      return 'th'
  }
}

export function getDateInDDMMYYYY (dateClassObject) {
  const d = dateClassObject

  const yyyy = d.getFullYear();
  let mm = d.getMonth() + 1; // Months start at 0!
  let dd = d.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;
  return formattedToday
}

export function getDateInMMDD (dateClassObject) {
  let dd = dateClassObject.getDate() // between 1 to 31
  let mm = dateClassObject.getMonth() + 1 // 0 to 11
  if (dd < 10) dd = '0' + dd 
  if (mm < 10) mm = '0' + mm
  return `${mm}/${dd}`
}

// copied from https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php
// TODO: rename, and enable it to take arbitrary Date object and return a 
// mm:dd string
export function getDateOfToday () {
  const today = new Date()   
  return getDateInMMDD(today)
}

// https://flaviocopes.com/how-to-get-tomorrow-date-javascript/
export function getDateOfTomorrow () {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getDateInMMDD(tomorrow)
}

export function getHH () {
  const today = new Date()
  let hh = today.getHours()
  if (hh < 10) hh = '0' + hh
  return `${hh}`
}

export function getRandomID () {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

// The reliable way to create date object is new Date(yyyy, mm, dd)
// where `yyyy`, `mm` and `dd` are all integers

// return d2 - d1
// Based on https://stackoverflow.com/a/15289883/7812829
// UTC computations are time-zone safe because UTC never observes Daylight Savings Time
export function computeDayDifference (dateClassObject1, dateClassObject2) {
  const msPerDay = 1000 * 60 * 60 * 24
  const msDiff = computeMillisecsDifference(dateClassObject1, dateClassObject2)
  return Math.floor(msDiff / msPerDay)
}

// return d2 - d1
// Based on https://stackoverflow.com/a/15289883/7812829
// by shifting both dates to UTC, the DIFFERENCE calculation is "daylight-savings safe" because UTC never observes Daylight Savings Time
export function computeMillisecsDifference (dateClassObject1, dateClassObject2) {
  const d1 = dateClassObject1
  const d2 = dateClassObject2
  
  // monthIndex ranges from 0 to 11 
  // hours ranges from 0 to 23
  // minutes ranges from 0 to 69
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes())
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes())
  return utc2 - utc1
}

export function convertMMDDToDateClassObject (mmdd, yyyy = 2023) {
  const [mm, dd] = mmdd.split('/')
  return new Date(yyyy, mm - 1, dd)
}

// notice we purposely differentiate `minutes` from `mm` (month) 
// TO-DO: use destructuring so the parameters are more readable when used by clients
export function convertDDMMYYYYToDateClassObject (ddmmyyyy, hhmm = '') {
  const [dd, mm, yyyy] = ddmmyyyy.split('/')
  if (!hhmm) {
    return new Date(yyyy, mm - 1, dd)
  } else {
    const [hh, minutes] = hhmm.split(':')
    const result = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), parseInt(hh), parseInt(minutes))
    return result
  }
   // month is 0-indexed where as mm is 1-indexed, so subtract 1 (Stackoverflow commmunity agrees this is stupid design)
}

// NOT zero-indexed, just normal
export function getMonthNameFromNumber (monthNumber) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return monthNames[monthNumber]
}

export function twoDigits (number) {
  return (number < 10 ? `0${number}` : `${number}`)
}

// https://stackoverflow.com/a/18229149/7812829
export function getCurrentTimeInHHMM () {
  const d = new Date()
  const hh = ("0" + d.getHours()).slice(-2) 
  const mm = ("0" + d.getMinutes()).slice(-2)
  return hh + ":" + mm
}

export function applyFuncToEveryTreeNode ({ tree, applyFunc }) {
  const artificialRootNode = {
    name: 'root',
    children: tree
  }
  helperFunction({ node: artificialRootNode, applyFunc })
}

function helperFunction ({ node, applyFunc }) {
  // this is a quick-fix: terminate once we find the deadlinet ask
  if (applyFunc(node)) {
    return
  } 
  else {
    for (const child of node.children) {
      helperFunction({ node: child, applyFunc })
    }
  }
}


export function generateRepeatedTasks (taskObject) {
  const repeatGroupID = taskObject.id // the first instance of the repeated task will represent the repeatGroupID
  const d = new Date()
  for (let i = 0; i < 7; i++) { // as it's a new feature, try 7 day foresight window to avoid taking forever to delete everything manually
    d.setDate(d.getDate() + 1)

    // % gives the remainder, not the modulus, see https://stackoverflow.com/a/17323608/7812829
    function mod (n, m) {
      return ((n % m) + m) % m;
    }
           
    const weekDayNumber = mod(d.getDay() - 1, 7) // for getDay(), Sunday = 0, Monday = 1
    if (willRepeatOnWeekDayNumber[weekDayNumber]) {
      const generatedTask = createRepeatedTask({ dateClassObj: new Date(d.getTime()), repeatGroupID }, taskObject)
      allGeneratedTasksToUpload.push(generatedTask)
    }
  }
  console.log('allGeneratedTasksToUpload =', allGeneratedTasksToUpload)

  return allGeneratedTasksToUpload
}

export function createRepeatedTask ({ dateClassObj, repeatGroupID }, taskObject) {
  const taskObjCopy = {...taskObject}
  taskObjCopy.id = getRandomID()
  taskObjCopy.willRepeatOnWeekDayNumber = [...willRepeatOnWeekDayNumber]
  taskObjCopy.repeatGroupID = repeatGroupID // way to label separate tasks as essentially clones of an original repeating task

  const yyyy = `${dateClassObj.getFullYear()}`
  const mm = twoDigits(dateClassObj.getMonth() + 1) // month is 0-indexed
  const dd = twoDigits(dateClassObj.getDate())

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
  return taskObjCopy
}

export function convertMMDDToReadableMonthDayForm (mmdd) {
  const dateStr = new Date(mmdd).toDateString() //  'Fri Apr 10 2020'
  const splitArr = dateStr.split(' ' )// ['Fri', 'Apr', '10', '2020']
  return splitArr[1] + ' ' + splitArr[2] 
}