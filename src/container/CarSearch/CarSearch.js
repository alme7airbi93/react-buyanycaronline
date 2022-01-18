import React from 'react';
import "./CarSearch.css";
import {Button, Form} from "react-bootstrap";

const CarSearch = () => {
    return (
            <div className="main-carSearch-div">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 carSearch-find-div">
                            <h5>FIND</h5>
                            <hr/>
                            <div className="row">
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="car-select-btn">
                                        <option>SELECT NAME</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="car-select-btn">
                                        <option>SELECT MODEL</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="car-select-btn">
                                        <option>SELECT YEAR</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="car-select-btn">
                                        <option>SELECT PRICE</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="car-select-btn">
                                        <option>SELECT ORDER</option>
                                        <option value="highest">Highest</option>
                                        <option value="lowest">Lowest</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Button className="first-section-btn">SEARCH</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 carSearch-result-div">
                            <h3>Search Result</h3>
                            <hr  style={{backgroundColor: "rgb(255, 255, 255)"}}/>
                        </div>
                        <div className="col-md-2 carSearch-block-div">
                            <p>Empty block for ads</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default CarSearch;
