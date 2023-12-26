// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfPOsVtTqS3gpC3lM-dt-aCwFyuVpBbWI",
  authDomain: "terminal-1ec6a.firebaseapp.com",
  projectId: "terminal-1ec6a",
  storageBucket: "terminal-1ec6a.appspot.com",
  messagingSenderId: "764825533929",
  appId: "1:764825533929:web:ab102a260347c4a1ac9f78",
  measurementId: "G-145EQ1RPXG",
  databaseURL:"https://terminal-1ec6a-default-rtdb.asia-southeast1.firebasedatabase.app/"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);