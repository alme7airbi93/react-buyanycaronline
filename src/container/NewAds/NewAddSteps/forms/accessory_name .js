import { Form } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";

const Detail = () => {
  const [advertisement, setAdvertisement] = useContext(NewAdvertisement);

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>accessory_name </Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter accessory_name"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, accessory_name: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
            <Form.Label style={{color: "#fff"}}>vehicle_year :</Form.Label>
            <Form.Control type="date" placeholder="Enter vehicle_year" onChange={data => {
                setAdvertisement({...advertisement.type, vehicle_year : data.target.value});
            }}/>
        </Form.Group>       
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>vehicle_model  :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter vehicle_model"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, vehicle_model: data.target.value },
            });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>vehicle_make  :</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter vehicle_make"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              type: { ...advertisement.type, vehicle_make: (data.target.value) },
            });
          }}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default Detail;
