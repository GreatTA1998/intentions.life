<script>
  import { user } from "../../store";
  import Tasks from "../../back-end/Tasks";
  import text from "./text";
  import GPT from "../../back-end/GPT.js";
  import { onMount } from "svelte";
  import { DateTime } from "luxon";

  const DefaultDateRange = {
    startDate: DateTime.now().minus({ month: 2 }).toISODate(),
    endDate: DateTime.now().plus({ month: 2 }).toISODate(),
  };
  
  let state = {
    userID: "",
    chat: [],
    currentInput: "",
    tasksJSON: "",
    DateRange: DefaultDateRange,
  };

  const setState = (newState) => (state = newState);

  $: user.subscribe((value) => {
    state = { ...state, userID: value.uid };
  });

  onMount(async () => {
    const tasksJSON = await Tasks.getTasksJSONByRange(
      state.userID,
      state.DateRange.startDate,
      state.DateRange.endDate
    );
    setState({ ...state, tasksJSON });
  });

  async function addMessage() {
    if (state.currentInput.trim()) {
      setState({
        ...state,
        chat: [...state.chat, { role: "user", content: state.currentInput }],
      });
    }
    state.currentInput = "";
    const { role, content } = await GPT.chat(state.tasksJSON, state.chat);
    setState({
      ...state,
      chat: [...state.chat, { role, content }],
    });
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addMessage();
    }
  }
</script>

<div class="container">
  <div class="column">
    <h3 class="intro">{text.intro}</h3>
    <div class="chat-box">
      {#each state.chat as message}
        {#if message.role === "user"}
          <div class="message-class">
            <strong>{message.role}:</strong>
            {message.content}
          </div>
        {:else}
          <div>
            <strong>{message.role}:</strong>
            {message.content}
          </div>
        {/if}
      {/each}
    </div>
    <div class="input-section">
      <input
        type="text"
        placeholder="Type your message..."
        bind:value={state.currentInput}
        on:keypress={handleKeyPress}
      />
      <button class="submit-button" on:click={addMessage}>Send</button>
    </div>
  </div>
</div>

<style src="./AI.css"></style>