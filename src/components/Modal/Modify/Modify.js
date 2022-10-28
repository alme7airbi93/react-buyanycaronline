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

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/Context";
import { updateAdvertisement } from "../../../common/repository/AdvertisementDB";


const Modify = (props) => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

const allAds = props.ads;
  const [ads, setAds] = useState(allAds);



const updateAds = () => {
  console.log(ads);
  updateAdvertisement(ads._id)
}


  return (
    <Modal className="EditProfile" show={props.open} onHide={props.handleclose}>
      <div className="modal_main_div" style={{maxHeight:'500px',overflow:'auto'}}>
        <Modal.Header className="modal_header">
          <Modal.Title>Modify data</Modal.Title>
          <h3 onClick={props.handleclose} style={{ cursor: "pointer" }}>
            x
          </h3>
        </Modal.Header>
        <Modal.Body>
        
          <Row className="login-modal-content text-dark">
           
            <Form className="w-100">
              {/* {
                Object.keys(props.ads).map((key) => ( */}
                  <div className="d-flex align-items-center">
                    <div className="col-md-4">
                      <p className="text-light">Title :</p>
                    </div>
                    <div className="col-md-8">
                      <InputGroup className="mb-3">
                        <FormControl
                          type={"test"}
                          name="title"
                          value={ads._title}
                          onChange={(e) => setAds({...ads,_title:e.target.value})}
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </div>
                  </div>
                {/* ))
              } */}

              

              <div className="d-flex justify-content-center">
                <Button type="submit" className="w-25 modal_btn" onClick={() => updateAds()}>
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

export default Modify;
