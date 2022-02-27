import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import "./NewAds.css";
import {NewAdvertisement} from "../../context/Context";
import CategorySelection from "./NewAddSteps/CategorySelection";
import SummaryDescription from "./NewAddSteps/SummaryDescription";
import {StepsStateInSummary} from "./stepsState";

const NewAds = () => {

	const [advertisement, setAdvertisement] = useState(NewAdvertisement)
	const [stepsState, setStepsState]  = useState(StepsStateInSummary)

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')		
	const [desc, setDesc] = useState('')

	const [names, setNames] = useState([])
	const [models, setModels] = useState([])
	const [years, setYears] = useState([])
	const [prices, setPrices] = useState([])
	const [order_1, setOrder_1] = useState([])
	const [order_2, setOrder_2] = useState([])
	const [order_3, setOrder_3] = useState([])

	const summaryNext = (tempState, tempTitle, tempPrice, tempDesc) => {
		setStepsState(tempState)
		setTitle(tempTitle)
		setPrice(tempPrice)
		setDesc(tempDesc)
	}

	const categoryNext = (tempNames, tempModels, tempYears, tempPrices, tempOrder_1, tempOrder_2, tempOrder_3) => {
		setNames(tempNames)
		setModels(tempModels)
		setYears(tempYears)
		setPrices(tempPrices)
		setOrder_1(tempOrder_1)
		setOrder_2(tempOrder_2)
		setOrder_3(tempOrder_3)

		console.log('Title: ', title)
		console.log('Price: ', price)
		console.log('Description: ', desc)
		console.log('Names: ', tempNames)
		console.log('Models: ', tempModels)
		console.log('Years: ', tempYears)
		console.log('Prices: ', tempPrices)
		console.log('Order_1: ', tempOrder_1)
		console.log('Order_2: ', tempOrder_2)
		console.log('Order_3: ', tempOrder_3)
	}

	return (
		<NewAdvertisement.Provider value={[advertisement,setAdvertisement]}>
			<div style={{height: "100vh"}}>
				<Container>
					<Row className={'justify-content-center'}>
						{stepsState.inSummary && <SummaryDescription onClick={summaryNext}/> }
						{stepsState.inMainCategory && <CategorySelection onBack={(value) => setStepsState(value)} onClick={categoryNext}/> }
					</Row>
				</Container>
			</div>
		</NewAdvertisement.Provider>
	);
};
export default NewAds;
