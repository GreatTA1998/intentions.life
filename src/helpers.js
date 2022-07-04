import { detach } from "svelte/internal";

// copied from https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php
export function getDateOfToday () {
  const today = new Date()    
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  return `${mm}/${dd}`
}

export function getHH () {
  const today = new Date()
  let hh = today.getHours()
  if (hh < 10) {
    hh = '0' + hh
  }
  return `${hh}`
}

// https://flaviocopes.com/how-to-get-tomorrow-date-javascript/
export function getDateOfTomorrow () {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  let dd = tomorrow.getDate()
  let mm = tomorrow.getMonth() + 1
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  return `${mm}/${dd}`
}
