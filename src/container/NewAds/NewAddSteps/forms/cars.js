import { Form } from "react-bootstrap";
import React, { useContext } from "react";
import { NewAdvertisement } from "../../../../context/Context";
import Select from "react-select";
import { MotorcycleOptions } from "../../../../common/data/SelectOptions.js";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";


const Detail = () => {
  const adsCtx =  useContext(AdvertismentCtx)
	const advertisement = adsCtx.ads;

  return (
    <React.Fragment>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Body Type :</Form.Label>
        <div className="mb-3">
          <Select
            placeholder={"Select types"}
            options={MotorcycleOptions()}
            value={MotorcycleOptions().find(
              (obj) => obj.value === advertisement.body_type
            )}
            isSearchable={false}
            onChange={(data) => {
              setAdvertisement({
                ...advertisement,
                body_type: data.value,
              });
            }}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Transmition :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter Transmition"
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              transmition: data.target.value,
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
          className="input-fields-theme"
          onChange={(data) => {
            setAdvertisement({
              ...advertisement,
              hp: data.target.value,
            });
          }}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default Detail;
