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

const Detail = (props) => {
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  const makes_option = makes()


  const [detail, setDetail] = useState({
    make:'',
    accessory_name:'',
    vehicle_make:'',
    vehicle_year:'',
    vehicle_model:'',
  })


  const updateAccessories = () => {
    
    if (FormDataValidation(detail)) {
      const d = Object.assign(new Accessories(), 
      {...advertisement,
        _vehicle_make:detail.vehicle_make,
        _accessory_name:detail.accessory_name,
        _vehicle_year:detail.vehicle_year,
        _vehicle_model:detail.vehicle_model,
     //   _vehicle_make:detail.vehicle_make
      });
      console.log(advertisement)
      adsCtx.setAds(d);
      console.log(advertisement)
      createAdvertisement(advertisement).then((res) => {
      if (res.success) {
        console.log(res.data, res);
        setLoading(false);
         navigate("/user-profile");
        alert("Data uploaded successfully");
      }
    });
    } else {
      alert("Please enter required fields");
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
            isSearchable={false}
            onChange={(data) => {
              setDetail({
                ...detail,
                make: data.label,
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
              accessory_name: data.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
            <Form.Label style={{color: "#fff"}}>vehicle_year :</Form.Label>
            <Form.Control type="date" 
            className="input-fields-theme"
            placeholder="Enter vehicle_year" onChange={data => {
              setDetail({
                ...detail, vehicle_year : data.target.value});
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
              vehicle_model: data.target.value });
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
              vehicle_make: data.target.value});
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
