import { 
  convertDDMMYYYYToDateClassObject, 
  sortByOrderValue, 
  convertToISO8061 
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
