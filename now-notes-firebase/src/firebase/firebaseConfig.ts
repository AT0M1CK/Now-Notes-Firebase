// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU8yB-a5js4Zat8npToeGtyqImD7MVyDE",
  authDomain: "react-now-notes.firebaseapp.com",
  databaseURL:
    "https://react-now-notes-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-now-notes",
  storageBucket: "react-now-notes.appspot.com",
  messagingSenderId: "835933542516",
  appId: "1:835933542516:web:b334af538a08257f5e1921",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);