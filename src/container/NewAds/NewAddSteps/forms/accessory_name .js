import { Form } from "react-bootstrap";
import { Button,} from "react-bootstrap";
import React, { useContext, useState } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail,StepsStateInSummary } from "../../stepsState";
import Accessories from "../../../../common/models/Boat";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import { makes } from "../../../../common/data";
import Select from "react-select";
import {
  createAdvertisement
} from "../../../../common/repository/AdvertisementDB";
import { useNavigate } from "react-router-dom";
import { AdsStepVerfication } from "../../../../controllers/AdsController";
const Detail = (props) => {
  let navigate = useNavigate();
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  const makes_option = makes()


  const [detail, setDetail] = useState({
    _make:advertisement._make,
    _accessory_name:advertisement._accessory_name,
    _vehicle_make:advertisement._vehicle_make,
    _vehicle_year:advertisement._vehicle_year,
    _vehicle_model:advertisement._vehicle_model,
  })
  const updateAccessories = async () => {
    const resp =   AdsStepVerfication(advertisement,detail);
    console.log(resp,'resp');
  if(resp){
   const saveDate = await createAdvertisement(resp.data)
   if (saveDate.success) {
    navigate("/user-profile");
          alert("Data uploaded successfully");
        }
  }
  };


 

  return (
    <React.Fragment>

      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Category :</Form.Label>
        <div className="mb-3">
        <Select
            placeholder={"Select types"}
            options={makes_option.filter(item => item.parent_id === '3')}
            defaultValue={detail.category}
            value={makes_option.find(
              (obj) => obj.value === detail.category
            )}
            isSearchable={true}
            onChange={(data) => {
              setDetail({
                ...detail,
                _make: data.label,
              });
            }}
          />
        </div>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>accessory_name </Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter accessory_name"
          className="input-fields-theme"
          onChange={(data) => {
            setDetail({
              ...detail,
              _accessory_name: data.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
            <Form.Label style={{color: "#fff"}}>vehicle_year :</Form.Label>
            <Form.Control type="date" 
            className="input-fields-theme"
            placeholder="Enter vehicle_year" onChange={data => {
              setDetail({
                ...detail, _vehicle_year : data.target.value});
            }}/>
        </Form.Group>       
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>vehicle_model  :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter vehicle_model"
          className="input-fields-theme"
          onChange={(data) => {
            setDetail({
              ...detail,
              _vehicle_model: data.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>vehicle_make  :</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter vehicle_make"
          className="input-fields-theme"
          onChange={(data) => {
            setDetail({
              ...detail,
              _vehicle_make: data.target.value});
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
      <Button className="next_btn" onClick={() => updateAccessories()}>
        Next
      </Button>
      </div>
    </React.Fragment>
  );
};

export default Detail;
