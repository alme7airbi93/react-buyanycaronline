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
        <Form.Label style={{ color: "#fff" }}>number_of_cylinders  :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter number_of_cylinders"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              number_of_cylinders: data.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>capacity_weight  :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter capacity_weight"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              capacity_weight: data.target.value});
          }}
        />
      </Form.Group>
      
    </React.Fragment>
  );
};

export default Detail;
