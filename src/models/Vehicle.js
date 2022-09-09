import Advertisement from "./Advertisement";
import User from "./User";

class Vehicle extends Advertisement {
	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1, vehicleType = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat);
		this._make = make;
		this._modal = modal;
		this._features =features;
		this._color = color;
		this._year = year;
		this._condition = condition;
		this._fuel_type = fuel_type;
		this._warranty = warranty;
		this._region = region;
		this._vehicleType = vehicleType;
	}


	get make() {
		return this._make;
	}

	set make(value) {
		this._make = value;
	}

	get modal() {
		return this._modal;
	}

	set modal(value) {
		this._modal = value;
	}

	get features() {
		return this._features;
	}

	set features(value) {
		this._features = value;
	}

	get color() {
		return this._color;
	}

	set color(value) {
		this._color = value;
	}

	get year() {
		return this._year;
	}

	set year(value) {
		this._year = value;
	}

	get condition() {
		return this._condition;
	}

	set condition(value) {
		this._condition = value;
	}

	get fuel_type() {
		return this._fuel_type;
	}

	set fuel_type(value) {
		this._fuel_type = value;
	}

	get warranty() {
		return this._warranty;
	}

	set warranty(value) {
		this._warranty = value;
	}

	get region() {
		return this._region;
	}

	set region(value) {
		this._region = value;
	}

	get vehicleType() {
		return this._vehicleType;
	}

	set vehicleType(value) {
		this._vehicleType = value;
	}
}

export default Vehicle;
