{#if isOpen}
  <div 
    class="my-popup-window" 
    use:clickOutside on:click_outside={() => dispatch('card-close')}
    style="padding-left: 12px;"
  >
    <div style="display: flex;">
      <span on:click={() => dispatch('card-close')} class="material-icons" style="margin-left: auto; margin-right: 10px; margin-top: 10px; color: #323232;">
        close
      </span>
    </div>

    <div style="display: flex; flex-wrap: wrap;">

      {#if $user.cardAccounts}
        <div class="dashboard-new-container">
          {#if trueBalance === null && !expired_access_token}
            <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
              Calculating overall balance...
            <!-- <FinancePopupLoadingIndicator color={'white'}/> -->
            </div>
          {:else if expired_access_token}
            <div style="margin-left: 50px;">
              Overall balance unavailable because re-login is needed for some accounts
            </div>
          {:else}
            <div style="font-size: 5rem; margin-left: 50px;">
              ${trueBalance}
            </div>
            
            <div style="margin-left: 50px;">
              Overall balance
            </div>
          {/if}
        </div>

        <!-- It looks like a Debit card, physically! -->
        {#each $user.cardAccounts as cardAccount}
          <!-- coral color: #ff7f50  goes well with Turqoise: https://artincontext.org/what-colors-go-with-turquoise/ -->
          <div class="dashboard-new-container" style="background-color: #F4F4F4; color: #000000;">
              <div>
                {cardAccount.creditOrDebit === 'depository' ? 'Debit' : 'Credit'} card
                <!-- {cardAccount.account_id} -->
              </div>

              {#if expired_access_token === cardAccount.access_token}
                <button on:click={() => preparePlaidLinkUI(expired_access_token)}>
                  Re-login required
                </button>
              {:else}
              
              {#if cardAccount.creditOrDebit === 'credit'}
                <div>
                  Credit usage: {creditBalance || 'Fetching credit balance...'}
                </div>
              {:else if cardAccount.creditOrDebit === 'depository'}
                <div>
                  Balance: {debitBalance || 'Fetching debit balance...'}
                </div>
              {/if}      

              {#if debitCardTransactions && cardAccount.creditOrDebit === plaidAccountTypes.DEBIT}
                <FinancePopupTransactionsUI transactions={debitCardTransactions}/>
              {:else if creditCardTransactions && cardAccount.creditOrDebit === plaidAccountTypes.CREDIT}
                <FinancePopupTransactionsUI transactions={creditCardTransactions}/>
              {:else if savingsTransactions && cardAccount.creditOrDebit === plaidAccountTypes.SAVINGS}
                <FinancePopupTransactionsUI transactions={savingsTransactions}/>
              {/if}
            {/if}
          </div>
        {/each}
      {/if}

      <!-- This is always visible because it's not included in the {if} statement -->
      <button on:click={() => preparePlaidLinkUI()} style="margin-left: 24px;">
        Add new card
      </button>
    </div>
    <!-- End of flexbox -->
  </div>
{/if}

<script>
// SIMPLIFYING ASSUMPTIONS: exactly 1 credit, debit and savings account

// TO-DO: 
//    1. support depositories
//    2. 
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import _ from 'lodash'
import { getDateOfToday, getRandomID, clickOutside } from '/src/helpers.js'
import { getFunctions, httpsCallable } from "firebase/functions"
import { updateDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore'
import { user } from '/src/store.js'
import FinancePopupLoadingIndicator from './FinancePopupLoadingIndicator.svelte'
import FinancePopupTransactionsUI from './FinancePopupTransactionsUI.svelte'
import { dev } from '$app/environment';

export let isOpen = false

// simulate an Enum
const plaidAccountTypes = {
  DEBIT: 'depository',
  CREDIT: 'credit',
  SAVINGS: 'investment'
}

const functions = getFunctions();
const dispatch = createEventDispatcher()
let openPlaidLinkUI = null 

let accounts = null
let transactions = null

let expired_access_token = '' // CURRENTLY ONLY CREDIT CARDS EXPIRE

$: console.log('$user changed in finance popup =', $user)

onMount(async () => {
  if (!$user.cardAccounts) return 

  getTrueBalance() // this will fetch balances from all cards
  for (const account of $user.cardAccounts) {
    const { access_token, account_id, creditOrDebit } = account
    fetchCreditOrDebitTransactions({ access_token, account_id, creditOrDebit })
  }
})

let trueBalance = null

let debitBalance = null
let creditBalance = null
let savingsBalance = null

let creditCardTransactions = [] 
let debitCardTransactions = [] 
let savingsTransactions = [] 

$: {
  if (debitBalance !== null && creditBalance !== null && savingsBalance !== null) {
    trueBalance = debitBalance - creditBalance + savingsBalance
  } 
  // quickfix 
  else if (debitBalance !== null && creditBalance !== null) {
    trueBalance = debitBalance - creditBalance
  }
}

const isTestingBackend = false

const backendURL = dev && isTestingBackend ? 'http://localhost:8000' : 'https://koa-test-1-ef0d40104d58.herokuapp.com'

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

async function preparePlaidLinkUI (access_token = '') {
  return new Promise(async (resolve) => {
    console.log("access_token param =", access_token)
    let link_token 
    if (!access_token) {
      link_token = await getInitialPlaidLinkToken()
    } else {
      console.log("update mode")
      link_token = await getInitialPlaidLinkTokenUpdateMode()
    }
    const { open } = initializePlaidUI(link_token, async (publicToken, metadata) => {
      const { access_token } = await getPermanentAccessToken(publicToken)
      const accounts = await fetchAllAccountsWithBank(access_token)
      
      // [{ type: , account_id } ...]
      // should see credit, debit, account_id, and store it with access token

      const userRef = doc(getFirestore(), '/users/' + $user.uid)

      for (const account of accounts) {
        // skip over accounts we already saved
        // TURNS OUT FOR CREDIT CARDS, EACH ACESS_TOKEN AND ACCOUNT_ID SEEM TO BE 
        // UNIQUE EVEN THOUGH THE CARD IS THE SAME
        if ($user.cardAccounts) {
                 
          const duplicates = $user.cardAccounts.filter(cardAccount => cardAccount.account_id === account.account_id)
          if (duplicates.length > 0) {
            continue
          }

          let cardAccountsCopy = [...$user.cardAccounts] 
      
          // if a debit card is uploaded, then invalidate the old debit card (they're expired and need to be garbage collected)
          // same with credit and savings accounts 
          // Note: `account.type`: Plaid labels it as 'depository', 'credit' and 'investment'
          const nonexpiredAccounts = cardAccountsCopy.filter(
            cardAccount => cardAccount.creditOrDebit !== account.type 
          )
          await updateDoc(userRef, {
            cardAccounts: nonexpiredAccounts
          })
        }
        
        // now add the newly added account (which can be credit card)
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
    // openPlaidLinkUI = open
    open()

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

    // TO-DO: automatically open Plaid Link in update mode
    // when a particular error (re-authentication needed) is thrown
    // configure the server to throw the error correctly,

    if (response.ok) {
      const responseData = await response.json() 
      console.log('getBalance response =', responseData)
      // then fix the frontend so it resolves the balance AMOUNT
      resolve(responseData.account)
    } else {
      console.log("assume it's just re-auth error")
      // preparePlaidLinkUI(access_token)
      expired_access_token = access_token



      // updateModePlaidLinkForCreditCard(access_token)
      // throw new Error('Login probably expired')
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


async function getInitialPlaidLinkTokenUpdateMode (access_token) {
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
        debitBalance = result.balances.current
      } 
      else if (cardAccount.creditOrDebit === 'credit') {
        const result = await getBalance({ access_token: cardAccount.access_token, account_id: cardAccount.account_id })
        creditBalance = result.balances.current
      } 
      else if (cardAccount.creditOrDebit === 'investment') {
        const result = await getBalance({ access_token: cardAccount.access_token, account_id: cardAccount.account_id })
        savingsBalance = result.balances.current
      }
    } 
    resolve()
    // `trueBalance` will automatically update because it's $ reactive
  })
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
    width: 80%;
    height: 80%;
    min-width: 200px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 6px;
    border: 1px solid #000;
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

  .dashboard-new-container {
    margin-left: 25px;
    margin-top: 20px; 

    padding-left: 24px; 
    padding-right: 24px;

    border-radius: 20px; 
    background-color: #0085FF; 
    width: 100%; 
    max-width: 610px; 
    min-width: 400px;
    padding-top: 24px; 
    padding-bottom: 24px; 
    height: 250px;
    font-family: sans-serif;
    color: white;
    overflow-y: auto;
  }
</style>