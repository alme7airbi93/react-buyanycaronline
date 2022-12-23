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
import AdvertismentProvider from "../../context/AdvertismentContext";

const NewAds = () => {

	const [stepsState, setStepsState]  = useState(StepsStateInSummary);
	useEffect(() => {
	},[stepsState]);
	return (
		<AdvertismentProvider>
			<div style={{minHeight: "100vh"}}>
				<Container>
					<Row className={"justify-content-center"}>
						{stepsState.inSummary && <SummaryDescription nextStep={(step) => setStepsState(step)}/> }
						{stepsState.inMainCategory && <CategorySelection nextStep={(step) => setStepsState(step)}/>}
						{stepsState.inDetail && <Detail nextStep={(step) => setStepsState(step)}/>}
						{stepsState.inPhoto && <Photo nextStep={(step) => setStepsState(step)}/>}
						{stepsState.inMap && <GoogleMap nextStep={(step) => setStepsState(step)}/>}
					</Row>
				</Container>
			</div>
		</AdvertismentProvider>
	);
};
export default NewAds;
