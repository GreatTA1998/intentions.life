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

    <div style="display: flex">
      {#if openPlaidLinkUI}
        <!-- Don't use implicit arguments, or you'll get silent effects
          Make everything explicit
        -->
        <button on:click={() => openPlaidLinkUI()}>
          Link additional card
        </button>
      {/if}

      <button on:click={getTrueBalance}>Fetch overall balance</button>

      {#if openPlaidLinkUIUpdateMode}
        <button on:click={() => openPlaidLinkUIUpdateMode()}>
          Quickly refresh login
        </button>
      {/if}
    </div>


    <div>
      <h2>
        Card accounts
      </h2>
      {#each $user.cardAccounts as cardAccount}
        <div>
          {cardAccount.creditOrDebit} {cardAccount.account_id}
        </div>
        {#if cardAccount.creditOrDebit === 'credit'}
        <div>
          credit balance: {creditBalance}
        </div>
        {:else if cardAccount.creditOrDebit === 'depository' && debitBalance}
          debit balance: ${debitBalance}
        {/if}      

        <button on:click={() => fetchCreditOrDebitTransactions({ 
          access_token: cardAccount.access_token, 
          account_id: cardAccount.account_id,
          creditOrDebit: cardAccount.creditOrDebit
        })}
        >
          Get transactions for this card
        </button>

        {#if debitCardTransactions && cardAccount.creditOrDebit === 'depository'}
          {#each debitCardTransactions as transaction}
            <div>-{transaction.amount}: {transaction.merchant_name ? transaction.merchant_name : transaction.name}, {transaction.date}</div>
          {/each}
        {/if}
      {/each}
    </div>

    {#if !accounts || !transactions}
      <FinancePopupLoadingIndicator/>
    {/if}

    {#if trueBalance !== null}
      <div style="margin-left: 50px; margin-top: 20px;">
        <div style="font-family: sans-serif; font-size: 5rem;">
          {trueBalance}
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
    {:else if $user.plaidAccessToken && $user.plaidItemID}
      <button on:click={() => checkRecentTransactions($user.plaidAccessToken)}>
        Fetch transactions
      </button>
    {/if}
  </div>
{/if}

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js'
import { getFunctions, httpsCallable } from "firebase/functions"
import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore'
import { user } from '/src/store.js'
import FinancePopupLoadingIndicator from './FinancePopupLoadingIndicator.svelte'

export let isOpen = false

const functions = getFunctions();
const dispatch = createEventDispatcher()
let openPlaidLinkUI = null 
let openPlaidLinkUIUpdateMode = null 

let totalMoneyLeft = null
let accounts = null
let transactions = null

$: if (accounts) {
  totalMoneyLeft = 0
  for (const account of accounts) {
    totalMoneyLeft += account.balances.available
  }
}

$: console.log('$user changed in finance popup =', $user)

onMount(async () => {
  if ($user.plaidAccessToken && $user.plaidItemID) {

  } 
  await preparePlaidLinkUI()
  if (!$user.plaidAccessToken && !$user.plaidItemID) {
    openPlaidLinkUI()
  }
})

const backendURL = 'http://localhost:8000' // 'https://koa-test-1-ef0d40104d58.herokuapp.com'

async function getInitialPlaidLinkToken () {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(backendURL + '/link/token/create') 
      if (response.ok) {
        const responseData = await response.json();
        resolve(responseData.link_token)      // EXAMPLE DATA: 
                                              // responseData := {
                                              //   "expiration": "2023-07-15T02:31:12Z",
                                              //   "link_token": "link-development-7805a359-c980-4a6c-ad87-e032d624b797",
                                              //   "request_id": "7VvHW4KL08w4YCE"
                                              // }
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })
}

async function getPermanentAccessToken (publicToken) {
  return new Promise(async (resolve) => {
    const response = await fetch(backendURL + '/item/public_token/exchange', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ publicToken })
    })
    if (response.ok) {
      const responseData = await response.json()
      resolve(responseData) // := {access_token: 'access-development-44835b3c-ae2a-4e7f-845e-b69ede333128', item_id: 'yKnMq5Nzw4fRRXK0YZaRIbepZYNbXJHOML7Y4'}
    }
  })
}

async function fetchAllAccountsWithBank (access_token) {
  return new Promise(async resolve => {
    const response = await fetch(backendURL + '/accounts/get', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ access_token })
    })
    if (response.ok) {
      const responseData = await response.json() 
      resolve(responseData)
    }
  })
}

async function preparePlaidLinkUI () {
  return new Promise(async (resolve) => {
    const link_token = await getInitialPlaidLinkToken()

    const { open } = initializePlaidUI(link_token, async (publicToken, metadata) => {
      const { access_token } = await getPermanentAccessToken(publicToken)
      const accounts = await fetchAllAccountsWithBank(access_token)
      
      // [{ type: , account_id } ...]
      // should see credit, debit, account_id, and store it with access token

      const userRef = doc(getFirestore(), '/users/' + $user.uid)

      for (const account of accounts) {
        await updateDoc(userRef, {
          cardAccounts: arrayUnion({ 
            account_id: account.account_id,
            creditOrDebit: account.type,
            access_token: access_token
          })
        })
      }

      // this function will mutate "global" variables within this file
      getTrueBalance()
    }) 
    
    // `open` refers to OPENING the Plaid UI element itself to start the loginflow
    openPlaidLinkUI = open
    resolve()
  })
}

function getBalance ({ access_token, account_id }) {
  return new Promise(async resolve => {
    const response = await fetch(backendURL + '/accounts/balance/get', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ access_token, account_id })
    })
    if (response.ok) {
      const responseData = await response.json() 
      console.log('getBalance response =', responseData)
      // then fix the frontend so it resolves the balance AMOUNT
      resolve(responseData.account)
    } else {
      console.log("should throw an error")
      updateModePlaidLinkForCreditCard(access_token)
      throw new Error('Login probably expired')
    }
  })
}

