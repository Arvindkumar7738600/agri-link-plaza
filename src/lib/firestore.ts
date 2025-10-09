import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
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
    }, { merge: true });
    
    console.log('User data saved to Firestore successfully');
  } catch (error: any) {
    console.error('Error saving user to Firestore:', error);
    throw new Error(error?.message || 'Failed to save user data to Firestore');
  }
};

export const getUserFromFirestore = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    console.error('Error getting user from Firestore:', error);
    throw new Error(error?.message || 'Failed to get user data from Firestore');
  }
};

export const updateUserInFirestore = async (
  userId: string,
  userData: Partial<Omit<UserData, 'signupTime' | 'phoneNumber'>>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, userData);
    
    console.log('User data updated in Firestore successfully');
  } catch (error: any) {
    console.error('Error updating user in Firestore:', error);
    throw new Error(error?.message || 'Failed to update user data in Firestore');
  }
};

export interface EnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  submittedAt: Timestamp;
}

export const saveEnquiryToFirestore = async (
  enquiryData: Omit<EnquiryData, 'submittedAt'>
): Promise<void> => {
  try {
    const enquiriesRef = doc(db, 'enquiries', `${Date.now()}_${enquiryData.email}`);
    
    await setDoc(enquiriesRef, {
      ...enquiryData,
      submittedAt: Timestamp.now(),
    });
    
    console.log('Enquiry saved to Firestore successfully');
  } catch (error: any) {
    console.error('Error saving enquiry to Firestore:', error);
    throw new Error(error?.message || 'Failed to save enquiry to Firestore');
  }
};

export interface HireData {
  farmerName: string;
  farmerLocation: string;
  farmerSkills: string[];
  farmerRating: number;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  date: string;
  time: string;
  duration: string;
  rate: string;
  specialRequirements: string;
  hiredAt: Timestamp;
}

export const saveHireToFirestore = async (
  hireData: Omit<HireData, 'hiredAt'>
): Promise<void> => {
  try {
    const hiresRef = doc(db, 'hires', `${Date.now()}_${hireData.clientPhone}`);
    
    await setDoc(hiresRef, {
      ...hireData,
      hiredAt: Timestamp.now(),
    });
    
    console.log('Hire data saved to Firestore successfully');
  } catch (error: any) {
    console.error('Error saving hire to Firestore:', error);
    throw new Error(error?.message || 'Failed to save hire data to Firestore');
  }
};

export interface BookingData {
  equipmentName: string;
  equipmentLocation: string;
  equipmentPower: string;
  owner: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  date: string;
  time: string;
  hourlyRate: string;
  dailyRate: string;
  bookedAt: Timestamp;
}

export const saveBookingToFirestore = async (
  bookingData: Omit<BookingData, 'bookedAt'>
): Promise<void> => {
  try {
    const bookingsRef = doc(db, 'bookings', `${Date.now()}_${bookingData.clientPhone}`);
    
    await setDoc(bookingsRef, {
      ...bookingData,
      bookedAt: Timestamp.now(),
    });
    
    console.log('Booking data saved to Firestore successfully');
  } catch (error: any) {
    console.error('Error saving booking to Firestore:', error);
    throw new Error(error?.message || 'Failed to save booking data to Firestore');
  }
};
