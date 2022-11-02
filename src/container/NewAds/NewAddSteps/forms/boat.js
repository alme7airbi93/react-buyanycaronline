import { Form, Button } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import { BoatOptions } from "../../../../common/data/SelectOptions.js";
import Select from "react-select";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail, StepsStateInSummary} from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import Boat from "../../../../common/models/Boat";
import { StepsStateInPhoto } from "../../stepsState";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

 

  const [boatData,setBoatData] =  useState({
    length:'',
    make:'',
    hours:'',
  })

  useEffect(()=>{
    setBoatData({...boatData,
      length:advertisement.length,
      make:advertisement.make,
      hours:advertisement.hours,
    })

  },[])

  const updateData = () => {
    if (FormDataValidation(boatData)) {
      const d = Object.assign(new Boat(), 
      {...advertisement,
        _length: boatData.length,
         _make:boatData.make,
        _hours:boatData.hours,
      });
      adsCtx.setAds(d);
      props.nextStep(StepsStateInDetail);
    } else {
      alert("Please enter required fields");
    }
  };

  // const updateData = () => {
  //   props.nextStep(StepsStateInDetail);
  // };

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>length :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter length"
          className="input-fields-theme"
          value={boatData.length}
          onChange={(data) => {
            setBoatData({
              ...boatData,
              length: data.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Make :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={BoatOptions()}
            value={BoatOptions().find(
              (obj) => obj.value === boatData.make
            )}
            isSearchable={false}
            onChange={(data) => {
              setBoatData({
                ...boatData,
                make: data.value,
              });
            }}
          />
        </div>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>hours :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          className="input-fields-theme"
          placeholder="Enter hours"
          value={boatData.hours}
          onChange={(data) => {
            setBoatData({
              ...boatData,
              hours: data.target.value,
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
