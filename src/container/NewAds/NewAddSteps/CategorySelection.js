import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import React, {useState, useContext} from "react";
import {AdvertisementOptions} from "../../../common/data/SelectOptions.js";
import {StepsStateInSummary, StepsStateInDetail} from "../stepsState";
import { makes, models ,models_second} from "../../../common/data";
import {NewAdvertisement} from "../../../context/Context";

const CategorySelection = (props) => {
	const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

	let makes_options = makes();
	let models_options = models();
	let models_second_options = models_second();

	let [isMakeDropdown, setMakeDropdown] = useState(false);
	let [isTypeDropdown, setTypeDropdown] = useState(false);
	let [isModelDropdown, setModelDropdown] = useState(false);

	const [vehicleValue, setVehicle] = useState("");
	const [makeValue, setMake] = useState("");
	const [modelFirstValue, setModelFirst] = useState("");
	const [modelSecondValue, setModelSecond] = useState("");

	const handler=()=>{
		if (advertisement.type===undefined)
		{
			setAdvertisement({...advertisement, "type":{"kind": " "}});
		}
	};
	return(
		<React.Fragment>
			<Col md={5} className="find_details">
				<h5>FIND</h5>
				<hr/>
				<Row className="justify-content-center">
					<Col md={10}>
						<div className={"mb-3"}>
							<Select
								placeholder = {"Select Motors"}
								options={AdvertisementOptions()}
								onChange={data => {
									setVehicle(data);
									setMake("");
									setModelFirst("");
									setMakeDropdown(true);
									setTypeDropdown(false);
									setAdvertisement({...advertisement, "type":{"kind": data.label}});
								}}
								isSearchable={false}
							/>
						</div>
					</Col>
					<Col md={10}>
						<div className={"mb-3"}>
							{isMakeDropdown ?
								<Select
									placeholder = {vehicleValue.value === undefined ? "Select...." : vehicleValue.value === "1" ? "Select Makes" : "Select Types"}
									options={makes_options.filter(item => (item.value === "0" || (item.parent_id === vehicleValue.value )))}
									onChange = {data => {
										const modelFirstLevelArrays = models_options.filter(item => item.parent_id === data.value);
										if(modelFirstLevelArrays.length !== 0) {
											setTypeDropdown(true);
										} else {
											setTypeDropdown(false);
										}
										setMake(data);
										setModelFirst("");
										setAdvertisement({...advertisement, "type":{...advertisement.type, "make": data.value}});
									}}
									value= {makeValue}
									isSearchable={false}
								/>
								:null}
						</div>
					</Col>
					<Col md={10}>
						<div className={"mb-3"}>
							{isTypeDropdown &&
                            <Select
                            	placeholder = {makeValue.value === undefined ? "Select...." : vehicleValue.value === "1" ? "Select Models" : "Select Types"}
                            	options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
                            	onChange = {data => {
                            		const modelSecondLevelArrays = models_options.filter(item => item.parent_id === data.value);
                            		if(modelSecondLevelArrays.length !== 0) {
                            			setModelDropdown(true);
                            		} else {
                            			setModelDropdown(false);
                            		}
                            		setModelFirst(data);
                            		setAdvertisement({...advertisement, "type":{...advertisement.type, "model": data.value}});
                            	}}
                            	isSearchable={false}
                            	value= {modelFirstValue}
                            />}
						</div>
					</Col>
					<Col md={10}>
						<div className={"mb-3"}>
							{isModelDropdown &&
                            <Select
                            	placeholder = {modelFirstValue.value === undefined ? "Select...." : "Select second Models"}
                            	options={models_second_options.filter(item => (item.value === "0" || (item.parent_id === modelFirstValue.value)))}
                            	onChange={data => {
                            		setModelSecond(data);
                            		setAdvertisement({...advertisement, "type":{...advertisement.type, "modelSecond": data.value}});
                            	}}
                            	value= {modelSecondValue}
                            	isSearchable={false}
                            />}
						</div>
					</Col>
					<Col md={10} className="btn-group" >
						<Button right className="back_btn" onClick={() => props.onClick(StepsStateInSummary)} >Back</Button>
						<Button className="next_btn" onClick={() => { handler();props.onClick(StepsStateInDetail);}} >Next</Button>
					</Col>
				</Row>
			</Col>
		</React.Fragment>
	);
};

export default CategorySelection;
