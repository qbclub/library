import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyAZ8VMlh8djLvDO8yQtf1Z2HXrOmEFlB2I",
    authDomain: "q-library-1.firebaseapp.com",
    projectId: "q-library-1",
    storageBucket: "q-library-1.appspot.com",
    messagingSenderId: "129120540235",
    appId: "1:129120540235:web:549c26bfe2c6444f199fce",
    measurementId: "G-Z3MKFXPVVP"
};

const firebaseInit = initializeApp(firebaseConfig);

export default  firebaseInit