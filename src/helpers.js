export function getDateInMMDD (dateClassObject) {
  let dd = dateClassObject.getDate()
  let mm = dateClassObject.getMonth() + 1
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

export function getHH () {
  const today = new Date()
  let hh = today.getHours()
  if (hh < 10) hh = '0' + hh
  return `${hh}`
}

// https://flaviocopes.com/how-to-get-tomorrow-date-javascript/
export function getDateOfTomorrow () {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getDateInMMDD(tomorrow)
}