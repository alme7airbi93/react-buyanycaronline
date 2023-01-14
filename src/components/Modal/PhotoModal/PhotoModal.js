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
// import "./edit.css";
import Spinner from 'react-bootstrap/Spinner';

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/Context";
import ImageUploader from "react-images-upload";

const PhotoModal = (props) => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  const [loading, setLoading] = useState(false)

  const [photos, setphotos] = useState([]);

  // const onDrop = (pictures, pictureUrl) => {
  //   setphotos([...photos, pictureUrl])
  //   //setphotos(pictureUrl)
  // };

  const onDrop = (pictures, pictureUrl) => {
    if(pictureUrl.length >1){
      setphotos([...photos,pictureUrl[pictureUrl.length-1]]);
    }
    else{
      setphotos(pictureUrl);
    }
  };

  const updateAdvertise = async () => {
    console.log(photos, 'photos')
    setLoading(true)
    props.savePhoto(photos, setLoading)
    setphotos([])

  }

  return (
    <Modal className="EditProfile" show={props.open} onHide={props.handleClose}>
      <div className="modal_main_div" style={{ maxHeight: '500px', overflow: 'auto' }}>
        <Modal.Header className="modal_header">
          <Modal.Title>Upload Photo</Modal.Title>
          <h3 onClick={props.handleClose} style={{ cursor: "pointer" }}>
            x
          </h3>
        </Modal.Header>
        <Modal.Body>

          <Row className="login-modal-content text-dark">

            <Form className="w-100">
              <Col md={12} id="center-pos">
                <ImageUploader
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  withPreview={true}
                  style={{ backgroundColor: '#3c3c3c' }}

                />
                <br />
                <br />
              </Col>

              <div className="d-flex justify-content-center">
                <Button type="button" className="w-25 modal_btn" onClick={() => updateAdvertise()}>
                  Update
                </Button>
              </div>
            </Form>

          </Row>
        </Modal.Body>
      </div>
      {loading === true ? (
        <div className="loader">
          <Spinner animation="border" variant="danger" />
        </div>
      )
        :
        (<></>)}
    </Modal>
  );
};

export default PhotoModal;
