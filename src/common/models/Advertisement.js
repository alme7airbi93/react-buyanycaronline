import User from "./User.js";

class Advertisement {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = new User(), photos = [], advertisement_type = -1, views = -1, stat= -1) {
		this._title = title;
		this._description = description;
		this._price = price;
		this._location = location;
		this._owner = owner;
		this._photos = photos;
		this._advertisement_type = advertisement_type;
		this._views = views;
		this._status = stat;
	}


	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
	}

	get description() {
		return this._description;
	}

	set description(value) {
		this._description = value;
	}

	get price() {
		return this._price;
	}

	set price(value) {
		this._price = value;
	}

	get location() {
		return this._location;
	}

	set location(value) {
		this._location = value;
	}

	get owner() {
		return this._owner;
	}

	set owner(value) {
		this._owner = value;
	}

	get photos() {
		return this._photos;
	}

	set photos(value) {
		this._photos = value;
	}

	get advertisement_type() {
		return this._advertisement_type;
	}

	set advertisement_type(value) {
		this._advertisement_type = value;
	}

}

export default Advertisement;
