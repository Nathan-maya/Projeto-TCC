// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const storage = firebase.storage();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBSSWRVKWxyeH78Lpi2XuWKyuncgpJsO6U',
  authDomain: 'missing-24d33.firebaseapp.com',
  projectId: 'missing-24d33',
  storageBucket: 'missing-24d33.appspot.com',
  messagingSenderId: '712511424836',
  appId: '1:712511424836:web:b01965e9cbe5df57dc2f11',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = firebase.storage

export default app;