import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import Select from "react-select";
import { StepsStateInDetail,StepsStateInSummary} from "../../stepsState";

import { EngineTypes } from "../../../../common/data/SelectOptions.js";
import { TravelDisttance } from "../../../../common/data/SelectOptions.js";
import { makes } from "../../../../common/data";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import Motorcycle from  "../../../../common/models/Motorcycle";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);

  let [body_type, setBodyType] = useState(advertisement._body_type);
  let [engine_size, setEngineSize] = useState(advertisement._engine_size);

  let [distance, setDistance] = useState(advertisement._Travel_Disttance);

  const makes_option = makes()

  const updateData = () => {
    let detail = {
      body_type: body_type,
      engine_size: engine_size,
      distance: distance,
    }
    if (FormDataValidation(detail)) {
      const d = Object.assign(new Motorcycle(), 
      {...advertisement,
        _bodyType: body_type,
        _engineSize: engine_size,
        _distance:distance,
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
        <Form.Label style={{ color: "#fff" }}>Engine Size :</Form.Label>
       
        <Select
          placeholder={"Engine Size"}
          options={EngineTypes()}
          value={EngineTypes().find((obj) => obj.label === engine_size)}
          isSearchable={false}
          onChange={(data) => {
            setEngineSize(data.label);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Type :</Form.Label>
       
        <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '2')}
            defaultValue={body_type}
            value={makes_option.find(
              (obj) => obj.value === advertisement.body_type
            )}
            isSearchable={false}
            onChange={(data) => {
              setBodyType(data.label);
            }}
          />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Distance :</Form.Label>
        
        <div>
          <Select
            placeholder={"Distance"}
            options={TravelDisttance()}
            value={TravelDisttance().find((obj) => obj.label === distance)}
            isSearchable={false}
            onChange={(data) => {
              setDistance(data.label);
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
