import {Button, Col, Row, Form} from "react-bootstrap";
import Select from "react-select";
import React, { useState } from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";
import { NewAdvertisement } from "../../../context/Context";
import { vehicles, makes, models } from "../../../data/Enums";

const CategorySelection = (props) => {
	
	const [advertisement, setAdvertisement] = useState(NewAdvertisement)

	const [vehiclesValue, setVerhiclesValue] = useState('')
	const [makesValue, setMakesValue] = useState('')
	const [modelsValue, setModelsValue] = useState('')

	const Next = () => {
		setAdvertisement(advertisement)
	}

	let vehicels_options = vehicles();
	let makes_options = makes();	
	let models_options = models();

	return(
		<React.Fragment>
			<Col md={5} className="find_details">
				<h5>FIND</h5>
				<hr/>
				<Row  className="justify-content-center">
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Vehicles :</Form.Label>
							<Select
								placeholder = {'Select Motors'}
								isSearchable={false}
								value={advertisement.vehicles}
								options={vehicels_options}
								onChange={(value) => {
									setVerhiclesValue(value)
									advertisement.vehicles = value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Makes :</Form.Label>
							<Select
								placeholder = {vehiclesValue.value === undefined ? 'Select....' : vehiclesValue.value === "1" ? 'Select Makes' : 'Select Types'}
								isSearchable={false}
								value= {advertisement.makes}
								options={makes_options.filter(item => (item.value === "0" || (item.parent_id === vehiclesValue.value )))}
								onChange={(value) => {
									setMakesValue(value)
									advertisement.makes = value
									setAdvertisement(advertisement)
								}}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Form.Label style={{color: '#fff'}}>Models :</Form.Label>
							<Select
								placeholder = {makesValue.value === undefined ? 'Select....' : vehiclesValue.value === "1" ? 'Select Models' : 'Select Types'}
								isSearchable={false}
								value= {advertisement.models}
								options={models_options.filter(item => (item.value === "0" || (item.parent_id === makesValue.value )))}
								onChange={(value) => {
									setModelsValue(value)
									advertisement.models = value
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
