import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { StepsStateInMap, StepsStateInDetail } from "../stepsState";
import { NewAdvertisement } from "../../../context/Context";
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
} from "firebase/storage";
import { Store } from "react-notifications-component";

const UploadAndDisplayImage = (props) => {
  const [photos, setphotos] = useState([]);

  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const onDrop = (pictures, pictureUrl) => {
    if (pictureUrl.length > 1) {
      setphotos([...photos, pictureUrl[pictureUrl.length - 1]]);
    } else {
      setphotos(pictureUrl);
    }

    // console.log(pictureUrl,photos)
  };
  const [error, setError] = useState({
    error: false,
    errorKey: "",
  });
  console.log(photos);
  const updateData = () => {
    const instance = checkAdvertisemntType(advertisement);
    console.log(instance);
    if (photos.length) {
      const d = Object.assign(instance, {
        ...advertisement,
        _photos: photos,
      });
      adsCtx.setAds(d);
      props.nextStep(StepsStateInMap);
    } else {
      // console.log(resp, "ShowError Message");
      // setError({ error: true, errorKey: resp.errorField });
      Store.addNotification({
        title: "Warning",
        message: "Please choose images",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
        },
      });
    }
  };

  const RemovePhoto = (index) => {
    console.log(photos, "photoooos");
    const photoCopy = [...photos];
    photoCopy.splice(index, 1);
    setphotos(photoCopy);
    // // setphotos([...photos,...photos[lastIndex][photoCopy]]);
  };

  return (
    <React.Fragment>
      <div className="col-md-12 d-flex flex-wrap justify-content-center">
        {photos &&
          photos.map((photo, index) => (
            <div key={index} className="col-md-3 photo-wrapper">
              <span
                onClick={() => RemovePhoto(index)}
                className="position-absolute photo-remove"
              >
                X
              </span>
              <img
                key={index}
                src={photo}
                style={{
                  width: "auto",
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "100%",
                }}
              />
            </div>
          ))}
      </div>
      <Col md={5} className="find_details">
        <h5>Select Photo</h5>
        <hr />
        <Row className="justify-content-center">
          <Col md={10} id="center-pos">
            <ImageUploader
              withIcon={false}
              fileContainerStyle={{ minHeight: "180px" }}
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={false}
              withLabel={false}
              style={{ backgroundColor: "#3c3c3c", minHeight: "180px" }}
            />
            <br />
            <br />
          </Col>
          {error ? <p style={{ color: "red" }}>Please Select Photo</p> : <></>}

          <Col md={10} className="btn-group">
            <Button
              right
              className="back_btn"
              onClick={() => props.nextStep(StepsStateInDetail)}
            >
              Back
            </Button>
            <Button className="next_btn" onClick={updateData}>
              Next
            </Button>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default UploadAndDisplayImage;
