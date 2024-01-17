{#if hasFetchedUser}
  <!-- <div id="background-image-holder" style="height: 100vh; display: flex; justify-content: center; align-items: center;"> -->
    <NavbarAndContentWrapper>
      <div slot="navbar" class="top-navbar transparent-glow-navbar" style="background: transparent; border-bottom: 1px solid lightgrey; padding-left: 4%; padding-right: 4%;">
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
      
      <div slot="content" style="display: flex; flex-grow: 1; height: 100%; padding: 4%;">
        <div style="background: transparent; width: 90vw; min-width: 200px; height: 80vh; border-radius: 10px;">
          <div class="hero-title">
            Combine your todo-list with your calendar.
          </div>
    
          <div style="display: flex; margin-top: 24px; flex-wrap: wrap;">
            <div class="secondary-description">
              Create lots of sub-tasks on your to-do list, and drag-and-drop them to the calendar freely.
              Price is $5/month, <div class="highlighted-words" style="color: var(--base-color)">no need for payment info</div>, so that you don't have to worry about cancelling if you don't end up using it.
            </div>
            
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 12px 0px;" class="action-buttons">
              <div
                on:click={createTemporaryDemoAccount}
                style="cursor: pointer; border-radius: 24px; background-color: rgb(160, 160, 160); display: flex; align-items: center; justify-content: center; height: 40px; color: white; padding: 6px 24px; margin-right: 12px;">
                <span class="material-symbols-outlined" style="margin-right: 4px;">
                  play_arrow
                  </span> 
                  <div>
                    Try demo
                  </div>
              </div>
    
              <LoginGoogle/>
            </div>
          </div>

    
          <div style="display: flex; justify-content: center; margin-top: 48px;">
            <div class="demo-video-container">
              <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/5d5b7edd67534940a26268d0331d9671?sid=293776fa-384c-4e96-946a-2db2caabb412" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
            </div>
          </div>
        </div>
      </div>
    </NavbarAndContentWrapper>
    
    

    
      <!-- <div style="display: flex; align-items: center; margin-left: 60px; margin-right: 60px;">
        {#if isSigningIn}
          <PhoneLogin canTakeInternationalNumbers/>  
        {/if}
      </div> -->
  <!-- </div> -->
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
  font-weight: 500; display: inline; color: rgb(100, 100, 100);
}

.hero-title {
  color: var(--base-color); 
  font-size: 4rem; 
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