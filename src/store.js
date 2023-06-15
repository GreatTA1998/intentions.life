import { writable, readable } from 'svelte/store'

export const user = writable({}) // {} means not logged in, cannot be null
export const hasFetchedUser = writable(false)
export const hasLogoExited = writable(false)

export const mostRecentlyDeletedOrCompletedTaskID = writable('')
export const mostRecentlyCompletedTaskName = writable('')