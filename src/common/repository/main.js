import {initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore,initializeFirestore} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyARSq5cUJvpXMTWcM_xjWZEqmOVN-TLHqw",
	authDomain: "motormarket.firebaseapp.com",
	projectId: "motormarket",
	storageBucket: "motormarket.appspot.com",
	messagingSenderId: "742200551348",
	appId: "1:742200551348:web:0c33a6c462e8ee136e74e1"
};



const firebase = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
initializeFirestore(firebase, {
  ignoreUndefinedProperties: true,
});



export const db = getFirestore();
export const auth = getAuth();

export default firebase;
