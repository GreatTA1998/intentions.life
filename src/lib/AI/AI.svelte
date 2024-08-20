<script>
  import "./AI.css";
  import { user } from "../../store";
  import Tasks from "../../back-end/Tasks";

  let state = {
    userID: "",
    tasksJSON:
      "your Tasks will be generated here in JSON format, please copy and paste them into chatGPT followed by a question like: 'On average how much time do I spend on sports per week?' or 'Analyse what are the most common corollaries to the 'depressed' Event'",
  };

  const setState = (newState) => (state = newState);

  let tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];

  $: user.subscribe((value) => {
    state = { ...state, userID: value.uid };
  });

  async function exportTasks() {
    const tasksJSON = await Tasks.getTasksJSON(state.userID);
    setState({...state, tasksJSON});
    console.log("our new state is", state);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(state.tasksJSON);
      alert("JSON copied to clipboard!");
    } catch (err) {
      alert("Failed to copy JSON to clipboard.");
    }
  }
</script>

<div class="container">
  <div class="column">
    <button class="copy-button" on:click={copyCode}> Copy Code </button>
    <div class="json-box">
      {state.tasksJSON}
    </div>
    <button class="export-button" on:click={exportTasks}>
     Export Tasks
    </button>
  </div>
</div>
