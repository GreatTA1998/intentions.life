import { writable, readable, get } from 'svelte/store'
import PeriodicTasks from './back-end/PeriodicTasks'

export const todoTasks = writable(null)
export const calendarTasks = writable(null)
export const periodicTasks = writable([])

export function deleteTemplate({templateID}) {
  const currentUser = get(user)
  PeriodicTasks.deleteTemplate({ id: templateID, userID: currentUser.uid })
  periodicTasks.update((tasks)=>tasks.filter((task)=>task.id !== templateID))
}

export async function updateTemplate({templateID, keyValueChanges}) {
    const currentUser = get(user);
    const updatedTasks = await PeriodicTasks.updateWithTasks({
      userID: currentUser.uid,
      id: templateID,
      updates: keyValueChanges
    })
    console.log("updatedTasks", updatedTasks);
    const updatedTasksMap = updatedTasks.map(task => ({[task.id]: task}))
    console.log("updatedTasksMap", updatedTasksMap);
    todoTasks.update((tasks)=>tasks.map((task) => updatedTasksMap[task.id] || task))
    calendarTasks.update((tasks)=>tasks.map((task) => updatedTasksMap[task.id] || task))
    periodicTasks.update((tasks)=>tasks.map((task) =>
      task.id === templateID ? { ...task, ...keyValueChanges } : task
    ))
    console.log("todoTasks", get(todoTasks).filter((task)=>task.id === templateID));
    console.log("calendarTasks", get(calendarTasks).filter((task)=>task.id === templateID));
  }

export const user = writable({}) // {} means not logged in, cannot be null
export const doodleIcons = writable([]) 

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
export const whatIsBeingDraggedFullObj = writable(null)

export const allTasksDueToday = writable([])
export const allTasksDueThisWeek = writable([])
export const allTasksDueThisMonth = writable([])
export const allTasksDueThisYear = writable([])
export const allTasksDueThisLife = writable([])

export const inclusiveWeekTodo = writable([])

export const longHorizonTasks = writable([])

export const tasksScheduledOn = writable(null)

export const yPosWithinBlock = writable(0)

export const todoMemoryTree = writable(null)
export const calendarMemoryTree = writable(null)



export const daysToRender = writable([])