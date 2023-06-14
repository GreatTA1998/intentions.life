{#if isOpen}
  <div class="my-popup-window" use:clickOutside on:click_outside={() => dispatch('card-close')}>
    <div style="display: flex;">
      <h3 class="google-calendar-event-title"  style="margin-left: 50px; color: #323232;">
        My finance dashboard
      </h3>
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 10px; color: #323232;">
        close
      </span>
    </div>

    <!-- PLAID LINK --> 
    {#if openPlaidLinkUI}
      <button on:click={() => openPlaidLinkUI()}>Open Plaid Link</button>

      <button on:click={() => checkHowMuchMoneyLeft(ACCESS_TOKEN)}>Get balance</button>
    {/if}

    {#each accounts as account}
      {account.name} {account.balances.available}
    {/each}
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getTokenForPlaidLinkUI } from '/src/plaidHelpers.js'

export let isOpen = false

const functions = getFunctions();
const dispatch = createEventDispatcher()

// TO-DO:
//   1. createLinkToken () (you need the API keys, which is why they recommend using a server)
//   2. initialize the Link UI (call Plaid.create({})), see https://plaid.com/docs/link/web/
//   3. exchange the resulting public token from the user flow, and get a permanent access token (just copy the code from the quickstart)

// The actual calls to Plaid are from Cloud Functions, because 
// of security restrictions from Plaid not allowing client requests,
// and the fact that we use API secrets for Plaid that must not be run on 
// the browser, which are always considered as compromised

let openPlaidLinkUI = null
let accounts = [] 
let ACCESS_TOKEN = 'access-development-d8846a38-5ee5-478f-b597-afc6bf3586b0'

onMount(async () => {
  // auto fetch account balances
  if (ACCESS_TOKEN) {
    checkHowMuchMoneyLeft(ACCESS_TOKEN)
  }

  const result = await firebaseFunctionsVersion()
  const link_token = result.data.link_token
  console.log('link_token =', link_token)
  async function onLoginSuccessCallback (publicToken, metadata) {
    console.log('publicToken =', publicToken)
    const exchangePublicTokenForAccessToken = httpsCallable(functions, 'exchangePublicTokenForAccessToken')
    const result = await exchangePublicTokenForAccessToken({ publicToken })
    console.log('accessToken =', result.data.access_token)
    ACCESS_TOKEN = result.data.access_token
  }
  const { open } = initializePlaidUI(link_token, onLoginSuccessCallback) // `open` refers to OPENING the Plaid UI element itself to start the loginflow
  openPlaidLinkUI = open
})

async function checkHowMuchMoneyLeft (accessToken) {
  const getBalance = httpsCallable(functions, 'getBalance')
  const balanceResult = await getBalance({ accessToken })
  console.log("balanceResult =", balanceResult)
  accounts = balanceResult.data.accounts
}

async function firebaseFunctionsVersion () {
  return new Promise(resolve => {
    // STEP 1
    const functions = getFunctions();
    const createLinkToken = httpsCallable(functions, 'createLinkToken');
    console.log("calling the cloud function")
    createLinkToken({ })
      .then((result) => {
        console.log("result =", result)
        resolve(result) // result is an object with 3 properties: { expiration , link_token, request_id }
      });
  })
}

function initializePlaidUI (linkToken, onLoginSuccessCallback) {
  const handler = Plaid.create({
    token: linkToken,
    onSuccess: onLoginSuccessCallback,
    onLoad: () => {},
    onExit: (err, metadata) => {},
    onEvent: (eventName, metadata) => {},
    //required for OAuth; if not using OAuth, set to null or omit:
    // receivedRedirectUri: window.location.href,
  })
  return handler
}
</script>

<style>
  .blue-highlight {
    font-family: Roboto,Arial,sans-serif;
    font-size: 16px;
    background-color: none;
    color: #0085FF;
  }

  .my-popup-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;

    overflow-y: scroll;
    z-index: 5;
    width: 60%;
    height: 60%;
    min-width: 200px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
  }

  /* Refer to: https://stackoverflow.com/questions/3131072/how-to-change-input-text-box-style-to-line */
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;

    padding: 2px 0px;
  }

  .google-calendar-event-detail {
    font-family: Roboto,Arial,sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #6D6D6D;
  }

  *::-webkit-scrollbar {
    width: 0;
    background-color: #aaa; /* or add it to the track */
  }

  .google-calendar-event-time {
    font-family: serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #3c4043;
  }

  .google-calendar-event-title {
    font-family: Roboto,Arial,sans-serif;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: .2px;
    line-height: 20px;
    color: #6D6D6D;
  } 
</style>