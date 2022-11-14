import {doc, updateDoc, addDoc, getDoc, collection, query, where, getDocs, limit} from "firebase/firestore";
import {checkTypeOfUser} from "../validations/ClassesTypeOfValidations.js";
import {preSaveOrUpdateAClass} from "../validations/PreSave.js";
import {db} from "./main.js";
import User from "../models/User.js";
import { getAuth, updatePassword,reauthenticateWithCredential,EmailAuthProvider } from "firebase/auth";
import { async } from "@firebase/util";

const doc_collection = "users";


export const saveUser = async (value) => {
	checkTypeOfUser(value);
	try {
		let user_data = preSaveOrUpdateAClass(value);
		let create_doc = await addDoc(collection(db, doc_collection), user_data);
		console.log("================= Save a user  =================");
		console.log("Saved user ", create_doc.id);
		return {success: true, data: create_doc.id};
	} catch (e) {
		return {success: false, data: e};
	}
};

export const updateUserProfile = async (userId = null, value) => {
	console.log("================= Update user profile=================");
	console.log("Updating : ", userId);
	checkTypeOfUser(value);
	try {
		let update_doc = await updateDoc(doc(db, doc_collection, userId), preSaveOrUpdateAClass(value));

		console.log("Response for update ", update_doc);
		return {success: true, data: update_doc};
	} catch (e) {
		return {success: false, data: e};
	}
};

export const updateUser = async(user,id) => {
	try{
		let docRef = doc(db, doc_collection, id);
		let update_doc = await updateDoc(docRef, user);
		console.log("Response for update ", update_doc);
		return {success: true, data: update_doc};

	} catch (e) {
		return {success: false, data: e};
	}
}

export const changeUserRole = async (userId = null, value) => {
	console.log("================= Update user role =================");
	console.log("Updating : ", userId);
	checkTypeOfUser(value);
	try {
		const docRef = doc(db, doc_collection, userId);
		let update_doc = await updateDoc(docRef, {_role: value._role});

		console.log("Response for update ", update_doc);
		return {success: true, data: update_doc};
	} catch (e) {
		return {success: false, data: e};
	}
};

export const getUserByUsername = async (username) => {
	const getUserByEmailQuery = query(collection(db, doc_collection), where("_username", "==", username), limit(1));
	console.log("================= Get User By username  =================");
	return await getDocs(getUserByEmailQuery).then((docs) => {
		if (docs.size !== 0) {
			let user;
			docs.forEach((data) => {
				user = Object.assign(new User(), {...data.data(), _id: data.id});
				console.log("User found :", user);
			});
			return {success: true, data: user};
		} else {
			throw Error("User not found !");
		}
	});
};

export const getUserById = async (userId = null) => {
	const docRef = doc(db, doc_collection, userId);
	const data = await getDoc(docRef);
	if (data.exists()) {
		console.log("================= Get User By ID  =================");
		console.log(data.data());
		return {success: true, data: Object.assign(new User(), {...data.data(), _id: data.id})};
	} else {
		throw Error("User not found !");
	}
};

export const getAllUsers = async () => {
	return getDocs(collection(db, doc_collection)).then(docs => {
		let users = [];
		if (docs.size !== 0) {
			console.log("================= GET ALL Users=================");
			docs.forEach((data) => {
				users.push(Object.assign(new User(), {...data.data(), _id: data.id}));
			});
			console.log(users);
			return {success: true, data: users};
		} else {
			throw  Error("No records found - getAllUsers");
		}
	});

};


export const updateUserPassword =  async(email,oldpassword, newPassword) =>{
	console.log(email)
	const auth = getAuth();
	const user = auth.currentUser;
	const credentials =  EmailAuthProvider.credential(email,oldpassword)
	return reauthenticateWithCredential(user,credentials)
	.then(()=>{
		updatePassword(user,newPassword)
		.then(()=>{
			return {success: true};
		})
		.catch(()=>{
			console.log(err)
		})

	})
	.catch((err)=>{
		alert('Old password is wrong')
		console.log(err)
		return {success: false,};

	})
}


