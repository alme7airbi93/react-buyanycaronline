import Advertisement from "./Advertisement.js";
import User from "./User.js";

class PlateNumber extends Advertisement {
	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		city = -1, number = -1, numberCode = -1){
		super(title, description, price, location, owner, photos, advertisement_type, views, stat);

		this._city = city;
		this._number = number;
		this._numberCode = numberCode;
		Object.preventExtensions(this);
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

	getAlldata (){
		return{
			title:this.title,
			description: this.description,
			advertisement_type: this.advertisement_type,
			price:this.price,
			views:this.views,
			city:this.city,
			number:this.number,
			numberCode: this.numberCode
		}

	}
}
export default PlateNumber;
