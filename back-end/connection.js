// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  addDoc,
  writeBatch,
} from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigIntentions = {
    apiKey: "AIzaSyCOVm0X6UUQQcftXf066z_0hFk497j4dNY",
    authDomain: "project-y-2a061.firebaseapp.com",
    projectId: "project-y-2a061",
    storageBucket: "project-y-2a061.appspot.com",
    messagingSenderId: "132745397287",
    appId: "1:132745397287:web:b34052fb4683bc85e73a02",
    measurementId: "G-EZSLE84PYQ",
}

const firebaseConfig3 = {
  apiKey: "AIzaSyCEYvXGfdbo_VL9xviDBOxQt9cG0eBGFOg",
  authDomain: "data-test3-cffaa.firebaseapp.com",
  projectId: "data-test3-cffaa",
  storageBucket: "data-test3-cffaa.appspot.com",
  messagingSenderId: "818614237096",
  appId: "1:818614237096:web:8c77c7cdac6cc046430f9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfigIntentions);

const db = getFirestore(app, 'tokyo-db');
export default db;
