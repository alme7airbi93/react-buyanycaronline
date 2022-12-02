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
import { AdsStepVerfication } from "../../../../controllers/AdsController";
import Car from "../../../../common/models/Car";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const makes_option = makes()
  const models_options = models();
  const [error,setError] = useState({
    error:false,
    errorKey:''
  })


  const [carDetails, setCarDetails] = useState({
    _make: advertisement._make,
    _modal:advertisement._modal,
    _transmission: advertisement._transmission,
    _horsePower: advertisement._horsePower,
  });
  
  const [makeValue, setMakeValue] = useState();

  const updateData = () => {
  const resp =   AdsStepVerfication(advertisement,carDetails)
  console.log(resp,'errorMessage')
  if(resp.success){
      adsCtx.setAds(resp.data);
      props.nextStep(StepsStateInDetail);
  }
  else{
    console.log(resp,'ShowError Message')
    setError({error:true,errorKey:resp.errorField})
  }

  };
  console.log(error.errorKey)

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Make :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '1')}
            defaultValue={carDetails._make}
            value={makes_option.find(
              (obj) => obj.value === advertisement._make
            )}
            isSearchable={true}
            onChange={(data) => {
              setCarDetails({
                ...carDetails,
                _make: data.label,
              });
              setMakeValue(data)
            }}
          />
          {error && error.errorKey == '_make'? (<p style={{ color: "red" }}>Make Field is required</p>):<></>}
        </div>
      </Form.Group>
      {makeValue ? (
          <Form.Group className="mb-3">
          <Form.Label style={{ color: "#fff" }}>Modal :</Form.Label>
          <div className="mb-3">
            <Select
              placeholder={"Select Modal"}
              options={models_options.filter(item => (item.value === "0" || (item.parent_id === makeValue.value )))}
              defaultValue={carDetails._modal}
              value={models_options.find(
                (obj) => obj.value === advertisement._modal
              )}
              isSearchable={true}
              onChange={(data) => {
                setCarDetails({
                  ...carDetails,
                  _modal: data.label,
                });
              }}
            />
           {error && error.errorKey == '_modal'? (<p style={{ color: "red" }}>Model Field is required</p>):<></>}
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
          defaultValue={carDetails._transmission}
          value={TransmitionTypes().find(
            (obj) => obj.value === advertisement._transmission
          )}
          isSearchable={true}
          onChange={(data) => {
            setCarDetails({
              ...carDetails,
              _transmission: data.value,
            });
          }}
        />
         {error && error.errorKey == '_transmission'? (<p style={{ color: "red" }}>Transmition Field is required</p>):<></>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Engine Horse Power :</Form.Label>
        <Select
          placeholder={"Select"}
          options={HorsePowerOptions()}
          defaultValue={carDetails._horsePower}
          value={HorsePowerOptions().find(
            (obj) => obj.value === advertisement._horsePower
          )}
          isSearchable={true}
          onChange={(data) => {
            setCarDetails({
              ...carDetails,
              _horsePower: data.value,
            });
          }}
        />
        {error && error.errorKey == '_horsePower'? (<p style={{ color: "red" }}>Engine Horse Power Field is required</p>):<></>}
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

