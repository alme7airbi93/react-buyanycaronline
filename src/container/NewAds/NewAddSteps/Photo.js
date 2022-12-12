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
	const [photos, setphotos]=useState([]);

	const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  
	const onDrop = (pictures, pictureUrl) => {
		console.log(pictureUrl,photos)
		setphotos([...photos,pictureUrl])
	};
	const [error,setError] = useState({
		error:false,
		errorKey:''
	
	  })

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
		} else{
			console.log(resp,'ShowError Message')
			setError({error:true,errorKey:resp.errorField})
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
							style={{backgroundColor:'#3c3c3c'}}
							
						/>  
						<br /> 
						<br /> 
					</Col>
					{error ? (<p style={{ color: "red" }}>Please Select Photo</p>):<></>}

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
