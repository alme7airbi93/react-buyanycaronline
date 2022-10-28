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
import { getUsersAdvertisement } from "../../../common/repository/AdvertisementDB";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/Context";
const Addmobile = (props) => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();
  const [admobile, setAdmobile] = useState();

  return (
    <Modal className="EditProfile" show={props.open} onHide={props.handleclose}>
      <div className="modal_main_div">
        <Modal.Header className="modal_header">
          <Modal.Title>Modify data</Modal.Title>
          <h3 onClick={props.handleclose} style={{ cursor: "pointer" }}>
            x
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Row className="login-modal-content text-dark">
            <Form className="w-100">
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">Mobile :</p>
                </div>
                <div className="col-md-8">
                  {}
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"telephone"}
                      name="Mobile"
                      aria-label="Mobile"
                      value={admobile}
                      onChange={(e) => setAdmobile(e.target.value)}
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

export default Addmobile;
