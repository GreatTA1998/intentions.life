// TO-DO: rename to "maintainState"
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
  constructCalendarTrees,
  computeDateToTasksDict
} from '/src/helpers/dataStructures.js'

export function createOnLocalState ({ createdNode }) {
  if (createdNode.startDateISO) {
    calendarTasks.set([...get(calendarTasks), createdNode])
    buildCalendarDataStructures()
  } else {
    todoTasks.set([...get(todoTasks), createdNode])
    buildTodoDataStructures()
  }
}

export function updateLocalState ({ id, keyValueChanges }) {
  // find the task
  const a1 = get(todoTasks).filter(task => task.id === id)
  const a2 = get(calendarTasks).filter(task => task.id === id)
  const updatedTask = a1.length === 1 ? a1[0] : a2[0]


  // compute what it'll be updated to
  const copy = {...updatedTask}
  for (const [key, value] of Object.entries(keyValueChanges)) {
    copy[key] = value
  }

  // for simpler logic (even if inefficient) always delete the node
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
  calendarMemoryTree.set(
    constructCalendarTrees(get(calendarTasks))
  )
  const dateToTasks = computeDateToTasksDict(get(calendarMemoryTree))
  tasksScheduledOn.set(dateToTasks)
}

export function buildTodoDataStructures () {
  const todoMemoryTree = reconstructTreeInMemory(get(todoTasks))
  inclusiveWeekTodo.set(todoMemoryTree)
}