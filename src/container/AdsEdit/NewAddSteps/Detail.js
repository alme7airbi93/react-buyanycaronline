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

import "./scrollbar.css";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import { ManufacturingYearsOptions } from "../../../common/data/SelectOptions.js";
import { FormDataValidation } from "../../../common/validations/FormDataValidation";
import { checkAdvertisemntType } from "../../../common/validations/ClassesTypeOfValidations";

const Detail = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  const ctx = useContext(UserContext);
  const user = ctx.getUserData();



  const [carDetails, setCarDetails] = useState({
    color:advertisement._color,
    manufacturingYear: advertisement._bodyType,
    fuleType: advertisement._Fuel_Types,
    region:'',
    condition:advertisement._Body_Condition,
    warrantyTypes:advertisement._Warranty_Types,
    // steeringside:advertisement._Steering_Types

  });

  const updateData = () => {
    if (FormDataValidation(carDetails)) {
      console.log(advertisement,'before')
      const classInstance = checkAdvertisemntType(advertisement)
      const d = Object.assign(classInstance, 
      {...advertisement,
        _color: carDetails.color,
        _year: carDetails.manufacturingYear,
        _fuel_type:carDetails.fuleType,
        _region:carDetails.region,
        _condition:carDetails.condition,
        _warranty:carDetails.warrantyTypes,
      });
      adsCtx.setAds(d);
      props.nextStep(StepsStateInPhoto);
    } else {
      alert("Please enter required fields");
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
                <h5>Vehicle</h5>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Color :</Form.Label>
                  <Select
                    placeholder={"Color"}
                    options={ColorTypes()}
                    value={ColorTypes().find((obj) => obj.label === carDetails.color)}
                    isSearchable={false}
                    onChange={(data) => {
                      setCarDetails({...carDetails,color:data.label});
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
                      (obj) => obj.label === carDetails.manufacturingYear
                    )}
                    isSearchable={true}
                    onChange={(data)=>{
                      setCarDetails({...carDetails,manufacturingYear:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Fuel Type :</Form.Label>
                  <div>
                    <Select
                      placeholder={"Fuel Type"}
                      options={FuelTypes()}
                      value={FuelTypes().find((obj) => obj.label === carDetails.fuleType)}
                      isSearchable={false}
                      onChange={(data) => {
                      setCarDetails({...carDetails,fuleType:data.label});
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Region :</Form.Label>
                  <Select
                    placeholder={"Manufacturing Region"}
                    options={RegionalOption()}
                    value={RegionalOption().find((obj) => obj.label === carDetails.region)}
                    isSearchable={false}
                    onChange={(data) => {
                      setCarDetails({...carDetails,region:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Condition :</Form.Label>
                  <Select
                    placeholder={"Body Condition"}
                    options={BodyCondition()}
                    value={BodyCondition().find(
                      (obj) => obj.label === carDetails.condition
                    )}
                    isSearchable={false}
                    onChange={(data) => {
                      setCarDetails({...carDetails,condition:data.label});
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Warranty :</Form.Label>
                  <Select
                    placeholder={"Enter Warrenty"}
                    options={WarrantyTypes()}
                    value={WarrantyTypes().find(
                      (obj) => obj.label === carDetails.warrantyTypes
                    )}
                    isSearchable={false}
                    onChange={(data) => {
                      setCarDetails({...carDetails,warrantyTypes:data.label});
                    }}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>
                    Steering Types :
                  </Form.Label>
                  <Select
                    placeholder={"Steering Side"}
                    options={SteeringTypes()}
                    value={SteeringTypes().find(
                      (obj) => obj.label === carDetails.steeringside
                    )}
                    isSearchable={false}
                    onChange={(data) => {
                      setCarDetails({...carDetails,steeringside:data.label});
                    }}
                  />
                </Form.Group> */}
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

                {advertisement._advertisement_type == "Motorcycles" && (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        Engine Size :
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Engine Size"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              engine_size: parseInt(data.target.value),
                            },
                          });
                        }}
                      />
                    </Form.Group>
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
                              distance: parseInt(data.target.value),
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
