// how far, INCLUDING SCROLL, the actual position on the calendar is
// // containerDistanceFromTopOfPage should be fixed, and not be affected by scrolling
// so it's the e.clientY + initialOffset + scrollOffset 

// TO-DO: fix this


// e.clientY := coordinates relative to VIEWPORT, so doesn't matter if root page is scrolled

export function getTrueY (e) {
  const ScrollContainer = document.getElementById('scroll-container')
  console.log("ScrollContainer.getBoundingClientRect =", ScrollContainer.getBoundingClientRect().top)
  return e.clientY + ScrollContainer.scrollTop - ScrollContainer.getBoundingClientRect().top - ScrollContainer.style.paddingTop
}


export const MIKA_PIXELS_PER_HOUR = 200
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