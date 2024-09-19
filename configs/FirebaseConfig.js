// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ipydTq68841mGoN2oxfQJnZXBijUqWs",
  authDomain: "closet-e.firebaseapp.com",
  projectId: "closet-e",
  storageBucket: "closet-e.appspot.com",
  messagingSenderId: "618328534581",
  appId: "1:618328534581:web:748265459e9e3a36264b7c",
  measurementId: "G-W2WB724SD5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);