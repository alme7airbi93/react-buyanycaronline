import React, {useState} from 'react';
import "./Home.css";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

const Home = () => {

    const [advSearch, setAdvSearch] = useState(false)

    const navigation = useNavigate();
    const changePageHandler = () => {
        navigation('/login')
    }

    let rowClass, toggleClass;

    if(advSearch){
         rowClass = "col-md-4";
        toggleClass = "show_search";
    }
    else{
        rowClass = "col-md-3";
        toggleClass = "hide_search";
    }

    return (
        <React.Fragment>
            <div className={'home-main-div'}>
                <div className="container">
                <div className='row home-row-div'>
                    <div className='col-md-11 d-flex justify-content-end '>
                        <Button className="first-section-btn"
                        onClick={changePageHandler}
                        >PLACE AD</Button>
                    </div>
                    <div className="col-md-12 " style={{marginTop: '30px'}}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10">
                                <div className="find-vehicle-div">
                                    <div>
                                        <h4>FIND VEHICLE</h4>
                                    </div>
                                    <form>
                                    <div className="container">
                                    <div className="row home-select-div">
                                        <div className={rowClass}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT MOTORS</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={rowClass}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT MAKE</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={rowClass}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT MODEL</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT PRICE</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT YEAR</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT COLOR</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT TRANSMISSION</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT FUELTYPE</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Form.Select aria-label="Default select example" className="home-select-btn">
                                                <option>SELECT CONDITION</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-3">
                                            <Button className="first-section-btn">SEARCH</Button>
                                        </div>
                                    </div>
                                        <a className='adv_search_btn'
                                           onClick={() => setAdvSearch(!advSearch)}
                                        > ADVANCED SEARCH</a>
                                    </div>
                                    </form>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">

                        </div>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
