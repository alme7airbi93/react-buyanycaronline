import {Button, Col, Form} from "react-bootstrap";
import React, { useState } from "react";
import {StepsStateInMainCategory} from "../stepsState";

const SummaryDescription = (props) => {

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [desc, setDesc] = useState('')


	const summaryNext = () => {
		props.onClick(StepsStateInMainCategory, title, price, desc)
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
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label style={{color: '#fff'}}>Price :</Form.Label>
						<Form.Control 
							type="text" 
							placeholder="Enter Price" 
							value={price}
							onChange={(event) => setPrice(event.target.value)}	
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label style={{color: '#fff'}}>Description :</Form.Label>
						<Form.Control 
							as="textarea" 
							rows={3} 
							placeholder="Description"
							value={desc}
							onChange={(event) => setDesc(event.target.value)}
						/>
					</Form.Group>
					<Button 
						className="next_btn" 
						md={10} 
						onClick={summaryNext}
					>
						Next
					</Button>
				</Form>
			</Col>
		</React.Fragment>
	)
}

export default SummaryDescription;
