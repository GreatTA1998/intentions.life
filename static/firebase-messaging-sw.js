console.log('sw file')
messaging.getToken({ vapidKey: '<YOUR_PUBLIC_VAPID_KEY_HERE>' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

// import { getMessaging, getToken } from "firebase/messaging";
// import {app} from '../src/back-end/firestoreConnection'
// // Get registration token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// const messaging = getMessaging(app);
// getToken(messaging, {
//   vapidKey: import.meta.env.VITE_PUBLIC_MESSAGING_VAPID_KEY,
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//       console.log("current token is", currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//   });
