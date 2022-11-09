import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../stepsState";
import { NewAdvertisement, UserContext } from "../../../context/Context";
import Select from "react-select";
import Car from "../../../common/models/Car";

import {
  FuelTypes,
  RegionalOption,
  ColorTypes,
  BodyCondition,
  WarrantyTypes,
  SteeringTypes,
} from "../../../common/data/SelectOptions.js";
import { AdsStepVerfication } from "../../../controllers/AdsController";

import "./scrollbar.css";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import { ManufacturingYearsOptions } from "../../../common/data/SelectOptions.js";
import { FormDataValidation } from "../../../common/validations/FormDataValidation";
import { checkAdvertisemntType } from "../../../common/validations/ClassesTypeOfValidations";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const [error,setError] = useState({
    error:false,
    errorKey:''

  })

  const ctx = useContext(UserContext);
  const user = ctx.getUserData();



  const [carDetails, setCarDetails] = useState({
    _color:advertisement._color,
    _year: advertisement._bodyType,
    _fuel_type: advertisement._Fuel_Types,
    _region:'',
    _condition:advertisement._Body_Condition,
    _warranty:advertisement._Warranty_Types,
    // steeringside:advertisement._Steering_Types

  });

  const updateData = () => {
    const resp = AdsStepVerfication(advertisement,carDetails)
    if(resp.success){
      adsCtx.setAds(resp.data);
      props.nextStep(StepsStateInPhoto);
    }
    else{
      setError({error:true,errorKey:resp.errorField})
    }
  };


  useEffect(()=>{
  },[])


  


  return (
    <React.Fragment>
      <Col md={5} className="find_details">
        <h5>Advertisement Detail</h5>
        <hr />
        <Row className="justify-content-center">
          <Col md={12}>
            {advertisement._advertisement_type !== "Plate Numbers" && (
              <Form id="center-col">
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Color :</Form.Label>
                  <Select
                    placeholder={"Color"}
                    options={ColorTypes()}
                    value={ColorTypes().find((obj) => obj.label === carDetails._color)}
                    isSearchable={true}
                    onChange={(data) => {
                      setCarDetails({...carDetails,_color:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>
                    Manufacturing Year :
                  </Form.Label>
                  <Select
                    placeholder={"Select"}
                    options={ManufacturingYearsOptions()}
                    value={ManufacturingYearsOptions().find(
                      (obj) => obj.label === carDetails._year
                    )}
                    isSearchable={true}
                    onChange={(data)=>{
                      setCarDetails({...carDetails,_year:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Fuel Type :</Form.Label>
                  <div>
                    <Select
                      placeholder={"Fuel Type"}
                      options={FuelTypes()}
                      value={FuelTypes().find((obj) => obj.label === carDetails._fuel_type)}
                      isSearchable={true}
                      onChange={(data) => {
                      setCarDetails({...carDetails,_fuel_type:data.label});
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Region :</Form.Label>
                  <Select
                    placeholder={"Manufacturing Region"}
                    options={RegionalOption()}
                    value={RegionalOption().find((obj) => obj.label === carDetails._region)}
                    isSearchable={true}
                    onChange={(data) => {
                      setCarDetails({...carDetails,_region:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Condition :</Form.Label>
                  <Select
                    placeholder={"Body Condition"}
                    options={BodyCondition()}
                    value={BodyCondition().find(
                      (obj) => obj.label === carDetails._condition
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setCarDetails({...carDetails,_condition:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Warranty :</Form.Label>
                  <Select
                    placeholder={"Enter Warrenty"}
                    options={WarrantyTypes()}
                    value={WarrantyTypes().find(
                      (obj) => obj.label === carDetails._warranty
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setCarDetails({...carDetails,_warranty:data.label});
                    }}
                  />
                </Form.Group>
               
                {user.phone === undefined && (
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Phone :</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Phone number"
                      onChange={(data) => {
                        setAdvertisement({
                          ...advertisement,
                          onwer_phone: data.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                )}
                {advertisement._advertisement_type == "Used Cars for sale" && (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        Distance :
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Distance"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              distance: data.target.value,
                            },
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        Body Type :
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Body Type"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              body_type: data.target.value,
                            },
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        Transmition :
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Transmition"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              transmition: data.target.value,
                            },
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>hp :</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter hp"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              hp: parseInt(data.target.value),
                            },
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        num_cylinders :
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter num_cylinders"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              num_cylinders: parseInt(data.target.value),
                            },
                          });
                        }}
                      />
                    </Form.Group>
                  </div>
                )}

              

               
              </Form>
            )}
          </Col>
          <Col
            md={10}
            className="btn-group"
            style={{ align: "center", paddingTop: "15px" }}
          >
            <br />
            <Button
              right
              className="back_btn"
              id="center-pos"
              onClick={() => props.nextStep(StepsStateInMainCategory)}
            >
              Back
            </Button>
            <Button
              className="next_btn"
              id="center-pos"
              onClick={updateData}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default Detail;
