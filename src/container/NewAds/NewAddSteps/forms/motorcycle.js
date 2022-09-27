import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../../stepsState";
import { NewAdvertisement, UserContext } from "../../../../context/Context";

const Detail = (props) => {
  const [advertisement, setAdvertisement] = useContext(NewAdvertisement);
  const [user, setUser] = useContext(UserContext);
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>engine_size  :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter engine_size"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, engine_size: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>distance  :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter distance"
          type="number"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, distance: data.target.value },
            });
          }}
        />
      </Form.Group>
    
    </React.Fragment>
  );
};

export default Detail;
