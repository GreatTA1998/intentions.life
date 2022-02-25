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