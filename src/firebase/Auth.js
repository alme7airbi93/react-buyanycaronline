import  {
    auth,
    provider,   
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from './index';

import {getUser, saveUser} from './User';

export const signUpWithEmailAndPassword = (email, password, surname) => {    

    return createUserWithEmailAndPassword(auth, email, password)
        .then((data)=>{
            return data.user.getIdToken();
        })
        .then((idtoken)=>{
            const token = idtoken;
            saveUser(email, surname);
            return { token: token };
        })
        .catch((err)=>{
            let error = '';
            if(err.code === 'auth/email-already-in-use'){
                error = 'Email already in use';
            }
            else{
                error = 'The password needs to be at least 6 characters';
            }
            return { error: error };
        });
}

export const logInWithEmailAndPassword =  (email, password) => {
    let token = '';
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {            
            return userCredential.user.getIdToken();
        })
        .then((idtoken)=>{
            token = idtoken;
            return getUser(email);
        })
        .then((userData)=>{
            return userData.data();
        })
        .then((data)=>{            
            return {profile:data, error:'', token: token};
        })
        .catch((err) => {            
            let error = ''
            if(err.code !== ""){
                error = "Email and Password incorrect"
            }             
            return {profile:'', error: error, token:''};
        });
}

export const logOut = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log(error)
    });
}

export const GoogleSignin = () => {    
    let token = 0;
    let user = {};

    return signInWithPopup(auth, provider)
        .then((result)=>{
            user = result.user;            
            return user.getIdToken(); 
        })
        .then((idtoken)=>{
            token = idtoken;
            return getUser(user.email)       
        })
        .then((result) => {            
            const userData = result.data();
            if (userData !== undefined) {
                return {profile: userData, error: "", token: token};
            }
            else{       
                saveUser(user.email, user.displayName)                   
            }
        })
        .then(() => {
            return getUser(user.email)                           
        })
        .then((result) => {
            return result.data();            
        })
        .then((data) => {
            return {profile: data, error: "", token: token};
        })
        .catch((error) => {            
            return {profile:'', error: error.message, token:''};
        });
}