import { Form } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NewAdvertisement } from "../../../../context/Context";
import { AdvertismentCtx } from "../../../../context/AdvertismentContext.js";
import { StepsStateInSummary, StepsStateInPhoto } from "../../stepsState";
import { FormDataValidation } from "../../../../common/validations/FormDataValidation";
import PlateNumber from "../../../../common/models/PlateNumber";
import { AdsStepVerfication } from "../../../../controllers/AdsController";
import { createAdvertisement } from "../../../../common/repository/AdvertisementDB";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  let navigate = useNavigate();
  // const updateData = () => {
  //   props.nextStep(StepsStateInDetail);
  //};
  const [error, setError] = useState({
    error: false,
    errorKey: "",
  });
  const [plateData, setPlateData] = useState({
    _city: "",
    _number: "",
    _numberCode: "",
  });

  useEffect(() => {
    setPlateData({
      ...plateData,
      _city: advertisement._city,
      _number: advertisement._number,
      _numberCode: advertisement._numberCode,
    });
  }, []);

  const updateData = async () => {
    const resp = AdsStepVerfication(advertisement, plateData);
    console.log(resp, "resp");
    if (resp.success) {
      const saveDate = await createAdvertisement(resp.data);
      if (saveDate.success) {
        navigate("/user-profile");
        // alert("Data uploaded successfully");
        Store.addNotification({
          title: "Success",
          message: "Data updated Successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
          },
        });
      }
    } else {
      console.log(resp, "ShowError Message");
      setError({ error: true, errorKey: resp.errorField });
    }
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
            setPlateData({
              ...plateData,
              _city: data.target.value,
            });
          }}
        />
      </Form.Group>
      {error && error.errorKey == "_city" ? (
        <p style={{ color: "red" }}>City Type Field is required</p>
      ) : (
        <></>
      )}

      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>number :</Form.Label>
        <Form.Control
          as="input"
          placeholder="Enter number"
          className="input-fields-theme"
          onChange={(data) => {
            setPlateData({
              ...plateData,
              _number: data.target.value,
            });
          }}
        />
      </Form.Group>
      {error && error.errorKey == "_number" ? (
        <p style={{ color: "red" }}>Number Type Field is required</p>
      ) : (
        <></>
      )}

      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#fff" }}>Number Code :</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Enter number code"
          className="input-fields-theme"
          onChange={(data) => {
            setPlateData({
              ...plateData,
              _numberCode: data.target.value,
            });
          }}
        />
      </Form.Group>
      {error && error.errorKey == "_numberCode" ? (
        <p style={{ color: "red" }}>Number Code Type Field is required</p>
      ) : (
        <></>
      )}

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
