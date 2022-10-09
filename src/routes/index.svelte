{#if hasFetchedUser}
  <div id="background-image-holder" style="font-family: sans-serif; height: 100vh; display: flex; justify-content: center; align-items: center;">
    <div style="background-color: white; width: 50vw; min-width: 200px; height: 70vh; border-radius: 10px;">
      <h1 style="margin-left: 60px; font-family: sans-serif; color: #1b1b1b; font-size: 4rem;">
        Life Organizer
      </h1>

      <div style="display: flex; align-items: center; margin-left: 60px; margin-right: 60px;">
        <a on:click={() => goto('GxBbopqXHW0qgjKEwU4z')} style="margin-right: 40px;">
          Play around
        </a>

        <a on:click={() => isSigningIn = true}>
          Sign in
        </a>
        <!-- <div style="margin-left: 10px;">
          or sign-in with phone
        </div> -->
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
  import { hasFetchedUser } from '../store.js'
  import { onMount } from 'svelte'

  let isSigningIn

  onMount(() => {
    let bgImageURLs = [
      'https://i.imgur.com/ShnqIpJ.jpeg', // airships 
      // 'https://i.imgur.com/rzkUMW8.jpeg', // cute monsters
    ]
    let chosenBgImageURL
    chosenBgImageURL = bgImageURLs[getRandomInt(2)]
    const div = document.getElementById("background-image-holder")
    div.style['background-image'] = `url(${chosenBgImageURL})`
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
</script>

<style>
#background-image-holder {
  background-repeat: no-repeat;
  background-size: 100% 100%;
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