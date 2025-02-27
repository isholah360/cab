// import { getMessaging, getToken } from 'expo-firebase-messaging';
// import { firebaseConfig } from '../firebaseConfig'; // Your Firebase config

// import { initializeApp } from 'firebase/app';

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const getFCMToken = async () => {
//   try {
//     const token = await getToken(messaging);
//     if (token) {
//       console.log('FCM Token:', token);
//       // Send the token to your backend for push notification subscription
//     } else {
//       console.log('No FCM token found');
//     }
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//   }
// };
