import {doc, updateDoc,addDoc, collection, query, where, getDocs, limit} from "firebase/firestore";
import {db} from "./main";
import User from "../models/User";

const doc_collection ='users';

export const userStatusChange=async function(userId=null, updateobj = {}){
    try {
        const docRef = doc(db, doc_collection, userId);
        let update_doc=await updateDoc(docRef, {status: updateobj.status});
        console.log(update_doc);
		return true;
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const saveUser = async (value = new User()) => {
	let user_data = JSON.parse(JSON.stringify(value));
	let create_doc =await addDoc(collection(db, doc_collection), user_data);
	console.log(create_doc.id);
	return true;
};

export const getUserByEmail = async (email) => {
	const getUserByEmailQuery = query(collection(db, doc_collection), where("email", "==", email), limit(1));
	return await getDocs(getUserByEmailQuery).then((docs) =>{
		if (docs.size !== 0) {
			let user;
			docs.forEach((doc) => {
				user = doc.data();
				console.log("User found :", user);
			});
			return user;
		}
	});
};