import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  isKycVerified: boolean;
  profileImage?: string;
  documentUrl?: string;
  loginTime?: any;
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  setupRecaptcha: (containerId: string) => RecaptchaVerifier;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        setIsAuthenticated(true);
        
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
          
          // Update login time
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            loginTime: serverTimestamp()
          });
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setupRecaptcha = (containerId: string) => {
    return new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
  };

  const login = async (phoneNumber: string, userData: Partial<User> = {}) => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);
    
    const userDocData: User = {
      id: userId,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phoneNumber,
      address: userData.address || '',
      isKycVerified: userData.isKycVerified || false,
      profileImage: userData.profileImage,
      documentUrl: userData.documentUrl,
      loginTime: serverTimestamp(),
      createdAt: serverTimestamp()
    };

    await setDoc(userRef, userDocData, { merge: true });
    setUser(userDocData);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, userData);
    
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      isAuthenticated,
      login,
      logout,
      updateUser,
      setupRecaptcha
    }}>
      {children}
    </AuthContext.Provider>
  );
};