import { Form } from "react-bootstrap";
import React, { useContext } from "react";
import { Button,} from "react-bootstrap";
import { NewAdvertisement } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail,StepsStateInSummary } from "../../stepsState";


const Detail = (props ) => {
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;
  const updateData = () => {
    props.nextStep(StepsStateInDetail);
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
            setAdvertisement({
              ...advertisement,
              citry: data.target.value});
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
            setAdvertisement({
              ...advertisement,
              number: data.target.value});
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>number_code :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter number_code"
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
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
