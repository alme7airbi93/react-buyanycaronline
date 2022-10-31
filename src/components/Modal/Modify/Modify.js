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
import { updateAdsById } from "../../../common/repository/AdvertisementDB";
import { checkAdvertisemntType } from "../../../common/validations/ClassesTypeOfValidations";


const Modify = (props) => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  const [ads, setAds] = useState(props.ads);
  const [title, setTitle] = useState(props.ads._title);
  const [description, setDescription] = useState(props.ads._description);
  const [price, setPrice] = useState(props.ads._price);


useEffect(()=>{
  console.log(props.ads,'adss')
  setTitle(props.ads._title)
},[setAds])


const updateAds = () => {
  let data = {
    _title:title,
    _description:description,
    _price:price
  };

  updateAdsById(props.ads._id,data).then(res => {
   
    if(res.success === true){
      alert("Advertisement modify successfully.")
      props.handleclose();
    }
  })

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
              
                  <div className="d-flex align-items-center">
                    <div className="col-md-4">
                      <p className="text-light">Title :</p>
                    </div>
                    <div className="col-md-8">
                      <InputGroup className="mb-3">
                        <FormControl
                          type={"test"}
                          name={'title'}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="col-md-4">
                      <p className="text-light">Description :</p>
                    </div>
                    <div className="col-md-8">
                      <InputGroup className="mb-3">
                        <FormControl
                          type={"test"}
                          name={'description'}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="col-md-4">
                      <p className="text-light">Price :</p>
                    </div>
                    <div className="col-md-8">
                      <InputGroup className="mb-3">
                        <FormControl
                          type={"number"}
                          name={'price'}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </div>
                  </div>
              

              <div className="d-flex justify-content-center">
                <Button type="button" className="w-25 modal_btn" onClick={() => updateAds()}>
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
