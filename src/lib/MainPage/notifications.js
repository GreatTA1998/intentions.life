import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../../back-end/firestoreConnection";
export const handleNotificationPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted. ");
    } else {
      console.error("permision rejected");
    }
  });
};

export const handleSW = () => {
  console.log("we are in handleSW");
  const messaging = getMessaging(app);

  getToken(messaging, {
    vapidKey: import.meta.env.VITE_PUBLIC_MESSAGING_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log("current token is", currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
    
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")

      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  } else {
    console.error("Service Worker not supported in this browser.");
  }

  onMessage(messaging, (payload) => {
    console.log('Message received in foreground. ', payload);
    
    // Customize notification here
    const notificationTitle = payload.notification.title || 'New Message';
    const notificationOptions = {
      body: payload.notification.body || 'You have a new message',
      icon: '/path/to/your/icon.png',
    };
  
    new Notification(notificationTitle, notificationOptions);
  });
};
