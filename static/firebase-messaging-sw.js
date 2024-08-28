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


// Optional: Add background message handler
firebase.messaging().onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title || 'New Message';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new message',
    icon: '/path/to/your/icon.png', // Replace with the path to your icon
    badge: '/path/to/your/badge.png', // Optional: URL to a badge image
    tag: 'notification-tag', // Helps in replacing an existing notification
    data: payload.data // Optional: Any data you want to pass to the notification click handler
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();

  // This call will focus on the tab or open a new one if the app isn't open
  event.waitUntil(clients.openWindow('https://intentions-life-git-live-testing-https-fuck-it-just-pay-money.vercel.app'));
});
