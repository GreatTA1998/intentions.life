import { 
  todoTasks, 
  calendarTasks,
  calendarMemoryTree,
  tasksScheduledOn,
  inclusiveWeekTodo
} from '/src/store.js'
import { get } from 'svelte/store'
import { 
  reconstructTreeInMemory,
  computeDateToTasksDict
} from '/src/helpers/dataStructures.js'

export function newUpdateLocalState ({ id, keyValueChanges }) {
  // find the task
  let updatedTask = null
  for (const task of get(todoTasks)) {
    if (task.id === id) {
      updatedTask = task 
      continue
    }
  }
  for (const task of get(calendarTasks)) {
    if (task.id === id) {
      updatedTask = task
      continue
    }
  }

  // compute what it'll be updated to
  const copy = {...updatedTask}
  for (const [key, value] of Object.entries(keyValueChanges)) {
    copy[key] = value
  }
  console.log('keyValueChanges =', keyValueChanges)

  // for simpler logic (even if inefficient) always delete the node
  const oldTodoSize = get(todoTasks).length
  const oldCalendarSize = get(calendarTasks).length
  if (updatedTask.startDateISO) {
    calendarTasks.set(
      get(calendarTasks).filter(task => task.id !== id)
    )
  } else {
    todoTasks.set(
      get(todoTasks).filter(task => task.id !== id)
    )
  }

  // then add it (order doesn't matter, the later algorithms will rearrange it)
  if (copy.startDateISO) {
    calendarTasks.set([...get(calendarTasks), copy])
  } else {
    todoTasks.set([...get(todoTasks), copy])
  } 

  buildCalendarDataStructures()
  buildTodoDataStructures()
}

export function deleteFromLocalState ({ id }) {
  calendarTasks.set(
    get(calendarTasks).filter(task => task.id !== id)
  )
  todoTasks.set(
    get(todoTasks).filter(task => task.id !== id)
  )
  buildCalendarDataStructures()
  buildTodoDataStructures()
}

export function buildCalendarDataStructures () {
  calendarMemoryTree.set(reconstructTreeInMemory(get(calendarTasks)))
  const dateToTasks = computeDateToTasksDict(get(calendarMemoryTree))
  tasksScheduledOn.set(dateToTasks)
}

export function buildTodoDataStructures () {
  const todoMemoryTree = reconstructTreeInMemory(get(todoTasks))
  inclusiveWeekTodo.set(todoMemoryTree)
}