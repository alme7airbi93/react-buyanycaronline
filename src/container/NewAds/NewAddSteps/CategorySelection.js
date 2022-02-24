import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import React from "react";
import {StepsStateInMainCategory, StepsStateInSummary} from "../stepsState";

const CategorySelection = (props) => {
    return(
        <React.Fragment>
            <Col md={5} className="find_details">
                <h5>FIND</h5>
                <hr/>
                <Row  className="justify-content-center">
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Name'}  />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Model'}  />
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
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Order'}  />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Order'}  />
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'mb-3'}>
                            <Select placeholder={'Order'} />
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
