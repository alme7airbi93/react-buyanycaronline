import { Button, Col, Row, Form } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { StepsStateInMainCategory, StepsStateInPhoto } from "../stepsState";
import { NewAdvertisement, UserContext } from "../../../context/Context";
import Select from "react-select";

import { FuelTypes } from "../../../common/data/SelectOptions.js";

import "./scrollbar.css";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";

const Detail = (props) => {
  const [condition_bool, setcondition_bool] = useState(false);
  const [warranty_bool, setwarranty_bool] = useState(false);

  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  let [type, setType] = useState(advertisement._Fuel_Types);
console.log(type, "fuletype")
  return (
    <React.Fragment>
      <Col md={5} className="find_details">
        <h5>Advertisement Detail</h5>
        <hr />
        <Row className="justify-content-center">
          <Col md={10}>
            {advertisement.type.kind !== "Number Plates" && (
              <Form id="center-col">
                <h5>Vehicle</h5>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Color :</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Color"
                    onChange={(data) => {
                      setAdvertisement({
                        ...advertisement,
                        type: {
                          ...advertisement.type,
                          color: data.target.value,
                        },
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Year :</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Year"
                    onChange={(data) => {
                      setAdvertisement({
                        ...advertisement,
                        type: {
                          ...advertisement.type,
                          year: data.target.value,
                        },
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Fuel Type :</Form.Label>
                  <div>
                    {/* <Form.Control
                      as="textarea"
                      placeholder="Enter Fuel Type"
                      onChange={(data) => {
                        setAdvertisement({
                          ...advertisement,
                          type: {
                            ...advertisement.type,
                            fuel_type: data.target.value,
                          },
                        });
                      }}
                    /> */}
                    <Select
                      placeholder={"Fuel Type"}
                      options={FuelTypes()}
                      value={FuelTypes().find((obj) => obj.label=== type)}
                      isSearchable={false}
                      onChange={(data) => {
                        setType(data.label);
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Region :</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Region"
                    onChange={(data) => {
                      setAdvertisement({
                        ...advertisement,
                        type: {
                          ...advertisement.type,
                          region: data.target.value,
                        },
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Condition :</Form.Label>
                  <Form.Control
                    type="checkbox"
                    placeholder="Enter Condition"
                    onChange={() => {
                      if (condition_bool === false) {
                        setcondition_bool(true);
                        setAdvertisement({
                          ...advertisement,
                          type: { ...advertisement.type, condition: true },
                        });
                      } else {
                        setcondition_bool(false);
                        setAdvertisement({
                          ...advertisement,
                          type: { ...advertisement.type, condition: false },
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Warrenty :</Form.Label>
                  <Form.Control
                    type="checkbox"
                    placeholder="Enter Warrenty"
                    onChange={() => {
                      if (warranty_bool === false) {
                        setwarranty_bool(true);
                        setAdvertisement({
                          ...advertisement,
                          type: { ...advertisement.type, warrenty: true },
                        });
                      } else {
                        setwarranty_bool(false);
                        setAdvertisement({
                          ...advertisement,
                          type: { ...advertisement.type, warrenty: false },
                        });
                      }
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
                {advertisement.type.kind == "Used Cars for sale" && (
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

                {advertisement.type.kind == "MotorCycles" && (
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

                {advertisement.type.kind == "Boats" && (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        Length :
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Length"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              length: parseInt(data.target.value),
                            },
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>Type :</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Type"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              type: parseInt(data.target.value),
                            },
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>Hours :</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Hours"
                        onChange={(data) => {
                          setAdvertisement({
                            ...advertisement,
                            type: {
                              ...advertisement.type,
                              hours: parseInt(data.target.value),
                            },
                          });
                        }}
                      />
                    </Form.Group>
                  </div>
                )}
              </Form>
            )}

            {advertisement.type.kind == "Number Plates" && (
              <Form id="center-col">
                <h5>Plate Number</h5>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>Number :</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Number"
                    onChange={(data) => {
                      setAdvertisement({
                        ...advertisement,
                        type: {
                          ...advertisement.type,
                          number: data.target.value,
                        },
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#fff" }}>
                    Number Code :
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Number code"
                    onChange={(data) => {
                      setAdvertisement({
                        ...advertisement,
                        type: {
                          ...advertisement.type,
                          number_code: data.target.value,
                        },
                      });
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
              </Form>
            )}
          </Col>
          <Col md={10} className="btn-group" style={{ align: "center" }}>
            <br />
            <Button
              right
              className="back_btn"
              id="center-pos"
              onClick={() => props.onClick(StepsStateInMainCategory)}
            >
              Back
            </Button>
            <Button
              className="next_btn"
              id="center-pos"
              onClick={() => {
                props.onClick(StepsStateInPhoto);
              }}
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
