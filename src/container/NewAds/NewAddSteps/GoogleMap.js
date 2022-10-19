import React, {useState, useContext, Component, useEffect} from "react";
import {Button, Col, Row, Form} from "react-bootstrap";
import {StepsStateInPhoto, StepsStateInDetail} from "../stepsState";
import {NewAdvertisement} from "../../../context/Context";
import GoogleMapReact from "google-map-react";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";


import "./scrollbar.css";
import { createAdvertisement } from "../../../common/repository/AdvertisementDB";

const GoogleMap = (props) => {
  
	const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;

	const center = { lat: 24.4539, lng: 54.3773 };
	const zoom = 4;
	
	useEffect(()=>{
		console.log(advertisement,'in google')
	},[])


	const saveData = () =>{
		createAdvertisement(advertisement).then((res)=>{
			if(res.success){
				alert('Data uploaded successfully')

			}
		})
	}
    
	return (    
		<React.Fragment>     
			<Col md={5} className="find_details">
				<h5>Select location</h5>
				<hr/>
				<Row className="justify-content-center">
					<Col md={10} id="center-pos">
						<div style={{ height: "60vh", width: "100%" }}>
							<GoogleMapReact
								bootstrapURLKeys={{ key: "AIzaSyDnZHCNVuYH8lZSMZtuHzJ4677eUi6AE8w" }}
								defaultCenter={center}
								defaultZoom={zoom}
								onClick={ev => {
									setAdvertisement({...advertisement, "location":{"lat":ev.lat, "long":ev.lng}});                                                                
								}}
							>
							</GoogleMapReact>            
						</div>
						<br /> 
					</Col>
					<Col md={10} className="btn-group" >
						<Button right className="back_btn" onClick={() => props.onClick(StepsStateInPhoto)} >Back</Button>
						<Button className="next_btn" onClick={saveData}>Done</Button>
					</Col> 
				</Row>
			</Col>            
		</React.Fragment>
	);     
};

export default GoogleMap;
