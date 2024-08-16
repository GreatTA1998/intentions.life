<slot {setIsPopupOpen}>

</slot>

{#if isPopupOpen}
  <div class="fullscreen-invisible-modular-popup-layer">
    <div class="detailed-card-popup" use:clickOutside on:click_outside={() => isPopupOpen = false}>
      <PhoneLogin/>
    </div>
  </div>
{/if}

<script>
  import { showSnackbar } from '/src/store.js'
  import { clickOutside } from '/src/helpers/everythingElse.js'
  import PhoneLogin from '$lib/PhoneLogin.svelte'


  let isPopupOpen = false

  function setIsPopupOpen ({ newVal }) {
    isPopupOpen = newVal
  }

  function copyEmailToClipboard () {
    navigator.clipboard.writeText("elton@explanations.app")
    showSnackbar.set(true)
    console.log('$showSnackbar =', $showSnackbar)
    setTimeout(() => showSnackbar.set(false), 3000)
  }
</script>

<style>
  .detailed-card-popup {
    position: fixed;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 58%;
    overflow-y: auto;
    z-index: 3;
    min-width: 360px;
    
    height: fit-content;

    padding: 24px;
    border-radius: 24px;
    background-color: white;
 
  /*    border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }

</style>