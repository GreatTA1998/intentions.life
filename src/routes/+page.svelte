{#if hasFetchedUser}
  <!-- <div id="background-image-holder" style="height: 100vh; display: flex; justify-content: center; align-items: center;"> -->
    <NavbarAndContentWrapper>
      <!-- <div slot="navbar" class="top-navbar transparent-glow-navbar" style="background: transparent; border-bottom: 1px solid lightgrey; padding-left: 4%; padding-right: 4%;">
        <img 
          src="/trueoutput-square-nobg.png" 
          style="width: 26px; height: 36px;"
        >
      </div>
       -->
      <!-- background: #193b19; -->
      <div slot="content" style="display: flex; flex-grow: 1; height: 100%; padding: 3%;" class="home-page-background">
        <div style="width: 90vw; min-width: 200px; height: 80vh; border-radius: 10px;">
          
          <div class="hero-title">
            A modern calendar for organizing life
          </div>
    
          <div style="display: flex; margin-top: 2vw; flex-wrap: wrap; gap: 24px;">
            <div class="secondary-description">
              intentions.life is a calendar app that helps you sustain small habits towards large, uncertain goals.
            </div>
            
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 12px 0px;" class="action-buttons">
              <LoginGoogle/>
            </div>
          </div>

          <div style="display: flex; margin-top: 2vw;">
            <div class="my-tab-item" on:click={() => currentIdx = 0} class:my-active-tab={currentIdx === 0}>
              <span class="material-symbols-outlined my-tab-icon">
                park
              </span>
              <div class="my-tab-name">
                Branching to-do
              </div>
            </div>
            <div class="my-tab-item" on:click={() => currentIdx = 1} class:my-active-tab={currentIdx === 1}>
              <span class="material-symbols-outlined my-tab-icon">
                restart_alt
              </span>
              <div class="my-tab-name">
                Reusable tasks
              </div>
            </div>
            <div class="my-tab-item" on:click={() => currentIdx = 2} class:my-active-tab={currentIdx === 2}>
              <span class="material-symbols-outlined my-tab-icon">
                sports_score
              </span>
              <div class="my-tab-name">
                Uncertain goals
              </div>
            </div>
            <div class="my-tab-item" on:click={() => currentIdx = 3} class:my-active-tab={currentIdx === 3}>
              <span class="material-symbols-outlined my-tab-icon">
                Photo
              </span>
              <div class="my-tab-name">
                Contextual photos
              </div>
            </div>
          </div>
    
          <div class="feature-showcase-container">
            <div class="explanatory-card">
              <div style="display: flex; align-items: center;">
                <!-- <div class="ability-square" class:active-thumbnail={true} style="cursor: default;">
                  <span class="material-symbols-outlined ability-icon">
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
                 </div> -->
              </div>

              <div class="card-description">
                {fourAbilities[currentIdx].description}
              </div>
            </div>

              <!-- style="display: {isVideoReady ? '' : 'none'};" -->
              <div class="video-container">
                {#if !isPlaying}
                  <div class="unmute-btn" on:click|stopPropagation={() => { 
                    VideoElem.muted = false; isSoundOff = false; VideoElem.play();
                  }} style="z-index: 1;">
                    <span class="material-symbols-outlined" style="font-size: 8vw;">
                      play_circle
                    </span>
                    <div style="font-size: 1.2vw;">
                      
                    </div>
                  </div>
                {/if}

                <!-- on:loadstart={() => isVideoReady = false}
                     on:loadedmetadata={() => isVideoReady = true} -->

                <video 
                  src={fourAbilities[currentIdx].videoSrc}
                  bind:this={VideoElem}
                  playsinline
                  controls={true}
                  disablepictureinpicture
             
                  on:click|self|preventDefault={() => {
                    // if (!isShowingControls) {
                      togglePlayPause() 
                    // }
                  }}

                  on:play={() => isPlaying = true}
                  on:pause={() => isPlaying = false}
                  on:ended={() => isPlaying = false}
                  on:loadedmetadata={onVideoLoaded}
           
                  style="width: 100%; height: auto;"
                >
                </video>

                <!-- <div class="abilities-container">
                  {#each fourAbilities as ability, i}
                    <div class="ability-square" on:click={() => currentIdx = i}
                      class:active-thumbnail={currentIdx === i}  
                      class:inactive-thumbnail={currentIdx !== i}
                    >
                      <span class="material-symbols-outlined ability-icon">
                        {ability.iconName}
                      </span>
                    </div>
                  {/each}
                </div> -->
              </div>
          </div>

    
          <div style="text-align: center; padding-top: 12vw; padding-bottom: 4vw;">
            <div style="margin-bottom: 1vw; font-size: 1vw">
              Example screenshot of an active calendar
            </div>
            <img style="max-width: 80%; opacity: 1; filter: blur(0px); height: auto;" src="https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Fmy-screenshot-for-showcase.png?alt=media&token=9800c22f-875b-4df7-b364-2a122e22c842">
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
  let isShowingControls = false
  let isPlaying = false

  onMount(() => {
  
  })


  // when we switch "src" on <video> playback speed resets, so this is a hack
  $: if ((currentIdx || currentIdx === 0)) {
    initializeVideo()
  }

  function initializeVideo () {
    setTimeout( // timeout necessary as the playback speed resets after video LOAD
      () => { 
        if (VideoElem) { // during `src` switching, it's not defined instantaneously
    
          // console.log('set VideoElem src ')
          if (window.innerWidth > 600) {
            isShowingControls = true
            VideoElem.controls = true
            VideoElem.controlslist="nodownload noremoteplayback" // nofullscreen // noplaybackrate
          }
        
          VideoElem.src = fourAbilities[currentIdx].videoSrc
          VideoElem.playbackRate = 1.5 // playback rate MUST come after `src`
          
        }
      },
      0
    )
  }

  let currentIdx = 0

  let fourAbilities = [
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-1.mp4?alt=media&token=4bc3e4c2-778a-4ece-ae6a-604cc60e98ce#t=0.1",
      title: '1. Branching Todo',
      subtitle: 'No more long, messy lists',
      iconName: 'house',
      description: `By default, you have a todo-list and calendar together.

                    The todo-list can branch indefinitely, making it easy to re-organize your to-do list into a few readable categories rather than a long linear list.
                    
                    You can drag any task from the todo-list to the calendar.
                   `
    },
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-2.mp4?alt=media&token=7ca4101e-094e-474f-b373-82d1bc170791",
      title: '2. Reusable Tasks',
      subtitle: 'Configure sustainable routines',
      iconName: 'restart_alt',
      description: `You can visualize all your periodic routines under one page. 

        Reusable tasks can be typed quickly with autocomplete, be displayed as clear, compact icons (premium feature) and be tracked with time-spent statistics.
        `
    },
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-3.mp4?alt=media&token=a453c7db-ca83-4f26-9e5d-895ed35fb66e",
      title: '3. UNCERTAIN GOALS',
      subtitle: "Visualize tried paths",
      iconName: 'sports_score',
      description: `Many tasks involve many unforeseen steps and difficulties. By tracking the paths, not only do you not forget to follow-up with pending steps, you are more likely to persevere when you can visualize all the things you attempted. 

      You can drag entire-subtrees to forge a rich, tree-like history for your most long-term endeavors.
      `
    },
    {
      videoSrc: "https://firebasestorage.googleapis.com/v0/b/project-y-2a061.appspot.com/o/homePageDemoVideos%2Ffeature-4.mp4?alt=media&token=a41910a8-043b-43a5-948a-4ee6fa9c1668",
      title: '4. TIMELY PHOTOS',
      subtitle: "Enjoy the scenery",
      iconName: 'image',
      description: `Attaching photos to tasks have practical use - they often encapsulate a lot of information. 
      
      But more importantly, the calendar provides more context to the photos, and your favorite memories become your calendar's scenery.
      `
    }
  ]

  function onVideoLoaded () {
    isPlaying = false
  }

  function togglePlayPause () {
    const video = VideoElem
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
</script>

<style lang="scss">
  .my-inactive-tab {
    border-bottom: 1vw solid grey;
  }

  .my-tab-item {
    // outline: 2px solid red; 
    border-bottom: 0.3vw solid rgb(219, 219, 219);
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center; 
    align-items: center; 
    max-width: 16vw;
    padding: 1vw;
    cursor: pointer;
  }
  
  .my-active-tab {
    border-bottom: 0.3vw solid var(--logo-twig-color);
    color: var(--logo-twig-color);
    font-weight: 600;
  }


  .my-tab-icon {
    font-size: 2.5vw;
  }

  .my-tab-name {
    margin-left: 0.2vw;
    font-size: 1.2vw;
  }

  // https://stackoverflow.com/a/31838091/7812829
  // video::-webkit-media-controls-start-playback-button {
  //   display: none !important;
  // }

  .unmute-btn {
    position: absolute; /* Position the button absolutely within the container */
    top: 50%; /* Vertically center the button */
    left: 50%; /* Horizontally center the button */
    transform: translate(-50%, -50%); /* Adjust for the button's own dimensions */
    width: 9vw; /* Adjust the size of the button as needed */
    height: 9vw;
    border-radius: 50%; /* Make the button circular */
    background-color: rgba(0, 0, 0, 0.1); /* Semi-transparent background */
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
    border: 0.2vw solid var(--logo-twig-color);
    box-shadow: 0 1.5vw 3vw 0.5vw rgba(148, 90, 35, 1);
  }

  .inactive-thumbnail {
    box-shadow: 0 1.5vw 3vw 0.5vw rgb(143, 143, 143);
  }

  .home-page-background {
    background-color: rgb(250, 250, 250);
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
    // background-color: var(--ability-showcase-bg-color);
    background-color: white;
    width: 6.5vw;
    height: 6.5vw;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ability-icon {
    font-size: 4.8vw;
  }
  
  .feature-showcase-container {
    display: flex; 
    justify-content: space-between; 
    margin-top: 1vw;
  }

  .video-container {
    flex: 0 0 55%;
    width: 100%;
    position: relative;
  }

  .explanatory-card {
    flex: 0 0 45%; 
    height: auto; // 528px
    background-color: rgb(252, 243, 235);
    padding: 2vw;
  }

  .card-title {
    font-size: 2.4vw;
    font-weight: 500;
    color: white;
    text-transform: uppercase;
  }

  .card-subtitle {
    font-size: 1.7vw; font-weight: 300; color: rgb(250, 250, 250);
  }

  .card-description {
    font-size: 1.5vw;
    // margin-top: 1.8vw;
    padding: 0.5vw;
    white-space: pre-line; // preserves line breaks
    // color: rgb(255, 255, 255);
    font-weight: 400;
    line-height: 1.4;
    // font-style: italic;
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
    color: rgb(90, 90, 90);
    font-size: 1.8vw;
    max-width: 800px;
    line-height: 1.3;
  }

  .hero-title {
    color: rgb(60, 60, 60);
    font-size: 3rem; 
    font-weight: 600;
  }

  // note there will be a 1px boundary condition that causes an error, however, 
  // Kevin Powell's inequality syntax doesn't work for now https://youtube.com/shorts/mrzA2B5gUmI?si=J4yAzq1EQO-BwlN9


  // less than or equal to 768px
  @media (max-width: 1279.99px) {
    .hero-title {
      font-size: 7vw;
    }

    .action-buttons {
      margin-top: 2vw;
    }
  }

  // Anything below 768 is considered a mobile device
  @media (max-width: 767.99px) {
    .secondary-description {
      font-size: 16px;
    }

    .hero-title {
      margin-top: 12px;
      font-size: 10vw;
    }

    .my-tab-item {
      max-width: 80px;
    }

    .my-tab-name {
      font-size: 12px;
      text-align: center;
    }

    .my-tab-icon {
      font-size: 24px;
    }

    .my-active-tab {
      border-bottom: 3px solid var(--logo-twig-color);
    }

    .feature-showcase-container {
      flex-direction: column;
    }

    .video-container {
      width: 100%;
    }

    .explanatory-card {
      width: 100%;
    }

    .card-description {
      font-size: 12px;
    }
  }


  // greater than or equal to 768px;
  @media (min-width: 1280px) {
    .hero-title {
      margin-left: -6px;
      font-size: 80px;
    }

    .action-buttons {
      width: 30vw; 
    }
  }
</style>