/* eslint-disable */
import {changeUserRole,saveUser,fetchUser,fetchSingleUser} from "../repository/UserDB.js";
import User from "../models/User";
var userId="";
test("Create New User : ", async () => {	
	let user=new User("devtest","Customer","909090900","test");
	let result=await saveUser(user);
	userId=result.User_id;
	await expect(result.success).toBe(true);
});

test("Update the User Status: ", async () => {
    let user=new User("devtest","Admin","909090900","test");
	await expect(changeUserRole(userId,user)).resolves.toBe(true);

});
test("Fetch Single  Advertisement Based on id: ", async () => {
	let result =await fetchSingleUser(userId);
	await expect(result.success).toBe(true);
});
test("Fetch User based on role: ", async () => {
    let user=new User("devtest","Customer","909090900","test");
	await expect(fetchUser(user)).resolves.toBe(true);

});