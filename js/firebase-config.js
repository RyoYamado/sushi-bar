// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzgzSDcxuMFezjupYe2x93flh7C1Hye64",
  authDomain: "susi-bar.firebaseapp.com",
  databaseURL: "https://susi-bar-default-rtdb.firebaseio.com",
  projectId: "susi-bar",
  storageBucket: "susi-bar.firebasestorage.app",
  messagingSenderId: "32851424950",
  appId: "1:32851424950:web:9ef282498a0af7a99e1817",
  measurementId: "G-2W5FX7WBL6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files
window.firebaseApp = {
  app,
  auth,
  db
};
