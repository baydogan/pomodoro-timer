import { initializeApp } from "@firebase/app";
import {
  getAuth,
  deleteUser,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import store from "../store";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const users = collection(db, "users");
const userSettings = collection(db, "user-settings");
const auth = getAuth();
const getSettings = doc(db, "user-settings", "aDTbs9pj0LtBdP0CLDAZ");

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch("fetchAuthUser");
  }
});

export {
  db,
  auth,
  getDocs,
  users,
  addDoc,
  deleteUser,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithRedirect,
  userSettings,
  getDoc,
  getSettings,
};
