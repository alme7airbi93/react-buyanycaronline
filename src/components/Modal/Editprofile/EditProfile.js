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
  const [user] = useContext(UserContext);
  return (
    <Modal className="EditProfile" show={props.open} onHide={props.handleclose}>
      <div className="modal_main_div">
        <Modal.Header>
          <Modal.Title className="text-dark">Login</Modal.Title>
          <h3
            onClick={props.handleclose}
            style={{ cursor: "pointer", color: "black" }}
          >
            x
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Row className="login-modal-content text-dark">
            <form>
              <div className="d-flex">
                <p>
                  {/* Username : <span>{user.username}</span> */}
                  Username :
                  <span>
                    <input type="text" defaultValue={user.username} />
                  </span>
                </p>
              </div>
              <p>
                Password : <span> ********** </span>
              </p>
              <p>
                Mobile: <span>{user.phone}</span>
              </p>
            </form>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditProfile;
