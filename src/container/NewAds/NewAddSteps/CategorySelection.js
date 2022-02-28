import {Button, Col, Row, Form} from "react-bootstrap";
import Select from "react-select";
import React, { useState } from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";
import { NewAdvertisement } from "../../../context/Context";
import { Locations, Owners, Views, States } from "../../../globals";

const CategorySelection = (props) => {
	
	const [advertisement, setAdvertisement] = useState(NewAdvertisement)

	const Next = () => {
		console.log(advertisement)
		setAdvertisement(advertisement)
	}

	return(
		<React.Fragment>
			<Col md={5} className="find_details">
				<h5>FIND</h5>
				<hr/>
				<Row  className="justify-content-center">
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Location :</Form.Label>
							<Select 
								placeholder="Location"
								options={Locations}
								value={advertisement.location}
								onChange={(value) => {
									advertisement.location = value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Owner :</Form.Label>
							<Select 
								placeholder="Owner"
								options={Owners}
								value={advertisement.owner}
								onChange={(value) => {
									advertisement.owner = value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Views :</Form.Label>
							<Select 
								placeholder="Views"
								options={Views}
								value={advertisement.views}
								onChange={(value) => {
									advertisement.views = value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>State :</Form.Label>
							<Select 
								placeholder="State"
								options={States}
								value={advertisement.state}
								onChange={(value) => {
									advertisement.state = value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Owner_PhoneNumber :</Form.Label>
							<Form.Control 
								type="text" 
								placeholder="Enter Onwer PhoneNumber" 
								value={advertisement.owner_phone}
								onChange={(event) => {
									advertisement.owner_phone = event.target.value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Photos :</Form.Label>
							<Form.Control 
								type="file" 
								placeholder="Enter Onwer PhoneNumber" 
								onChange={(event) => {
									advertisement.photos = event.target.files[0]
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10} className="btn-group" >
						<Button className="back_btn" onClick={() => props.onClick(StepsStateInSummary)}>
							Back
						</Button>
						<Button className="next_btn" onClick={Next}>
							Next
						</Button>
					</Col>
				</Row>
			</Col>
		</React.Fragment>
	)
}

export default CategorySelection;
