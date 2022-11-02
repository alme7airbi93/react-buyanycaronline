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
import { makes, models} from "../../../../common/data";


const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const makes_option = makes();
  const models_options = models();

  const [details, setDetails] = useState({
    make: advertisement._make,
    modal:advertisement._modal,
    capacity_weight: advertisement._capacityWeight,
    numberOfCylinders:advertisement._numberOfCylinders
  });

  const [makeValue, setMakeValue] = useState();


  const updateData = () => {
    console.log(details);
    if (FormDataValidation(details)) {
      const d = Object.assign(new HeavyVehicle(), 
      {...advertisement,
        _make: details.make,
        _modal:details.modal,
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
      <Form.Label style={{ color: "#fff" }}>Make :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '4')}
            defaultValue={details.make}
            value={makes_option.find(
              (obj) => obj.value === advertisement.make
            )}
            isSearchable={false}
            onChange={(data) => {
              setDetails({
                ...details,
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
              defaultValue={details.modal}
              value={models_options.find(
                (obj) => obj.value === advertisement.modal
              )}
              isSearchable={false}
              onChange={(data) => {
                setDetails({
                  ...details,
                  modal: data.label,
                });
              }}
            />
          </div>
        </Form.Group>
      ):(<></>)}


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
