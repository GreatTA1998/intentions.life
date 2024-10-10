import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../../back-end/firestoreConnection";
import User from "../../back-end/User";

export const handleNotificationPermission = (user) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      handleFCMToken(user);
    } else {
      alert(
        "turn on notifications! (check chrome and Mac notification settings)"
      );
    }
  });
};

async function handleFCMToken({ uid, FCMTokens }) {
  const messaging = await getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_PUBLIC_MESSAGING_VAPID_KEY,
  }).catch((err) =>
    console.error("An error occurred while retrieving token. ", err)
  );
  if(!FCMTokens || !FCMTokens.includes(token)){
    return User.addFCMToken(uid, token).catch((err) =>
      console.error("error in addFCMToken, ", err)
    )
  } else{
    return token;
  } ;
}

export const handleSW = async () => {
  const messaging = await getMessaging(app);


  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
    
  let lastNotificationId = null;

  onMessage(messaging, (payload) => {
    const notificationId = payload.data?.notificationId || Date.now().toString();
    if (notificationId === lastNotificationId) {
      console.error('Duplicate notification received, ignoring.');
      return;
    }
    lastNotificationId = notificationId;
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon || '%sveltekit.assets%/trueoutput-square.png',
      data: { url: payload.data?.click_action || '/'}
     };
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(notificationTitle, notificationOptions);
      notification.onclick = function(event) {
        event.preventDefault();
        window.open(notification.data.url, '_blank');
        notification.close();
      };
    }

  });
};
