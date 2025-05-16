
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB12VLSBx6ZWXbaXAd6pIBuC-koGISb2kQ",
  authDomain: "quitzau-544b3.firebaseapp.com",
  projectId: "quitzau-544b3",
  storageBucket: "quitzau-544b3.appspot.com",
  messagingSenderId: "562460334720",
  appId: "1:562460334720:web:a5be47d7fee54a55222465",
  measurementId: "G-ET4DHCH43V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
