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
      console.log("Notification permission granted. ");
      const messaging = getMessaging(app);
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
