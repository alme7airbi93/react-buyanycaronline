import { Form, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import Select from "react-select";
import {
  MotorcycleOptions,
  HorsePowerOptions,
  TransmitionTypes,
} from "../../../../common/data/SelectOptions.js";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { useState } from "react";
import { StepsStateInDetail, StepsStateInSummary } from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import Car from "../../../../common/models/Car";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const [carDetails, setCarDetails] = useState({
    body_type: advertisement._bodyType,
    transmition: advertisement._transmission,
    power: advertisement._horsePower,
  });

  const updateData = () => {
    if (FormDataValidation(carDetails)) {
      console.log(advertisement,'before')
      const d = Object.assign(new Car(), 
      {...advertisement,
        _bodyType: carDetails.body_type,
        _transmission: carDetails.transmition,
        _horsePower:carDetails.power,
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
            options={MotorcycleOptions()}
            defaultValue={carDetails.body_type}
            value={MotorcycleOptions().find(
              (obj) => obj.value === advertisement.body_type
            )}
            isSearchable={false}
            onChange={(data) => {
              setCarDetails({
                ...carDetails,
                body_type: data.value,
              });
            }}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Transmition :</Form.Label>
        {/* <Form.Control
          as="input"
          placeholder="Enter Transmition"
          className="input-fields-theme"
          onChange={(data) => {
            setCarDetails({
              ...carDetails,
              transmition: data.target.value,
            });
          }}
        /> */}
        <Select
          placeholder={"Select"}
          options={TransmitionTypes()}
          defaultValue={carDetails.transmition}
          value={TransmitionTypes().find(
            (obj) => obj.value === advertisement.body_type
          )}
          isSearchable={false}
          onChange={(data) => {
            setCarDetails({
              ...carDetails,
              transmition: data.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Engine Horse Power :</Form.Label>
        <Select
          placeholder={"Select"}
          options={HorsePowerOptions()}
          defaultValue={carDetails.power}
          value={HorsePowerOptions().find(
            (obj) => obj.value === advertisement.body_type
          )}
          isSearchable={false}
          onChange={(data) => {
            setCarDetails({
              ...carDetails,
              power: data.value,
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
