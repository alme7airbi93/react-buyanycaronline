import { doc, addDoc, getDoc, collection, updateDoc, getDocs, query } from "firebase/firestore";
import {
    checkAdvertisemntType,
    checkTypeOfAdvertisement
} from "../validations/ClassesTypeOfValidations.js";
import { checkTypeOfAdvertisementStatus } from "../validations/EnumsValidation.js";
import { preSaveOrUpdateAClass } from "../validations/PreSave.js";
import { db } from "./main.js";


class BaseEvents {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    async getAllDocuments() {
        let q = query(collection(db, this.collectionName))
        const data = await getDocs(q);
        return data;
    }

    async storeData(data) {
        console.log(data)
        try {
            const docRef = collection(db, this.collectionName);
            const create_doc = await addDoc(docRef,data);
            return { sucess: true, msg: create_doc.id }
        }
        catch (e) {
            return { success: false, msg: e }
        }

    }

    async getDocumentById(docId) {
        try {
            const docRef = doc(db, this.collectionName, docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data()
            }
            else {
                return { success: false, msg: 'Document not found' }
            }

        }
        catch (e) {
            return { success: false, msg: e }

        }

    }

    async updateDocument(docId){
        try{

        }
        catch(e){
            return { success: false, msg: e }
        }

    }



}


export default BaseEvents