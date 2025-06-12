import { initializeApp, getApps } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// -------------------------------------------
// Analytics App
const analyticsFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize only if not already initialized
const analyticsConfig =
  getApps().find((app) => app.name === "[DEFAULT]") ||
  initializeApp(analyticsFirebaseConfig);

export const analyticsFirestore = getFirestore(analyticsConfig);

// -------------------------------------------
// Authenticator App
const authenticatorFirebaseConfig = {
  apiKey: import.meta.env.VITE_AUTH_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_AUTH_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_AUTH_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_AUTH_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_AUTH_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_AUTH_FIREBASE_MEASUREMENTID,
};

export const authenticatorConfig =
  getApps().find((app) => app.name === "AUTHENTICATOR") ||
  initializeApp(authenticatorFirebaseConfig, "AUTHENTICATOR");

// update user details based on auth state
onAuthStateChanged(getAuth(authenticatorConfig), (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify({ uid: user.uid }));
  } else {
    localStorage.removeItem("user");
  }
});

export const authenticatorApp = getAuth(authenticatorConfig);
export const authenticatorFirestore = getFirestore(authenticatorConfig);
