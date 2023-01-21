import {Button, Col, Form} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import {Advertisement_states} from "../../../common/data/Advertisement_states.js";
import {AdvertisementOptions, } from "../../../common/data/SelectOptions.js";
import {StepsStateInMainCategory} from "../stepsState";
import { UserContext} from "../../../context/Context";

import Accessories from "../../../common/models/Accessories.js";
import Boat from "../../../common/models/Boat.js";
import Car from "../../../common/models/Car.js";
import HeavyVehicle from "../../../common/models/HeavyVehicle.js";
import Motorcycle from "../../../common/models/Motorcycle.js";
import PlateNumber from "../../../common/models/PlateNumber.js";
import {Advertisement_Types} from "../../../common/data/Advertisement_Types.js";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";

const SummaryDescription = (props) => {

	// eslint-disable-next-line no-unused-vars
	const adsCtx =  useContext(AdvertismentCtx);
	const advertisement = adsCtx.ads;
	const ctx  = useContext(UserContext);
	const user = ctx.getUserData();

	let [title, setTitle] = useState(advertisement._title);
	let [price, setPrice] = useState(advertisement._price);
	let [desc, setDesc] = useState(advertisement._description);
	let [type, setType] = useState(advertisement._advertisement_type);

	let [errors, setErrors] = useState({
		errors:false,
		titleError:"",
		priceError:"",
		descriptionError:"",
		typeError:"",
	});

	const checkAdvertisemntType = () => {
		console.log(type);
		if (type === Advertisement_Types.Cars) {
			return new Car(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		} else if (type === Advertisement_Types.Motorcycles) {
			return new Motorcycle(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		} else if (type === Advertisement_Types.HeavyVehicles) {
			return new HeavyVehicle(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		} else if (type === Advertisement_Types.Boats) {
			return new Boat(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		} else if (type === Advertisement_Types.PlateNumber) {
			return new PlateNumber(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		} else if (type === Advertisement_Types.Accessories) {
			return new Accessories(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		} else throw Error("Not an Advertisement"+JSON.stringify(type));
	};
	

	const handler=()=>{
		if (!title) {
			alert("please enter title");
			return;
		}

		if (!price) {
			alert("please enter price");
			return;
		}
		if (!type) {
			alert("please select type");
			return;
		}
		
		let adver = checkAdvertisemntType();
		adsCtx.setAds(adver);
		console.log(adver);
		props.nextStep(StepsStateInMainCategory);
	};

	useEffect(() => {
		// if(!title){
		// 	setErrors({...errors,titleError:true})
		// }
		// else{
		// 	setErrors({...errors,titleError:false})
		// }
	},[setTitle]);

	const handleValidate = (value,label) => {
		if(value === ""){
			if(label === "title"){
				setErrors({...errors,titleError:true});
			}
			else if(label === "price"){
				setErrors({...errors,priceError:true});
			}
			else if(label === "desc"){
				setErrors({...errors,descriptionError:true});
			}
			else{
				setErrors({...errors,typeError:true});
			}
			
		}
		else{
			if(label === "title"){
				setErrors({...errors,titleError:false});
			}
			else if(label === "price"){
				setErrors({...errors,priceError:false});
			}
			else if(label === "desc"){
				setErrors({...errors,descriptionError:false});
			}
			else{
				setErrors({...errors,typeError:false});
			}
		}
	};

	return(
		<React.Fragment>
			<Col md={5} className="news_ads_details">
				<h5>Advertisement Summary</h5>
				<hr/>
				<Form>
					<Form.Group className="mb-3" >
						<Form.Label style={{color: "#fff"}}>Title :</Form.Label>
						<Form.Control className="input-fields-theme" type="text" value={title} placeholder="Enter Title" onChange={data=>{
							setTitle(data.target.value);
							handleValidate(data.target.value,"title");
						}}/>
						{errors && errors.titleError === true ? (
							<small style={{color:"red"}}>Please enter title.</small>
						):(<></>)}
					</Form.Group>


					<Form.Group className="md-3">
						<Form.Label style={{color: "#fff"}}>Select Advertisement Category :</Form.Label>
						<div className="mb-3">
							<Select
								placeholder = {"Select Motors"}
								options={AdvertisementOptions()}
								value={AdvertisementOptions().find(obj=> obj.label === type)}
								// isSearchable={true}
								isClearable={true}
								onChange={data => {
										setType(data.label);
										handleValidate(data.target.value,"category");	
									}
								}
							/>
						</div>
						{errors.typeError === true ? (
							<small style={{color:"red"}}>Please select category.</small>
						):(<></>)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label style={{color: "#fff"}}>Price :</Form.Label>
						<Form.Control className="input-fields-theme" type="number" placeholder="Enter Price" value={price} onChange={data=>{
							setPrice(parseFloat(data.target.value));
							handleValidate(data.target.value,"price");	
						}}/>
						{errors.priceError === true ? (
							<small style={{color:"red"}}>Please enter price.</small>
						):(<></>)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label style={{color: "#fff"}}>Description :</Form.Label>
						<Form.Control className="input-fields-theme" as="textarea" rows={3} value={desc} placeholder="Description" onChange={data => {
							setDesc(data.target.value);
							handleValidate(data.target.value,"desc");	
						}}/>
						{errors.descriptionError === true ? (
							<small style={{color:"red"}}>Please enter description.</small>
						):(<></>)}
					</Form.Group>
					<Form.Group className="mb-3">
						{/* eslint-disable-next-line react/prop-types */}
						<Button className="next_btn" onClick={()=>{ handler();}}>Next</Button>
					</Form.Group>
				</Form>
			</Col>
		</React.Fragment>
	);
};

export default SummaryDescription;
