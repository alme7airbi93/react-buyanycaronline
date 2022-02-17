import {initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect   } from "firebase/auth";
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

const auth = getAuth(); 
const provider = new GoogleAuthProvider();
const firebaseApp = initializeApp(firebaseConfig);

export function Register(email, password) {    
    return createUserWithEmailAndPassword(auth, email, password)
}

export function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)    
}

export function GoogleSignin() {
    return signInWithPopup(auth, provider)
        .then((result) => {
            signInWithRedirect(auth, provider);
           
        })
}

export const storage = getStorage(firebaseApp);