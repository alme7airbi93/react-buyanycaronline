import {Button, Col, Row, Form} from "react-bootstrap";
import Select from "react-select";
import React, {useState} from "react";
import {StepsStateAdSubmittedSuccessfully, StepsStateInSummary} from "../stepsState";
import {vehicles, makes, models} from '../../../data/Enums';

const CategorySelection = (props) => {

    const [vehicleValue, setVehicle] = useState('')
    const [makeValue, setMake] = useState('')
    const [modelFirstValue, setModelFirst] = useState('')

    const [color, setColor] = useState('');
    const [fuel_type, setFuelType] = useState('');
    const [region, setRegion] = useState('');
    const [car_distance, setCarDistance] = useState('');
    const [body_type, setBodyType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [hp, setHP] = useState('');
    const [num_cylinders, setNumCylinders] = useState('');
    const [engine_size, setEngineSize] = useState('');
    const [motor_distance, setMotorDistance] = useState('');
    const [length, setLength] = useState('');
    const [type, setType] = useState('');
    const [hours, setHours] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [number_code, setNumberCode] = useState('');

    let [isTypeDropdown, setTypeDropdown] = useState(false)

    let vehicels_options = vehicles();
    let makes_options = makes();
    let models_options = models();

    const setVehicleHandle = (value) => {
        setVehicle(value)
        setMake('')
        setModelFirst('')
        setTypeDropdown(false)

        setColor('');
        setFuelType('');
        setRegion('');
        setCarDistance('');
        setBodyType('');
        setTransmission('');
        setHP('');
        setNumCylinders('');
        setEngineSize('');
        setMotorDistance('');
        setLength('');
        setType('');
        setHours('');
        setCity('');
        setNumber('');
        setNumberCode('');
    }

    const setMakeHandle = (value ) => {
        const modelFirstLevelArrays = models_options.filter(item => item.parent_id === value.value)

        if(modelFirstLevelArrays.length !== 0) {
            setTypeDropdown(true)
        } else {
            setTypeDropdown(false)
        }
        setMake(value)
        setModelFirst('')
    }

    const setFirstModelHandle = (value) => {
        setModelFirst(value)
    }

    function categorySelectionDetails() {
        
        const categorySelectionValues = {
            vehicleValue,
            makeValue,
            modelFirstValue,
            color,
            fuel_type,
            region,
            car_distance,
            body_type,
            transmission,
            hp,
            num_cylinders,
            engine_size,
            motor_distance,
            length,
            type,
            hours,
            city,
            number,
            number_code,
            form_type : "CATEGORY_SELECTION_FORM"
        }

        props.onClick(categorySelectionValues, StepsStateInSummary);
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
                                placeholder={'Select Motors'}
                                options={vehicels_options}
                                onChange={(e) => setVehicleHandle(e)}
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select
                                placeholder={vehicleValue.value === undefined ? 'Select....' : vehicleValue.value === "1" ? 'Select Makes' : 'Select Types'}
                                options={makes_options.filter(item => (item.value === "0" || (item.parent_id === vehicleValue.value)))}
                                onChange={(e) => setMakeHandle(e)}
                                value={makeValue}
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            {isTypeDropdown ?
                                <Select
                                    placeholder={makeValue.value === undefined ? 'Select....' : vehicleValue.value === "1" ? 'Select Models' : 'Select Types'}
                                    onChange={(e) => setFirstModelHandle(e)}
                                    options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value)))}
                                    value={modelFirstValue}
                                />
                                : ""}
                        </div>
                    </Col>
                    { 
                        vehicleValue && vehicleValue.value !== "6" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="text" placeholder="Color"
                            value={color} onChange={(e) => setColor(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value !== "6" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="text" placeholder="Fuel Type" 
                            value={fuel_type} onChange={(e) => setFuelType(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value !== "6" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="text" placeholder="Region"
                            value={region} onChange={(e) => setRegion(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && (vehicleValue.value === "1" || vehicleValue.value === "4") ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="text" placeholder="Distance"
                            value={car_distance} onChange={(e) => setCarDistance(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && (vehicleValue.value === "1" || vehicleValue.value === "4") ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="text" placeholder="Body Type"
                            value={body_type} onChange={(e) => setBodyType(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && (vehicleValue.value === "1" || vehicleValue.value === "4") ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="text" placeholder="Transmission"
                            value={transmission} onChange={(e) => setTransmission(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && (vehicleValue.value === "1" || vehicleValue.value === "4") ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="HP"
                            value={hp} onChange={(e) => setHP(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && (vehicleValue.value === "1" || vehicleValue.value === "4") ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="Num Cylinders"
                            value={num_cylinders} onChange={(e) => setNumCylinders(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value === "2" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="Engine Size"
                            value={engine_size} onChange={(e) => setEngineSize(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value === "2" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="Distance"
                            value={motor_distance} onChange={(e) => setMotorDistance(e.target.value)}/>  
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value === "5" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="Length"
                            value={length} onChange={(e) => setLength(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value === "5" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="Type"
                            value={type} onChange={(e) => setType(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    { 
                        vehicleValue && vehicleValue.value === "5" ? 
                        <Col md={10}>
                            <Form.Control className={'mb-3'} type="number" placeholder="Hours"
                            value={hours} onChange={(e) => setHours(e.target.value)}/> 
                        </Col> 
                        : ""
                    }
                    {
                        vehicleValue && vehicleValue.value === "6" ?
                            <Col md={10}>
                                <Form.Control className={'mb-3'} type="text" placeholder="City"
                                value={city} onChange={(e) => setCity(e.target.value)}/> 
                            </Col>
                            : ""
                    }
                    {
                        vehicleValue && vehicleValue.value === "6" ?
                            <Col md={10}>
                                <Form.Control className={'mb-3'} type="text" placeholder="Number"
                                value={number} onChange={(e) => setNumber(e.target.value)}/> 
                            </Col>
                            : ""
                    }
                    {
                        vehicleValue && vehicleValue.value === "6" ?
                            <Col md={10}>
                                <Form.Control className={'mb-3'} type="text" placeholder="Number Code"
                                value={number_code} onChange={(e) => setNumberCode(e.target.value)}/> 
                            </Col>
                            : ""
                    }
                    <Col md={10} className="btn-group" >
                            <Button right className="back_btn" onClick={() => props.onClick(null, StepsStateInSummary)}>Back</Button>
                            <Button className="next_btn" onClick={() => categorySelectionDetails()}>Next</Button>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>

    )
}

export default CategorySelection;
