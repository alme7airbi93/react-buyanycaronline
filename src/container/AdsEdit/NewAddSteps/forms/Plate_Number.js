import { Form } from "react-bootstrap";
import React, { useContext,useEffect,useState } from "react";
import { Button,} from "react-bootstrap";
import { NewAdvertisement } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInSummary,StepsStateInPhoto } from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import PlateNumber from "../../../../common/models/PlateNumber";


const Detail = (props ) => {
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  // const updateData = () => {
  //   props.nextStep(StepsStateInDetail);
  //};

  const [plateData,setPlateData] =  useState({
    city:'',
    number:'',
    number_code:'',
  })

  useEffect(()=>{
    setPlateData({...plateData,
      city:advertisement.city,
      number:advertisement.number,
      number_code:advertisement.numberCode,
    })

  },[])

  const updateData = () => {
    if (FormDataValidation(plateData)) {
      const d = Object.assign(new PlateNumber(), 
      {...advertisement,
        _city: plateData.city,
        _number:plateData.number,
        _numberCode:plateData.number_code,
      });
      adsCtx.setAds(d);
      props.nextStep(StepsStateInPhoto);
    } else {
      alert("Please enter required fields");
    }
  };


  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>City :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter City"
          className="input-fields-theme"
          onChange={(data) => {
            setPlateData({
              ...plateData,
              city: data.target.value});
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>number :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter number"
          className="input-fields-theme"
          onChange={(data) => {
            setPlateData({
              ...plateData,
              number: data.target.value});
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Number Code :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter number code"
          className="input-fields-theme"
          onChange={(data) => {
            setPlateData({
              ...plateData,
              number_code: (data.target.value)});
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
