import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth"; // 🔥 Auth & Profile Updates
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; // 🧾 Firestore Docs
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration (Ensure .env variables are correctly set)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth & Firestore
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); // Ensure persistence across reloads
const db = getFirestore(app); // Firestore DB instance

// Initialize Analytics only if supported
let analytics;
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported on this platform.");
  }
});

// Export Firebase utilities and functions
export {
  app,
  auth,
  db,
  analytics,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  updateProfile,
};
