/* eslint-disable */
import {userStatusChange,saveUser} from "../repository/UserDB.js";
import User from "../models/User";

test("Update the User Status: ", async () => {
    let userId="16bJFBu4qdiv4DB6Nsos";
    let status={status:true};
	await expect(userStatusChange(userId,status)).resolves.toBe(true);

});

test("Create New User : ", async () => {	
	let user=new User("devtest","Customer","909090900","test")
	await expect(saveUser(user)).resolves.toBe(true);
});