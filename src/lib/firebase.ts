import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ⚠️ REPLACE THESE WITH YOUR REAL FIREBASE CONFIG
// Get these from: Firebase Console → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: "AIzaSyApcnCTTwevONlDk0a5UlSitZ3FSJsPMcI",
  authDomain: "dezingo-b328a.firebaseapp.com",
  projectId: "dezingo-b328a",
  storageBucket: "dezingo-b328a.firebasestorage.app",
  messagingSenderId: "808603782615",
  appId: "1:808603782615:web:e88b3c8efd2898af8b8f92",
  measurementId: "G-DP0153E63C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Request additional scopes for user profile
googleProvider.addScope("profile");
googleProvider.addScope("email");

// Force the standard Google account chooser popup
googleProvider.setCustomParameters({
  prompt: "select_account",
});
