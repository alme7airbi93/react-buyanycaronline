import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "./main";
import Advertisement from "../models/Advertisement";
const doc_collection = "advertisements";

export const createAdvertisement = async(value=new Advertisement())=> {    
    try {
        let advt_data=JSON.parse(JSON.stringify(value));
        const docRef = collection(db, doc_collection);
        let update_doc = await addDoc(docRef,advt_data );
        console.log(update_doc.id);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const deActivateAdvertisement = async(advertId=null)=>{
    try {        
        const docRef = doc(db, doc_collection, advertId);
        let update_doc = await updateDoc(docRef, {_status:0});
        console.log(update_doc);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const activateAdvertisement = async(advertId=null)=> {
    try {        
        const docRef = doc(db, doc_collection, advertId);
        let update_doc = await updateDoc(docRef, {_status:1});
        console.log(update_doc);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};