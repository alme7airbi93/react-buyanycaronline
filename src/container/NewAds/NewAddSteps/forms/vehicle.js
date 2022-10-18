import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { CylinderTypes } from "../../../../common/data/SelectOptions.js";
import Select from "react-select";
import { StepsStateInDetail } from "../../stepsState";


const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);
  const [carDetails, setCarDetails] = useState({
    cylindertypes: advertisement._cylindertypes,
  });
  const updateData = () => {
    props.nextStep(StepsStateInDetail);
  };

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Number Of Cylinders :</Form.Label>
        {/* <Form.Control
          as="input"
          type="number"
          placeholder="Enter number_of_cylinders"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              number_of_cylinders: data.target.value });
          }}
        /> */}
        <Select
          placeholder={"No. of Cylinders"}
          options={CylinderTypes()}
          defaultValue={carDetails.body_type}
          value={CylinderTypes().find(
            (obj) => obj.value === advertisement.cylindertypes
          )}
          isSearchable={false}
          onChange={(data) => {
            setCarDetails({
              ...carDetails,
              _cylindertypes: data.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Capacity Weight :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter capacity_weight"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              capacity_weight: data.target.value,
            });
          }}
        />
      </Form.Group>
      <div className="d-flex justify-content-space-between">
      <Button
        right
        className="back_btn"
        onClick={() => props.nextStep(StepsStateInSummary)}
      >
        Back
      </Button>
      <Button className="next_btn" onClick={() => updateData()}>
        Next
      </Button>
      </div>
    </React.Fragment>
  );
};

export default Detail;
