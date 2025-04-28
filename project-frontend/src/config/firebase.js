// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBTKecI3wI2ko5TOwOrVQ1oeZy-3D6_5oU",
  authDomain: "babustore-bd98b.firebaseapp.com",
  projectId: "babustore-bd98b",
  storageBucket: "babustore-bd98b.firebasestorage.app",
  messagingSenderId: "238566232581",
  appId: "1:238566232581:web:6a2ce151bb791fcba3c26c",
  measurementId: "G-PLX73PC9K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)

export default auth