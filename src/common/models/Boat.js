import Vehicle from "./Vehicle.js";
import User from "./User.js";

class Boat extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1,
		length = -1, hours = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region);

		this._make = make;
		this._length = length;
		this._hours = hours;
		Object.preventExtensions(this);
	}


	get make() {
		return this._make;
	}

	set make(value) {
		this._make = value;
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

	getAlldata (){
		return{
			title:this.title,
			advertisement_type: this.advertisement_type,
			make : this.make,
			length:this.length,
			_hours:this._hours,
			price:this.price,
			color: this.color,
			year:this.year,
			fuel_type: this.fuel_type,
			region:this.region,
			condition: this.condition,
			warranty:this.warranty,
			views:this.views,
			description: this.description,
			
		}

	}
}
export default Boat;
