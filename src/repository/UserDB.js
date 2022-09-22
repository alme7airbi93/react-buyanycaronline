import {doc, updateDoc,addDoc,getDoc, collection, query, where, getDocs, limit} from "firebase/firestore";
import {preSaveOrUpdate} from "./Common.js";
import {db} from "./main";
import User from "../models/User";

const doc_collection ="users";


export const saveUser = async (value = new User()) => {

	let user_data = preSaveOrUpdate(value);
	let create_doc =await addDoc(collection(db, doc_collection), user_data);
	console.log("================= Save a user  =================");
	console.log("Saved user ", create_doc.id);
	return {success:true,data:create_doc.id};
};


export const changeUserRole=async (userId=null, value=new User())=> {
	console.log("================= Update user role =================");
	console.log("Updating : ", userId);
	try {
		const docRef = doc(db, doc_collection, userId);
		let update_doc= await updateDoc(docRef, {_role: value._role});

		console.log("Response for update ", update_doc);
		return {success:true,data:update_doc};
	} catch (e) {
		console.log("Error getting cached document:", e);
	}
};


export const getUserByUsername = async (email) => {
	const getUserByEmailQuery = query(collection(db, doc_collection), where("email", "==", email), limit(1));
	return await getDocs(getUserByEmailQuery).then((docs) =>{
		if (docs.size !== 0) {
			let user;
			docs.forEach((doc) => {
				user = {...doc.data(), _id:doc.id};
				console.log("User found :", ...user);
			});
			return {success:true, data:user};
		} else {
			return {success:false};
		}
	});
};


export const getUserById = async (userId = null) => {
	const docRef = doc(db, doc_collection, userId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log("================= Get User By ID  =================");
		console.log(docSnap.data());
		return {success:true, data: {...docSnap.data(), _id:doc.id}};
	} else {
		return {success:false};
	}
};

export const getAllUsers = async () => {
	return  getDocs(collection(db, doc_collection)).then(docs => {
		let users = [];
		if (docs.size !== 0) {
			console.log("================= GET ALL Users=================");
			docs.forEach((data) => {
				users.push(Object.assign(new User(),{...data.data()}));
			});
			console.log(users);
			return {success:true, data: users};
		} else {
			return {success:false};
		}
	});

};
