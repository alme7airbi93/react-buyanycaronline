/* eslint-disable */
import {userStatusChange,saveUser,fetchUser} from "../repository/UserDB.js";
import User from "../models/User";

test("Create New User : ", async () => {	
	let user=new User("devtest","Customer","909090900","test");
	await expect(saveUser(user)).resolves.toBe(true);
});

test("Update the User Status: ", async () => {
    let userId="5kBvi6HBr8I6CH4hXeFj";
    let user=new User("devtest","Admin","909090900","test");
	await expect(userStatusChange(userId,user)).resolves.toBe(true);

});

//test("Fetch User based on role: ", async () => {
//    let user=new User("devtest","Customer","909090900","test");
//	await expect(fetchUser(user)).resolves.toBe(true);

//});