import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import React, {useState, useContext} from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";
import { vehicles, makes, models ,models_second} from '../../../data/Enums';
import {NewAdvertisement} from '../../../context/Context'

const CategorySelection = (props) => {

    const [advSearch, setAdvSearch] = useState(false)
    const [vehicleValue, setVehicle] = useState('')
    const [makeValue, setMake] = useState('')
    const [modelFirstValue, setModelFirst] = useState('')
    const [modelSecondValue, setModelSecond] = useState('')

    let [isTypeDropdown, setTypeDropdown] = useState(false)
    let [isModelDropdown, setModelDropdown] = useState(false)

    const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

    let vehicels_options = vehicles();
    let makes_options = makes();
    let models_options = models();
    let models_second_options = models_second();

    const setVehicleHandle = (value) => {
        
        // props.haneVehicleValue(value);
        setVehicle(value)
        setMake('')
        setModelFirst('')
        setTypeDropdown(false)
        setModelDropdown(false)
        setModelSecond('')
    }

    const setMakeHandle = (value ) => {
        const modelFirstLevelArrays = models_options.filter(item => item.parent_id === value.value)

        if(modelFirstLevelArrays.length !== 0) {
            setTypeDropdown(true)
        } else {
            setTypeDropdown(false)
        }
        setMake(value)
        setModelDropdown(false)
        setModelFirst('')
        setModelSecond('')
    }

    const setFirstModelHandle = (value) => {
        const modelSecondLevelArrays = models_options.filter(item => item.parent_id === value.value)
        if(modelSecondLevelArrays.length !== 0) {
            setModelDropdown(true)
        } else {
            setModelDropdown(false)
        }
        setModelFirst(value)
        console.log(value)
        console.log(modelFirstValue.value)
        setModelSecond('')
    }

    const setSecondModelHandle = (value) => {
        setModelSecond(value)
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
                                placeholder = {'Select Motors'}
                                options={vehicels_options}
                                onChange={(e) => setVehicleHandle(e)}
                                isSearchable={false}
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>                            
                            <Select
                                placeholder = {vehicleValue.value === undefined ? 'Select....' : vehicleValue.value === "1" ? 'Select Makes' : 'Select Types'}
                                options={makes_options.filter(item => (item.value === "0" || (item.parent_id === vehicleValue.value )))}
                                onChange={(e) => setMakeHandle(e)}
                                value= {makeValue}
                                isSearchable={false}
                            />
                        </div>
                    </Col>

                    <Col md={10}>
                        <div className={'mb-3'}>                            
                            {isTypeDropdown ?
                            <Select
                                placeholder = {makeValue.value === undefined ? 'Select....' : vehicleValue.value === "1" ? 'Select first Models' : 'Select Types'}                                
                                options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
                                onChange={(e) => setFirstModelHandle(e)}
                                value= {modelFirstValue}
                                isSearchable={false}
                            />
                            : ""}
                        </div>
                    </Col>

                    <Col md={10}>
                        <div className={'mb-3'}>
                            {isModelDropdown ?
                            <Select
                                placeholder = {modelFirstValue.value === undefined ? 'Select....' : 'Select second Models'}                                
                                options={models_second_options.filter(item => (item.value === "0" || (item.parent_id === modelFirstValue.value )))}
                                onChange={(e) => setSecondModelHandle(e)}
                                value= {modelSecondValue}
                                isSearchable={false}
                            />
                            :""}
                        </div>
                    </Col>

                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Year'}  />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Price'}  />
                        </div>
                    </Col> 
                    <Col md={10} className="btn-group" >
                            <Button right className="back_btn" onClick={() => props.onClick(StepsStateInSummary)} >Back</Button>
                            <Button className="next_btn" >Next</Button>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>

    )
}

export default CategorySelection;
