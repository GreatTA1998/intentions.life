import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../../back-end/firestoreConnection";
import User from "../../back-end/User";

export const handleNotificationPermission = (user) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      alert(
        "If you dont recive a test notification, check out your system and browser settings to make sure notifications are turned on"
      );
      handleFCMToken(user);
    } else {
      alert(
        "turn on notifications! (check chrome and Mac notification settings)"
      );
    }
  });
};

async function handleFCMToken({ uid, FCMTokens }) {
  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_PUBLIC_MESSAGING_VAPID_KEY,
  }).catch((err) =>
    console.error("An error occurred while retrieving token. ", err)
  );
  return !FCMTokens.includes(token)
    ? User.addFMCToken(uid, token).catch((err) =>
        console.error("error in addFMCToken, ", err)
      )
    : token;
}

export const handleSW = async () => {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
  onMessage(messaging, (payload) => {
    console.log("Message received in foreground. ", payload);
  });
};
