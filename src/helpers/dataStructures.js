import { convertDDMMYYYYToDateClassObject } from "/src/helpers.js"

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
