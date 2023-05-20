import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAfEKNTNzSrVNaEWfC8FWApMq5svmOXZ7c",
  authDomain: "fir-1edfe.firebaseapp.com",
  databaseURL: "https://fir-1edfe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-1edfe",
  storageBucket: "fir-1edfe.appspot.com",
  messagingSenderId: "662567353283",
  appId: "1:662567353283:web:e0ed0070091b5370ed9b76"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);