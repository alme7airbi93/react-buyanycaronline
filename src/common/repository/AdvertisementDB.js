import {doc, addDoc, getDoc, collection, updateDoc, getDocs,arrayUnion,query,where} from "firebase/firestore";
import {
	checkAdvertisemntType,
	checkTypeOfAdvertisement
} from "../validations/ClassesTypeOfValidations.js";
import {checkTypeOfAdvertisementStatus} from "../validations/EnumsValidation.js";
import {preSaveOrUpdateAClass} from "../validations/PreSave.js";
import {db} from "./main.js";

const doc_collection = "advertisements";

export const createAdvertisement = async (value) => {
	checkTypeOfAdvertisement(value);
	try {
		let advt_data = preSaveOrUpdateAClass(value);
		const docRef = collection(db, doc_collection);
		let create_doc = await addDoc(docRef, advt_data);
		console.log("================= Save an Advertisement  =================");
		console.log("Saved user ", create_doc.id);
		return {success: true, data: create_doc.id};
	} catch (e) {
		return {success: false, data: e};
	}
};

export const advertisementStatusChange = async (advertId = null, value) => {
	console.log("================= Update Advertisement status=================");
	console.log("Updating : ", advertId);
	checkTypeOfAdvertisementStatus(value);
	try {
		const docRef = doc(db, doc_collection, advertId);
		let update_doc = await updateDoc(docRef, {_status: value});
		return {success: true, data: update_doc};
	} catch (e) {
		return {success: false, data: e};
	}
};

export const updateAdvertisement = async (advertId = null, value) => {
	console.log("================= Update Advertisement=================");
	console.log("Updating : ", advertId);
	console.log(value);
	checkTypeOfAdvertisement(value);
	try {
		let update_doc = await updateDoc(doc(db, doc_collection, advertId), preSaveOrUpdateAClass(value));
		console.log("Response for update ", update_doc);
		return {success: true, data: update_doc};
	} catch (e) {
		return {success: false, data: e};
	}
};

export const updateAdsById = async (advertId = null, value) => {

	try{
		console.log(value,'value')
		let docRef = doc(db, doc_collection, advertId);
		let update_doc = await updateDoc(docRef, value);
		console.log("Response for update ", update_doc);
		return {success: true, data: update_doc};
	}
	catch(e){
		return{ success:false, msg:e}

	}

}


export const getAdvertisementById = async (advertId = null) => {
	const docRef = doc(db, doc_collection, advertId);
	const data = await getDoc(docRef);
	if (data.exists()) {
		console.log("================= Get Advertisement By ID  =================");
		console.log(data.data());
		return {success: true, data: Object.assign(checkAdvertisemntType(data.data()), {...data.data(), _id: data.id})};
	} else {
		throw Error("Advertisement not found");
	}
};

export const getAllAdvertisement = async () => {
	console.log("================= GET ALL =================");
	const docs = await getDocs(collection(db, doc_collection));
	let ads = [];
	if (docs.size !== 0) {
		docs.forEach((data) => {
			ads.push(Object.assign(checkAdvertisemntType(data.data()), {...data.data(), _id: data.id}));
		});

		console.log(ads);
		return {success: true, data: ads};
	} else {
		throw Error("Advertisement not found");
	}
};

export const updateArrayField = async (advertId = null, value) =>{
	console.log("================= UPDATING ARRAY FIELD =================");
	console.log(value)
	try{
		let docRef = doc(db, doc_collection, advertId);
		let update_doc = await updateDoc(docRef, {
			_photos: arrayUnion(...value)
		});
		return{success:"success", msg:"data updated successfully"}
	}
	catch(e){
		return{ success:false, msg:e}

	}
}

export const getUsersAdvertisement = async(userId)=>{
	try{
		console.log(userId,'userId')
		const q = query(collection(db,doc_collection ), where("_owner._id", '==', userId))
		const querySnapshot = await getDocs(q);
		let ads = [];
		querySnapshot.forEach((doc) => {
			ads.push({...doc.data(),_id:doc.id})
		});
		return{success:true,data:ads}

	}
	catch(e){
		return{success:false,msg:e}

	}
}


export const getSearchAdvertisement = async (filterData) => {


	const qr = collection(db,doc_collection );
	const queryConstraints = []
	filterData.forEach((item) => {
		queryConstraints.push(where(item.key, '==', item.value));
	});

	const q = query(qr,...queryConstraints)
	

	const querySnapshot = await getDocs(q);
	let ads = [];

	if (querySnapshot.size !== 0) {
		querySnapshot.forEach((data) => {
			ads.push({...data.data(), _id: data.id});
		});

		console.log(ads);
		return {success: true, data: ads};
	} else {
		throw Error("Advertisement not found");
	}
};

