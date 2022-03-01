import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import "./NewAds.css";
import {NewAdvertisement} from "../../context/Context";
import CategorySelection from "./NewAddSteps/CategorySelection";
import SummaryDescription from "./NewAddSteps/SummaryDescription";
import {StepsStateInSummary} from "./stepsState";
import {UserContext} from "../../context/Context";


const NewAds = () => {

    const [user, setuser] = useContext(UserContext);
    const [advertisement, setAdvertisement] = useState(NewAdvertisement);
    const [stepsState, setStepsState]  = useState(StepsStateInSummary);

    const [summaryDescriptionValue, setSummaryDescriptionValue] = useState(null);
    const [categorySelectionValue, setCategorySelectionValue] = useState(null);

    function nextStep(values, currentState) {
        setStepsState(currentState);
        if (values) {
            console.log(values);
            if (values.form_type === "AD_SUMMARY_FORM") {
                setSummaryDescriptionValue(values);
            }
            if (values.form_type === "CATEGORY_SELECTION_FORM") {
                setCategorySelectionValue(values);
            }
        } else {
            setSummaryDescriptionValue(null);
            setCategorySelectionValue(null);
        }
        if (summaryDescriptionValue && categorySelectionValue) {
            setAdvertisement({user , summaryDescriptionValue, categorySelectionValue});
            console.log(advertisement);
        }
    }


    return (
        <NewAdvertisement.Provider value={[advertisement,setAdvertisement]}>
        <div style={{height: "100vh"}}>
            <Container>
                <Row className={'justify-content-center'}>
                    {stepsState.inSummary && <SummaryDescription onClick={(values, currentState) => nextStep(values, currentState)}/> }
                    {stepsState.inMainCategory && <CategorySelection onClick={(values, currentState) => nextStep(values, currentState)}/> }
                    {stepsState.adSubmitted && <h1>Advertisement Submitted</h1>}
                </Row>
            </Container>
        </div>
       </NewAdvertisement.Provider>
    );
};
export default NewAds;
