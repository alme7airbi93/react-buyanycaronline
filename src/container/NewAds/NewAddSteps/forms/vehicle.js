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
import { AdsStepVerfication } from "../../../../controllers/AdsController";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const makes_option = makes();
  const models_options = models();

  const [details, setDetails] = useState({
    _make: advertisement._make,
    _modal:advertisement._modal,
    _capacityWeight: advertisement._capacityWeight,
    _numberOfCylinders:advertisement._numberOfCylinders
  });

  const [makeValue, setMakeValue] = useState();


  const updateData = () => {
    const resp =   AdsStepVerfication(advertisement,details)
    if(resp.success){
        adsCtx.setAds(resp.data);
        props.nextStep(StepsStateInDetail);
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
            defaultValue={details._make}
            value={makes_option.find(
              (obj) => obj.value === advertisement._make
            )}
            isSearchable={false}
            onChange={(data) => {
              setDetails({
                ...details,
                _make: data.label,
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
              defaultValue={details._modal}
              value={models_options.find(
                (obj) => obj.value === advertisement._modal
              )}
              isSearchable={false}
              onChange={(data) => {
                setDetails({
                  ...details,
                  _modal: data.label,
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
            (obj) => obj.value === advertisement._numberOfCylinders
          )}
          isSearchable={false}
          onChange={(data) => {
            setDetails({
              ...details,
              _numberOfCylinders: data.value,
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
              _capacityWeight: data.target.value,
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
