{#if hasFetchedUser}
  <div id="background-image-holder" style="height: 100vh; display: flex; justify-content: center; align-items: center;">
    <div style="background: transparent;: white; width: 90vw; min-width: 200px; height: 80vh; border-radius: 10px;">
      <div style="color: var(--base-color); font-size: 4rem; font-weight: 600;">
        todo-list + calendar
      </div>

      <div style="display: flex; margin-top: 24px;">
        <div style="width: 700px; font-size: 18px; font-weight: 500; display: inline; color: grey;">
          Create lots of sub-tasks on your to-do list. Drag-and-drop them to the calendar on the same page.
          <div class="highlighted-words" style="color: var(--base-color)">Price is $5/month, no payment info needed</div> for the first month. 
        </div>
        
        <div style="margin-left: auto; margin-right: 0px; display: flex; align-items: center;">
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
        <iframe width="100%" height="600px;" src="https://www.youtube.com/embed/rIGVzVDEvRQ?si=gLAcc_nnGPtmXs1V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    


      <div style="display: flex; align-items: center; margin-left: 60px; margin-right: 60px;">

        {#if isSigningIn}
          <PhoneLogin canTakeInternationalNumbers/>  
        {/if}
      </div>

      <div style="margin-left: 80px; margin-right: 80px">
      </div>
    </div>
  </div>
{/if}

<script>
  import { goto } from '$app/navigation'
  import PhoneLogin from '../PhoneLogin.svelte'
  import LoginGoogle from '$lib/LoginGoogle.svelte'
  import { hasFetchedUser } from '/src/store.js'
  import { onMount } from 'svelte'
  import { getAuth, signInAnonymously } from "firebase/auth";

  let isSigningIn

  onMount(() => {

  })

  function createTemporaryDemoAccount () {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        alert("Welcome! You are about to be redirected to the demo. If at any point you want to return to the home page, just click the tree logo on the top left.")
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

<style>
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
</style>