// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from '@firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo8iGQQ16hHp9hJpWyefIrwQ1j04gd0HU",
  authDomain: "blog-project-81a99.firebaseapp.com",
  projectId: "blog-project-81a99",
  storageBucket: "blog-project-81a99.appspot.com",
  messagingSenderId: "623753477425",
  appId: "1:623753477425:web:695cc9461fb4ced47c4410",
  measurementId: "G-VWZ5GZZXJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
