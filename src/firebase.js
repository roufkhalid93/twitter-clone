// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByq0qywWkXvU8A3hfBp_Xe0AnM8tj73ww",
    authDomain: "twitter-app-a8ba0.firebaseapp.com",
    projectId: "twitter-app-a8ba0",
    storageBucket: "twitter-app-a8ba0.appspot.com",
    messagingSenderId: "374520520601",
    appId: "1:374520520601:web:627c4c4576c468f71ffd08"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);