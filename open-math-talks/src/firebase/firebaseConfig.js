import firebase from "firebase/app"; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice.
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
let config = {
    apiKey: "AIzaSyCbOLesKCKz6cHf_OKemMCj1hTcRWBJTLg",
    authDomain: "open-math-talks.firebaseapp.com",
    databaseURL: "https://open-math-talks.firebaseio.com",
    projectId: "open-math-talks",
    storageBucket: "open-math-talks.appspot.com",
    messagingSenderId: "246820166836",
    appId: "1:246820166836:web:2bba73226a95c763c40be1",
};

firebase.initializeApp(config);
console.log("firebase config");
const auth = firebase.auth();
const db = firebase.firestore();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export {
    auth,
    firebase,
    db,
    serverTimestamp,
    googleAuthProvider,
    emailAuthProvider,
};
