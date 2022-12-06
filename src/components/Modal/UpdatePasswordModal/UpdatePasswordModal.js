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

import React, { useState, useContext } from "react";
import { updateUserPassword } from "../../../common/repository/UserDB";
import { UserContext } from "../../../context/Context";

const UpdatePasswordModal = (props) => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const updateData = ()=>{
    updateUserPassword(user.username,oldPassword,newPassword)
    .then((res) =>{
        console.log(res)
        props.handleclose('password')
      }
    )
  }

  return (
    <Modal
      className="EditProfile"
      show={props.open}
      onHide={()=>props.handleclose('password')}
    >
      <div className="modal_main_div">
        <Modal.Header className="modal_header">
          <Modal.Title>Modify data</Modal.Title>
          <h3 onClick={()=>props.handleclose('password')} style={{ cursor: "pointer" }}>
            x
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Row className="login-modal-content text-dark">
            <Form className="w-100">
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">Current Password :</p>
                </div>
                <div className="col-md-8">
                  {}
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"password"}
                      name="password"
                      aria-label="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">New Password :</p>
                </div>
                <div className="col-md-8">
                  {}
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"password"}
                      name="password"
                      aria-label="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="col-md-4">
                  <p className="text-light">Confirm Password :</p>
                </div>
                <div className="col-md-8">
                  {}
                  <InputGroup className="mb-3">
                    <FormControl
                      type={"password"}
                      name="password"
                      aria-label="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button onClick={updateData} type="button" className="w-25 modal_btn">
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

export default UpdatePasswordModal;
