import {initializeApp} from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    updateProfile 
 } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyARSq5cUJvpXMTWcM_xjWZEqmOVN-TLHqw",
    authDomain: "motormarket.firebaseapp.com",
    projectId: "motormarket",
    storageBucket: "motormarket.appspot.com",
    messagingSenderId: "742200551348",
    appId: "1:742200551348:web:0c33a6c462e8ee136e74e1"
};

initializeApp(firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(); 
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export {
    auth,
    provider,
    storage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,  
    signOut,
    updateProfile 
}