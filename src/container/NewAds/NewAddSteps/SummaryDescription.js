import {Button, Col, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import Select from "react-select";
import {Advertisement_states} from "../../../common/data/Advertisement_states.js";
import {AdvertisementOptions} from "../../../common/data/SelectOptions.js";
import Advertisement from "../../../common/models/Advertisement.js";
// import Select from "react-select";
// import {AdvertisementOptions} from "../../../common/data/SelectOptions.js";
import {StepsStateInMainCategory} from "../stepsState";
import {NewAdvertisement, UserContext} from "../../../context/Context";

const SummaryDescription = (props) => {

	// eslint-disable-next-line no-unused-vars
	const [advertisement, setAdvertisement] = useContext(NewAdvertisement);
	const [user]  = useContext(UserContext);

	let [title, setTitle] = useState(advertisement._title);
	let [price, setPrice] = useState(advertisement._price);
	let [desc, setDesc] = useState(advertisement._description);
	let [type, setType] = useState(advertisement._advertisement_type);

	const handler=()=>{
		if (!title.length) {
			alert("please enter title")
			return;
		}

		if (!price) {
			alert("please enter price")
			return;
		}
		if (!type) {
			alert("please select type")
			return;
		}

		let adver = new Advertisement(title, desc, price, {}, user, [], type, 0, Advertisement_states.Pending);
		setAdvertisement(adver);
		props.onClick(StepsStateInMainCategory);
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
						}}/>
					</Form.Group>

					<Form.Group className="md-3">
						<Form.Label style={{color: "#fff"}}>Select Advertisement Category :</Form.Label>
						<div className="mb-3">
							<Select
								placeholder = {"Select Motors"}
								options={AdvertisementOptions()}
								value={AdvertisementOptions().find(obj=> obj.value === type)}
								isSearchable={false}
								onChange={data => {
									setType(data.value);}}
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
