import {Advertisement_Types} from "./Advertisement_Types.js";
import {Boat_Types} from "./Boat_Types";
import {Heavy_Vehicle_Types} from "./Heavy_Vehicle_Types";
import {Motorcycle_Types} from "./Motorcycle_Types";


export const AdvertisementOptions = ()=>{
	let options = [];
	for (const [key, val] of Object.entries(Advertisement_Types)) {
		options.push({value: key, label: val});
	}
	return options;
};

export const BoatOptions = ()=>{
	let options = [];
	for (const [key, val] of Object.entries(Boat_Types)) {
		options.push({value: key, label: val});
	}
	return options;
};

export const MotorcycleOptions = ()=>{
	let options = [];
	for (const [key, val] of Object.entries(Motorcycle_Types)) {
		options.push({value: key, label: val});
	}
	return options;
};

export const HeavyVehicleOptions = ()=>{
	let options = [];
	for (const [key, val] of Object.entries(Heavy_Vehicle_Types)) {
		options.push({value: key, label: val});
	}
	return options;
};