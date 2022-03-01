import {Button, Col, Form} from "react-bootstrap";
import React, { useState } from "react";
import {StepsStateInMainCategory} from "../stepsState";
import { NewAdvertisement } from "../../../context/Context";

const SummaryDescription = (props) => {

	const [advertisement, setAdvertisement] = useState(NewAdvertisement)

	const Next = () => {
		props.onClick(StepsStateInMainCategory)
		setAdvertisement(advertisement)
	}

	return(
		<React.Fragment>
			<Col md={5} className="news_ads_details">
				<h5>Advertisement Summary</h5>
				<hr/>
				<Form>
					<Form.Group className="mb-3" >
						<Form.Label style={{color: '#fff'}}>Title :</Form.Label>
						<Form.Control 
							type="text" 
							placeholder="Enter Title" 
							value={advertisement.title}
							onChange={(event) => {
								advertisement.title = event.target.value
								setAdvertisement(advertisement)
							}}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label style={{color: '#fff'}}>Price :</Form.Label>
						<Form.Control 
							type="text" 
							placeholder="Enter Price" 
							value={advertisement.price}
							onChange={(event) => {
								advertisement.price = event.target.value
								setAdvertisement(advertisement)
							}}	
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label style={{color: '#fff'}}>Description :</Form.Label>
						<Form.Control 
							as="textarea" 
							rows={3} 
							placeholder="Description"
							value={advertisement.description}
							onChange={(event) => {
								advertisement.description = event.target.value
								setAdvertisement(advertisement)
							}}
						/>
					</Form.Group>
					<Button 
						className="next_btn" 
						md={10} 
						onClick={Next}
					>
						Next
					</Button>
				</Form>
			</Col>
		</React.Fragment>
	)
}

export default SummaryDescription;
