import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth"; // 🔥 Auth & Profile Updates
import { getFirestore, doc, setDoc } from "firebase/firestore"; // 🧾 Firestore Docs
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration
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
const db = getFirestore(app); //  Firestore DB instance

// Only run analytics if it's supported
let analytics;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

// Export everything you need 
export {
  app,
  auth,
  db,
  analytics,
  doc,
  setDoc,
  updateProfile
};
