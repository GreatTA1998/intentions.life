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
    
          <div style="display: flex; margin-top: 24px; flex-wrap: wrap;">
            <div class="secondary-description">
              Google made a calendar. So did Apple, Microsoft, Notion, Motion, VimCal, cal.com... the list goes on.
              <br><br>
              But only this calendar has these <b>4 features</b>, so you can effectively manage all the small, important things in life,
              without losing sight of your long-term goals and dreams.
            </div>
            
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 12px 0px;" class="action-buttons">
              <!-- <div
                on:click={createTemporaryDemoAccount}
                style="cursor: pointer; border-radius: 24px; background-color: rgb(160, 160, 160); display: flex; align-items: center; justify-content: center; height: 40px; color: white; padding: 6px 24px; margin-right: 12px;">
                <span class="material-symbols-outlined" style="margin-right: 4px;">
                  play_arrow
                  </span> 
                  <div>
                    Try demo
                  </div>
              </div> -->
    
              <LoginGoogle/>
            </div>
          </div>
    
          <div style="display: flex; justify-content: space-between; margin-top: 56px;">
            
            <div style="position: relative; justify-content: center;">
              <div class="silent-video">
                <img src="/default-calendar-view-screenshot.png" style="width: 100%; height: 100%; box-shadow: 0 4px 8px rgba(148, 90, 35, 0.4);">
              </div>

              <div class="ability-icons">
                {#each fourAbilities as ability, i}
                  <div class="ability-icon" on:click={() => currentIdx = i}
                    class:active-thumbnail={currentIdx === i}  
                    class:inactive-thumbnail={currentIdx !== i}
                  >
                    <span class="material-symbols-outlined" style="font-size: 47px; color: white;">
                      {ability.iconName}
                    </span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="explanatory-card">
              <div style="display: flex; align-items: center;">
                <div class="ability-icon" class:active-thumbnail={true}>
                  <span class="material-symbols-outlined" style="font-size: 48px; color: white;">
                    {fourAbilities[currentIdx].iconName}
                  </span>
                </div>

                 <div style="padding-left: 16px;">
                    <div class="card-title">
                      {fourAbilities[currentIdx].title}
                    </div>
                    <div style="font-size: 24px; color: rgb(240, 240, 240);">
                      {fourAbilities[currentIdx].subtitle}
                    </div>
                 </div>
              </div>

              <div class="card-description">
                {fourAbilities[currentIdx].description}
              </div>
            </div>
          </div>

          <!-- <div style="display: flex; justify-content: center; margin-top: 48px;">
            <div class="demo-video-container">
              <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/5d5b7edd67534940a26268d0331d9671?sid=293776fa-384c-4e96-946a-2db2caabb412" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
            </div>
          </div> -->


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

  let isSigningIn

  onMount(() => {

  })

  let currentIdx = 0

  let fourAbilities = [
    {
      videoSrc: '',
      title: 'Branching Todo-list',
      subtitle: 'No more long, messy lists',
      iconName: 'house',
      description: `The home view is the week calendar, because everything eventually ends up here - whether it's a reusable habit, a milestone deadlines, a todo-item, or just a scheduled event.

                    The todo-list can branch indefinitely, making it easy to re-organize your to-do list into a few readable categories rather than a long linear list.
                    
                    You can drag any task from the todo-list to the calendar. The calendar is free scrolling, making it easy to travel backwards and forwards.
                   `
    },
    {
      videoSrc: '',
      title: 'Reusable Tasks',
      subtitle: 'Efficient UX for habits & routines',
      iconName: 'restart_alt',
      description: `There's a place where you can configure all your repeating tasks. Habits can repeat on specific days, without needing a specific time. 

        The reason the repeats are "flexible", is because you can even schedule a weekly habit that doesn't have a pre-designated day. Just drag it to the calendar when good timing emerges.
        (1-minute duration is also supported.)
        
        In general, repeating tasks will appear as expected on the calendar.
        `
    },
    {
      videoSrc: '',
      title: 'UNCERTAIN GOALS',
      subtitle: "Visualize progress, including tried failures",
      iconName: 'sports_score',
      description: `Many tasks involve many unforeseen steps and difficulties. If you're blocked on a task because you're awaiting others, it will be put to the side and de-emphasized.
      
      But if you don't hear back within the expected follow-up time, the task will be re-emphasized, and also copied onto the relevant calendar day.
      `
    },
    {
      videoSrc: '',
      title: 'Context-based Photos',
      subtitle: "A more natural way to revisit memories",
      iconName: 'image',
      description: `Calendar-centric photos allows you to display your favorite photos in context, giving you a delightful, visual history of your week.
      
      `
    }
  ]



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
    // outline: 2px solid red; 
    width: 800px; 
    height: 500px;
    background-color: grey;
    // border-top-left-radius: 16px;
  }

  .ability-icons {
    position: absolute; 
    
    // https://stackoverflow.com/a/37413510/7812829
    // center horizontally
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    top: auto;
    outline: 0px solid purple;
    width: 400px;
    height: 100px;
    bottom: -24px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .ability-icon {
    background-color: var(--ability-showcase-bg-color);
    width: 80px;
    height: 80px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }


  .explanatory-card {
    width: 620px;
    height: 540px;
    background-color: var(--ability-showcase-bg-color);
    padding: 24px;
    // border-top-right-radius: 16px;
    // border-bottom-right-radius: 16px;
  }


  .card-title {
    font-size: 34px;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
  }

  .card-description {
    margin-top: 48px;
    padding: 16px;
    white-space: pre-line;
    color: rgb(250, 250, 250);
    font-size: 18px;
    font-style: italic;
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

  .demo-video-container {
    height: 80vh; width: 90vw
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

    .demo-video-container {
      width: 100vw; 
      height: calc(100vw * 3/4);
      margin-left: -4%; 
      margin-right: -4%;
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