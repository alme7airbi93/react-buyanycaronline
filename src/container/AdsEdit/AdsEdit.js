import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./NewAds.css";
import { NewAdvertisement } from "../../context/Context";
import CategorySelection from "./NewAddSteps/CategorySelection";
import SummaryDescription from "./NewAddSteps/SummaryDescription";
import Detail from "./NewAddSteps/Detail";
import Photo from "./NewAddSteps/Photo";
import GoogleMap from "./NewAddSteps/GoogleMap";
import { StepsStateInSummary } from "./stepsState";
import AdvertismentProvider from "../../context/AdvertismentContext";
import { useParams } from "react-router-dom";
import { getAdvertisementById } from "../../common/repository/AdvertisementDB";

const AdsEdit = () => {

	const [stepsState, setStepsState] = useState(StepsStateInSummary);
	const params = useParams();
	const [ads, setAds] = useState({});
	const id = params.Id


	useEffect(() => {

		console.log(id)
		getAdvertisementById(id).then(res => {
			console.log(res)
			setAds(res.data)
		})

	}, [stepsState, id,setAds]);


	return (
		<AdvertismentProvider>
			<div style={{ height: "100vh" }}>
				<Container>
					<Row className={"justify-content-center"}>
						{stepsState.inSummary && <SummaryDescription ads={ads} nextStep={(step) => setStepsState(step)} />}
						{stepsState.inMainCategory && <CategorySelection nextStep={(step) => setStepsState(step)} />}
						{stepsState.inDetail && <Detail nextStep={(step) => setStepsState(step)} />}
						{stepsState.inPhoto && <Photo nextStep={(step) => setStepsState(step)} />}
						{stepsState.inMap && <GoogleMap nextStep={(step) => setStepsState(step)} />}
					</Row>
				</Container>
			</div>
		</AdvertismentProvider>
	);
};   
export default AdsEdit;
