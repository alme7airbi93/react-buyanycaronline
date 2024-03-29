import Vehicle from "./Vehicle.js";
import User from "./User.js";

class HeavyVehicle extends Vehicle {

	constructor(title = "", description = "", price = 0.0, location = {}, owner = User, photos = [""], advertisement_type = -1, views = -1, stat= -1,
		make = -1, modal = -1, features = [""], color = "", year = -1, condition = false, fuel_type = -1, warranty = false, region = -1,
		numberOfCylinders = -1, capacityWeight = -1, category = -1) {
		super(title, description, price, location, owner, photos, advertisement_type, views, stat,
			make, modal, features, color, year, condition, fuel_type, warranty, region);

		this._numberOfCylinders = numberOfCylinders;
		this._capacityWeight = capacityWeight;
		this._category = category;
		this._make = make;
		Object.preventExtensions(this);
	}

	get make() {
		return this._make;
	}

	set make(value) {
		this._make = value;
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

	getAlldata (){
		return{
			title:this.title,
			make : this.make,
			advertisement_type: this.advertisement_type,
			modal:this.modal,
			year:this.year,
			price:this.price,
			views:this.views,
			fuel_type: this.fuel_type,
			numberOfCylinders : this.numberOfCylinders,
			color: this.color,
			condition: this.condition,
			region:this.region,
			warranty:this.warranty,
			description: this.description,
			
		}

	}
}

export default HeavyVehicle;
