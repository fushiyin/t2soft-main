import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvIBARX9FmWxriX4i9UKVlx-FhHpRWrh4",
  authDomain: "trading-76356.firebaseapp.com",
  projectId: "trading-76356",
  storageBucket: "trading-76356.appspot.com",
  messagingSenderId: "670796179179",
  appId: "1:670796179179:web:d17333e99ff50fd61080ae",
  measurementId: "G-S50GX1SK8S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }; 