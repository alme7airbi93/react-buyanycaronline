import {doc, setDoc, getDoc, db} from './index';

const collection_user = "users";

export const saveUser = async (docID, surname) => {
    const data = {
        roles: ["CUSTOMER"],
        phone: "1234567890",
        surname: surname
    }
    await setDoc(doc(db, collection_user, docID), data);
}

export const getUser = (id) => {
    return getDoc(doc(db, collection_user, id));
}
