// client/src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM4Ng-TpKO6LwA1rakIuCvS6QGbYiOJ9M",
  authDomain: "air-quality-forecast-1ba80.firebaseapp.com",
  projectId: "air-quality-forecast-1ba80",
  storageBucket: "air-quality-forecast-1ba80.firebasestorage.app",
  messagingSenderId: "715939972194",
  appId: "1:715939972194:web:b595e5caed01afee1abd3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
