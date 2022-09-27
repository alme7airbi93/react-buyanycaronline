import {Button, Col, Row} from "react-bootstrap";
// import Select from "react-select";
import React, {useState, useContext} from "react";
// import {AdvertisementOptions} from "../../../common/data/SelectOptions.js";
import {StepsStateInSummary, StepsStateInDetail} from "../stepsState";
// import { makes, models ,models_second} from "../../../common/data";
import {NewAdvertisement} from "../../../context/Context";
import Carsform from "./forms/cars"
import Motorcycleform from "./forms/motorcycle"
import Plate_Numberform from "./forms/Plate_Number"
import Accessory_nameform from "./forms/accessory_name "
import Boatform from "./forms/boat"
import Vehicleform from "./forms/vehicle"

const CategorySelection = (props) => {
	const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

	// let makes_options = makes();
	// let models_options = models();
	// let models_second_options = models_second();

	// let [isMakeDropdown, setMakeDropdown] = useState(false);
	// let [isTypeDropdown, setTypeDropdown] = useState(false);
	// let [isModelDropdown, setModelDropdown] = useState(false);

	// const [vehicleValue, setVehicle] = useState("");
	// const [makeValue, setMake] = useState("");
	// const [modelFirstValue, setModelFirst] = useState("");
	// const [modelSecondValue, setModelSecond] = useState("");

	const handler=()=>{
		if (advertisement.type===undefined)
		{
			setAdvertisement({...advertisement, "type":{"kind": " "}});
		}
	};
	console.log(advertisement,"--advertisement--")
	return(
		<React.Fragment>
			<Col md={5} className="find_details">
				<h5>FIND</h5>
				<hr/>
				<Row className="">
					<Col md="12">
					{
						advertisement._advertisement_type === "Cars"?
						<Carsform /> :
						advertisement._advertisement_type === "Heavy Vehicles"?
						<Vehicleform /> :
						advertisement._advertisement_type === "Motorcycles"?
						<Motorcycleform /> :
						advertisement._advertisement_type === "Plate Numbers"?
						<Plate_Numberform /> :
						advertisement._advertisement_type === "Accessories"?
						<Accessory_nameform /> :
						advertisement._advertisement_type === "Boats"?
						<Boatform /> : null
					}
					</Col>
					
					<Col md={10} className="btn-group" >
						<Button right className="back_btn" onClick={() => props.onClick(StepsStateInSummary)} >Back</Button>
						<Button className="next_btn" onClick={() => { handler();props.onClick(StepsStateInDetail);}} >Next</Button>
					</Col>
				</Row>
			</Col>
		</React.Fragment>
	);
};

export default CategorySelection;
