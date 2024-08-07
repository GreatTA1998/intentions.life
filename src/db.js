// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOVm0X6UUQQcftXf066z_0hFk497j4dNY",
  authDomain: "project-y-2a061.firebaseapp.com",
  projectId: "project-y-2a061",
  storageBucket: "project-y-2a061.appspot.com",
  messagingSenderId: "132745397287",
  appId: "1:132745397287:web:b34052fb4683bc85e73a02",
  measurementId: "G-EZSLE84PYQ",
};


//TODO: implement env
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app) // `app` technically only necessary if we have multiple projects associated with one app
