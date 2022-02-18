import React, {useState} from 'react';
import "./Home.css";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import Select from 'react-select';
import Vehicles from '../../data/vehicles.json';
import Makes from '../../data/makes.json';
import Model_first_level from '../../data/model_first_levels.json';

const Home = () => {

    const [advSearch, setAdvSearch] = useState(false)

    const [vehicleValue, setVehicle] = useState('')
    const [makeValue, setMake] = useState('')
    const [modelFirstValue, setModelFirst] = useState('')
    let [isTypeDropdown, setTypeDropdown] = useState(false)

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

    let vehicle_options = Vehicles.RECORDS.map(item => {       
        return {
            value: item.id,
            label: item.vehicle_name
        }
    })

    let makes_options = Makes.RECORDS.map(item => {
            return {
            value: item.id,
            label: item.make_name,
            parent_id: item.vehicle_id
        }         
    })

    let model_first_level_options = Model_first_level.RECORDS.map(item => {
        return {
            value: item.id,
            label: item.model_first_level_name,
            parent_id: item.make_id
        }
    })

    const setVehicleHandle = (value) => {       
        setVehicle(value)
        setMake('')
        setModelFirst('')        
        setTypeDropdown(false) 
    } 

    const setMakeHandle = (value ) => {               
        const modelFirstLevelArrays = model_first_level_options.filter(item => item.parent_id === value.value)

        if(modelFirstLevelArrays.length !== 0) {            
            setTypeDropdown(true)
        } else {            
            setTypeDropdown(false)
        }         
        setMake(value)
        setModelFirst('')        
    }
    
    const setFirstModelHandle = (value) => {
        setModelFirst(value)    
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
                                            <Select 
                                                placeholder = {'Select Motors'}
                                                options={vehicle_options} 
                                                onChange={(e) => setVehicleHandle(e)}
                                                isSearchable={false} 
                                            />
                                        </div>
                                        <div className={rowClass}>
                                            <Select                                                
                                                placeholder = {vehicleValue.value === undefined ? 'Select....' : vehicleValue.value === "1" ? 'Select Makes' : 'Select Types'}
                                                options={makes_options.filter(item => (item.value === "0" || (item.parent_id === vehicleValue.value )))}                                                 
                                                onChange={(e) => setMakeHandle(e)} 
                                                value= {makeValue}
                                                isSearchable={false}
                                            />
                                        </div>
                                        <div className={rowClass}>
                                            {isTypeDropdown ?
                                            <Select 
                                                placeholder = {makeValue.value === undefined ? 'Select....' : vehicleValue.value === "1" ? 'Select Models' : 'Select Types'}                                                
                                                onChange={(e) => setFirstModelHandle(e)}
                                                options={model_first_level_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
                                                value= {modelFirstValue}
                                                isSearchable={false}
                                            />
                                            : ""}
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select 
                                                placeholder={'Select Price'} 
                                                options={options}
                                            />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select 
                                                placeholder={'Select Year'}
                                                options={options}
                                            />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select 
                                                placeholder={'Select Color'} 
                                                options={options} 
                                            />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select 
                                                placeholder={'Select Transmission'}
                                                options={options}
                                            />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select 
                                                placeholder={'Select FuelType'} 
                                                options={options} 
                                            />
                                        </div>
                                        <div className={`${rowClass} ${toggleClass}`}>
                                            <Select 
                                                placeholder={'Select Condition'} 
                                                options={options}
                                            />
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
                        <div className="col-md-3"/>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
