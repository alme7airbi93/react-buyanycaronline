import { Form, Button } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { NewAdvertisement } from "../../../../context/Context";
// import { BoatOptions } from "../../../../common/data/SelectOptions.js";
import Select from "react-select";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail, StepsStateInSummary} from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import { AdsStepVerfication } from "../../../../controllers/AdsController";
import Boat from "../../../../common/models/Boat";
import { StepsStateInPhoto } from "../../stepsState";
import { makes,models } from "../../../../common/data";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const makes_option = makes()
  const models_options = models();

  const [error,setError] = useState({
    error:false,
    errorKey:''
  })

 

  const [boatData,setBoatData] =  useState({
    _length:'',
    _make:'',
    _modal:'',
    _hours:'',
  })
  const [makeValue, setMakeValue] = useState();

  useEffect(()=>{
    // setBoatData({...boatData,
    //   // _length:advertisement._length,
    //   // _make:advertisement._make,
    //   // _hours:advertisement._hours,
    // })

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
            options={makes_option.filter(item => item.parent_id === '5')}
            value={makes_option.find(
              (obj) => obj.value === boatData._make
            )}
            // value={BoatOptions().find(
            //   (obj) => obj.value === boatData._make
            // )}
            isSearchable={true}
            onChange={(data) => {
              setBoatData({
                ...boatData,
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
              options={
                models_options.filter(item => (
                  item.value === "0" || (item.parent_id === makeValue.value )
                  ))
              }
              defaultValue={boatData._modal}
              value={models_options.find(
                (obj) => obj.value === advertisement._modal
              )}
              isSearchable={true}
              onChange={(data) => {
                setBoatData({
                  ...boatData,
                  _modal: data.label,
                });
              }}
            />
           {error && error.errorKey == '_modal'? (<p style={{ color: "red" }}>Model Field is required</p>):<></>}
          </div>
        </Form.Group>
      ):(<></>)}
      
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
