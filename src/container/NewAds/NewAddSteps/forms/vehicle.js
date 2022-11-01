import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { CylinderTypes } from "../../../../common/data/SelectOptions.js";
import Select from "react-select";
import { StepsStateInDetail,StepsStateInSummary } from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import HeavyVehicle from "../../../../common/models/HeavyVehicle";
import { makes } from "../../../../common/data";


const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const makes_option = makes()
  const [details, setDetails] = useState({
    body_type: advertisement._bodyType,
    capacity_weight: advertisement._capacityWeight,
    numberOfCylinders:advertisement._numberOfCylinders
  });

  const updateData = () => {
    console.log(details);
    if (FormDataValidation(details)) {
      const d = Object.assign(new HeavyVehicle(), 
      {...advertisement,
        _bodyType: details.body_type,
        _capacityWeight: details.capacity_weight,
        _numberOfCylinders: details.numberOfCylinders,
      });
      adsCtx.setAds(d);
      props.nextStep(StepsStateInDetail);
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
      <Form.Label style={{ color: "#fff" }}>Body Type :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '4')}
            defaultValue={details.body_type}
            value={makes_option.find(
              (obj) => obj.value === advertisement.body_type
            )}
            isSearchable={false}
            onChange={(data) => {
              setDetails({
                ...details,
                body_type: data.label,
              });
            }}
          />
        </div>
      </Form.Group>

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
          defaultValue={details.cylindertypes}
          value={CylinderTypes().find(
            (obj) => obj.value === advertisement.numberOfCylinders
          )}
          isSearchable={false}
          onChange={(data) => {
            setDetails({
              ...details,
              numberOfCylinders: data.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Capacity Weight :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          className="input-fields-theme"
          placeholder="Enter capacity_weight"
          onChange={(data) => {
            setDetails({
              ...details,
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
