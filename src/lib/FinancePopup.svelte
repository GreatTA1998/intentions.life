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

    {#if !accounts || !transactions}
      <FinancePopupLoadingIndicator/>
    {/if}

    {#if totalMoneyLeft !== null}
      <div style="margin-left: 50px; margin-top: 20px;">
        <div style="font-family: sans-serif; font-size: 5rem;">
          {totalMoneyLeft}
        </div>
        <div style="font-family: sans-serif;">
          Total balance remaining
        </div>
      </div>
    {/if}

    <div style="margin-bottom: 30px"></div>

    {#if accounts}
      <div style="display: flex; margin-left: 50px;">
        {#each accounts as account}
          <div style="margin-right: 20px;">
            <div style="font-family: sans-serif; font-size: 2rem;">
              {account.balances.available}
            </div>
            <div style="font-family: sans-serif;">
              {account.name}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if transactions}
      <div style="margin-left: 50px; margin-top: 50px; overflow-y: auto;">
        <div style="font-family: sans-serif; font-size: 2rem; color: grey;">
          Recent transactions
        </div>
        {#each transactions as transaction}
          <div style="display: flex; flex-wrap: nowrap;">
            {#if transaction.amount > 0}
              <div 
              style="font-size: {0.5 + (0.012 * transaction.amount)}rem; font-family: sans-serif;
                color: red;
                white-space: nowrap;
              "
              >
              -{transaction.amount}: {transaction.merchant_name ? transaction.merchant_name : transaction.name}, {transaction.date}
              </div>
            {:else}
              <div 
              style="font-size: {0.5 + (-1 * 0.012 * transaction.amount)}rem; font-family: sans-serif;
                color: green;
                white-space: nowrap;
              "
              >
                <!-- remove negative sign -->
              +{-1 * transaction.amount}: {transaction.merchant_name ? transaction.merchant_name : transaction.name}, {transaction.date}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js'
import { getFunctions, httpsCallable } from "firebase/functions"
import { updateDoc, doc, getFirestore } from 'firebase/firestore'
import { user } from '/src/store.js'
import FinancePopupLoadingIndicator from './FinancePopupLoadingIndicator.svelte'

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

let totalMoneyLeft = null
let accounts = null
let transactions = null
// let ACCESS_TOKEN =  'access-development-d8846a38-5ee5-478f-b597-afc6bf3586b0'

$: if (accounts) {
  totalMoneyLeft = 0
  for (const account of accounts) {
    totalMoneyLeft += account.balances.available
  }
}

$: console.log('$user changed in finance popup =', $user)

onMount(async () => {
  if ($user.plaidAccessToken) {
    checkHowMuchMoneyLeft($user.plaidAccessToken)
    checkRecentTransactions($user.plaidAccessToken)
  } else {
    openPlaidLinkUI()
  }
})

async function openPlaidLinkUI () {
  const result = await getLinkToken()
  const link_token = result.data.link_token

  const { open } = initializePlaidUI(link_token, async (publicToken, metadata) => {
    const exchangePublicTokenForAccessToken = httpsCallable(functions, 'exchangePublicTokenForAccessToken')
    const result = await exchangePublicTokenForAccessToken({ publicToken })
    
    // save access token with user
    const userRef = doc(getFirestore(), `users/${$user.uid}`)
    await updateDoc(userRef, {
      plaidAccessToken: result.data.access_token
    })

    checkHowMuchMoneyLeft(result.data.access_token)
    checkRecentTransactions(result.data.access_token)
  }) 
  
  // `open` refers to OPENING the Plaid UI element itself to start the loginflow
  open()
}

async function checkRecentTransactions (accessToken) {
  const getTransactions = httpsCallable(functions, 'getTransactions')
  const transactionsResult = await getTransactions({ accessToken })
  transactions = transactionsResult.data.transactions
}

async function checkHowMuchMoneyLeft (accessToken) {
  const getBalance = httpsCallable(functions, 'getBalance')
  const balanceResult = await getBalance({ accessToken })
  accounts = balanceResult.data.accounts
}

async function getLinkToken () {
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
    width: 90%;
    height: 90%;
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