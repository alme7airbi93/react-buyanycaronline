import {doc, updateDoc} from "firebase/firestore";
import firebase ,{db} from "./main";

const doc_collection ='users';

export const deActivateUser=async function(userId){
    try {
        const docRef = doc(db, doc_collection, userId);
        let update_doc=await updateDoc(docRef, { status: false  });
        console.log(update_doc);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const activate=async function(userId){
    try {
        const docRef = doc(db, doc_collection, userId);
        let update_doc=await updateDoc(docRef, { status: true  });
        console.log(update_doc);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const saveUser = async (email, surename) => {
	const data = {
		email: email,
		roles: ["CUSTOMER"],
		surename: surename
	};
	await addDoc(collection(db, doc_collection), data);
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