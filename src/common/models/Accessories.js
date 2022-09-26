import Advertisement from "./Advertisement.js";
import User from "./User.js";

class Accessories extends Advertisement {
	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,vehicle_make  = -1, vehicle_model  = -1, vehicle_year = -1,accessory_name =""){

		super(title, description, price, location, owner, photos, advertisement_type, views, stat);
		this._vehicle_make = vehicle_make;
		this._vehicle_model = vehicle_model;
		this._vehicle_year = vehicle_year;
		this._accessory_name = accessory_name;
		Object.preventExtensions(this);
	}


	get vehicle_make() {
		return this._vehicle_make;
	}

	set vehicle_make(value) {
		this._vehicle_make = value;
	}

	get vehicle_model() {
		return this._vehicle_model;
	}

	set vehicle_model(value) {
		this._vehicle_model = value;
	}

	get vehicle_year() {
		return this._vehicle_year;
	}

	set vehicle_year(value) {
		this._vehicle_year = value;
	}
	get accessory_name() {
		return this._accessory_name;
	}

	set accessory_name(value) {
		this._accessory_name = value;
	}
}
export default Accessories;
