{#if hasFetchedUser}
  <!-- <div id="background-image-holder" style="height: 100vh; display: flex; justify-content: center; align-items: center;"> -->
    <NavbarAndContentWrapper>
      <!-- <div slot="navbar" class="top-navbar transparent-glow-navbar" style="background: transparent; border-bottom: 1px solid lightgrey; padding-left: 4%; padding-right: 4%;">
        <img 
          src="/trueoutput-square-nobg.png" 
          style="width: 26px; height: 36px;"
        >

        <PopupLogin let:setIsPopupOpen={setIsPopupOpen}>
          <div on:click={() => setIsPopupOpen({ newVal: true })} style="margin-right: 0px; margin-left: auto; color: rgb(60, 60, 60); font-size: 12px;">
            Log in
          </div>
        </PopupLogin>
      </div>
       -->
      <!-- background: #193b19; -->
      <div slot="content" style="display: flex; flex-grow: 1; height: 100%; padding: 3%;" class="home-page-background">
        <div style="width: 90vw; min-width: 200px; height: 80vh; border-radius: 10px;">
          <div class="hero-title">
            A modern calendar for organizing life
          </div>
    
          <div style="display: flex; margin-top: 24px; flex-wrap: wrap; gap: 24px;">
            <div class="secondary-description" style="line-height: 1.4">
              Google made a calendar. So did Apple, Microsoft, Notion, Motion, VimCal, cal.com...
              But only this calendar has the <b><u>4 experimental features</u></b>, so you can manage all the small things in life -
              without losing sight of your biggest goals and dreams
            </div>
            
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 12px 0px;" class="action-buttons">
              <LoginGoogle/>
            </div>
          </div>
    
          <div style="display: flex; justify-content: space-between; margin-top: 56px;">
            <div class="explanatory-card">
              <div style="display: flex; align-items: center;">
                <div class="ability-square" class:active-thumbnail={true}>
                  <span class="material-symbols-outlined ability-icon" style="color: white;">
                    {fourAbilities[currentIdx].iconName}
                  </span>
                </div>

                 <div style="padding-left: 1.5vw;">
                    <div class="card-title">
                      {fourAbilities[currentIdx].title}
                    </div>
                    <div class="card-subtitle">
                      {fourAbilities[currentIdx].subtitle}
                    </div>
                 </div>
              </div>

              <div class="card-description">
                {fourAbilities[currentIdx].description}
              </div>
            </div>

            <div style="position: relative; justify-content: center;">
              <div class="silent-video" style="display: {isVideoReady ? '' : 'none'};">
                {#if isSoundOff}
                  <div class="unmute-btn" on:click={() => { 
                    VideoElem.muted = false; isSoundOff = false
                  }} style="z-index: 1;">
                    <div style="font-size: 1.2vw;">
                      Sound is off
                    </div>
                  </div>
                {/if}

                <video  
                  bind:this={VideoElem}
                  muted={true} autoplay playsinline
                  controls
                  controlslist="nodownload nofullscreen noremoteplayback noplaybackrate"
                  disablepictureinpicture
                  src={fourAbilities[currentIdx].videoSrc}
                  on:click|self={togglePlayPause}
                  on:loadstart={() => isVideoReady = false}
                  on:loadedmetadata={() => isVideoReady = true}
                  style="width: 100%; height: auto;"
                >
                </video>

                <div class="abilities-container">
                  {#each fourAbilities as ability, i}
                    <div class="ability-square" on:click={() => currentIdx = i}
                      class:active-thumbnail={currentIdx === i}  
                      class:inactive-thumbnail={currentIdx !== i}
                    >
                      <span class="material-symbols-outlined ability-icon" style="color: white;">
                        {ability.iconName}
                      </span>
                    </div>
                  {/each}
                </div>
              </div>

            </div>
          </div>

          <div style="text-align: center; padding-top: 10vw; padding-bottom: 4vw;">
            <img style="max-width: 80%; height: auto;" src="https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Fmy-screenshot-for-showcase.png?alt=media&token=9800c22f-875b-4df7-b364-2a122e22c842">
          </div>

        </div>
      </div>
    </NavbarAndContentWrapper>
{/if}

<script>
  import { goto } from '$app/navigation'
  import LoginGoogle from '$lib/LoginGoogle.svelte'
  import PopupLogin from '$lib/PopupLogin.svelte'
  import { hasFetchedUser } from '/src/store.js'
  import { onMount } from 'svelte'
  import { getAuth, signInAnonymously } from "firebase/auth";
  import NavbarAndContentWrapper from '$lib/NavbarAndContentWrapper.svelte'

  let isSoundOff = true
  let VideoElem
  let isVideoReady = true

  onMount(() => {

  })


  // when we switch "src" on <video> playback speed resets, so this is a hack
  $: if (VideoElem && (currentIdx || currentIdx === 0)) {
    setTimeout( // timeout necessary as the playback speed resets after video LOAD
      () => { 
        if (VideoElem) { // during `src` switching, it's not defined instantaneously
          VideoElem.playbackRate = 1.5
          if (window.innerWidth < 500) {
            VideoElem.controls = false
          }
        }
      },
      0
    )
  }

  let currentIdx = 0

  let fourAbilities = [
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-1.mp4?alt=media&token=4bc3e4c2-778a-4ece-ae6a-604cc60e98ce",
      title: 'Branching Todo',
      subtitle: 'No more long, messy lists',
      iconName: 'house',
      description: `The home view is the week calendar, because everything eventually ends up here - whether it's a reusable habit, a milestone deadlines, a todo-item, or just a scheduled event.

                    The todo-list can branch indefinitely, making it easy to re-organize your to-do list into a few readable categories rather than a long linear list.
                    
                    You can drag any task from the todo-list to the calendar. The calendar is free scrolling, making it easy to travel backwards and forwards.
                   `
    },
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-2.mp4?alt=media&token=7ca4101e-094e-474f-b373-82d1bc170791",
      title: 'Reusable Tasks',
      subtitle: 'Configure sustainable routines',
      iconName: 'restart_alt',
      description: `There's a place where you can configure all your repeating tasks. Habits can repeat on specific days, without needing a specific time. 

        The reason the repeats are "flexible", is because you can even schedule a weekly habit that doesn't have a pre-designated day. Just drag it to the calendar when good timing emerges.
        (1-minute duration is also supported.)
        
        In general, repeating tasks will appear as expected on the calendar.
        `
    },
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-3.mp4?alt=media&token=a453c7db-ca83-4f26-9e5d-895ed35fb66e",
      title: 'UNCERTAIN GOALS',
      subtitle: "Visualize tried paths",
      iconName: 'sports_score',
      description: `Many tasks involve many unforeseen steps and difficulties. If you're blocked on a task because you're awaiting others, it will be put to the side and de-emphasized.
      
      But if you don't hear back within the expected follow-up time, the task will be re-emphasized, and also copied onto the relevant calendar day.
      `
    },
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-4.mp4?alt=media&token=a41910a8-043b-43a5-948a-4ee6fa9c1668",
      title: 'Photography',
      subtitle: "Display photos contextually",
      iconName: 'image',
      description: `Calendar-centric photos allows you to display your favorite photos in context, giving you a delightful, visual history of your week.
      
      `
    }
  ]

  function togglePlayPause () {
    const video = VideoElem
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }

  function createTemporaryDemoAccount () {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        alert("Welcome! You are about to be redirected to the demo. If the website seems broken, try reloading the page. If at any point you want to return to the home page, just click the tree logo on the top left.")
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
</script>

<style lang="scss">
  .unmute-btn {
    position: absolute; /* Position the button absolutely within the container */
    top: 50%; /* Vertically center the button */
    left: 50%; /* Horizontally center the button */
    transform: translate(-50%, -50%); /* Adjust for the button's own dimensions */
    width: 9vw; /* Adjust the size of the button as needed */
    height: 9vw;
    border-radius: 50%; /* Make the button circular */
    background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent background */
    color: white; /* Text color */
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :root {
    --ability-showcase-bg-color: rgb(0, 0, 0);
  }

  .active-thumbnail {
    border: 1px solid var(--logo-twig-color);
    box-shadow: 0 8px 16px rgba(148, 90, 35, 1);
  }

  .inactive-thumbnail {
    filter: opacity(0.7) blur(2px);
  }

  .home-page-background {
    background-color: rgb(250, 250, 250);
  }


  .silent-video {
    flex: 0 0 55%;
    position: relative;
  }

  .abilities-container {
    position: absolute; 
    
    // https://stackoverflow.com/a/37413510/7812829
    // center horizontally
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    top: auto;
    // outline: 4px solid purple;
    width: 34vw;
    bottom: -4.5vw;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .ability-square {
    background-color: var(--ability-showcase-bg-color);
    width: 6.5vw;
    height: 6.5vw;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ability-icon {
    font-size: 4vw;
  }

  .explanatory-card {
    flex: 0 0 45%; 
    height: auto; // 528px
    background-color: rgb(20, 20, 20);
    padding: 2vw;
  }

  .card-title {
    font-size: 2.4vw;
    font-weight: 500;
    color: white;
    text-transform: uppercase;
  }

  .card-subtitle {
    font-size: 1.7vw; font-weight: 300; color: rgb(240, 240, 240);
  }

  .card-description {
    font-size: 1.2vw;
    margin-top: 1.8vw;
    padding: 0.5vw;
    white-space: pre-line; // preserves line breaks
    color: rgb(200, 200, 200);
    font-weight: 400;
    line-height: 1.4;
    font-style: italic;
  }

  @media (max-width: 768px) {

    video::-webkit-media-controls-panel {
      display: none !important;
      opacity: 1 !important;
    } 
    video::-webkit-media-controls {
      display: none;
    }
  }

  @media (max-width: 360px) {
    .explanatory-card {
      zoom: 30%;
    }
  }

  .transparent-glow-navbar {
    background-color: rgba(150, 150, 150, 0.1);
    border-bottom: none;
  }

  .highlighted-words {
    font-weight: 600; display: inline;
  }

  #background-image-holder {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: rgb(235, 235, 235)
    /* background-image: linear-gradient(rgba(255, 255, 255, 0.91), rgba(255, 255, 255, 0.5)), 
      url('https://i.imgur.com/ShnqIpJ.jpeg'); */

    /* background-image: url('maplestory-orange.jpg'); */
    /* background-image: url('https://i.imgur.com/ShnqIpJ.jpeg'); */
  }

  a {
    flex: 1;
    background-color: #333;
    color: #fff;
    border: 1px solid;
    padding: 0.5rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.5s ease-out;
  }

  a:hover,
  a:focus {
    background-color: #fff;
    color: #333;
  }

  .secondary-description {
    font-weight: 500; 
    display: inline; 
    color: rgb(80, 80, 80);
  }

  .hero-title {
    color: rgb(80, 80, 80);
    font-size: 3rem; 
    font-weight: 600;
  }

  // note there will be a 1px boundary condition that causes an error, however, 
  // Kevin Powell's inequality syntax doesn't work for now https://youtube.com/shorts/mrzA2B5gUmI?si=J4yAzq1EQO-BwlN9


  // less than or equal to 768px
  @media (max-width: 1279.99px) {
    .secondary-description {
      width: 90vw;
    }

    .hero-title {
      font-size: 7vw;
    }

    .action-buttons {
      margin-top: 24px;
    }
  }

  @media (max-width: 767.99px) {
    .hero-title {
      margin-top: 12px;
      font-size: 10vw;
    }
  }


  // greater than or equal to 768px;
  @media (min-width: 1280px) {
    .hero-title {
      margin-left: -6px;
      font-size: 80px;
    }

    .secondary-description {
      width: 54vw; 
      font-size: 20px;
    }

    .action-buttons {
      width: 30vw; 
    }
  }

</style>