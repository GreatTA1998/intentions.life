import { 
  convertDDMMYYYYToDateClassObject, 
  sortByOrderValue, 
  convertToISO8061,
  computeDayDifference
} from "/src/helpers.js"

// recursively mutate this monolith data structure until its correct
export function reconstructTreeInMemory (firestoreTaskDocs) {
  const output = []

  // first, do an O(n) operation, so we don't perform a O(n^2) operation constantly traversing trees
  // build a dictionary that maps a task to its children ([] if no children)
  const memo = { "": [] }

  for (const taskDoc of firestoreTaskDocs) {
    if (!memo[taskDoc.parentID]) memo[taskDoc.parentID] = [] 
    memo[taskDoc.parentID].push(taskDoc)

    if (!memo[taskDoc.id]) memo[taskDoc.id] = []
  }

  // now construct the recursive tree
  const rootTasks = memo[""] 
  for (const rootTask of rootTasks) {
    recursivelyHydrateChildren({ node: rootTask, firestoreTaskDocs, memo, subtreeDeadlineInMsElapsed: Infinity })
    output.push(rootTask)
  }
  return output
}

// rename to `maxDeadlineLimitInMs`: limits how far this node's deadline can be set
function recursivelyHydrateChildren ({ node, firestoreTaskDocs, memo, subtreeDeadlineInMsElapsed }) {
  node.subtreeDeadlineInMsElapsed = subtreeDeadlineInMsElapsed
  node.children = sortByOrderValue( memo[node.id] )
  for (const child of node.children) {
    recursivelyHydrateChildren({ 
      node: child, 
      firestoreTaskDocs, 
      memo, 
      subtreeDeadlineInMsElapsed: updateSubtreeDeadlineInMsElapsed(node, subtreeDeadlineInMsElapsed)
    })
  }
}

export function updateSubtreeDeadlineInMsElapsed (node, oldVal) {
  if (!node.deadlineDate || !node.deadlineTime) {
    if (oldVal !== Infinity) return oldVal
    else return oldVal
  }
  else {
    const [dd, MM, yyyy] = node.deadlineDate.split("/")
    const iso8061 = convertToISO8061({ mmdd: `${MM}/${dd}`, yyyy })
    const d = new Date(iso8061)
    const [hh, mm] = node.deadlineTime.split(':')
    d.setHours(hh, mm)

    if (d.toString() === "Invalid Date") {
      // useful test logs for detecting tasks to be garbage collected

      // console.log('dd, MM, yyyy =', dd, MM, yyyy)
      // console.log('hh, mm =', hh, mm)
      // console.log('iso8061 =', iso8061)
      // console.log('node has invalid deadline =', node)
      // console.log('d =', d)
      return oldVal
    }
    
    const result = Math.min(d.getTime(), oldVal)
    return result
  }
}


//  using the memory tree, compute an array of tasks [], where each task in the array is:
//           1. parentless root task
//           2. has a deadline
//           3. has children
//          
//  and is sorted by the task with the longest time horizon 
// 
// Note, the root task itself will have a distinct UI that is clearly separate from the timeline view of its
// children tasks. Nor will it have its deadline be explicitly displayed, as the length and deadline of its last 
// immediate child (and therefore the length of the timeline) already conveys the idea visually. 
// It also wouldn't make sense for the parent to participate in the geometry of the deadline, given that if it's displayed at the top it'd imply that it's due immediately. 
export function computeYearViewTimelines (allTasks) {
  const output = [] 
  for (const taskTree of allTasks) {
    if (!taskTree.deadlineDate) continue 
    else if (taskTree.children.length === 0) continue
    else if (taskTree.isDone) continue
    
    else {
      output.push(taskTree)
    }
  }

  // then sort it, prioritizing tasks with the longest time horizon first
  output.sort((task1, task2) => {
    const d1 = convertDDMMYYYYToDateClassObject(task1.deadlineDate, task1.deadlineTime)
    const d2 = convertDDMMYYYYToDateClassObject(task2.deadlineDate, task2.deadlineTime)

    // milliseconds value since 1970
    return d2.getTime() - d1.getTime()
  })

  return output
}


// theoretically faster (by a factor 'k' where k is the # of days shown on calendar)
// more importantly, it allows us to inject a reference to `rootAncestor`
export function computeDateToTasksDict (taskTrees) {
  const tasksScheduledOn = {}
  for (const root of taskTrees) {
    myHelper({ node: root, rootAncestor: root, tasksScheduledOn })
  }
  return tasksScheduledOn 
}

function myHelper ({ node, rootAncestor, tasksScheduledOn }) {
  if (node.startDate) {
    const [MM, dd] = node.startDate.split('/')
    const simpleISO = dd + '-' + MM + '-' + node.startYYYY
    if (!tasksScheduledOn[simpleISO]) tasksScheduledOn[simpleISO] = []
    tasksScheduledOn[simpleISO].push({ rootAncestor, ...node })
  }

  for (const child of node.children) {
    myHelper({ node: child, rootAncestor, tasksScheduledOn })
  }
}

