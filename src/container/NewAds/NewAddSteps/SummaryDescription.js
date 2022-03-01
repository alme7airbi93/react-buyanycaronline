import {Button, Col, Form} from "react-bootstrap";
import React, {useState} from 'react';
import {StepsStateInMainCategory} from "../stepsState";

const SummaryDescription = (props) => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function advertisementDetails() {
        const adValues = {title, price, description, form_type : "AD_SUMMARY_FORM"};
        props.onClick(adValues, StepsStateInMainCategory)
    }

    return(
        <React.Fragment>
            <Col md={5} className="news_ads_details">
                <h5>Advertisement Summary</h5>
                <hr/>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label style={{color: '#fff'}}>Title :</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" 
                        value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{color: '#fff'}}>Price :</Form.Label>
                        <Form.Control as='input' type="number" placeholder="Enter Price" 
                        value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{color: '#fff'}}>Description :</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Button className="next_btn" md={10} onClick={() => advertisementDetails()}>Next</Button>
                </Form>
            </Col>
        </React.Fragment>
    )
}

export default SummaryDescription;
