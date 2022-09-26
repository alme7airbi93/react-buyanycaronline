/**
 * @jest-environment node
 */
import {User_Roles} from "../data/User_Roles.js";
/* eslint-disable */
import {
	changeUserRole,
	saveUser,
	getAllUsers,
	getUserById,
	getUserByUsername,
	updateUserProfile,
} from "../repository/UserDB.js";
import User from "../models/User";
import {AdvertisementOptions} from "../data/SelectOptions";
import {checkTypeUserRoles} from "../validations/EnumsValidation.js";

let userId = "";

test("Create New User : ", async () => {
	let user = new User("devtest", User_Roles.CUSTOMER, "909090900", "test");
	user.id = "123";
	let result = await saveUser(user);
	userId = result.data;
	expect(result.success).toBe(true);
});

test("Update the User Role: ", async () => {
	let user = new User("devtest", User_Roles.ADMIN, "909090900", "test");
	let resualt = await changeUserRole(userId, user);
	expect(resualt.success).toBe(true);

});

test("Update the User Profile: ", async () => {
	let user = new User("devtest", User_Roles.SUPER_ADMIN, "909090900", "Ali");
	let resualt = await updateUserProfile(userId, user);
	expect(resualt.success).toBe(true);

});

test("Get user by ID : ", async () => {
	let result = await getUserById(userId);
	expect(result.success).toBe(true);
});

test("Get user by username : ", async () => {
	let result = await getUserByUsername("devtest");
	expect(result.success).toBe(true);
});

test("Get All Users :  ", async () => {
	let resualt = await getAllUsers();
	console.log(AdvertisementOptions());
	expect(resualt.success).toBe(true);
});

test("Check user roles :  ", async () => {
	let result = await getUserByUsername("devtest");
	expect(checkTypeUserRoles(result.data._role)).toBe(true);
});
