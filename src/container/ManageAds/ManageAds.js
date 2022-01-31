import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import "./ManageAds.css";

const ManageAds = () => {
    return (
        <React.Fragment>
            <div className="main_manage_ads">
                <Container>
                    <Row>
                        <Col md={3} className='car_details'>
                            <p>Title: <span> car.title </span> </p>
                            <p>Price: <span>car.price </span> </p>
                            <p>Description: <span>car.description</span></p> <br/>

                            <h5>VEHICLE DETAILS</h5>
                            <hr/>
                            <p>Make: <span> car.make </span> </p>
                            <p>Model: <span> car.model </span> </p>
                            <p>Year: <span> car.year </span> </p>
                            <p>FuelType: <span> car.fueltype </span> </p>
                            <p>Condition: <span> car.condition </span> </p>
                            <p>Transmission: <span> car.transmission </span> </p>
                            <p>Color: <span> car.color </span> </p>
                        </Col>

                        <Col md={7}>
                            <div className="photo_details">
                                <h5>Photo</h5>
                                <br />
                                <img src={'#'} alt={'photo'} />
                            </div>

                            <div className="publish_details">
                                <button className="first-section-btn">Publish</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
export default ManageAds;


