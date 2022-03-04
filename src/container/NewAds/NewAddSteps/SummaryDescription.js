import {Button, Col, Form} from "react-bootstrap";
import React from "react";
import {StepsStateInMainCategory} from "../stepsState";

const SummaryDescription = (props) => {


    return(
        <React.Fragment>
            <Col md={5} className="news_ads_details">
                <h5>Advertisement Summary</h5>
                <hr/>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label style={{color: '#fff'}}>Title :</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{color: '#fff'}}>Price :</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{color: '#fff'}}>Description :</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description"/>
                    </Form.Group>
                    <Button className="next_btn" md={10} onClick={() => props.onClick(StepsStateInMainCategory)}>Next</Button>
                </Form>
            </Col>
        </React.Fragment>
    )
}

export default SummaryDescription;
