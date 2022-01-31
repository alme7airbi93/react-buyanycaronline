import React, {useState} from 'react';
import "./Header.css";
import {Modal, Button, InputGroup, FormControl, Form, Nav, Navbar, Container, Row, Col} from "react-bootstrap";
import Logo from "../../assets/img/logo.jpg";
import {NavLink, useNavigate} from "react-router-dom";
import { FaFacebookF } from 'react-icons/fa';
import mockData from "../../Mock";

const Header = () => {
    //useState-hooks
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const navigate = useNavigate();

    //modal-formInput-useState
    const [registerData, setRegisterData] = useState({})
    const [loginData, setLoginData] = useState({})

    //Modal-functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    //Register
    const RegisterDataHandler = (e) => {
        e.preventDefault();
        console.log(registerData)
    }
    const registerChangeHandler = (e) => {
        const {name, value} = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    //login
    const loginChangeHandler = (e) => {
        const {name, value} = e.target;

        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    const loginDataHandler = (e) => {
        e.preventDefault();

        const found = mockData.find((user) => {
            if(user.email === loginData.email && user.password === loginData.password) {
                return user
            }
        })

        if (found) {
            switch (found.roles) {
                case 'CUSTOMER':
                    localStorage.setItem("userId", found.id);
                    navigate('/user-profile')
                    setShow(false)
                    break;
                case 'ADMIN':
                    localStorage.setItem("adminId", found.id);
                    navigate('/monitor-page')
                    setShow(false)
                    break;
                case 'MODERATOR':
                    localStorage.setItem("moderatorId", found.id);
                    navigate('/manage-ads')
                    setShow(false)
                    break;
                default:
                    navigate('/login')
                    break;
            }
        }
        else {
            alert('incorrect email or password')
        }
    }

    const logoutHandler = () => {
        localStorage.clear()
        navigate('/')
    }

    const profileHandler = () => {
        navigate('/user-profile')
    }

    const loginModal = (

        <Modal size={'lg'} show={show} backdrop="static" keyboard={false}>
            <div  className="modal_main_div">
                <Modal.Header className="modal_header">
                    <Modal.Title>Login</Modal.Title>
                    <h3 onClick={handleClose} style={{cursor: 'pointer'}}>
                        x
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row className={'align-items-center'}>
                            <Col md={6}>
                                <Form onSubmit={loginDataHandler}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type={'email'}
                                            placeholder="Enter Email"
                                            name="email"
                                            aria-label="email"
                                            onChange={loginChangeHandler}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type={'password'}
                                            placeholder="Enter Password"
                                            name="password"
                                            aria-label="password"
                                            onChange={loginChangeHandler}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <Button type="submit" className='w-100 modal_btn'>LOGIN</Button>
                                </Form>
                            </Col>

                            <Col md={1}>
                                <p className={'divider'}>or</p>
                            </Col>


                            <Col md={5} className={'social_btn_main'}>

                                <button className={'social_btn fb_btn'}>Sign in with Facebook</button>
                                <button className={'social_btn twitter_btn'}>Sign in with Twitter</button>
                                <button className={'social_btn google_btn'}>Sign in with Google+</button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </div>
        </Modal>
    )

    const RegisterModal = (
        <Modal size={'lg'} show={show2} backdrop="static" keyboard={false} >
            <div className="modal_main_div">
                <Modal.Header className="modal_header">
                    <Modal.Title>Register</Modal.Title>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <h3 onClick={handleClose2} style={{cursor: 'pointer'}}>
                        x
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row className={'align-items-center'}>
                            <Col md={6}>
                                <Form onSubmit={RegisterDataHandler}>

                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type="email"
                                            placeholder="Enter Email"
                                            aria-label="email"
                                            name="email"
                                            onChange={registerChangeHandler}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type="password"
                                            placeholder="Enter Password"
                                            aria-label="password"
                                            name="password"
                                            onChange={registerChangeHandler}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            type="password"
                                            placeholder="Enter Confirm Password"
                                            aria-label="password"
                                            name="confirmPassword"
                                            onChange={registerChangeHandler}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <Button type="submit" className='w-100 modal_btn'>REGISTER</Button>
                                </Form>
                            </Col>

                            <Col md={1}>
                                <p className={'divider'}>or</p>
                            </Col>

                            <Col md={5} className={'social_btn_main'}>
                                <button className={'social_btn fb_btn'}>Sign in with Facebook</button>
                                <button className={'social_btn twitter_btn'}>Sign in with Twitter</button>
                                <button className={'social_btn google_btn'}>Sign in with Google+</button>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
            </div>
        </Modal>
    )

    const userId = localStorage.getItem('userId')
    const adminId = localStorage.getItem('adminId')
    const moderatorId = localStorage.getItem('moderatorId')

    let btn;
    if(userId || adminId || moderatorId){
        btn = (
            <div className="col-md-5 d-flex justify-content-end headers-button">
                <button type="button" onClick={logoutHandler} >LOGOUT</button>
                <button type="button" onClick={profileHandler}> GO TO PROFILE</button>
            </div>
        )
    }
    else{
        btn = (
            <div className="col-md-5 d-flex justify-content-end headers-button">
                <button type="button" onClick={handleShow} >LOGIN</button>
                <span> | </span>
                <button type="button" onClick={handleShow2}>REGISTER</button>
            </div>
        )
    }


    return (
        <>
            {loginModal}
            {RegisterModal}
            {/*header*/}
            <div className="header-div">
                <div className="container">
                <div className="row">
                <div className="col-md-5 d-flex justify-content-center">
                    <NavLink to={'/'} > <img src={Logo} alt="logo" /> </NavLink>
                </div>
                    {btn}
                </div>
                </div>
            </div>

            {/*NavBar*/}
            <Navbar bg="light" expand="lg" className="Navbar-header">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto Navbar-header-section">
                        <div className="navbar-nav Navbar-header-section ">
                            <NavLink className="nav-link"  to={'/'}>HOME </NavLink>
                            <NavLink className="nav-link"  to={'/car-search'}>CARS</NavLink>
                            <NavLink className="nav-link"  to={'/boat-search'}>BOAT</NavLink>
                            <NavLink className="nav-link"  to={'/about'}>ABOUT</NavLink>
                            <NavLink className="nav-link"  to={'/contact'}>CONTACT</NavLink>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
export default Header;