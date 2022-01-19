import React from 'react';
import {Container, Row, Col, Form, Button, InputGroup, FormControl} from "react-bootstrap";
import "./NewAds.css";

const NewAds = () => {
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
                                <Form.Select className="news_select_btn">
                                    <option>SELECT NAME</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT MODEL</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT YEAR</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT PRICE</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT ORDER</option>
                                    <option value="highest">Highest</option>
                                    <option value="lowest">Lowest</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT ORDER</option>
                                    <option value="highest">Highest</option>
                                    <option value="lowest">Lowest</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT ORDER</option>
                                    <option value="highest">Highest</option>
                                    <option value="lowest">Lowest</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT ORDER</option>
                                    <option value="highest">Highest</option>
                                    <option value="lowest">Lowest</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                            <Col md={10}>
                                <Form.Select className="news_select_btn">
                                    <option>SELECT ORDER</option>
                                    <option value="highest">Highest</option>
                                    <option value="lowest">Lowest</option>
                                    <option value="3">Three</option>
                                </Form.Select>
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
