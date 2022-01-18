import React, {useState} from 'react';
import "./Header.css";
import {Modal, Button, InputGroup, FormControl, Form, Nav, Navbar} from "react-bootstrap";
import Logo from "../../assets/img/logo.jpg";
import {NavLink} from "react-router-dom";

const Header = () => {
    //useState-hooks
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

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
        console.log(loginData)
    }

    const loginModal = (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <div  className="modal_main_div">
                <Modal.Header className="modal_header">
                    <Modal.Title>Login</Modal.Title>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <h3 onClick={handleClose} style={{cursor: 'pointer'}}>
                        x
                    </h3>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
            </div>
        </Modal>
    )

    const RegisterModal = (
        <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false} >
            <div className="modal_main_div">
                <Modal.Header className="modal_header">
                    <Modal.Title>Register</Modal.Title>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <h3 onClick={handleClose2} style={{cursor: 'pointer'}}>
                        x
                    </h3>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
            </div>
        </Modal>
    )

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
                <div className="col-md-5 d-flex justify-content-end headers-button">
                    <button type="button" onClick={handleShow} >LOGIN</button>
                    <span> | </span>
                    <button type="button" onClick={handleShow2}>REGISTER</button>
                </div>
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
            {/*<nav className="navbar navbar-expand-lg Navbar-header">*/}
            {/*    <button className="navbar-toggler" type="button" data-toggle="collapse"*/}
            {/*            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"*/}
            {/*            aria-label="Toggle navigation">*/}
            {/*        <span className="navbar-toggler-icon"/>*/}
            {/*    </button>*/}
            {/*    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">*/}

            {/*    </div>*/}

            {/*</nav>*/}
        </>
    );
};
export default Header;