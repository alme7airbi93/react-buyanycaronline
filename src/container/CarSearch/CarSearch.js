import React, {useState,useEffect} from "react";
import "./CarSearch.css";
import {Button} from "react-bootstrap";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import { ManufacturingYearsOptions } from "../../common/data/SelectOptions";
import { getSearchAdvertisement } from "../../common/repository/AdvertisementDB";
import CardBlock from "../../components/CardBlock/CardBlock";
import {AdvertisementOptions, BodyCondition, ColorTypes, FuelTypes, TransmitionTypes} from "../../common/data/SelectOptions";


const height = window.innerHeight;
const CarSearch = () => {

	const [searchParams, setSearchParams] = useSearchParams();
   const query = JSON.parse(searchParams.get("result"))


	const [vehicleValue, setVehicle] = useState("");
	const [year, setYear] = useState("");
	const [colorType, setColorType] = useState("");
	const [condition, setConditions] = useState("");
	const [fuelType, setFuelType] = useState("");
	const [transmissionType, setTransmissionType] = useState("");
	const [resultData,setResultData] = useState([]);


	const options = [
		{ value: "corolla", label: "corolla" },
		{ value: "civic", label: "civic" },
	];

	useEffect(() => {
		console.log(query)
		getSearchAdvertisement(query).then(res => {
			console.log(res,'res')
			setResultData(res.data)
		}).catch(err => {
			alert(err)
		})

	},[])

	const setVehicleHandle = (value) => {
		setVehicle(value);
	};

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


	return (
		<div className="main-carSearch-div">
			<div className="container">
				<div className="row">
					<div className="col-md-2 carSearch-find-div">
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
								isSearchable={false}
								value={vehicleValue}
							/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
								<Select
									placeholder={"Select Year"}
									options={ManufacturingYearsOptions()}
									value={year}
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
									onChange = {(e) => setFuelType(e)}
								/>
								</div>
							</div>
							<div className="col-md-12">
								<div className={"mb-3"}>
									<Button type="button" onClick={() => getSearch()} className="first-section-btn">SEARCH</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-7 carSearch-result-div" style={{height:height - 180,overflow:'auto'}}>
						<h3 className="d-flex justify-content-between"><span>Search Result</span><span>({resultData.length})</span></h3>
						<hr/>

						{resultData.map((item) => (
							<div className="col-md-12 mb-3">
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
		</div>
	);
};
export default CarSearch;
