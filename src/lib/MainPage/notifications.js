import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
} from "firebase/messaging";
import { app } from "../../back-end/firestoreConnection";
console.log('what the wholy fuck is going on')
export const handleNotificationPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted. 32!!!!!!!!!!!!!!!!");
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_PUBLIC_MESSAGING_VAPID_KEY,
      })
        .then((fetchedToken) => {
          // Store the received token
          console.log("out token is:", fetchedToken);
        })
        .catch((error) => {
          // Handle any errors in fetching the token
          console.error("Error fetching token:", error);
        });
    } else {
      console.error("permision rejected");
    }
  });
};

export const handleSW = () => {
  setTimeout(() => {
    console.log("we are in handleSW");
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
  },3000)
};
