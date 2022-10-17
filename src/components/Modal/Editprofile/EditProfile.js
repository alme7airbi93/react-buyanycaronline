import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import "./edit.css";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/Context";
const EditProfile = (props) => {
  const ctx = useContext(UserContext)
const user = ctx.getUserData();


  const [email, setEmail] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  return (
    <Modal className="EditProfile" show={props.open} onHide={props.handleclose}>
      <div className="modal_main_div">
        <Modal.Header className="modal_header">
          <Modal.Title>Edit Profile</Modal.Title>
          <h3 onClick={props.handleclose} style={{ cursor: "pointer" }}>
            x
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Row className="login-modal-content text-dark">
            <Form className="w-100">
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">Username :</p>
                </div>
                <div className="col-md-8">
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"email"}
                      name="email"
                      aria-label="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">Password :</p>
                </div>
                <div className="col-md-8">
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"password"}
                      name="email"
                      aria-label="email"
                      defaultValue={"**********"}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">Mobile :</p>
                </div>
                <div className="col-md-8">
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"phone"}
                      name="email"
                      aria-label="email"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit" className="w-25 modal_btn">
                  Update
                </Button>
              </div>
            </Form>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditProfile;
