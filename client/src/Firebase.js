// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBO-F5JkM6JlQyywhEchjsS70zK1Pi8cQQ",
  authDomain: "authenticate-deae8.firebaseapp.com",
  projectId: "authenticate-deae8",
  storageBucket: "authenticate-deae8.appspot.com",
  messagingSenderId: "341821060422",
  appId: "1:341821060422:web:b3d63bba71208d529d6147",
  measurementId: "G-198Y9ZEKYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
