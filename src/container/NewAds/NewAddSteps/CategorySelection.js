import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import React, {useState, useContext} from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";
import { vehicles, makes, models ,models_second} from '../../../data/Enums';
import {NewAdvertisement} from '../../../context/Context'

const CategorySelection = (props) => {
    const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

    let vehicels_options = vehicles();
    let makes_options = makes();
    let models_options = models();
    let models_second_options = models_second();

    let [isMakeDropdown, setMakeDropdown] = useState(false)
    let [isTypeDropdown, setTypeDropdown] = useState(false)
    let [isModelDropdown, setModelDropdown] = useState(false)

    const print_console = ()=>{
        console.log(advertisement);
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
                                onChange={data => {                                  
                                    setAdvertisement({...advertisement, "vehicleValue": data})
                                    setMakeDropdown(true)
                                }}
                                isSearchable={false}
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                        {isMakeDropdown ?                            
                            <Select
                                placeholder = {advertisement.vehicleValue === undefined ? 'Select....' : advertisement.vehicleValue.value === "1" ? 'Select Makes' : 'Select Types'}                                
                                options={makes_options.filter(item => (item.value === "0" || (item.parent_id === advertisement.vehicleValue.value)))}                                
                                onChange = {data => {
                                    setAdvertisement({...advertisement, "makeValue":data})
                                    const modelFirstLevelArrays = models_options.filter(item => item.parent_id === advertisement.makeValue.value)
                                    if(modelFirstLevelArrays.length !== 0) {
                                        setTypeDropdown(true)
                                    } else {
                                        setTypeDropdown(false)
                                    }                                    
                                }}                                
                                isSearchable={false}
                            />
                        :""}
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>                            
                            {isTypeDropdown ?
                            <Select
                            placeholder = {advertisement.makeValue === undefined ? 'Select....' : advertisement.vehicleValue.value === "1" ? 'Select first Models' : 'Select Types'}                                
                            options={models_options.filter(item => (item.value === "0" || (item.parent_id === advertisement.makeValue.value)))}
                            onChange = {data => {
                                setAdvertisement({...advertisement, "modelFirstValue":data})
                                const modelSecondLevelArrays = models_options.filter(item => item.parent_id === advertisement.modelFirstValue.value)
                                if(modelSecondLevelArrays.length !== 0) {
                                    setModelDropdown(true)
                                } else {
                                    setModelDropdown(false)
                                }                                
                            }}
                            isSearchable={false}
                            />
                            : ""}
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            {isModelDropdown ?
                            <Select
                                placeholder = {advertisement.modelFirstValue === undefined ? 'Select....' : 'Select second Models'}                                
                                options={models_second_options.filter(item => (item.value === "0" || (item.parent_id === advertisement.modelFirstValue.value)))}
                                onChange={data => {                                    
                                    setAdvertisement({...advertisement, "modelSecondValue": data})                                                                     
                                }}
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
                            <Button className="next_btn" onClick = {print_console} >Next</Button>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}

export default CategorySelection;
