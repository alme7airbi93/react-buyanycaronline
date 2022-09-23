import { doc, addDoc, getDoc ,collection, updateDoc, query, where, getDocs } from "firebase/firestore";
import {preSaveOrUpdateAClass} from "../validations/PreSave.js";
import { db } from "./main";
import Advertisement from "../models/Advertisement";
const doc_collection = "advertisements";

export const createAdvertisement = async (value = new Advertisement()) => {
	try {
		let advt_data = preSaveOrUpdateAClass(value);
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
export const getAdvertisementById = async (advertId = null) => {
	const docRef = doc(db, doc_collection, advertId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return {success:true,data:docSnap.data()};
	} else {
		return {success:false,data:[]};
	}
};

// To be developed so it contain all fields using forloop !!!!!!!!!!!!
export const getAllAdvertisement = async () => {
	const advertSnapshot = await getDocs(collection(db, doc_collection));
	let ads = [];
	advertSnapshot.forEach((doc) => {
		ads.push(...doc, doc.id);
	});
	console.log("================= GET ALL =================");
	console.log(ads);
	return ads;
};
