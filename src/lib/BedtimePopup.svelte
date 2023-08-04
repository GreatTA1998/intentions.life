<!-- The background goes from warm bright light to dark
  Volume slowly goes down to 0, linearly for first implementation
-->
{#if isOpen}
  <div bind:this={PopupSurface} class="my-popup-window" use:clickOutside on:click_outside={() => dispatch('card-close')}>
    <div style="display: flex;">
      <h3 class="google-calendar-event-title"  style="margin-left: 50px;  margin-top: 40px; color: #ffffff; font-weight: 600;">
        My Bedtime Popup
      </h3>
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 10px; color: #323232;">
        close
      </span>
    </div>

    <!-- <input placeholder="search"> -->
    <!-- rain, comedy, podcast -->
    <!-- Pre-written bedtime queries -->

    <BedtimePopupYoutubePlayer 
      {volume}
      on:initial-volume={(e) => volume = e.detail.initialVolume}
      on:initial-volume-changed={(e) => resetCountdown()}
    />

    <div  class="title">
      <!--  Timer
      which would include brightness -->
      <div style="display: flex;">
        <!-- <div>
          10 minutes
        </div> -->

        <button on:click={() => startWindingDown({ durationInMinutes: 30 })}>
          30 minutes {intervalID ? '(started)' : '(not started)'}
        </button>
        <!-- <div>
          1 hour
        </div> -->
        <!-- <div>
          2 hours
        </div> -->
      </div>

      <div>
        <BedtimePopupMaplestoryMusic/>
      </div>
    </div>
  </div>
{/if}

<script>
  import BedtimePopupYoutubePlayer from './BedtimePopupYoutubePlayer.svelte'
  import BedtimePopupMaplestoryMusic from './BedtimePopupMaplestoryMusic.svelte'
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
  import _ from 'lodash'

  import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js'
  import { getFunctions, httpsCallable } from "firebase/functions"
  import { updateDoc, doc, getFirestore } from 'firebase/firestore'
  import { user } from '/src/store.js'

  export let isOpen = false

  let PopupSurface
  let volume = null

  let intervalID = null

  const dispatch = createEventDispatcher()
  const maplestoryAirshipsBackgroundURL =  'https://i.imgur.com/ShnqIpJ.jpeg'

  onMount(() => {
    PopupSurface.style['background-image'] = `url(${maplestoryAirshipsBackgroundURL})`

    startWindingDown({})
  })

  function startWindingDown ({ durationInMinutes = 30 }) {
    console.log("startWindingDown()")
    const increment = volume / durationInMinutes
    const minuteInMillisecs = 60 * 1000

    intervalID = setInterval(() => {
      volume -= increment
      if (volume <= 0) {
        clearInterval(intervalID)
      }
    }, minuteInMillisecs)
  }

  function resetCountdown () {
    if (intervalID) {
      clearInterval(intervalID)
      startWindingDown({})
    }
  }
</script>

<style>
  
.my-popup-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  overflow-y: scroll;
  z-index: 5;
  width: 70%;
  height: 70%;
  min-width: 200px;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  padding: 6px;
}

.title{
  font-family: Roboto, sans-serif; 
  padding-top: 20px; 
  font-size: 20px; 
  display: block; 
  margin: auto;
  text-align: center;
  color: white;
}

.google-calendar-event-title {
  font-family: Roboto,Arial,sans-serif;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px;
  color: #6D6D6D;
} 

button {
  display: block; 
  margin: auto;
  margin-top: 20px; 
  color: #fff;
}

button {
    display: block;
    align-items: center;
    justify-content: center;
    width: 200px; 
    height: 40px;
    color: #0085FF;
    border: 1px solid #F4F4F4;
    background-color: #F4F4F4;
    vertical-align: middle;
    font-family: sans-serif;
    border-radius: 20px;
    margin: auto;
    padding: 0px;
    font-size: 15px;
    margin-top: 10px;
  }

  button:hover, :focus {
    display: block;
    align-items: center;
    justify-content: center;
    width: 200px; 
    height: 40px;
    color: #ffffff;
    background-color: #0085FF;
    border: 1px solid #0085FF;
    vertical-align: middle;
    font-family: sans-serif;
    border-radius: 20px;
    margin: auto;
    transition: all 0.2s ease-out;
    margin-top: 10px;
  }

</style>