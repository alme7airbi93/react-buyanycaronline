import React, {useState,useEffect} from "react";
import "./CarSearch.css";
import {Button} from "react-bootstrap";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import { ManufacturingYearsOptions,PriceTypes } from "../../common/data/SelectOptions";
import { getSearchAdvertisement } from "../../common/repository/AdvertisementDB";

import CardBlock from "../../components/CardBlock/CardBlock";
import {AdvertisementOptions, BodyCondition, ColorTypes, FuelTypes, TransmitionTypes} from "../../common/data/SelectOptions";
import { useLocation } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { makes, models} from "../../common/data";
import { SearchAdvertisement } from "../../controllers/AdsController";
const height = window.innerHeight;
const CarSearch = () => {

// 	const [searchParams, setSearchParams] = useSearchParams();
//    const query = JSON.parse(searchParams.get("result"))


	const [vehicleValue, setVehicle] = useState("");
	const [makeValue, setMake] = useState("");
	const [modelFirstValue, setModelFirst] = useState("");
	let [isTypeDropdown, setTypeDropdown] = useState(false);

	const [year, setYear] = useState("");
	const [colorType, setColorType] = useState("");

	const [priceType, setPriceType] = useState(0);
	const [condition, setConditions] = useState("");
	const [fuelType, setFuelType] = useState("");
	const [transmissionType, setTransmissionType] = useState("");
	const [resultData,setResultData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filterMakes,setFilterMakes] = useState([]);

	const { state } = useLocation();

	const options = [
		{ value: "corolla", label: "corolla" },
		{ value: "civic", label: "civic" },
	];
	let rowClass, toggleClass;

	let makes_options = makes();
	let models_options = models();



	useEffect(() => {
		console.log(state,'state')
		getSearchAdvertisement(state).then(res => {
			console.log(res,'res')
			setResultData(res.data)
			setLoading(false)
		}).catch(err => {
			alert(err)
			setLoading(false)
		})

	},[])

	const setVehicleHandle = (value) => {
		// setLoading(true)
		setVehicle(value);
		let makesArray = [];
		if(value.key === 'Cars'){
			makesArray = makes_options.filter(item => item.parent_id === '1');
		}
		else if(value.key === 'Motorcycles'){
			makesArray = makes_options.filter(item => item.parent_id === '2');
		}
		else if(value.key === 'HeavyVehicles'){
			makesArray = makes_options.filter(item => item.parent_id === '4');
		}
		else if(value.key === 'Boats'){
			makesArray = makes_options.filter(item => item.parent_id === '5');
		}
		else if(value.key === 'Accessories'){
			makesArray = makes_options.filter(item => item.parent_id === '3');
		}
		else if(value.key === 'PlateNumber'){
			makesArray = makes_options.filter(item => item.parent_id === '6');
		}
		setFilterMakes(makesArray);
		
		setMake("");
		setLoading(false)
	};

	const getSearch = async() => {
		// setLoading(true)
		var searchArr = [];
		if(vehicleValue){
			vehicleValue.key = '_advertisement_type'; 
			searchArr.push(vehicleValue)
		}
		if(makeValue){
			searchArr.push({value:makeValue.label,label:makeValue.label,key:'_make'})
		}
		if(modelFirstValue){
			modelFirstValue.key = '_modal'; 
			searchArr.push({value:modelFirstValue.label,label:modelFirstValue.label,key:'_modal'})
		}
		if(priceType){
			priceType.key = '_price'; 
			searchArr.push(priceType)
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


		let result = await SearchAdvertisement(searchArr);
		if(result.data){
			setResultData(result.data)
			setLoading(false)
		}
		else{
			alert(result.msg)
			setLoading(false)
		}

		
	}
	const clearFilter = async() => {
		setLoading(true)
		setVehicle("");
		setPriceType("");
		setTypeDropdown(false);
		setMake("");
		setFirstModelHandle("");
		setYear("");
		setColorType("");
		setConditions("");
		setFuelType("");
		setTransmissionType("");

		var searchArr = [];

		let result = await SearchAdvertisement(searchArr);
		if(result.data){
			setResultData(result.data)
			setLoading(false)
		}
		else{
			alert(result.msg)
			setLoading(false)
		}

		
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

	return (
		<div className="main-carSearch-div">
			<div className="container">
				<div className="row">
					<div className="col-md-3 carSearch-find-div">
						<h5>FIND</h5>
						<hr/>
						<div className="row">
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
								placeholder = {"Select Motors"}
								options={AdvertisementOptions()}
								// set "vehicleValue" as e
								onChange={(e) => setVehicleHandle(e)}
								isSearchable={true}
								value={vehicleValue}
							/>
								</div>
							</div>
							{vehicleValue ? (
							<div className="col-md-12">
								<div className={"mb-3"}>
								
								<Select
									placeholder = {vehicleValue.value === undefined ? "Select...." : vehicleValue.value === "1" ? "Select Makes" : "Select Types"}
									options={filterMakes}
									onChange={(e) => setMakeHandle(e)}
									value= {makeValue}
									isSearchable={true}
								/>
								
								</div>
							</div>
							):(<></>)}
							{isTypeDropdown ?
							<div className="col-md-12">
								<div className={"mb-3"}>
								
									<Select
										placeholder = {makeValue.value === undefined ? "Select...." : vehicleValue.value === "1" ? "Select Models" : "Select Types"}
										onChange={(e) => setFirstModelHandle(e)}
										options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
										value= {modelFirstValue}
										isSearchable={true}
									/>
									
								</div>
							</div>
                          : <></>}
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
									placeholder={"Select Price"}
									options={PriceTypes()}
									value={priceType}
									isSearchable={true}
									onChange = {(e) => setPriceType(e)}
								/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
									placeholder={"Select Year"}
									options={ManufacturingYearsOptions()}
									value={year}
									isSearchable={true}
									onChange = {(e) => setYear(e)}
								/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
									placeholder={"Select Color"}
									options={ColorTypes()}
									value={colorType}
									isSearchable={true}
									onChange = {(e) => setColorType(e)}
								/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
									placeholder={"Select Transmission"}
									options={TransmitionTypes()}
									value={transmissionType}
									isSearchable={true}
									onChange = {(e) => setTransmissionType(e)}
								/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
									placeholder={"Select FuelType"}
									options={FuelTypes()}
									value={fuelType}
									isSearchable={true}
									onChange = {(e) => setFuelType(e)}
								/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
									<Button type="button" onClick={() => getSearch()} className="first-section-btn">SEARCH</Button>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
									<Button type="button" onClick={() => clearFilter()} className="clear-btn">Clear Filter</Button>
								</div>
							</div>
							
						</div>
					</div>
					<div className="col-md-6 carSearch-result-div" style={{height:height - 180,overflow:'auto',minHeight: '510px'}}>
						<h3 className="d-flex justify-content-between"><span>Search Result</span><span>({resultData.length})</span></h3>
						<hr/>

						{resultData.map((item) => (
							<div className="col-md-12 mb-3" key={item._id}>
								<CardBlock item={item}/>
							</div>
						))}

					</div>
					<div className="col-md-2 carSearch-block-div">
						<p>Empty block for ads</p>
						<hr />
					</div>
				</div>
			</div>
			{loading === true ? (
				<div className="loader">
					<Spinner animation="border" variant="danger" />
				</div>
			)
			:
			(<></>)}
		</div>
	);
};
export default CarSearch;
