import { DateTime } from "luxon";
import { buildCalendarDataStructures, buildTodoDataStructures } from "/src/helpers/maintainState";
import Tasks from "/src/back-end/Tasks";
import { size, cushion } from '/src/helpers/constants.js'

export function handleInitialTasks(uid){
    const today = DateTime.now();
    const left = today.minus({ days: size + cushion });
    const right = today.plus({ days: size + cushion });
    
    Tasks.getByDateRange(
      uid,
      left.toFormat("yyyy-MM-dd"),
      right.toFormat("yyyy-MM-dd")
    ).then((scheduledTasks) =>
      buildCalendarDataStructures({ flatArray: scheduledTasks })
    );
    
    Tasks.getUnscheduled(uid).then((unscheduledTasks) =>
      buildTodoDataStructures({ flatArray: unscheduledTasks })
    );
}
