import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
              
const firebaseConfig = {
  apiKey: "AIzaSyBHUSMkGr5KxNBTN7esMCiQ_hYnUr1dr-M",
  authDomain: "hotel-management-bdfac.firebaseapp.com",
  projectId: "hotel-management-bdfac",
  storageBucket: "hotel-management-bdfac.appspot.com",
  messagingSenderId: "697234339206",
  appId: "1:697234339206:web:4bc3bf90b031c20225e807",
  measurementId: "G-NNC06C5C18"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getDatabase();
export default app;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBHUSMkGr5KxNBTN7esMCiQ_hYnUr1dr-M",
//   authDomain: "hotel-management-bdfac.firebaseapp.com",
//   projectId: "hotel-management-bdfac",
//   storageBucket: "hotel-management-bdfac.appspot.com",
//   messagingSenderId: "697234339206",
//   appId: "1:697234339206:web:4bc3bf90b031c20225e807",
//   measurementId: "G-NNC06C5C18"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);