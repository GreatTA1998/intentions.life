
<div on:click={handleClick} class="floating-button">
  <span id="startButton"class="material-symbols-outlined" style="font-size: 48px;">
    {iconName}
  </span>
</div>


<!-- <div id="output"></div> -->

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { twoDigits } from '/src/helpers.js'

  const dispatch = createEventDispatcher()
  let recognition

  let iconName = 'mic'


  function handleClick () {
    if (iconName === 'settings_voice') return 
    recognition.start()
  }

  onMount(() => {
    const outputDiv = document.getElementById('output');

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
    };
  })

  function interpretTranscript (transcript) {
    const newTaskCommands = transcript.split("and")
    for (const newTaskCommand of newTaskCommands) {
      // exact substring match 
      if (newTaskCommand.includes(" at ")) {
        const [taskName, scheduledTime] = newTaskCommand.split(" at ")
        console.log("taskName =", taskName)
        console.log("scheduledTime =", scheduledTime)

        let startTime
        if (scheduledTime.includes('a.m.') || scheduledTime.includes('AM')) { // iOS is capitalized
          // do nothing
          const [hh, mm] = scheduledTime.split(':')
          const newHH = twoDigits(hh)

          startTime = newHH + ':' + mm
        } 
        else if (scheduledTime.includes('p.m.') || scheduledTime.includes('PM')) { // iOS is capitalized
          const [hhmm, pm] = scheduledTime.split(" ")
          console.log('hhmm =', hhmm)
          const [hh, mm] = hhmm.split(':')
          console.log('hh =', hh)
          const militaryTime = Number(hh) + 12 
          const newHH = twoDigits(militaryTime)
          
          startTime = newHH + ':' + mm
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
  
</style>