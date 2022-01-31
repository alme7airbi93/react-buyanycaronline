import React from 'react';
import {Container, Row, Col, Form} from "react-bootstrap";
import "./MonitorPage.css";

const MonitorPage = () => {
    return (
        <Container>
            <Row>
                <Col md={3} className='monitor_main'>
                    <p>Ad Number: <span> 222 </span> </p>
                    <p>Title: <span> ad.title </span> </p>
                    <p>Price: <span> ad.price </span></p>
                    <p>Created Date: <span>ad.created_at</span></p>
                    <div className={'d-flex'}>
                        <button className="search_btn mr-2">Approved</button>
                        <button className="search_btn">Reject</button>
                    </div>
                </Col>
                <Col md={8}>
                    <div className='monitor_details'>
                        <h5>Search</h5>
                        <Form>
                            <Form.Group className="mb-3 d-flex">
                                <Form.Control type="text" placeholder="Ad Number" />
                                <button className="first-section-btn ml-3">Search</button>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className='monitor_details'>
                        <h5>Ad Number :</h5>
                        <Row>
                            <Col md={4} className={'vehicle-detail'}>
                                <p>VEHICLE DETAILS</p>
                                <hr/>
                                <p>Make: <span> car.make </span> </p>
                                <p>Model: <span> car.model </span> </p>
                                <p>Year: <span> car.year </span> </p>
                                <p>FuelType: <span> car.fueltype </span> </p>
                                <p>Condition: <span> car.condition </span> </p>
                                <p>Transmission: <span> car.transmission </span> </p>
                                <p>Color: <span> car.color </span> </p>
                            </Col>
                            <Col md={8} />
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default MonitorPage;
