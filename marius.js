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




export function getRandomID () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }




  function computeTimeIndicatorOffset() {
    const now = DateTime.now();
    const startOfDay = now.startOf("day");
    const i = Interval.fromDateTimes(startOfDay, now);
    const minutesDifference = i.length() / (1000 * 60);
    return minutesDifference * pixelsPerMinute;
  }