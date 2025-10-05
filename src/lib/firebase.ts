import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// FIREBASE CONFIGURATION INSTRUCTIONS:
// 
// 1. Go to Firebase Console: https://console.firebase.google.com/
// 2. Select your project (kisanseva-plus)
// 3. ENABLE FIREBASE STORAGE:
//    - Click "Build" > "Storage" in left sidebar
//    - Click "Get Started" and follow the setup wizard
//    - Choose a location (preferably near your users)
// 
// 4. CONFIGURE STORAGE RULES:
//    - In Storage, go to "Rules" tab
//    - Replace default rules with:
//    
//    rules_version = '2';
//    service firebase.storage {
//      match /b/{bucket}/o {
//        match /kyc-documents/{userId}/{allPaths=**} {
//          allow read, write: if true; // For testing - make more restrictive in production
//        }
//      }
//    }
//    - Click "Publish"
//
// 5. Get your Firebase config from Project Settings > General > Your apps
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
