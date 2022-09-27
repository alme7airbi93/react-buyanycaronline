import { Form } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";

const Detail = () => {
  const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Body Type :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter Body Type"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, body_type: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Transmition :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter Transmition"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, transmition: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>hp :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter hp"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, hp: (data.target.value) },
            });
          }}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default Detail;
