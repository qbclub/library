// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
// import {
//     getAnalytics
// } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZ8VMlh8djLvDO8yQtf1Z2HXrOmEFlB2I",
    authDomain: "q-library-1.firebaseapp.com",
    projectId: "q-library-1",
    storageBucket: "q-library-1.appspot.com",
    messagingSenderId: "129120540235",
    appId: "1:129120540235:web:549c26bfe2c6444f199fce",
    measurementId: "G-Z3MKFXPVVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;