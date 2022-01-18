import React from 'react';
import "./BoatSearch.css";
import {Button, Form} from "react-bootstrap";

const BoatSearch = () => {
    return (
        <React.Fragment>
            <div className="main-boatSearch-div">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 boatSearch-find-div">
                            <h5>FIND</h5>
                            <hr/>
                            <div className="row">
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="boat-select-btn">
                                        <option>SELECT NAME</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="boat-select-btn">
                                        <option>SELECT MODEL</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="boat-select-btn">
                                        <option>SELECT YEAR</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="boat-select-btn">
                                        <option>SELECT PRICE</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Form.Select aria-label="Default select example" className="boat-select-btn">
                                        <option>SELECT ORDER</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                                <div className="col-md-10">
                                    <Button className="first-section-btn">SEARCH</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 boatSearch-result-div">
                            <h3>Search Result</h3>
                            <hr/>

                        </div>
                        <div className="col-md-2 boatSearch-block-div">
                            <p>Empty block for ads</p>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default BoatSearch;
