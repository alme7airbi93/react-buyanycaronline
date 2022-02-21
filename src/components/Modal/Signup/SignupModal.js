import {
    Modal, 
    Button, 
    FormGroup, 
    FormControl, 
    Form,  
    FormLabel,   
    Container, 
    Row, 
    Col,
    Alert
} from "react-bootstrap";
import './signup.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from '../../../firebase/Auth'; 

const SignupModal = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatchError, setpasswordMatchError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const [show, setShow] = useState(false);    
    const [singupError, setSignupError] = useState('');
    let navigate = useNavigate();

  
    useEffect(()=>{
        setShow(props.show);
    },[props]);


    const handleClose = ()=>{
        setShow(false);
        props.handleCloseSignup();
    }    
   

    const RegisterDataHandler = (e) => {
        e.preventDefault();        
        if(password === confirmPassword) {
            signUpWithEmailAndPassword(email, password, name)
            .then((data)=>{
                if(data.token)
                {
                    navigate('/');
                    handleClose();
                }
                else{
                    setSignupError(data.error);
                    setpasswordMatchError("");
                }
            }); 
        } else {
            setSignupError("");
            setpasswordMatchError("Please confrim password again!")
        }
    }    

    const validateEmail = (email) =>{
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const isValid = 
        password === "" ||
        confirmPassword ==="" ||
        !validateEmail(email) || 
        name === '';

    return (

        <Modal size={'lg'} show={show} onHide={handleClose} backdrop="static" keyboard={false} >
            <div className="modal_main_div">
                <Modal.Header className="modal_header">
                    <Modal.Title>Register</Modal.Title>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <h3 onClick={handleClose} style={{cursor: 'pointer'}}>
                        x
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row className={'align-items-center'}>
                            <Col md={12}>
                                <Form onSubmit={RegisterDataHandler}>
                                    <FormGroup className="mb-3">
                                        <FormLabel> Name</FormLabel>
                                        <FormControl
                                            type="name"
                                            placeholder="Enter Name"
                                            aria-label="name"
                                            name="name"
                                            value = {name}
                                            onChange={(e) => setName(e.target.value)}
                                            aria-describedby="basic-addon1"
                                        />
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                    <FormLabel> Email</FormLabel>
                                        <FormControl
                                            type="email"
                                            placeholder="Enter Email"
                                            aria-label="email"
                                            name="email"
                                            value = {email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-describedby="basic-addon1"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                    <FormLabel> Password</FormLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Enter Password"
                                            aria-label="password"
                                            name="password"
                                            value = {password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            aria-describedby="basic-addon1"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                    <FormLabel> Confirm Password</FormLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Enter Confirm Password"
                                            aria-label="password"
                                            name="confirmPassword"
                                            value = {confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            aria-describedby="basic-addon1"
                                        />
                                    </FormGroup>
                                    {(passwordMatchError !== '') && <Alert variant='danger'>{passwordMatchError}</Alert>}
                                    {(singupError !== '') && <Alert variant='danger'>{singupError}</Alert>}
                                    <Button type="submit" disabled={isValid} className='w-100 modal_btn'>REGISTER</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
            </div>
        </Modal>
    )
}

export default SignupModal;