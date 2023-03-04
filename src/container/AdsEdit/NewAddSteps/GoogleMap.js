import React, { useState, useContext, Component, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { StepsStateInPhoto, StepsStateInDetail } from "../stepsState";
import { NewAdvertisement } from "../../../context/Context";
import GoogleMapReact from "google-map-react";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import UserProfile from "../../UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

import "./scrollbar.css";
import {
  createAdvertisement,
  updateAdvertisement,
  updateArrayField
} from "../../../common/repository/AdvertisementDB";
import {
  getDownloadURL,
  uploadString,
  uploadBytes,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loder from "../../../common/loder/Loder";

const GoogleMap = (props) => {
  let navigate = useNavigate();
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [photos, setPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const center = { lat: 24.4539, lng: 54.3773 };
  const zoom = 4;

  useEffect(() => {
    setPhotos(advertisement.photos);
    //console.log(advertisement,'in Map')
  }, []);

  const uploadImageNow = async (file, id) => {
    const imagePath = "advertisement/" + id;
    const date = new Date();
    const filename = Math.floor(date.getTime() / 1000);
    const storage = getStorage();
    const storageRef = ref(storage, imagePath + `/${filename}`);
    await uploadString(storageRef, file[0], "data_url").then((res) =>
      console.log(res.ref)
    );
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const savePhotos = async (id) => {
    const url = [];
    for (let i = 0; i < photos.length; i++) {
      await uploadImageNow(photos[i], id).then((res) => url.push(res));
    }
    // advertisement._photos = url;
    // console.log(advertisement);
    await updateArrayField(id, url).then((res) =>
      console.log(res, "res image url saved")
    );
  };

  const saveData = () => {
    setLoading(true);
    var dt = advertisement;
    dt.photos = [];
    createAdvertisement(advertisement).then((res) => {
      if (res.success) {
        console.log(res.data, res);
        savePhotos(res.data);
        setLoading(false);
        // navigate("/user-profile");
        Store.addNotification({
          title: "Success",
          message: "Data uploaded successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Col md={5} className="find_details">
        <h5>Select location</h5>
        <hr />
        <Row className="justify-content-center">
          <Col md={10} id="center-pos">
            <div style={{ height: "60vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDnZHCNVuYH8lZSMZtuHzJ4677eUi6AE8w",
                }}
                defaultCenter={center}
                defaultZoom={zoom}
                onClick={(ev) => {
                  setAdvertisement({
                    ...advertisement,
                    location: { lat: ev.lat, long: ev.lng },
                  });
                }}
              ></GoogleMapReact>
            </div>
            <br />
          </Col>
          <Col md={10} className="btn-group">
            <Button
              right
              className="back_btn"
              onClick={() => props.onClick(StepsStateInPhoto)}
            >
              Back
            </Button>
            <Button className="next_btn" onClick={saveData}>
              Done
            </Button>
          </Col>
        </Row>
      </Col>
      {loading && <Loder />}
    </React.Fragment>
  );
};

export default GoogleMap;
