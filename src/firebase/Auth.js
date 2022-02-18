import  {
    auth,
    provider,   
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut, 
    updateProfile  
} from './index';

export function Register(email, password) {    
    return createUserWithEmailAndPassword(auth, email, password)
}

export function UpdateProfile(currentUser, data) {    
    return updateProfile(currentUser, data)
}

export function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)    
}

export function Signout() {
    return signOut(auth)
}

export function GoogleSignin() {
    return signInWithPopup(auth, provider)        
}