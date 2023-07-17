/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 * 
 * https://cloud.google.com/functions/docs/monitoring/error-reporting
 * 
 */


// gcloud beta functions logs read getBalance --limit 50

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions") 
const { onCall } = require("firebase-functions/v2/https");
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid')
// const { PLAID_CLIENT_ID, PLAID_SECRET } = require('./.secrets.js')

// SETUP CODE SHARED BY FUNCTIONS
const PLAID_CLIENT_ID = '60a82f4b2dd19f0010a1abd3'
const PLAID_SECRET = 'b86a3e600550c25c233aee0c30dce9'

const PLAID_PRODUCTS = ['transactions'] // I think 'transactions' work as well, but not 'balance'
const PLAID_COUNTRY_CODES = ['US','CA']

const configuration = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
})

const client = new PlaidApi(configuration);
// END OF SETUP CODE


// FOR UPDATE MODE, YOU NEED

// OAUTH MODE

exports.createLinkToken = functions.https.onCall(async (request, response) => {
  console.log('calling createLinkToken()')
  const configs = {
    user: {
      client_user_id: 'user-id',
    },
    client_name: 'Organize-life',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',

    // testing if user can add multiple acccounts
    update: {
      account_selection_enabled: true
    }
  };
  const createTokenResponse = await client.linkTokenCreate(configs)
  return createTokenResponse.data 
})

exports.exchangePublicTokenForAccessToken = functions.https.onCall(async (data, context) => {
  const { publicToken } = data
  console.log('publicToken =', publicToken)
  const tokenResponse = await client.itemPublicTokenExchange({
    public_token: publicToken
  })

  const ACCESS_TOKEN = tokenResponse.data.access_token;
  const ITEM_ID = tokenResponse.data.item_id;
  return {
    access_token: ACCESS_TOKEN,
    item_id: ITEM_ID,
    error: null
  }
})

exports.fetchAccountData = functions.https.onCall(async (data, context) => {
  const ACCESS_TOKEN = data.accessToken
  const accountsResponse = await plaidClient.getAccounts({
    accessToken: ACCESS_TOKEN
  });
  return accountsResponse.data
})


exports.getBalance = functions.https.onCall(async (data, context) => {
  const ACCESS_TOKEN = data.accessToken
  const balanceResponse = await client.accountsBalanceGet({
    access_token: ACCESS_TOKEN,
  })
  return balanceResponse.data
})


// https://plaid.com/docs/errors/item/#product_not_ready
// might need to wait for the "event" / "webhook" 
//   - we did initialize with 'transactions' product
//   - might listen to the 'INITIAL_UPDATE webhook
exports.getTransactions = functions.https.onCall(async (data, context) => {
  const ACCESS_TOKEN = data.accessToken

  // Get today's date in YYYY-MM-DD format https://stackoverflow.com/a/29774197/7812829
  // note it's converted to UTC time, so the date can be +- 1 day
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  now.toISOString().substring(0,10); // This is a cleaner alternative, since it reminds you that YYYY-MM-DD are the first ten characters of the complete iso format – 
  const thisMonthDateInYYYYMMDD = now.toISOString().substring(0,10)

  // get last month https://stackoverflow.com/a/50098236/7812829
  now.setDate(0) // 0 will result in the last day of the previous month
  now.setDate(1)
  const lastMonthDateInYYYYMMDD = now.toISOString().substring(0,10)

  const response = await client.transactionsGet({
    access_token: ACCESS_TOKEN,
    start_date: lastMonthDateInYYYYMMDD,
    end_date: thisMonthDateInYYYYMMDD, // YYYY-MM-DD
    // options: {
    //   include_personal_finance_category: true
    // }
  });
  let transactions = response.data.transactions;
  const total_transactions = response.data.total_transactions;
  return response.data
})

// TO-DO
//  - Figure out how to what part of the code is responsible for the Plaid Link UI 
//  - Trade the link token for a public token 
//  - Trade the public token for an access token which you store on Firebase or hard-code in your codebase
//  - Fix the hover and indentation issue for creating new sub-tasks
//  - Implement hour, day, week, month modes properly
//  - Fix infinite bugs


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

