<script>
  import "./AI.css";
  let tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];

  function exportTasks() {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(tasks, null, 2));
      alert("JSON copied to clipboard!");
    } catch (err) {
      alert("Failed to copy JSON to clipboard.");
    }
  }
</script>

<div class="container">
  <div class="row">
    <button class="copy-button" on:click={copyCode}> Copy Code </button>
    <div class="json-box">
      {JSON.stringify(tasks, null, 2)}
    </div>
    <button class="export-button" on:click={exportTasks}>
      Export My Tasks
    </button>
  </div>
</div>
