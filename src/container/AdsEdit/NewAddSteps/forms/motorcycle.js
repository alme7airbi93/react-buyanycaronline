import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import Select from "react-select";
import { StepsStateInDetail,StepsStateInSummary} from "../../stepsState";

import { EngineTypes } from "../../../../common/data/SelectOptions.js";
import { TravelDisttance } from "../../../../common/data/SelectOptions.js";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);

  let [type, setType] = useState(advertisement._Engine_Types);
  let [distance, setDistance] = useState(advertisement._Travel_Disttance);

  const updateData = () => {
    props.nextStep(StepsStateInDetail);
  };

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Engine Size :</Form.Label>
        {/* <Form.Control
          as="input"
          type="number"
          placeholder="Enter engine_size"
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              engine_size: data.target.value });
          }}
        /> */}
        <Select
          placeholder={"Engine Size"}
          options={EngineTypes()}
          value={EngineTypes().find((obj) => obj.label === type)}
          isSearchable={false}
          onChange={(data) => {
            setType(data.label);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Distance :</Form.Label>
        {/* <Form.Control
          as="input"
          placeholder="Enter distance"
          className="input-fields-theme"
          type="number"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              distance: data.target.value,
            });
          }}
        /> */}
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
