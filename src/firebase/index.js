import {initializeApp} from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged, 
 } from "firebase/auth";

 import {getFirestore , doc, setDoc, getDoc, addDoc, collection} from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyARSq5cUJvpXMTWcM_xjWZEqmOVN-TLHqw",
    authDomain: "motormarket.firebaseapp.com",
    projectId: "motormarket",
    storageBucket: "motormarket.appspot.com",
    messagingSenderId: "742200551348",
    appId: "1:742200551348:web:0c33a6c462e8ee136e74e1"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(); 
const provider = new GoogleAuthProvider();

export {
    auth,
    provider,   
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,  
    signOut,
    onAuthStateChanged,
    doc,
    addDoc,
    collection,
    setDoc,
    getDoc,
    db
}