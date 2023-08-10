// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE5LvGaWcMilxR04Uc_11M970e18dJWro",
  authDomain: "hosipital-app.firebaseapp.com",
  projectId: "hosipital-app",
  storageBucket: "hosipital-app.appspot.com",
  messagingSenderId: "836459984816",
  appId: "1:836459984816:web:9705f2299a89122cc5c875"
};

// Initialize Firebaseconst app = initializeApp(firebaseConfig)4
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)
export {db,storage}