import Vehicle from "./Vehicle";
import User from "./User";

class Car extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1, vehicleType = -1,
		distance = -1, bodyType = -1, transmission = -1, numberOfCylinders= -1, horsePower = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region, vehicleType);

		this._distance = distance;
		this._bodyType = bodyType;
		this._transmission = transmission;
		this._numberOfCylinders = numberOfCylinders;
		this._horsePower = horsePower;
	}


	get distance() {
		return this._distance;
	}

	set distance(value) {
		this._distance = value;
	}

	get bodyType() {
		return this._bodyType;
	}

	set bodyType(value) {
		this._bodyType = value;
	}

	get transmission() {
		return this._transmission;
	}

	set transmission(value) {
		this._transmission = value;
	}

	get numberOfCylinders() {
		return this._numberOfCylinders;
	}

	set numberOfCylinders(value) {
		this._numberOfCylinders = value;
	}

	get horsePower() {
		return this._horsePower;
	}

	set horsePower(value) {
		this._horsePower = value;
	}
}
