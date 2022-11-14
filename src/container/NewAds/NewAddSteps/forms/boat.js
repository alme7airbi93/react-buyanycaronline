import { Form, Button } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import { BoatOptions } from "../../../../common/data/SelectOptions.js";
import Select from "react-select";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail, StepsStateInSummary} from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import { AdsStepVerfication } from "../../../../controllers/AdsController";
import Boat from "../../../../common/models/Boat";
import { StepsStateInPhoto } from "../../stepsState";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [error,setError] = useState({
    error:false,
    errorKey:''
  })

 

  const [boatData,setBoatData] =  useState({
    _length:'',
    _make:'',
    _hours:'',
  })

  useEffect(()=>{
    setBoatData({...boatData,
      _length:advertisement._length,
      _make:advertisement._make,
      _hours:advertisement._hours,
    })

  },[])

  const updateData = () => {
    const resp =   AdsStepVerfication(advertisement,boatData)
    if(resp.success){
      adsCtx.setAds(resp.data);
      props.nextStep(StepsStateInDetail);
  }
  else{
    console.log(resp,'ShowError Message')
    setError({error:true,errorKey:resp.errorField})
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
          value={boatData._length}
          onChange={(data) => {
            setBoatData({
              ...boatData,
              _length: data.target.value,
            });
          }}
          
        />
        {error && error.errorKey == '_length'? (<p style={{ color: "red" }}>Length Field is required</p>):<></>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Make :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={BoatOptions()}
            value={BoatOptions().find(
              (obj) => obj.value === boatData._make
            )}
            isSearchable={true}
            onChange={(data) => {
              setBoatData({
                ...boatData,
                _make: data.value,
              });
            }}
          />
          {error && error.errorKey == '_make'? (<p style={{ color: "red" }}>Make Field is required</p>):<></>}
        </div>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>hours :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          className="input-fields-theme"
          placeholder="Enter hours"
          value={boatData._hours}
          onChange={(data) => {
            setBoatData({
              ...boatData,
              _hours: data.target.value,
            });
          }}
        />
      </Form.Group>
      {error && error.errorKey == '_hours'? (<p style={{ color: "red" }}>Hours Field is required</p>):<></>}
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
