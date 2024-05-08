// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-YnWpjk7oSlS5p5Pjdf1i9-i2ttUMX50",
  authDomain: "bank-app-662c8.firebaseapp.com",
  projectId: "bank-app-662c8",
  storageBucket: "bank-app-662c8.appspot.com",
  messagingSenderId: "816549980949",
  appId: "1:816549980949:web:74ea734d5ade21032bd71c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
