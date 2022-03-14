import React, {useState, useContext} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {StepsStateInMap, StepsStateInDetail} from "../stepsState";
import {NewAdvertisement} from "../../../context/Context";
import ImageUploader from 'react-images-upload';
import "./scrollbar.css";

const UploadAndDisplayImage = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);  
    const [advertisement, setAdvertisement] = useContext(NewAdvertisement);
    const [photos, setphotos]=useState([]);
  
    const onDrop = (pictures, pictureUrl) => {
        setAdvertisement({...advertisement, "photos":pictureUrl});                
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
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            withPreview={true}
                        />  
                        <br /> 
                        <br /> 
                    </Col>
                    <Col md={10} className="btn-group" >
                        <Button right className="back_btn" onClick={() => props.onClick(StepsStateInDetail)} >Back</Button>
                        <Button className="next_btn" onClick={()=>{props.onClick(StepsStateInMap);}}>Next</Button>
                    </Col>
                </Row>
            </Col>            
        </React.Fragment>
  );
};

export default UploadAndDisplayImage;
