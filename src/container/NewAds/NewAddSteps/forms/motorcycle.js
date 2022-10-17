import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";


const Detail = (props) => {
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>engine_size  :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter engine_size"
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              engine_size: data.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>distance  :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter distance"
          className="input-fields-theme"
          type="number"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              distance: data.target.value });
          }}
        />
      </Form.Group>
    
    </React.Fragment>
  );
};

export default Detail;
