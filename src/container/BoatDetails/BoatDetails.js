import React from 'react';
import "../../assets/style.css";
import {Col, Container, Row} from "react-bootstrap";

const BoatDetails = () => {
    return (
        <div className='car_details_main'>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col md={3} className={'car_title'}>
                        <h5>boat.title</h5>
                        <hr />
                        <p> Price: <span> boat.price </span> </p>
                        <p> Created Date: <span> boat.create_at</span></p>
                    </Col>
                    <Col md={6} className={'car_title'}>
                        <div className={'d-flex justify-content-around'}>
                            <div>
                                <p>Make: <span> boat.make </span></p>
                                <p>Model: <span> boat.model </span></p>
                                <p>Year: <span> boat.year </span></p>
                                <p>Price: <span> boat.price </span></p>
                                <p>Transmission: <span> boat.transmission </span></p>
                                <p>FuelType: <span> boat.fueltype </span></p>
                            </div>
                            <div>
                                <p>Description: <span>boat.discription</span></p>
                                <p>Features: <span>boat.feature</span></p>
                            </div>
                        </div>
                    </Col>
                    <Col md={2} className={'car_title'}>
                        <p>Viewed This: <span>boat  .visitcount</span></p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default BoatDetails;
