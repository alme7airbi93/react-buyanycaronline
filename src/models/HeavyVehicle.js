import Vehicle from "./Vehicle";
import User from "./User";

class HeavyVehicle extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1, vehicleType = -1,
		numberOfCylinders = -1, capacityWeight = -1, category = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region, vehicleType);

		this._numberOfCylinders = numberOfCylinders;
		this._capacityWeight = capacityWeight;
		this._category = category;
	}


	get numberOfCylinders() {
		return this._numberOfCylinders;
	}

	set numberOfCylinders(value) {
		this._numberOfCylinders = value;
	}

	get capacityWeight() {
		return this._capacityWeight;
	}

	set capacityWeight(value) {
		this._capacityWeight = value;
	}

	get category() {
		return this._category;
	}

	set category(value) {
		this._category = value;
	}
}

export default HeavyVehicle;
