import React, {useState, useContext,useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {StepsStateInMap, StepsStateInDetail} from "../stepsState";
import {NewAdvertisement} from "../../../context/Context";
import ImageUploader from "react-images-upload";
import "./scrollbar.css";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import { checkAdvertisemntType } from "../../../common/validations/ClassesTypeOfValidations";
import Car from "../../../common/models/Car";
import {
	getDownloadURL,
	uploadBytes,
	getStorage,
	listAll,
	ref,
	uploadBytesResumable,
  } from 'firebase/storage'


const UploadAndDisplayImage = (props) => {
	const [selectedImage, setSelectedImage] = useState(null);  
	const [photos, setphotos]=useState([]);

	const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  
	const onDrop = (pictures, pictureUrl) => {
		setphotos([...photos,pictureUrl])
		// adsCtx.setAds({...advertisement, "photos":pictureUrl});                
	};


	const updateData = ()=>{
		const instance =  checkAdvertisemntType(advertisement)
		console.log(instance);
		if(photos.length){
			const d = Object.assign(instance,
				{
					...advertisement,
					_photos:photos
				});
			adsCtx.setAds(d);
			props.nextStep(StepsStateInMap);
		}

	}


	return (
		<React.Fragment>     
			<Col md={5} className="find_details">
				<h5>Select Photo</h5>
				<hr/>
				<Row className="justify-content-center">
					<Col md={10} id="center-pos">
						<ImageUploader
							withIcon={true}
							buttonText='Choose images'
							onChange={onDrop}
							imgExtension={[".jpg", ".gif", ".png", ".gif"]}
							maxFileSize={5242880}
							withPreview={true}
						/>  
						<br /> 
						<br /> 
					</Col>
					<Col md={10} className="btn-group" >
						<Button right className="back_btn" onClick={() => props.nextStep(StepsStateInDetail)} >Back</Button>
						<Button className="next_btn" onClick={updateData}>Next</Button>
					</Col>
				</Row>
			</Col>            
		</React.Fragment>
	);
};

export default UploadAndDisplayImage;