async function fetchCreditOrDebitTransactions ({ access_token, account_id, creditOrDebit }) {
  if (creditOrDebit === 'depository') {
    debitCardTransactions = await getTransactions({ access_token, account_id })
  } else if (creditOrDebit === 'credit') {
    creditCardTransactions = await getTransactions({ access_token, account_id })
  }
}

// helper function
function getTransactions ({ access_token, account_id }) {
  return new Promise(async resolve => {
    const response = await fetch(backendURL + '/accounts/transactions/sync', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ access_token, account_id })
    })
    if (response.ok) {
      const responseData = await response.json() 
      console.log('get transactions response =', responseData)
      // this will return ALL accounts associated with this bank (remember accessToken maps 1 on 1 to bank)
      
      // EXAMPLE OF WHAT IT LOOKS LIKE
      // { accounts: Array(2), total_transactions: 178, transactions: Arrray(100) }
      const cardSpecificTransactions = responseData.transactions.filter(
        transaction => transaction.account_id === account_id
      )
      resolve(cardSpecificTransactions)
    }
  })
}

// EXPERIMENT CODE TO FIGURE OUT HOW TO GET PLAID LINK UI TO WORK
// PROBABLY NEED A TRY CATCH BLOCK ON THE SERVER SO IT DOESN'T FREEZE
// WHEN THERE IS AN ERROR


// specifying the `access_token` in the config of plaid Link UI 
// is precisely how you tell it to be in update mode
async function updateModePlaidLinkForCreditCard (access_token) {
  const link_token = await getInitialPlaidLinkToken4(access_token)

  const { open } = initializePlaidUI(link_token, async (publicToken, metadata) => { 
    console.log("update mode flow finished and succeeded")
  })
  openPlaidLinkUIUpdateMode = open
}

async function getInitialPlaidLinkToken4 (access_token) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(backendURL + '/link/token/create', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ access_token })
      }) 
      if (response.ok) {
        const responseData = await response.json();
        resolve(responseData.link_token)      // EXAMPLE DATA: 
                                              // responseData := {
                                              //   "expiration": "2023-07-15T02:31:12Z",
                                              //   "link_token": "link-development-7805a359-c980-4a6c-ad87-e032d624b797",
                                              //   "request_id": "7VvHW4KL08w4YCE"
                                              // }
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })
}


function getTrueBalance () {
  console.log("getTrueBalace()")
  return new Promise(async (resolve) => {
    for (const cardAccount of $user.cardAccounts) {
      console.log("account =", cardAccount)
      // assumes there's one debit and one credit, for now
      if (cardAccount.creditOrDebit === 'depository') {
        const result = await getBalance({ access_token: cardAccount.access_token, account_id: cardAccount.account_id })
        console.log("debitResult =", result)
        debitBalance = result.balances.current
        console.log('debitBalance =', debitBalance)
      } else if (cardAccount.creditOrDebit === 'credit') {
        try {
          const result = await getBalance({ access_token: cardAccount.access_token, account_id: cardAccount.account_id })
          creditBalance = result.balances.current
          console.log("creditBalance =", creditBalance)
        } catch (error) {
          console.log("credit card login probably timed out")
          updateModePlaidLinkForCreditCard()
        }

      }
    } 
    resolve()
    // `trueBalance` will automatically update because it's $ reactive
  })
}

let trueBalance = null
let debitBalance = null
let creditBalance = null

let creditCardTransactions = [] 
let debitCardTransactions = [] 

$: {
  if (debitBalance !== null && creditBalance !== null) {
    trueBalance = debitBalance - creditBalance
  } 
}

async function checkAccountData (accessToken) {
  const fetchAccountData = httpsCallable(functions, 'fetchAccountData')
  const accountResult = await fetchAccountData({ accessToken })
  console.log("accountResult =", accountResult)
  console.log("account.data =", accountResult.data)
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

// `Plaid` is imported as a CDN on index.html
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