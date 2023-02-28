import { Button, Col, Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Select from "react-select";
import { Advertisement_states } from "../../../common/data/Advertisement_states.js";
import { AdvertisementOptions } from "../../../common/data/SelectOptions.js";
import { StepsStateInMainCategory } from "../stepsState";
import { UserContext } from "../../../context/Context";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import { Store } from "react-notifications-component";
import Advertisement from "../../../common/models/Advertisement.js";
import { checkAdvertisemntType } from "../../../common/validations/ClassesTypeOfValidations.js";
import PropTypes from "prop-types";


const SummaryDescription = (props) => {
  // eslint-disable-next-line no-unused-vars
  const adsCtx = useContext(AdvertismentCtx);
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  let [ad, setAd] = useState(new Advertisement());


  let [errors, setErrors] = useState({
    errors: false,
    titleError: "",
    priceError: "",
    descriptionError: "",
    typeError: "",
  });


  const handler = () => {
    if (!ad.title || !ad.price || !ad.advertisement_type) {
      Store.addNotification({
        title: "Warning",
        message: "Please fill required fields!",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
        },
      });
      return;
    }

    
    let obj = ad;
    obj.owner = user;
    obj.status = Advertisement_states.Pending;
    setAd(obj);
    adsCtx.setAds(Object.assign(checkAdvertisemntType(ad), {...ad}));
    props.nextStep(StepsStateInMainCategory);
  };


  const handleValidate = (value, label) => {
    if (value === "") {
      if (label === "title") {
        setErrors({ ...errors, titleError: true });
      } else if (label === "price") {
        setErrors({ ...errors, priceError: true });
      } else if (label === "desc") {
        setErrors({ ...errors, descriptionError: true });
      } else {
        setErrors({ ...errors, typeError: true });
      }
    } else {
      if (label === "title") {
        setErrors({ ...errors, titleError: false });
      } else if (label === "price") {
        setErrors({ ...errors, priceError: false });
      } else if (label === "desc") {
        setErrors({ ...errors, descriptionError: false });
      } else {
        setErrors({ ...errors, typeError: false });
      }
    }
  };

  return (
    <React.Fragment>
      <Col md={5} className="news_ads_details">
        <h5>Advertisement Summary</h5>
        <hr />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#fff" }}>Title :</Form.Label>
            <Form.Control
              className="input-fields-theme"
              type="text"
              value={ad.title}
              placeholder="Enter Title"
              onChange={(data) => {
                let obj = ad;
                obj.title = data.target.value;
                setAd(obj);
                handleValidate(data.target.value, "title");
              }}
            />
            {errors && errors.titleError === true ? (
              <small style={{ color: "red" }}>Please enter title.</small>
            ) : (
              <></>
            )}
          </Form.Group>

          <Form.Group className="md-3">
            <Form.Label style={{ color: "#fff" }}>
              Select Advertisement Category :
            </Form.Label>
            <div className="mb-3">
              <Select
                placeholder={"Select Motors"}
                options={AdvertisementOptions()}
                value={AdvertisementOptions().find((obj) => obj.label === ad.advertisement_type)}
                // isSearchable={true}
                isClearable={true}
                onChange={(data) => {
                  let obj = ad;
                  obj.advertisement_type = data.label;
                  console.log("Type change : " + obj);
                  setAd(obj);
                  console.log("Type change : " + ad);
                  handleValidate(data.label, "category");
                }}
              />
            </div>
            {errors.typeError === true ? (
              <small style={{ color: "red" }}>Please select category.</small>
            ) : (
              <></>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "#fff" }}>Price :</Form.Label>
            <Form.Control
              className="input-fields-theme"
              type="number"
              placeholder="Enter Price"
              value={ad.price}
              onChange={(data) => {
                let obj = ad;
                obj.price = data.target.value;
                setAd(obj);
                handleValidate(data.target.value, "price");
              }}
            />
            {errors.priceError === true ? (
              <small style={{ color: "red" }}>Please enter price.</small>
            ) : (
              <></>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ color: "#fff" }}>Description :</Form.Label>
            <Form.Control
              className="input-fields-theme"
              as="textarea"
              rows={3}
              value={ad.description}
              placeholder="Description"
              onChange={(data) => {
                let obj = ad;
                obj.description = data.target.value;
                setAd(obj);
                handleValidate(data.target.value, "desc");
              }}
            />
            {errors.descriptionError === true ? (
              <small style={{ color: "red" }}>Please enter description.</small>
            ) : (
              <></>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            {/* eslint-disable-next-line react/prop-types */}
            <Button
              className="next_btn"
              onClick={() => {
                handler();
              }}
            >
              Next
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </React.Fragment>
  );
};
SummaryDescription.propTypes   = {
  nextStep : PropTypes.any
};
export default SummaryDescription;
