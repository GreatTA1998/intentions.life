const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.VITE_PUBLIC_FIREBASE_API,
  authDomain: "project-y-2a061.firebaseapp.com",
  projectId: "project-y-2a061",
  storageBucket: "project-y-2a061.appspot.com",
  messagingSenderId: "132745397287",
  appId: "1:132745397287:web:b34052fb4683bc85e73a02",
  measurementId: "G-EZSLE84PYQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "tokyo-db");

module.exports = { app, db };