import {doc, setDoc, getDoc, db} from './index';

export function AddUser(docID, data) { 
    return setDoc(doc(db, "users", docID), data);
}

export function GetUser(id) {
    return getDoc(doc(db, "users", id));
}

