import { Form } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";

const Detail = () => {
  const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>City :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter City"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, citry: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>number :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter number"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, number: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>number_code :</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter number_code"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, number_code: (data.target.value) },
            });
          }}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default Detail;
