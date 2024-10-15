import { DateTime } from "luxon"
import { buildCalendarDataStructures, buildTodoDataStructures } from "/src/helpers/maintainState"
import Tasks from "/src/back-end/Tasks"
import { size, cushion } from '/src/helpers/constants.js'

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

export function fetchMobileCalTasks (uid) {
  const today = DateTime.now()
  Tasks.getByDateRange(
    uid, 
    today.minus({ days: 7 }).toFormat('yyyy-MM-dd'), 
    today.plus({ days: 7 }).toFormat('yyyy-MM-dd')
  )
    .then(scheduledTasks => buildCalendarDataStructures({ flatArray: scheduledTasks }))
}

export function fetchMobileFutureOverviewTasks (uid) {
  const today = DateTime.now()
  Tasks.getByDateRange(
    uid, 
    today.toFormat('yyyy-MM-dd'),
    today.plus({ years: 2 }).toFormat('yyyy-MM-dd')
  )
    .then(scheduledTasks => buildCalendarDataStructures({ flatArray: scheduledTasks }))
}


