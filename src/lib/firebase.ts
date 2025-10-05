import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEMkL8L6xKJqZ9vXQwE_dummy_key_replace",
  authDomain: "kisanseva-plus.firebaseapp.com",
  projectId: "kisanseva-plus",
  storageBucket: "kisanseva-plus.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:dummy_app_id_replace"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
