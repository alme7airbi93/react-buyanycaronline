class User {


	constructor(username = "", role = -1, phone = "", surename = "",signInMethod = undefined) {
		this._id = "";
		this._username = username;
		this._role = role;
		this._phone = phone;
		this._surename = "";
		this._surename = surename;
		this._signInMethod = [signInMethod];
		Object.preventExtensions(this);
	}


	get id() {
		return this._id;
	}

	set id(value) {
		this._id = value;
	}

	get username() {
		return this._username;
	}

	set username(value) {
		this._username = value;
	}

	get role() {
		return this._role;
	}

	set role(value) {
		this._role = value;
	}

	get phone() {
		return this._phone;
	}

	set phone(value) {
		this._phone = value;
	}

	get surename() {
		return this._surename;
	}

	set surename(value) {
		this._surename = value;
	}

}


export default User;
