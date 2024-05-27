import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHUSMkGr5KxNBTN7esMCiQ_hYnUr1dr-M",
  authDomain: "hotel-management-bdfac.firebaseapp.com",
  databaseURL: "https://hotel-management-bdfac-default-rtdb.firebaseio.com",
  projectId: "hotel-management-bdfac",
  storageBucket: "hotel-management-bdfac.appspot.com",
  messagingSenderId: "697234339206",
  appId: "1:697234339206:web:4bc3bf90b031c20225e807",
  measurementId: "G-NNC06C5C18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getDatabase(app); // Pass the app instance to getDatabase
// export default app;
// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



