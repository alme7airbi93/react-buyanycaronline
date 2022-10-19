import React, {useState, useContext, Component, useEffect} from "react";
import {Button, Col, Row, Form} from "react-bootstrap";
import {StepsStateInPhoto, StepsStateInDetail} from "../stepsState";
import {NewAdvertisement} from "../../../context/Context";
import GoogleMapReact from "google-map-react";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";


import "./scrollbar.css";
import { createAdvertisement } from "../../../common/repository/AdvertisementDB";
import {
	getDownloadURL,
	uploadBytes,
	getStorage,
	listAll,
	ref,
	uploadBytesResumable,
  } from 'firebase/storage'


const GoogleMap = (props) => {
  
	const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
	const [photos,setPhotos] = useState()

	const center = { lat: 24.4539, lng: 54.3773 };
	const zoom = 4;
	
	useEffect(()=>{
		setPhotos(advertisement.photos)
		console.log(advertisement,'in google')
	},[])


	const uploadImageNow = async (file,id,filename) => {
		console.log(file,id,filename+'.png','file')
		const imagePath = 'ads/'+id;
		if (!file) {
		  alert('Image cannnot be blank')
		  return
		}
		const storage = getStorage()
		const storageRef = ref(storage, imagePath + `/${filename}.png`)
		const task = await uploadBytes(storageRef, file).then((res) =>
		  console.log(res.ref),
		)
		const url = await getDownloadURL(storageRef)
		console.log(url,'url')
		// await uploadEventImage(eventId, url, imageType)
		// toast('image uploaded successfully')
		// setLoading(false)
		// refreshData(true)
	  }


	const savePhotos = (id) => {
		var filename = 1;
		photos.forEach((data)=> {
			filename = filename + 1;
			uploadImageNow(data,id,filename)
		})
	}

	const saveData = () =>{
		var dt = advertisement;
		dt.photos = [];
		console.log(dt,'save data')
		console.log(photos,'photos')
		createAdvertisement(advertisement).then((res)=>{
			if(res.success){
				console.log(res.data,res)
				savePhotos(res.data)
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
