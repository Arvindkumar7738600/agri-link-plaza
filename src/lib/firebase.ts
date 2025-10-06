import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBU4Sg5eN2ElufEFHX0YEFaSk9Ti8H5mHo",
  authDomain: "kisansevaplus.firebaseapp.com",
  projectId: "kisansevaplus",
  storageBucket: "kisansevaplus.firebasestorage.app",
  messagingSenderId: "204645723011",
  appId: "1:204645723011:web:664b69efef234e5469a4b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
