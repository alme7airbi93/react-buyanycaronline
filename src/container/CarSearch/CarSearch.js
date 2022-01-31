import React from 'react';
import "./CarSearch.css";
import {Button} from "react-bootstrap";
import Select from "react-select";

const CarSearch = () => {

    const options = [
        { value: 'corolla', label: 'corolla' },
        { value: 'civic', label: 'civic' },
    ]

    return (
            <div className="main-carSearch-div">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 carSearch-find-div">
                            <h5>FIND</h5>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={'mb-3'}>
                                        <Select placeholder={'Name'} options={options} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={'mb-3'}>
                                    <Select placeholder={'model'} options={options} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={'mb-3'}>
                                    <Select placeholder={'Year'} options={options} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={'mb-3'}>
                                    <Select placeholder={'Price'} options={options} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={'mb-3'}>
                                    <Select placeholder={'Order'} options={options} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={'mb-3'}>
                                    <Button className="first-section-btn">SEARCH</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 carSearch-result-div">
                            <h3>Search Result</h3>
                            <hr/>
                        </div>
                        <div className="col-md-2 carSearch-block-div">
                            <p>Empty block for ads</p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default CarSearch;
