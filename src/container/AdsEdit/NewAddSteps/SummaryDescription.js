import {Button, Col, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import Select from "react-select";
import {Advertisement_states} from "../../../common/data/Advertisement_states.js";
import {AdvertisementOptions, } from "../../../common/data/SelectOptions.js";
import {StepsStateInMainCategory} from "../stepsState";
import {NewAdvertisement, UserContext} from "../../../context/Context";

import Accessories from "../../../common/models/Accessories.js";
import Boat from "../../../common/models/Boat.js";
import Car from "../../../common/models/Car.js";
import HeavyVehicle from "../../../common/models/HeavyVehicle.js";
import Motorcycle from "../../../common/models/Motorcycle.js";
import PlateNumber from "../../../common/models/PlateNumber.js";
import {Advertisement_Types} from "../../../common/data/Advertisement_Types.js";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdvertisementById } from "../../../common/repository/AdvertisementDB.js";


const SummaryDescription = (props) => {

	// eslint-disable-next-line no-unused-vars
	const adsCtx =  useContext(AdvertismentCtx)
	const ctx  = useContext(UserContext);
	const user = ctx.getUserData();
	const params = useParams();
	
	let [title, setTitle] = useState();
	let [price, setPrice] = useState();
	let [desc, setDesc] = useState();
	let [type, setType] = useState();


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

	useEffect(()=>{
		getAdvertisementById(params.id).then(()=>{
			const adver = checkAdvertisemntType(res.data)
			adsCtx.setAds(adver)

		})

	},[])
	

	const handler=()=>{
		if (!title.length) {
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
		console.log(adver)
		props.nextStep(StepsStateInMainCategory);
	};

	return(
		<React.Fragment>
			<Col md={5} className="news_ads_details">
				<h5>Advertisement Summary{title}</h5>
				<hr/>
				<Form>
					<Form.Group className="mb-3" >
						<Form.Label style={{color: "#fff"}}>Title :</Form.Label>
						<Form.Control className="input-fields-theme" type="text" value={title} placeholder="Enter Title" onChange={data=>{
							setTitle(data.target.value);
						}}/>
					</Form.Group>

					<Form.Group className="md-3">
						<Form.Label style={{color: "#fff"}}>Select Advertisement Category :</Form.Label>
						<div className="mb-3">
							<Select
								placeholder = {"Select Motors"}
								options={AdvertisementOptions()}
								value={AdvertisementOptions().find(obj=> obj.label === type)}
								isSearchable={false}
								onChange={data => {
									setType(data.label);}}
							/>
						</div>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label style={{color: "#fff"}}>Price :</Form.Label>
						<Form.Control className="input-fields-theme" type="number" placeholder="Enter Price" value={price} onChange={data=>{
							setPrice(parseFloat(data.target.value));
						}}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label style={{color: "#fff"}}>Description :</Form.Label>
						<Form.Control className="input-fields-theme" as="textarea" rows={3} value={desc} placeholder="Description" onChange={data => {
							setDesc(data.target.value);
						}}/>
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
