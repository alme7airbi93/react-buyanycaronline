import Vehicle from "./Vehicle";
import User from "./User";

class Boat extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1,
		category = -1, length = -1, hours = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region);

		this._category = category;
		this._length = length;
		this._hours = hours;
	}


	get category() {
		return this._category;
	}

	set category(value) {
		this._category = value;
	}

	get length() {
		return this._length;
	}

	set length(value) {
		this._length = value;
	}

	get hours() {
		return this._hours;
	}

	set hours(value) {
		this._hours = value;
	}
}
export default Boat;
