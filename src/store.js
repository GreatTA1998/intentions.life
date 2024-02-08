import { writable, readable } from 'svelte/store'

export const user = writable({}) // {} means not logged in, cannot be null
export const hasFetchedUser = writable(false)
export const hasLogoExited = writable(false)

export const mostRecentlyCompletedTaskID = writable('')
export const isSnackbarHidden = writable(false)
export const mostRecentlyCompletedTaskName = writable('')

// 200/24 is the week view value
export const appModePixelsPerHour = writable(200/24)

export const hasInitialScrolled = writable(false)

export const showSnackbar = writable(false)

export const userInfoFromAuthProvider = writable({})

export const whatIsBeingDragged = writable("")
export const whatIsBeingDraggedID = writable("")
export const whatIsBeingDraggedFullObj = writable("")

export const allTasksDueToday = writable([])
export const allTasksDueThisWeek = writable([])
export const allTasksDueThisMonth = writable([])

export const longHorizonTasks = writable([])

export const tasksScheduledOn = writable({})

export const yPosWithinBlock = writable(0)