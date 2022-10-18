import { Form, Button } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import { BoatOptions } from "../../../../common/data/SelectOptions.js";
import Select from "react-select";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInDetail } from "../../stepsState";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const updateData = () => {
    props.nextStep(StepsStateInDetail);
  };

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>length :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter length"
          className="input-fields-theme"
          value={advertisement.length}
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              length: data.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>type :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={BoatOptions()}
            value={BoatOptions().find(
              (obj) => obj.value === advertisement.type
            )}
            isSearchable={false}
            onChange={(data) => {
              setAdvertisement({
                ...advertisement,
                type: data.value,
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
          value={advertisement.hours}
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
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
