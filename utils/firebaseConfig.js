import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBxQUqTiqJjx6XAAvxzrXJRpRJ1LJ3YNjM",
  authDomain: "pizzahub-d8c70.firebaseapp.com",
  databaseURL:
    "https://pizzahub-d8c70-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pizzahub-d8c70",
  storageBucket: "pizzahub-d8c70.appspot.com",
  messagingSenderId: "355115323806",
  appId: "1:355115323806:web:7974b35b78555275c6868f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
