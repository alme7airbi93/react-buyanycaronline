import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import firebase, { db } from "./main";

const doc_collection = 'advertisements';

export const createAdvertisement = async function () {
    try {
        let advertData = {
            "title": "title",
            "description": "description",
            "price": "100",
            "location": "UK",
            "owner": "owner",
            "photos": "test",
            "views": "test",
            "stat": "1",
            "advert_tpe": {
                "type": "1",
                "vehicle": {
                    "make": "1",
                    "modal": "1",
                    "features": "features",
                    "color": "red",
                    "year": "2022",
                    "condition": "fine",
                    "fuel_type": "petrol",
                    "warranty": "1 yesr",
                    "region": "NY",
                    "vehicle_type": {
                        "type": "1",
                        "category": "SUV",
                        "length": "120",
                        "hours": "200"
                    },
                    "accessories": {
                        "vehicle_make": "string",
                        "vehicle_year": "string",
                        "vehicle_model": "string",
                        "accessory_name": "string"
                    },
                    "plate_numbers": {
                        "city": "1",
                        "number": "898989898",
                        "number_code": "90909090"
                    }
                }
            }
        };
        const docRef = collection(db, doc_collection);
        let update_doc = await addDoc(docRef, advertData);
        console.log(update_doc.id);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const deActivateAdvertisement = async function (advertId=null) {
    try {
        advertId="O4KlTJoJfA8KFUVzPPng";
        const docRef = doc(db, doc_collection, advertId);
        let update_doc = await updateDoc(docRef, { stat: 0 });
        console.log(update_doc);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
};
export const activateAdvertisement = async function (advertId=null) {
    try {
        advertId="O4KlTJoJfA8KFUVzPPng";
        const docRef = doc(db, doc_collection, advertId);
        let update_doc = await updateDoc(docRef, { stat: 1 });
        console.log(update_doc);
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}