import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import "./CarDetails.css";

const CarDetails = () => {
    return (
        <div className='car_details_main'>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col md={3} className={'car_title'}>
                        <h5>Car.title</h5>
                        <hr />
                        <p> Price: <span> car.price </span> </p>
                        <p> Created Date: <span> car.create_at</span></p>
                    </Col>
                    <Col md={6} className={'car_title'}>
                        <div className={'d-flex justify-content-around'}>
                            <div>
                                <p>Make: <span> car.make </span></p>
                                <p>Model: <span> car.model </span></p>
                                <p>Year: <span> car.year </span></p>
                                <p>Price: <span> car.price </span></p>
                                <p>Transmission: <span> car.transmission </span></p>
                                <p>FuelType: <span> car.fuelType </span></p>
                            </div>
                            <div>
                                <p>Description: <span>car.description</span></p>
                                <p>Features: <span>car.feature</span></p>
                            </div>
                        </div>
                    </Col>
                    <Col md={2} className={'car_title'}>
                        <p>Viewed This: <span>car.visitCount</span></p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default CarDetails;