import { 
  todoTasks, 
  todoMemoryTree,
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
    buildCalendarDataStructures({
      flatArray: [...get(calendarTasks), createdNode]
    })
  } else {
    buildTodoDataStructures({
      flatArray: [...get(todoTasks), createdNode]
    })
  }
}

export function updateLocalState ({ id, keyValueChanges }) {
  // find the particular task
  const a1 = get(todoTasks).filter(task => task.id === id)
  const a2 = get(calendarTasks).filter(task => task.id === id)
  const oldNode = a1.length === 1 ? a1[0] : a2[0]

  // compute what it'll be updated to
  const newNode = {...oldNode}
  for (const [key, value] of Object.entries(keyValueChanges)) {
    newNode[key] = value
  }

  // work with JS variables instead of Svelte stores
  let calArr = get(calendarTasks)
  let todoArr = get(todoTasks)

  // delete it from previous place
  if (oldNode.startDateISO) calArr = calArr.filter(task => task.id !== id)
  else todoArr = todoArr.filter(task => task.id !== id)

  // re-create it in new place (order doesn't matter, the tree algorithms will correct it)
  if (newNode.startDateISO) calArr = [...calArr, newNode]
  else todoArr = [...todoArr, newNode]

  // rebuild both structures, so it's correct no matter which arrays changed/didn't change
  buildCalendarDataStructures({
    flatArray: calArr 
  })
  buildTodoDataStructures({ 
    flatArray: todoArr 
  })
}

export function deleteFromLocalState ({ id }) {
  buildCalendarDataStructures({
    flatArray: get(calendarTasks).filter(task => task.id !== id)
  })
  buildTodoDataStructures({
    flatArray: get(todoTasks).filter(task => task.id !== id)
  })
}

export function buildCalendarDataStructures ({ flatArray }) {
  calendarTasks.set(flatArray)
  calendarMemoryTree.set(
    constructCalendarTrees(get(calendarTasks))
  )
  const dateToTasks = computeDateToTasksDict(
    get(calendarMemoryTree)
  )
  tasksScheduledOn.set(dateToTasks)
}

export function buildTodoDataStructures ({ flatArray }) {
  todoTasks.set(flatArray)
  todoMemoryTree.set(
    reconstructTreeInMemory(
      get(todoTasks)
    )
  )
  inclusiveWeekTodo.set(
    get(todoMemoryTree)
  )
}