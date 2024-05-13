
<div on:click={handleClick} class="floating-button" class:highlighted-button={iconName === 'settings_voice'}>
  <span id="startButton" class="material-symbols-outlined" class:bold-icon={iconName === 'settings_voice'} style="font-size: 48px;">
    {iconName}
  </span>
</div>


<div id="output"></div>

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { twoDigits } from '/src/helpers.js'

  let outputDiv
  const dispatch = createEventDispatcher()
  let recognition

  let iconName = 'mic'

  function handleClick () {
    if (iconName === 'settings_voice') {
      // recognition.stop()
    } else {
      recognition.start()
      playSound()
    }
  }

  function playSound () {
    const ding = new Audio('/hero_simple-celebration-03.wav')
    ding.play()
  }

  function playFinishedSound () {
    const ding = new Audio('/hero_simple-celebration-02.wav')
    ding.play()
  }

  onMount(() => {
    outputDiv = document.getElementById('output');
    initSpeechRecognition()
  })

  function initSpeechRecognition () {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      iconName = 'settings_voice'
      dispatch('voice-start', {})
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      outputDiv.textContent = transcript;
      console.log("transcript =", transcript)
      interpretTranscript(transcript)
      dispatch('new-mic-result', transcript)
    };

    recognition.onend = () => {
      iconName = 'mic'
      dispatch('voice-end', {})
      recognition.stop()
      playFinishedSound()
    }
  }

  function interpretTranscript (transcript) {
    const newTaskCommands = transcript.split("and")
    for (const newTaskCommand of newTaskCommands) {
      // exact substring match 
      if (newTaskCommand.includes(" at ")) {
        const [taskName, scheduledTime] = newTaskCommand.split(" at ")

        let startTime
        if (scheduledTime.includes('a.m.') || scheduledTime.includes('AM')) { // iOS is capitalized
          if (scheduledTime.includes(':')) {
            // windows: play golf at 10 a.m.
            const [hh, mm] = scheduledTime.split(':')
            startTime = twoDigits(hh) + ':' + mm
          } 
          else if (scheduledTime.length === 4 || scheduledTime.length === 5) {
            // play golf at 10 AM
            const [hh, AM] = scheduledTime.split(' ')
            startTime = twoDigits(hh) + ':' + '00'
          }
          else {
            alert('Cannot parse timing after AT keyword =', scheduledTime)
          }
        } 
        else if (scheduledTime.includes('p.m.') || scheduledTime.includes('PM')) { // iOS is capitalized
          if (scheduledTime.includes(':')) {
            const [hhmm, pm] = scheduledTime.split(" ")
            const [hh, mm] = hhmm.split(':')
            const militaryTime = Number(hh) + 12             
            startTime = twoDigits(militaryTime) + ':' + mm
          } 
          else if (scheduledTime.length === 4 || scheduledTime.length === 5) { // 9 am, 10 am (no `mm` suffixes)
            // play golf at 10 PM
            const [hh, PM] = scheduledTime.split(' ')
            const militaryTime = Number(hh) + 12
            startTime = twoDigits(militaryTime) + ':' + '00'
          } 
          else {
            alert('Cannot parse timing after AT keyword =', scheduledTime)
          }
        }
        else {
          alert('Need to specify "a.m." or "p.m." such as "7 pm"')
          return
        }
        dispatch('new-event-today', { name: taskName, startTime })
      }
      else {
        dispatch('new-todo', { name: newTaskCommand })
      }
    }
  }
</script>

<style>
  .floating-button {
    position: absolute;
    right: 16px;
    bottom: calc(var(--bottom-navbar-height) + 16px);

    /* border: 2px solid var(--logo-twig-color); */
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