/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions = require("firebase-functions") 
const { onCall } = require("firebase-functions/v2/https");
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid')
// const { PLAID_CLIENT_ID, PLAID_SECRET } = require('./.secrets.js')

const PLAID_CLIENT_ID = '60a82f4b2dd19f0010a1abd3'
const PLAID_SECRET = '0f281a6c787cb66c211224dcb9bc50'

const PLAID_PRODUCTS = 'auth,transactions,balance'

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

console.log('configuration =', configuration)
const client = new PlaidApi(configuration);
console.log('client =', client)

const plaidClient = client

async function createLinkToken () {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id',
    },
    client_name: 'Plaid Quickstart',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
  };
  const createTokenResponse = await client.linkTokenCreate(configs)
  console.log("createTokenResponse =", createTokenResponse)
}

exports.createLinkToken = functions.https.onCall((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  console.log('calling createLinkToken()')
  createLinkToken()
})


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

