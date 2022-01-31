import React from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import "./NewAds.css";
import Select from "react-select";

const NewAds = () => {

    const options = [
        { value: 'corolla', label: 'corolla' },
        { value: 'civic', label: 'civic' },
    ]

    return (
        <div style={{height: "100vh"}}>
            <Container>
                <Row className={'justify-content-center'}>
                    <Col md={3} className="news_ads_details">
                            <h5>Ad Details</h5>
                            <hr/>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{color: '#fff'}}>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{color: '#fff'}}>Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter Price" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{color: '#fff'}}>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={3} className="find_details">
                        <h5>FIND</h5>
                        <hr/>
                        <Row  className="justify-content-center">
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Name'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Model'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Year'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Price'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Order'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Order'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <div className={'mb-3'}>
                                    <Select placeholder={'Order'} options={options} />
                                </div>
                            </Col>
                            <Col md={10}>
                                <Button className="search_btn">SEARCH</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default NewAds;
