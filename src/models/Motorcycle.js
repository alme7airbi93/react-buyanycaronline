import Vehicle from "./Vehicle";
import User from "./User";

class Motorcycle extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1, vehicleType = -1,
		engineSize= -1, distance= -1, category = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region, vehicleType);
		this._engineSize = engineSize;
		this._distance = distance;
		this._category = category;
	}


	get engineSize() {
		return this._engineSize;
	}

	set engineSize(value) {
		this._engineSize = value;
	}

	get distance() {
		return this._distance;
	}

	set distance(value) {
		this._distance = value;
	}

	get category() {
		return this._category;
	}

	set category(value) {
		this._category = value;
	}
}

export default Motorcycle;
