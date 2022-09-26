import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import "./NewAds.css";
import {NewAdvertisement} from "../../context/Context";
import CategorySelection from "./NewAddSteps/CategorySelection";
import SummaryDescription from "./NewAddSteps/SummaryDescription";
import Detail from "./NewAddSteps/Detail";
import Photo from "./NewAddSteps/Photo";
import GoogleMap from "./NewAddSteps/GoogleMap";
import {StepsStateInSummary} from "./stepsState";

const NewAds = () => {
	const [advertisement, setAdvertisement] = useState(NewAdvertisement);
	const [stepsState, setStepsState]  = useState(StepsStateInSummary);
	useEffect(() => {
		console.log(advertisement);
	},[stepsState]);
	return (
		<NewAdvertisement.Provider value={[advertisement,setAdvertisement]}>
			<div style={{height: "100vh"}}>
				<Container>
					<Row className={"justify-content-center"}>
						{stepsState.inSummary && <SummaryDescription onClick={(value) => setStepsState(value)}/> }
						{stepsState.inMainCategory && <CategorySelection onClick={(value) => setStepsState(value)}/>}
						{stepsState.inDetail && <Detail onClick={(value) => setStepsState(value)}/>}
						{stepsState.inPhoto && <Photo onClick={(value) => setStepsState(value)}/>}
						{stepsState.inMap && <GoogleMap onClick={(value) => setStepsState(value)}/>}
					</Row>
				</Container>
			</div>
		</NewAdvertisement.Provider>
	);
};
export default NewAds;