// TO-DO: 
//   - Introduce a "weekTodoDisjointTree" and "weekTodoInclusiveTree" for the separate todo lists
export function computeTodoMemoryTrees (allTasks) {
  const allTasksDueToday = []
  const allTasksDueThisWeek = [] // this is disjoint
  const allTasksDueThisMonth = []
  const allTasksDueThisYear = [] // up to infinite deadline
  const allTasksDueThisLife = [] // no deadline defined

  for (const parentlessTask of allTasks) {
    helper({ node: parentlessTask, rootAncestor: parentlessTask })
  }

  // use VS code's collpase feature
  // this is so the function can access the arrays we define above
  function helper ({ node, parentCategory = '', parentObjReference = null, rootAncestor }) {
    const shallowCopy = {...node}
    shallowCopy.children = []
    shallowCopy.rootAncestor = rootAncestor
    
    if (!node.deadlineDate) {
      if (parentCategory === 'LIFE' && parentObjReference !== null) {
        parentObjReference.children.push(shallowCopy)
      }
      else allTasksDueThisLife.push(shallowCopy)

      // continue scanning for a todo's top-level task
      for (const child of node.children) {
        helper({ node: child, parentCategory: 'LIFE', parentObjReference: shallowCopy, rootAncestor }) // NOTE: the `rootAncestor` is not based on deadlines
      }
    }

    else {
      const d = new Date()
      d.setHours(0, 0, 0)
      const dueInHowManyDays = computeDayDifference(
        d,
        convertDDMMYYYYToDateClassObject(node.deadlineDate, node.deadlineTime)
      )
      if (dueInHowManyDays <= 1) { // quickfix for now
        if (parentCategory === 'DAY' && parentObjReference !== null) {
          parentObjReference.children.push(shallowCopy)
        }
        else allTasksDueToday.push(shallowCopy) // any reason we use node here instead of `shallowCopy`? 
        
        for (const child of node.children) {
          helper({ node: child, parentCategory: 'DAY', parentObjReference: shallowCopy, rootAncestor })
        }
      } 
      else if (dueInHowManyDays <= 7) {
        if (parentCategory === 'WEEK' && parentObjReference !== null) {
          parentObjReference.children.push(shallowCopy)
        }
        else allTasksDueThisWeek.push(shallowCopy)
  
        // notice we iterate on the original tree that still has a `.children` array preserved
        for (const child of node.children) {
          i += 1
          helper({ node: child, parentCategory: 'WEEK', parentObjReference: shallowCopy, rootAncestor })
        }
      }
      else if (dueInHowManyDays <= 31) {
        if (parentCategory === 'MONTH' && parentObjReference !== null) {
          parentObjReference.children.push(shallowCopy)
        } 
        else allTasksDueThisMonth.push(shallowCopy)
  
        for (const child of node.children) {
          helper({ node: child, parentCategory: 'MONTH', parentObjReference: shallowCopy, rootAncestor })
        }
      }
      else {
        if (parentCategory === 'YEAR' && parentObjReference !== null) {
          parentObjReference.children.push(shallowCopy)
        }
        else allTasksDueThisYear.push(shallowCopy)
  
        for (const child of node.children) {
          helper({ node: child, parentCategory: 'YEAR', parentObjReference: shallowCopy, rootAncestor })
        }
      } 
    }
  }

  // console.log('# of recursion should be at most the total number of tasks', i)
  return [allTasksDueToday, allTasksDueThisWeek, allTasksDueThisMonth, allTasksDueThisYear, allTasksDueThisLife]
}

// parent category is 'DAY', 'WEEK', 'MONTH', 'YEAR'
// recursively scan the ORIGINAL tree, so we separate the scanning tree from the editing tree
//   - node is for scanning 
//   - node is for mutating
let i = 0


// try it, reasons; 
//   1. I think it's correct.
// then fix layout
// then fix-and-drop. 
// then you are done. 

// literally copied and pasted from above
export function computeInclusiveWeekTodo (allTasks) {
  const allTasksDueThisWeek = [] // this is disjoint

  for (const parentlessTask of allTasks) {
    helper({ node: parentlessTask, rootAncestor: parentlessTask })
  }

  // use VS code's collpase feature
  // this is so the function can access the arrays we define above
  function helper ({ node, parentCategory = '', parentObjReference = null, rootAncestor }) {
    const shallowCopy = {...node}
    shallowCopy.children = []
    shallowCopy.rootAncestor = rootAncestor
    
    // if (node.isDone) return
    // don't do optimizations with node.isDone, or the checkbox behavior becomes buggy
    
    // if you process node.isDone as a node, basically, if the parent is completed,
    // it will be hidden by the todo list, and 
    // its children will be hidden even though they should be top level nodes
    if (!node.deadlineDate || node.isDone) {
      // continue scanning for a todo's top-level task
      for (const child of node.children) {
        helper({ node: child, rootAncestor }) // NOTE: the `rootAncestor` is not based on deadlines
      }
    }

    else {
      const dueInHowManyDays = computeDayDifference(
        new Date(),
        convertDDMMYYYYToDateClassObject(node.deadlineDate)
      )

      if (dueInHowManyDays <= 7) {
        if (parentCategory === 'WEEK' && parentObjReference !== null) {
          parentObjReference.children.push(shallowCopy)
        }
        else allTasksDueThisWeek.push(shallowCopy)
  
        // notice we iterate on the original tree that still has a `.children` array preserved
        for (const child of node.children) {
          i += 1
          helper({ node: child, parentCategory: 'WEEK', parentObjReference: shallowCopy, rootAncestor })
        }
      }
      else {
        // continue scanning for a todo's top-level task
        for (const child of node.children) {
          helper({ node: child, rootAncestor }) // NOTE: the `rootAncestor` is not based on deadlines
        }
      }
    }
  }

  const inclusiveWeekTodo = allTasksDueThisWeek
  return inclusiveWeekTodo
}