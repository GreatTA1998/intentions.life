
<div on:click={handleClick} class="floating-button" class:highlighted-button={iconName === 'settings_voice'}>
  <span id="startButton" class="material-symbols-outlined" class:bold-icon={iconName === 'settings_voice'} style="font-size: 48px; font-weight: 600;">
    {iconName}
  </span>
</div>

<div id="output"></div>

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { twoDigits } from '/src/helpers/everythingElse.js'

  let outputDiv
  const dispatch = createEventDispatcher()
  let recognition
  let transcript

  let iconName = 'mic'

  function handleClick () {
    if (iconName === 'settings_voice') {
      recognition.abort() // even though `.stop()` works on windows, it doesn't work on Safari, so we keep the behavior consistent
    } else {
      dispatch('new-mic-result', '')
      recognition.start()
    }
  }

  onMount(() => {
    outputDiv = document.getElementById('output');

    initSpeechRecognition()
  })

  function initSpeechRecognition () {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onnomatch = (event) => {
      alert('event.error =', event.error)
    }
    recognition.onerror = (event) => {
      if (event.error === 'aborted') return

      alert(`Error occurred in recognition: ${event.error}`)
    };

    recognition.onstart = () => {
      iconName = 'settings_voice'
      dispatch('voice-start', {})
    };

    recognition.onresult = (event) => {
      // playFinishedSound()
      transcript = event.results[0][0].transcript;
      outputDiv.textContent = transcript;
      interpretTranscript(transcript)
      dispatch('new-mic-result', transcript)

      recognition.abort()
    };

    recognition.onend = () => {
      iconName = 'mic'
      dispatch('voice-end', {})
      recognition.stop()
      recognition.abort()
    }
  }

  function interpretTranscript (transcript) {
    const newTaskCommands = transcript.split(" plus ")
    for (const newTaskCommand of newTaskCommands) {
      if (newTaskCommand === '') {
        alert('No task name detected') // because I got empty ghosts on my to-do list
      }
      dispatch('new-todo', { name: newTaskCommand })
    }
  }
</script>

<style>
  .floating-button {
    position: absolute;
    right: 16px;
    bottom: calc(var(--bottom-navbar-height) + 16px);

    border: 4px solid black;
    height: 72px;
    width: 72px;
    border-radius: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .highlighted-button {
    font-weight: 600;
    background-color: orange;
  }

  .bold-icon {
    font-weight: 600;
  }
</style>