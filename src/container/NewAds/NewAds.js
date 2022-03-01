import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import "./NewAds.css";
import {NewAdvertisement} from "../../context/Context";
import CategorySelection from "./NewAddSteps/CategorySelection";
import SummaryDescription from "./NewAddSteps/SummaryDescription";
import {StepsStateInSummary} from "./stepsState";


const NewAds = () => {


    const [advertisement, setAdvertisement] = useState({title:"", description:"", price:0,location:{lat:"",long:""},owner:"",state:false, phone:""});
    const [stepsState, setStepsState]  = useState(StepsStateInSummary)

    return (
        <NewAdvertisement.Provider value={[advertisement,setAdvertisement]}>
        <div style={{height: "100vh"}}>
            <Container>
                <Row className={'justify-content-center'}>
                    {stepsState.inSummary && <SummaryDescription onClick={(value) => setStepsState(value)}/> }
                    {stepsState.inMainCategory && <CategorySelection onClick={(value) => setStepsState(value)}/> }
                </Row>
            </Container>
        </div>
       </NewAdvertisement.Provider>
    );
};
export default NewAds;
