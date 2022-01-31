import React from 'react';
import "./BoatSearch.css";
import {Button} from "react-bootstrap";
import Select from "react-select";

const BoatSearch = () => {
    const options = [
        { value: 'corolla', label: 'corolla' },
        { value: 'civic', label: 'civic' },
    ]
    return (
        <React.Fragment>
            <div className="main-boatSearch-div">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 boatSearch-find-div">
                            <h5>FIND</h5>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <Select placeholder={'Name'} options={options} />
                                </div>
                                <div className="col-md-12">
                                    <Select placeholder={'model'} options={options} />
                                </div>
                                <div className="col-md-12">
                                    <Select placeholder={'Year'} options={options} />
                                </div>
                                <div className="col-md-12">
                                    <Select placeholder={'Price'} options={options} />
                                </div>
                                <div className="col-md-12">
                                    <Select placeholder={'Order'} options={options} />
                                </div>
                                <div className="col-md-12">
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
