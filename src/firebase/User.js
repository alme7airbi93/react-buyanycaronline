import {addDoc, collection, query, where, getDocs, limit} from "firebase/firestore";
import firebase ,{db} from "./main";

const collection_user = "users";


export const saveUser = async (email, surename) => {
    const data = {
        email: email,
        roles: ["CUSTOMER"],
        phone: "1234567890",
        surename: surename
    }
    await addDoc(collection(db, collection_user), data);
}

export const getUserByEmail = async (email) => {
    console.log("Finding user: ", email)
    const getUserByEmailQuery = query(collection(db, "users"), where("email", "==", email), limit(1));
    return await getDocs(getUserByEmailQuery).then((docs) =>{
        if (docs.size != 0) {
            let user;
            docs.forEach((doc)=>{
                user = doc.data();
                console.log("User found :", user)
            })
            return user;
        }else {
            throw "User not found";
        }
    });
}
