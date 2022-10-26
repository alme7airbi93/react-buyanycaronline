import React, {useState, useContext,useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {StepsStateInMap, StepsStateInDetail} from "../stepsState";
import {NewAdvertisement} from "../../../context/Context";
import ImageUploader from "react-images-upload";
import "./scrollbar.css";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
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
		if(photos.length){
			const d = Object.assign(new Car(),
				{
					...advertisement,
					_photos:photos
				});
			adsCtx.setAds(d);
			props.nextStep(StepsStateInMap);
		}

	}

	const uploadImageToCloud = ()=>{
		
		photos.forEach((data)=>uploadImageNow(data))

	}

	


	const uploadImageNow = async (file) => {
		const imagePath = 'ads/'
		if (!file) {
		  alert('Image cannnot be blank')
		  return
		}
		const storage = getStorage()
		const storageRef = ref(storage, imagePath + `/${file.name}`)
		const task = await uploadBytes(storageRef, file).then((res) =>
		  console.log(res.ref),
		)
		const url = await getDownloadURL(storageRef)
		// await uploadEventImage(eventId, url, imageType)
		// toast('image uploaded successfully')
		// setLoading(false)
		// refreshData(true)
	  }

	useEffect(() => {
		console.log(advertisement, "Advertisment in Main Category");
		console.log(Object.getPrototypeOf(advertisement), "Object Checking");
	  }, []);

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
