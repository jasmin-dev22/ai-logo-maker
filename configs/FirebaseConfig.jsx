// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-maker-ae124.firebaseapp.com",
  projectId: "ai-logo-maker-ae124",
  storageBucket: "ai-logo-maker-ae124.firebasestorage.app",
  messagingSenderId: "319820866213",
  appId: "1:319820866213:web:c44048e9cc2d62c2e1a34c",
  measurementId: "G-KZSWMVJ40H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);