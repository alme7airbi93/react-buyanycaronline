import { Form, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import Select from "react-select";
import {
  MotorcycleOptions,
  HorsePowerOptions,
  TransmitionTypes,
} from "../../../../common/data/SelectOptions.js";
import { makes,models } from "../../../../common/data";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { useState } from "react";
import { StepsStateInDetail, StepsStateInSummary } from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import Car from "../../../../common/models/Car";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const makes_option = makes()
  const models_options = models();

  const [carDetails, setCarDetails] = useState({
    make: advertisement._make,
    modal:advertisement._modal,
    transmition: advertisement._transmission,
    power: advertisement._horsePower,
  });
  
  const [makeValue, setMakeValue] = useState();

  const updateData = () => {
    if (FormDataValidation(carDetails)) {
      console.log(advertisement,'before')
      const d = Object.assign(new Car(), 
      {...advertisement,
        _modal:carDetails.modal,
        _make: carDetails.make,
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
        <Form.Label style={{ color: "#fff" }}>Make :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '1')}
            defaultValue={carDetails.make}
            value={makes_option.find(
              (obj) => obj.value === advertisement.make
            )}
            isSearchable={false}
            onChange={(data) => {
              setCarDetails({
                ...carDetails,
                make: data.label,
              });
              setMakeValue(data)
            }}
          />
        </div>
      </Form.Group>
      {makeValue ? (
          <Form.Group className="mb-3">
          <Form.Label style={{ color: "#fff" }}>Modal :</Form.Label>
          <div className="mb-3">
            <Select
              placeholder={"Select Modal"}
              options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
              defaultValue={carDetails.modal}
              value={models_options.find(
                (obj) => obj.value === advertisement.modal
              )}
              isSearchable={false}
              onChange={(data) => {
                setCarDetails({
                  ...carDetails,
                  modal: data.label,
                });
              }}
            />
          </div>
        </Form.Group>
      ):(<></>)}
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
            (obj) => obj.value === advertisement.make
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
            (obj) => obj.value === advertisement.make
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
