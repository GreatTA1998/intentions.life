<h1 style="margin-left: 80px">
  Life Organizer
</h1>

<div style="display: flex; align-items: center; margin-left: 80px">
  <button on:click={() => goto('GxBbopqXHW0qgjKEwU4z')}>
    Play around
  </button>
  <div style="margin-left: 10px;">
   or log-in with phone
  </div>

  <PhoneLogin canTakeInternationalNumbers/>  
</div>

<div style="margin-left: 80px; margin-right: 80px">
  <h2>Writing on paper & Google Calendar just aren't good enough</h2>
  <p>
  Life is complicated because almost everything matters. That job interview matters, but so does not forgetting to drink water, or meditating a little. How about that package you ordered 3 days ago? Or the 7 emails you're awaiting on a follow-up? Have you visited your grandparents? Should you start a new hobby? Oh you forgot to pay taxes.

  Calendars and lists has made things better, but the most widely-used apps have truly non-sensical designs that further complicates things. For example, Google Tasks' to-do lists have no concept of "levels", like a desktop with no folders - every time you read it you get lost in the details instead of a balanced overview on your fundamental priorities. 
  <br>
  <br>

  On Google Calendar, it invents unnecessary concepts. It insists that "tasks" and "events" are different: one describes a todo-item, and one describes a calendar-item. Events can have adjustable durations, but tasks cannot! Moreover, a task can exist on a calendar, but an event cannot exist on a to-do.
  <br>
  <br>

  These are only the tip of the iceberg. All the non-sensical designs compound to create a system that is only good for some situations in our life, and the rest - we'll just have to use our brains or other methods to make up the difference.

  I believe that with common-sense designs, it's possible to use one simple app that handles every situation in life. 
  </p>

  <h2>life-organizer = hierarchical todo + calendar</h2>
  <p>
  Everything is a task / sub-task. A task is starts unscheduled - you drag it onto the calendar to schedule it. Lastly, tasks can repeat. That's all you need! Consider common life situations:
  <br>
  <br>
  Email follow-ups:
    - Send the email 
    - Create a task called "follow-up with that email" scheduled for 1 - 7 days. 
    - Follow-ups = sub-task + deadline
  <br>
  <br>
  Important deadlines:
    - Just schedule the task!
    - Deadlines = scheduled task (with start time dependent on its duration)
  <br>
  <br>
  Habits:
    - Specify how the task repeats e.g. "Push-ups" every 2 days
    - If the time is flexible, it's equivalent to a deadline, and scheduled on the calendar 
    - Habits = repeat + deadline
  <br>
  <br>
  Message notifications (work in progress):
    - If someone messages you on zen-messenger, it appears as a task

  I challenge you to find a situation that cannot be handled with some combination of sub-task, schedule and repeat.
  </p>
</div>

<script>
  import { goto } from '$app/navigation'
  import PhoneLogin from '../PhoneLogin.svelte'
</script>
