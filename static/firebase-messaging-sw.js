importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCOVm0X6UUQQcftXf066z_0hFk497j4dNY",
  authDomain: "project-y-2a061.firebaseapp.com",
  projectId: "project-y-2a061",
  storageBucket: "project-y-2a061.appspot.com",
  messagingSenderId: "132745397287",
  appId: "1:132745397287:web:b34052fb4683bc85e73a02",
  measurementId: "G-EZSLE84PYQ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
let lastNotificationTimestamp = 0;


firebase.messaging().onBackgroundMessage((payload) => {
  console.log('onBackgroundMessage', payload);

  const currentTime = Date.now();
  if (currentTime - lastNotificationTimestamp < 5000) {
    console.log('Duplicate notification prevented');
    return;
  }

  const notificationTitle = payload.notification.title || 'New Message';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new message',
    icon: payload.notification.icon || '%sveltekit.assets%/trueoutput-square.png',
    tag: 'notification-tag', 
    data: payload.data 
  };
  
  lastNotificationTimestamp = currentTime;
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(payload.data.url));
});


