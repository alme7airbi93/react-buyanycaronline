import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "./main";
import Advertisement from "../models/Advertisement";
const doc_collection = "advertisements";

export const createAdvertisement = async (value = new Advertisement()) => {
	try {
		let advt_data = JSON.parse(JSON.stringify(value));
		const docRef = collection(db, doc_collection);
		let update_doc = await addDoc(docRef, advt_data);
		console.log(update_doc.id);
		return true;
	} catch (e) {
		console.log("Error getting cached document:", e);
	}
};
export const advertisementStatusChange = async (advertId = null, status = {}) => {
	try {
		const docRef = doc(db, doc_collection, advertId);
		await updateDoc(docRef, status);
		//console.log(update_doc);
		return true;
	} catch (e) {
		console.log("Error getting cached document:", e);
	}
};