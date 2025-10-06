import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  signupTime: Timestamp;
  isKycVerified: boolean;
  documentUrl: string;
}

export const saveUserToFirestore = async (
  userId: string,
  userData: Omit<UserData, 'signupTime'>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await setDoc(userRef, {
      ...userData,
      signupTime: Timestamp.now(),
    });
    
    console.log('User data saved to Firestore successfully');
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw new Error('Failed to save user data to Firestore');
  }
};
