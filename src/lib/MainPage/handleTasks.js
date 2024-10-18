import { DateTime } from "luxon"
import { buildCalendarDataStructures, buildTodoDataStructures } from "/src/helpers/maintainState"
import Tasks from "/src/back-end/Tasks"
import { size, cushion } from '/src/helpers/constants.js'
import { get } from "svelte/store"
import { calendarTasks } from '/src/store.js'

export function handleInitialTasks (uid) {
  const today = DateTime.now();
  const left = today.minus({ days: size + cushion })
  const right = today.plus({ days: size + cushion })
  
  Tasks.getByDateRange(uid,
    left.toFormat("yyyy-MM-dd"),
    right.toFormat("yyyy-MM-dd")
  ).then((scheduledTasks) =>
    buildCalendarDataStructures({ flatArray: scheduledTasks })
  )
  
  Tasks.getUnscheduled(uid).then(unscheduledTasks =>
    buildTodoDataStructures({ flatArray: unscheduledTasks })
  )
}

export function fetchMobileTodoTasks (uid) {
  Tasks.getUnscheduled(uid).then(unscheduledTasks => {
    buildTodoDataStructures({ flatArray: unscheduledTasks })
  })
}

export async function fetchMobileCalTasks (uid) {
  return new Promise(async (resolve) => {
    const today = DateTime.now() 
    const surroundingTasks = await Tasks.getByDateRange(
      uid, 
      today.minus({ days: 7 }).toFormat('yyyy-MM-dd'), 
      today.plus({ days: 7 }).toFormat('yyyy-MM-dd')
    )
    buildCalendarDataStructures({ 
      flatArray: surroundingTasks
    })
    resolve()
  })
}

// NOTE: mobile fetches will merge and build upon existing fetched data
export async function fetchMobileFutureOverviewTasks (uid) {
  const existingTasks = get(calendarTasks) || []

  const today = DateTime.now()
  const futureTasks = await Tasks.getByDateRange(
    uid, 
    today.plus({ days: 7 + 1 }).toFormat('yyyy-MM-dd'),
    today.plus({ years: 2 }).toFormat('yyyy-MM-dd')
  )
  
  buildCalendarDataStructures({ 
    flatArray: [...existingTasks, ...futureTasks] 
  })
}


