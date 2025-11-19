// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-delivery-83716.firebaseapp.com",
  projectId: "food-delivery-83716",
  storageBucket: "food-delivery-83716.firebasestorage.app",
  messagingSenderId: "358025873468",
  appId: "1:358025873468:web:bd1b64b80207d62b751b39",
  measurementId: "G-VLWM48PJEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app)
export {auth,app};