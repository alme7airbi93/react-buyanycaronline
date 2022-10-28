import React, {useState} from "react";
import "./Home.css";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import Select from "react-select";
import { makes, models} from "../../common/data";
import {AdvertisementOptions, BodyCondition, ColorTypes, FuelTypes, TransmitionTypes} from "../../common/data/SelectOptions";
import CategorySelection from "../NewAds/NewAddSteps/CategorySelection";
import { ManufacturingYearsOptions } from "../../common/data/SelectOptions";
import { getSearchAdvertisement } from "../../common/repository/AdvertisementDB";
import CardBlock from "../../components/CardBlock/CardBlock";

const Home = () => {
	const [advSearch, setAdvSearch] = useState(false);

	const [vehicleValue, setVehicle] = useState("");
	const [makeValue, setMake] = useState("");
	const [modelFirstValue, setModelFirst] = useState("");
	let [isTypeDropdown, setTypeDropdown] = useState(false);

	const [year, setYear] = useState("");
	const [colorType, setColorType] = useState("");
	const [condition, setConditions] = useState("");
	const [fuelType, setFuelType] = useState("");
	const [transmissionType, setTransmissionType] = useState("");
	const [resultData,setResultData] = useState([]);
	const [vehicalMakeValue,setVehicalMakeValue] = useState("");

	const navigation = useNavigate();
	const changePageHandler = () => {
		navigation("/login");
	};

	let rowClass, toggleClass;

	if(advSearch){
		rowClass = "col-md-4";
		toggleClass = "show_search";
	}
	else{
		rowClass = "col-md-3";
		toggleClass = "hide_search";
	}

	let makes_options = makes();
	let models_options = models();

	console.log("vehicles ", makes_options);
	const setVehicleHandle = (value) => {
		setVehicle(value);
		var arr = [];
		if(value){
			value.key = '_advertisement_type'; 
			arr.push(value)
		}
		getSearchAdvertisement(arr).then(res => {
			console.log(JSON.stringify(res.data[0]._make))
			setVehicalMakeValue(JSON.stringify(res.data[0]._make))
		}).catch(err => {
			alert(err)
		})
		
		setMake("");
		setModelFirst("");
		setTypeDropdown(false);
	};

	const clearFilter = async() => {
		setVehicle("");
		setMake("");
		setModelFirst("");
		setTypeDropdown(false);
		setYear("");
		setColorType("");
		setConditions("");
		setFuelType("");
		setTransmissionType("");

		var searchArr = [];
		getSearchAdvertisement(searchArr).then(res => {
			console.log(res,'res')
			setResultData(res.data)
		}).catch(err => {
			alert(err)
		})
	}
	const getSearch = async() => {
		var searchArr = [];
		if(vehicleValue){
			vehicleValue.key = '_advertisement_type'; 
			searchArr.push(vehicleValue)
		}
		if(year){
			year.key = '_year'; 
			searchArr.push(year)
		}
		if(colorType){
			colorType.key = '_color'; 
			searchArr.push(colorType)
		}
		if(fuelType){
			fuelType.key = '_fuel_type'; 
			searchArr.push(fuelType)
		}
		if(transmissionType){
			transmissionType.key = '_transmission'; 
			searchArr.push(transmissionType)
		}
		if(condition){
			condition.key = '_condition'; 
			searchArr.push(condition)
		}
		console.log('searchArr',searchArr)
		getSearchAdvertisement(searchArr).then(res => {
			console.log(res,'res')
			setResultData(res.data)
		}).catch(err => {
			alert(err)
		})
	}

	const setMakeHandle = (value ) => {
		const modelFirstLevelArrays = models_options.filter(item => item.parent_id === value.value);

		if(modelFirstLevelArrays.length !== 0) {
			setTypeDropdown(true);
		} else {
			setTypeDropdown(false);
		}
		setMake(value);
		setModelFirst("");
	};

	const setFirstModelHandle = (value) => {
		setModelFirst(value);
	};

	const options = [
		{ value: "corolla", label: "corolla" },
		{ value: "civic", label: "civic" },
	];

	return (
		<React.Fragment>
			
				<div className={"home-main-div"}>
					<div className="container">
						<div className='row home-row-div'>
							<div className='col-md-11 d-flex justify-content-end '>
								<Button className="first-section-btn"
									onClick={changePageHandler}
								>PLACE AD</Button>
							</div>
							<div className="col-md-12 " style={{marginTop: "30px"}}>
								<div className="row d-flex justify-content-center">
									<div className="col-md-10">
										<div className="find-vehicle-div">
											<div>
												<h4>FIND VEHICLE</h4>
											</div>
											<form>
												<div className="container">
													<div className="row home-select-div">
														{/* where to use "rowClass" props */}
														<div className={rowClass}>
															<Select
																placeholder = {"Select Motors"}
																options={AdvertisementOptions()}
																// set "vehicleValue" as e
																onChange={(e) => setVehicleHandle(e)}
																isSearchable={false}
																value={vehicleValue}
															/>
														</div>
														{/* <div className={rowClass}>
															<Select
																placeholder = {vehicleValue.value === undefined ? "Select...." : vehicleValue.value === "1" ? "Select Makes" : "Select Types"}
																options={makes_options.filter(item => (item.value === "0" || (item.parent_id === vehicalMakeValue )))}
																onChange={(e) => setMakeHandle(e)}
																value= {makeValue}
																isSearchable={false}
															/>
														</div> */}
														{/* <div className={rowClass}>
															{isTypeDropdown ?
																<Select
																	placeholder = {makeValue.value === undefined ? "Select...." : vehicleValue.value === "1" ? "Select Models" : "Select Types"}
																	onChange={(e) => setFirstModelHandle(e)}
																	options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
																	value= {modelFirstValue}
																	isSearchable={false}
																/>
																: ""}
														</div> */}
														{/* meand of $ ????? */}
														<div className={`${rowClass} ${toggleClass}`}>
															<Select
																placeholder={"Select Price"}
																options={options}
															/>
														</div>
														<div className={`${rowClass} ${toggleClass}`}>
															<Select
																placeholder={"Select Year"}
																options={ManufacturingYearsOptions()}
																value={year}
																onChange = {(e) => setYear(e)}
															/>
														</div>
														<div className={`${rowClass} ${toggleClass}`}>
															<Select
																placeholder={"Select Color"}
																options={ColorTypes()}
																value={colorType}
																onChange = {(e) => setColorType(e)}
															/>
														</div>
														<div className={`${rowClass} ${toggleClass}`}>
															<Select
																placeholder={"Select Transmission"}
																options={TransmitionTypes()}
																value={transmissionType}
																onChange = {(e) => setTransmissionType(e)}
															/>
														</div>
														<div className={`${rowClass} ${toggleClass}`}>
															<Select
																placeholder={"Select FuelType"}
																options={FuelTypes()}
																value={fuelType}
																onChange = {(e) => setFuelType(e)}
															/>
														</div>
														<div className={`${rowClass} ${toggleClass}`}>
															<Select
																placeholder={"Select Condition"}
																options={BodyCondition()}
																onChange = {(e) => setConditions(e)}
															/>
														</div>
														<div className="col-md-3">
															<Button className="first-section-btn" onClick={() => getSearch()}>SEARCH</Button>
														</div>
														<div className="col-md-3">
															<Button className="first-section-btn" onClick={() => clearFilter()}>CLEAR</Button>
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
				{resultData.length && (											
				<div className={"home-main-div"}>
					<div className="container">
						<div className='row home-row-div'>
							{resultData.map((item) => (
								<div className="col-md-3 mt-4">
									<CardBlock item={item}/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}


		</React.Fragment>
	);
};

export default Home;
