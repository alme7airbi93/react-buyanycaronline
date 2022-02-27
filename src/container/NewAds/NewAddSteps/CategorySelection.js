import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import React, { useState } from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";
import { Models, Names, Order_1, Order_2, Order_3, Prices, Years } from "../../../globals";

const CategorySelection = (props) => {

	const [names, setNames] = useState([])
	const [models, setModels] = useState([])
	const [years, setYears] = useState([])
	const [prices, setPrices] = useState([])
	const [order_1, setOrder_1] = useState([])
	const [order_2, setOrder_2] = useState([])
	const [order_3, setOrder_3] = useState([])

	const categoryNext = () => {
		props.onClick(names, models, years, prices, order_1, order_2, order_3)
	}

	return(
		<React.Fragment>
			<Col md={5} className="find_details">
				<h5>FIND</h5>
				<hr/>
				<Row  className="justify-content-center">
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Name'} 
								options={Names}
								value={names}
								onChange={(value) => setNames(value)}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Model'}
								options={Models}
								value={models}
								onChange={(value) => setModels(value)}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Year'}
								options={Years}
								value={years}
								onChange={(value) => setYears(value)}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Price'}
								options={Prices}
								value={prices}
								onChange={(value) => setPrices(value)}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Order'}
								options={Order_1}
								value={order_1}
								onChange={(value) => setOrder_1(value)}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Order'}
								options={Order_2}
								value={order_2}
								onChange={(value) => setOrder_2(value)}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={'mb-3'}>
							<Select 
								placeholder={'Order'}
								options={Order_3}
								value={order_3}
								onChange={(value) => setOrder_3(value)}
							/>
						</div>
					</Col>
					<Col md={10} className="btn-group" >
						<Button className="back_btn" onClick={() => props.onBack(StepsStateInSummary)}>
							Back
						</Button>
						<Button className="next_btn" onClick={categoryNext}>
							Next
						</Button>
					</Col>
				</Row>
			</Col>
		</React.Fragment>
	)
}

export default CategorySelection;
