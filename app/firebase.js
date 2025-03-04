// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACYvgJBDY7SIzCBLkel41358kUExWFZzE",
  authDomain: "list-t0-d0.firebaseapp.com",
  projectId: "list-t0-d0",
  storageBucket: "list-t0-d0.appspot.com",
  messagingSenderId: "1090528687317",
  appId: "1:1090528687317:web:fc9ad9350d8fb537acde5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);
export { db }; // Export Firestore instance
