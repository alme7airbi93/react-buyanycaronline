import React, {useState} from 'react';
import "./Home.css";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import Select from 'react-select'

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

    const options = [
        { value: 'corolla', label: 'corolla' },
        { value: 'civic', label: 'civic' },
    ]

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
                                            <Select placeholder={'Select Motors'} options={options} />
                                        </div>
                                        <div className={rowClass}>
                                            <Select placeholder={'Select Make'} options={options} />
                                        </div>
                                        <div className={rowClass}>
                                            <Select placeholder={'Select Model'} options={options} />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select placeholder={'Select Price'} options={options} />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select placeholder={'Select Year'} options={options} />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select placeholder={'Select Color'} options={options} />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select placeholder={'Select Transmission'} options={options} />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select placeholder={'Select FuelType'} options={options} />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select placeholder={'Select Condition'} options={options} />
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
