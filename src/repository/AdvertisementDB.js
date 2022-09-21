import { doc, addDoc, getDoc ,collection, updateDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./main";
import Advertisement from "../models/Advertisement";
const doc_collection = "advertisements";

export const createAdvertisement = async (value = new Advertisement()) => {
	try {
		let advt_data = JSON.parse(JSON.stringify(value));
		const docRef = collection(db, doc_collection);
		let update_doc = await addDoc(docRef, advt_data);
		console.log(update_doc.id);
		return {success:true,advert_id:update_doc.id};
		//return true;
	} catch (e) {
		console.log("Error getting cached document:", e);
	}
};
export const advertisementStatusChange = async (advertId = null, value = new Advertisement()) => {
	try {
		const docRef = doc(db, doc_collection, advertId);
		await updateDoc(docRef, { _status: value._status });
		//console.log(update_doc);
		return true;
	} catch (e) {
		console.log("Error getting cached document:", e);
	}
};
export const fetchSingleAdvertisement = async (advertId = null) => {
	const docRef = doc(db, doc_collection, advertId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
		return {success:true,data:docSnap.data()};
	} else {
		return {success:false,data:[]};
	}
};
export const fetchAdvertisement = async (value = new Advertisement()) => {
	const q = query(collection(db, doc_collection), where("_advertisement_type", "==", value._advertisement_type));
	const advertSnapshot = await getDocs(q);
	advertSnapshot.forEach((doc) => {
		console.log(doc.id, " => ", doc.data());
	});
	return true;
};