import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your actual Firebase configuration
// Get your config from: https://console.firebase.google.com/
// 1. Go to Project Settings > General
// 2. Scroll to "Your apps" section
// 3. Click on web app (</>) to get your config
const firebaseConfig = {
  apiKey: "AIzaSyC4wRVdPeQnVWcZjXiHh9MG_4X7kYVjKLo",
  authDomain: "kisanseva-plus.firebaseapp.com",
  projectId: "kisanseva-plus",
  storageBucket: "kisanseva-plus.firebasestorage.app",
  messagingSenderId: "478556744428",
  appId: "1:478556744428:web:a8e3f5d1b5c8e9f0d4a2b3"
};

let app;
let storage;

try {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw new Error("Firebase configuration is invalid. Please update firebase.ts with your actual Firebase credentials.");
}

export { storage };
