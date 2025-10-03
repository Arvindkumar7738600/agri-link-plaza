# Firebase Setup Guide for KisanSeva Plus

## Prerequisites
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

## Step 1: Enable Firebase Authentication
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable **Phone** authentication
3. Add your domain to the authorized domains list

## Step 2: Enable Firestore Database
1. Go to Firebase Console > Firestore Database
2. Click "Create database"
3. Start in **production mode** or **test mode** (for development)
4. Choose a location

## Step 3: Enable Firebase Storage
1. Go to Firebase Console > Storage
2. Click "Get started"
3. Set up security rules as needed

## Step 4: Get Firebase Configuration
1. Go to Project Settings (gear icon) > General
2. Scroll down to "Your apps"
3. Click "Add app" > Web (</>)
4. Register your app
5. Copy the Firebase configuration object

## Step 5: Update Firebase Config
Open `src/lib/firebase.ts` and replace with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 6: Set Up Firestore Security Rules
Go to Firestore Database > Rules and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Set Up Storage Security Rules
Go to Storage > Rules and set:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Implemented

### Authentication
- Phone number OTP login/signup
- User session management
- Protected routes (Services, Booking, FPO, Farmers)

### User Data Storage (Firestore)
All user data is stored in Firestore `users` collection:
- firstName
- lastName
- email
- phoneNumber
- address
- isKycVerified
- documentUrl (Aadhaar card)
- loginTime (auto-updated on each login)
- createdAt

### File Storage
- Aadhaar documents uploaded to Firebase Storage
- Secure access with user-based permissions

## Protected Routes
Only authenticated users can access:
- /services
- /booking
- /farmers
- /fpo
- /dashboard

Public routes:
- / (Home)
- /about
- /contact
- /login
- /signup

## Testing
1. Complete the Firebase setup above
2. Try signing up with a valid phone number
3. Verify OTP (in development, check Firebase Console > Authentication for test numbers)
4. Upload Aadhaar document
5. Try accessing protected routes
