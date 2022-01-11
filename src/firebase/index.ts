// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGI56IZRQy7lukt2iuCpu4fFBjwrmoqHM",
  authDomain: "learning-dgraph-with-react.firebaseapp.com",
  projectId: "learning-dgraph-with-react",
  storageBucket: "learning-dgraph-with-react.appspot.com",
  messagingSenderId: "678566936864",
  appId: "1:678566936864:web:1796df3070e8f2b6a29745",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
