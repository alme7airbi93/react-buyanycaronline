import Advertisement from "../models/Advertisement.js";
import User from "../models/User.js";

export const checkTypeOfUser = (val) => {
	return Object.getPrototypeOf(val) === Object.getPrototypeOf(new User());
};

export const checkTypeOfAdvertisement = (val) => {
	return Object.getPrototypeOf(val) === Object.getPrototypeOf(new Advertisement());
};
