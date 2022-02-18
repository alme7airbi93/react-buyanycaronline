import {doc, setDoc, getDoc, db} from './index';

export function AddUser(data) { 
    return setDoc(doc(db, "users", data.username), data);
}

export function GetUser(id) {
    return getDoc(doc(db, "users", id));
}

