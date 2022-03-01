import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import React, {useContext} from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";
import {models, makes, vehicles} from "../../../data/Enums";
import {NewAdvertisement} from "../../../context/Context";

const CategorySelection = (props) => {

    let vehicels_options = vehicles();
    let makes_options = makes();
    let models_options = models();
    const [advertisement, setAdvertisement] = useContext(NewAdvertisement);


    function setVehicleHandle(e) {
        console.log(e)
        setAdvertisement(...advertisement);
        console.log(advertisement)

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
                                placeholder = {'Select Category'}
                                options={vehicels_options}
                                onChange={(e) => setVehicleHandle(e)}
                                isSearchable={false}
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select
                                placeholder = {advertisement.type === undefined ? 'Select....' : advertisement.type[0] === "1" ? 'Select Makes' : 'Select Types'}
                                options={makes_options.filter(item => (item.value === "0" || (item.parent_id === advertisement.type )))}
                                // onChange={(e) => setMakeHandle(e)
                                isSearchable={false}
                            />
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
                            <Button className="next_btn">Next</Button>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>

    )
}

export default CategorySelection;
