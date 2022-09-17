/* eslint-disable */
import {createAdvertisement,advertisementStatusChange,fetchAdvertisement} from "../repository/AdvertisementDB.js";
import Advertisement from "../models/Advertisement";
import User from "../models/User";
import Car from "../models/Car";
import Motorcycle from "../models/Motorcycle";
import HeavyVehicle from "../models/HeavyVehicle";
import Boat from "../models/Boat";
import PlateNumber from "../models/PlateNumber";
import Accessories from "../models/Accessories"
let customer_type=new User("dev","customer","9090909090","singh");
// eslint-disable-next-line no-undef
test("Create a Car Advertisement : ", async () => {
	let advetise_info =new Car("My Car","Car Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,1,40000,"Metalic",7653636,4,1400);
	await expect(createAdvertisement(advetise_info)).resolves.toBe(true);

});
test("Create a Motorcycle Advertisement : ", async () => {
	let advetise_info =new Motorcycle("My Motorcycles","Motorcycles Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,2,350,35000,1);
	await expect(createAdvertisement(advetise_info)).resolves.toBe(true);

});
test("Create a HeavyVehicle Advertisement : ", async () => {
	let advetise_info =new HeavyVehicle("My HeavyVehicle","Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,3,6,"200T",1);
	await expect(createAdvertisement(advetise_info)).resolves.toBe(true);

});
test("Create a Boat Advertisement : ", async () => {
	let advetise_info =new Boat("My Boat","Boat Description",1200,{city:"Delhi"},customer_type,"",1,2,1,4,10,["fine","excellent"],"Grey",2016,true,1,true,98701,4,1,"25 Meter",60);
	await expect(createAdvertisement(advetise_info)).resolves.toBe(true);

});
test("Create a PlateNumber Advertisement : ", async () => {
	let advetise_info =new PlateNumber("My PlateNumber","PlateNumber Description",1200,{city:"Delhi"},customer_type,"",2,20,1,5,9090900,89);
	await expect(createAdvertisement(advetise_info)).resolves.toBe(true);

});
test("Create a Accessories Advertisement : ", async () => {
	let advetise_info = new Accessories("My Accessories","Accessories Description",1200,{city:"Delhi"},customer_type,"",3,20,1,2,5,2018,"Gear Box");
	await expect(createAdvertisement(advetise_info)).resolves.toBe(true);

});

test("Update the Advertisement Status: ", async () => {
    let advertId="3gWFmI4jzG2MR3BVTR6r";
	let advetise_info =new Advertisement("My Car","Car Description",1200,{city:"Delhi"},customer_type,"",1,2,1);
	await expect(advertisementStatusChange(advertId,advetise_info)).resolves.toBe(true);

});

//test("Fetch the Advertisement Based on Type: ", async () => {
//	let advetise_info =new Advertisement("My Car","Car Description",1200,{city:"Delhi"},customer_type,"",1,2,1);
//	await expect(fetchAdvertisement(advetise_info)).resolves.toBe(true);
//});


