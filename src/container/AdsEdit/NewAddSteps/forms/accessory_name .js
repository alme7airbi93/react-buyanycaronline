import { Form } from "react-bootstrap";
import { Button,} from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail,StepsStateInSummary } from "../../stepsState";



const Detail = (props) => {
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;


  const updateData = () => {
    props.nextStep(StepsStateInDetail);
  };
  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>accessory_name </Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter accessory_name"
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              accessory_name: data.target.value });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
            <Form.Label style={{color: "#fff"}}>vehicle_year :</Form.Label>
            <Form.Control type="date" 
            className="input-fields-theme"
            placeholder="Enter vehicle_year" onChange={data => {
                setAdvertisement({...advertisement, vehicle_year : data.target.value});
            }}/>
        </Form.Group>       
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>vehicle_model  :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter vehicle_model"
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
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
            setAdvertisement({
              ...advertisement,
              vehicle_make: (data.target.value)});
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