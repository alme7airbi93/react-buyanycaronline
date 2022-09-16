import Advertisement from "./Advertisement";
import User from "./User";

class PlateNumber extends Advertisement {
	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		city = -1, number = -1, numberCode = -1){
		super(title, description, price, location, owner, photos, advertisement_type, views, stat);

		this._city = city;
		this._number = number;
		this._numberCode = numberCode;
	}


	get city() {
		return this._city;
	}

	set city(value) {
		this._city = value;
	}

	get number() {
		return this._number;
	}

	set number(value) {
		this._number = value;
	}

	get numberCode() {
		return this._numberCode;
	}

	set numberCode(value) {
		this._numberCode = value;
	}
}
export default PlateNumber;
