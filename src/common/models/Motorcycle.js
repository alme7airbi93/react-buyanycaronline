import Vehicle from "./Vehicle.js";
import User from "./User.js";

class Motorcycle extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1,
		engineSize= -1, distance= -1,bodyType = -1, category = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region);
		this._engineSize = engineSize;
		this._distance = distance;
		this._category = category;
		this._bodyType = bodyType;
		Object.preventExtensions(this);
	}

	get bodyType() {
		return this._bodyType;
	}

	set bodyType(value) {
		this._bodyType = value;
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

	getAlldata (){
		return{
			title:this.title,
			advertisement_type: this.advertisement_type,
			make:this.make,
			modal:this.modal,
			year:this.year,
			price:this.price,
			views:this.views,
			fuel_type: this.fuel_type,
			distance:this.distance,
			bodyType : this.bodyType,
			color: this.color,
			condition: this.condition,
			region:this.region,
			warranty:this.warranty,
			description: this.description,
			
		}

	}
}

export default Motorcycle;
