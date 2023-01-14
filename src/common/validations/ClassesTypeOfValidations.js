import {Advertisement_Types} from "../data/Advertisement_Types.js";
import Accessories from "../models/Accessories.js";
import Boat from "../models/Boat.js";
import Car from "../models/Car.js";
import HeavyVehicle from "../models/HeavyVehicle.js";
import Motorcycle from "../models/Motorcycle.js";
import PlateNumber from "../models/PlateNumber.js";
import User from "../models/User.js";

// Used for preSave
export const checkTypeOfUser = (val) => {
	if(Object.getPrototypeOf(val) === Object.getPrototypeOf(new User())){
		return true;
	}else {
		throw Error("Not a User ! ");
	}
};

// User for preSave
export const checkTypeOfAdvertisement = (val) => {
	if (Object.getPrototypeOf(val) === Object.getPrototypeOf(new Car())) {
		return true;
	} else if (Object.getPrototypeOf(val) === Object.getPrototypeOf(new Motorcycle())) {
		return true;
	} else if (Object.getPrototypeOf(val) === Object.getPrototypeOf(new Accessories())) {
		return true;
	} else if (Object.getPrototypeOf(val) === Object.getPrototypeOf(new Boat())) {
		return true;
	} else if (Object.getPrototypeOf(val) === Object.getPrototypeOf(new HeavyVehicle())) {
		return true;
	} else if (Object.getPrototypeOf(val) === Object.getPrototypeOf(new PlateNumber())) {
		return true;
	} else throw Error("Not an Advertisement");
};

// Used when get data from DB
export const checkAdvertisemntType = (value) => {
	if (value._advertisement_type === Advertisement_Types.Cars) {
		return new Car();
	} else if (value._advertisement_type === Advertisement_Types.Motorcycles) {
		return new Motorcycle();
	} else if (value._advertisement_type === Advertisement_Types.HeavyVehicles) {
		return new HeavyVehicle();
	} else if (value._advertisement_type === Advertisement_Types.Boats) {
		return new Boat();
	} else if (value._advertisement_type === Advertisement_Types.PlateNumber) {
		return new PlateNumber();
	} else if (value._advertisement_type === Advertisement_Types.Accessories) {
		return new Accessories();
	} else throw Error("Not an Advertisement"+JSON.stringify(value));
};
