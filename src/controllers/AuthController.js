import  {auth} from "../repository/main.js";
import {
	createUserWithEmailAndPassword, GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";

import {getUserByUsername, saveUser} from "../repository/UserDB.js";

const googleProvider = new GoogleAuthProvider();

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
			let error = "";
			if(err.code === "auth/email-already-in-use"){
				error = "Email already in use";
			}
			else{
				error = "The password needs to be at least 6 characters";
			}
			return { error: error };
		});
};

export const logInWithEmailAndPassword =  (email, password) => {
	let token = "";
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			return userCredential.user.getIdToken();
		})
		.then((idtoken)=>{
			token = idtoken;
			return getUserByUsername(email);
		})
		.then((userData)=>{
			return userData.data();
		})
		.then((data)=>{
			return {profile:data, error:"", token: token};
		})
		.catch((err) => {
			let error = "";
			if(err.code !== ""){
				error = "Email and Password incorrect";
			}
			return {profile:"", error: error, token:""};
		});
};

export const logOut = ()=>{
	signOut(auth).then(() => {
		// Sign-out successful.
	}).catch((error) => {
		console.log(error);
	});
};


export const GoogleSignin = async () => {
	return await signInWithPopup(auth, googleProvider)
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const googleUser = result.user;
			let user = await getUserByUsername(googleUser.email);
			try{
				if (user === undefined) {
					console.log("Saving user !");
					await saveUser(googleUser.email, googleUser.displayName);
					user = await getUserByUsername(googleUser.email);
				}
			}catch (error){
				return error.message;
			}
			console.log("User:", user);
			console.log("Token:", token);
			let data = {profile: user, token: token};
			return data;

		})
		.catch((error) => {
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.log(error);
			return {profile: "", error: error.message, token: credential};
		});
};
