import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import Select from "react-select";
import { StepsStateInDetail,StepsStateInSummary} from "../../stepsState";

import { EngineTypes } from "../../../../common/data/SelectOptions.js";
import { TravelDisttance } from "../../../../common/data/SelectOptions.js";
import { makes,models } from "../../../../common/data";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import Motorcycle from  "../../../../common/models/Motorcycle";
import { AdsStepVerfication } from "../../../../controllers/AdsController";
const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);


  const [makeValue, setMakeValue] = useState();
  const [motorCycleDetails, setMoterCycleDetails] = useState({
    _make: advertisement._make,
    _modal:advertisement._modal,
    _engineSize: advertisement._engineSize,
    _distance: advertisement._distance,
  });

  const makes_option = makes();
  const models_options = models()

  
  const updateData = () => {
    const resp =   AdsStepVerfication(advertisement,motorCycleDetails)
    if(resp.success){
        adsCtx.setAds(resp.data);
        props.nextStep(StepsStateInDetail);
    }
    props.nextStep(StepsStateInDetail);
  };


  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Engine Size :</Form.Label>
       
        <Select
          placeholder={"Engine Size"}
          options={EngineTypes()}
          value={EngineTypes().find((obj) => obj.label === advertisement._engineSize)}
          isSearchable={false}
          onChange={(data) => {
            setMoterCycleDetails({
              ...motorCycleDetails,
              _engineSize: data.label,
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Make :</Form.Label>
       
        <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '2')}
            defaultValue={motorCycleDetails._make}
            value={makes_option.find(
              (obj) => obj.value === advertisement._make
            )}
            isSearchable={false}
            onChange={(data) => {
              setMoterCycleDetails({
                ...motorCycleDetails,
                _make: data.label,
              });
              setMakeValue(data)
            }}
          />
      </Form.Group>

      {makeValue ? (
          <Form.Group className="mb-3">
          <Form.Label style={{ color: "#fff" }}>Modal :</Form.Label>
          <div className="mb-3">
            <Select
              placeholder={"Select Modal"}
              options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
              defaultValue={motorCycleDetails._modal}
              value={models_options.find(
                (obj) => obj.value === advertisement._modal
              )}
              isSearchable={false}
              onChange={(data) => {
               setMoterCycleDetails({
                ...motorCycleDetails,
                _modal: data.label,
              });
              }}
            />
          </div>
        </Form.Group>
      ):(<></>)}


      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Distance :</Form.Label>
        
        <div>
          <Select
            placeholder={"Distance"}
            options={TravelDisttance()}
            value={TravelDisttance().find((obj) => obj.label ===  advertisement._distance)}
            isSearchable={false}
            onChange={(data) => {
              // setDistance(data.label);
              setMoterCycleDetails({
                ...motorCycleDetails,
                _distance: data.label,
              });
            }}
          />
        </div>
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
