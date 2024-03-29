/**
 * @jest-environment node
 */


import {Advertisement_states} from "../common/data/Advertisement_states.js";
import {Advertisement_Types} from "../common/data/Advertisement_Types.js";
/* eslint-disable */
import {
	createAdvertisement,
	advertisementStatusChange,
	getAllAdvertisement,
	getAdvertisementById
} from "../common/repository/AdvertisementDB.js";
import Advertisement from "../common/models/Advertisement";
import User from "../common/models/User";
import Car from "../common/models/Car";
import Motorcycle from "../common/models/Motorcycle";
import HeavyVehicle from "../common/models/HeavyVehicle";
import Boat from "../common/models/Boat";
import PlateNumber from "../common/models/PlateNumber";
import Accessories from "../common/models/Accessories";
import {getUserByUsername} from "../common/repository/UserDB.js";


var advert_id = "";

// eslint-disable-next-line no-undef
test("Create a Car Advertisement : ", async () => {
	let owner = await getUserByUsername("devtest");
	let advetise_info = new Car("My Car", "Car Description", 1200, {city: "Delhi"}, owner.data, "", Advertisement_Types.Cars, 2, 1, 4, 10, ["fine", "excellent"], "Grey", 2016, true, 1, true, 98701, 1, 40000, "Metalic", 7653636, 4, 1400);
	let result = await createAdvertisement(advetise_info);
	advert_id = result.advert_id;
	expect(result.success).toBe(true);

});

test("Create a Motorcycle Advertisement : ", async () => {
	let owner = await getUserByUsername("devtest");
	let advetise_info = new Motorcycle("My Motorcycles", "Motorcycles Description", 1200, {city: "Delhi"}, owner.data, "", Advertisement_Types.Motorcycles, 2, 1, 4, 10, ["fine", "excellent"], "Grey", 2016, true, 1, true, 98701, 2, 350, 35000, 1);
	let result = await createAdvertisement(advetise_info);
	advert_id = result.advert_id;
	expect(result.success).toBe(true);

});

test("Create a HeavyVehicle Advertisement : ", async () => {
	let owner = await getUserByUsername("devtest");
	let advetise_info = new HeavyVehicle("My HeavyVehicle", "Description", 1200, {city: "Delhi"}, owner.data, "", Advertisement_Types.HeavyVehicles, 2, 1, 4, 10, ["fine", "excellent"], "Grey", 2016, true, 1, true, 98701, 3, 6, "200T", 1);
	let result = await createAdvertisement(advetise_info);
	advert_id = result.advert_id;
	expect(result.success).toBe(true);

});

test("Create a Boat Advertisement : ", async () => {
	let owner = await getUserByUsername("devtest");
	let advetise_info = new Boat("My Boat", "Boat Description", 1200, {city: "Delhi"}, owner.data, "", Advertisement_Types.Boats, 2, 1, 4, 10, ["fine", "excellent"], "Grey", 2016, true, 1, true, 98701, 4, 1, "25 Meter", 60);
	let result = await createAdvertisement(advetise_info);
	advert_id = result.advert_id;
	expect(result.success).toBe(true);

});

test("Create a PlateNumber Advertisement : ", async () => {
	let owner = await getUserByUsername("devtest");
	let advetise_info = new PlateNumber("My PlateNumber", "PlateNumber Description", 1200, {city: "Delhi"}, owner.data, "", Advertisement_Types.PlateNumber, 20, 1, 5, 9090900, 89);
	let result = await createAdvertisement(advetise_info);
	advert_id = result.advert_id;
	expect(result.success).toBe(true);

});

test("Create a Accessories Advertisement : ", async () => {
	let owner = await getUserByUsername("devtest");
	let advetise_info = new Accessories("My Accessories", "Accessories Description", 1200, {city: "Delhi"}, owner.data, "", Advertisement_Types.Accessories, 20, 1, 2, 5, 2018, "Gear Box");
	let result = await createAdvertisement(advetise_info);
	advert_id = result.data;
	expect(result.success).toBe(true);

});

test("Update the Advertisement Status: ", async () => {
	let result = await advertisementStatusChange(advert_id, Advertisement_states.Pending);
	expect(result.success).toBe(true);
});

test("Get Advertisement By  ID: ", async () => {
	let result = await getAdvertisementById(advert_id);
	await expect(result.success).toBe(true);
});

test("Get All Advertisements : ", async () => {
	let results = await getAllAdvertisement();
	expect(results.success).toBe(true);
});




