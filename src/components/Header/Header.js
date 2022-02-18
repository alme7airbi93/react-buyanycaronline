import React, {useState, createContext} from 'react';
import "./Header.css";
import {
    Modal, 
    Button, 
    InputGroup, 
    FormControl, 
    Form, 
    Nav, 
    Navbar, 
    Container, 
    Row, 
    Col
} from "react-bootstrap";
import Logo from "../../assets/img/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Register, Login, GoogleSignin, Signout, UpdateProfile } from '../../firebase/Auth'; 
import { auth } from '../../firebase';
import { AddUser, GetUser } from '../../firebase/User';
import Dropdown from './Dropdown';


export const UserContext = createContext();

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
    const registerChangeHandler = (e) => {
        const {name, value} = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    const RegisterDataHandler = (e) => {
        e.preventDefault();
        const updateData = {displayName: registerData.name}

        const data = {
            username: registerData.email,
            roles: "CUSTOMER",
            phone: "123456789",
            surname: registerData.surname
        }

        AddUser(data);

        Register(registerData.email, registerData.password)
            .then((userCredential) => {  
                UpdateProfile(auth.currentUser, updateData);
                const user = userCredential.user; 
                if(Object.keys(user).length !== 0 && user.constructor !== Object) {                    
                    setShow2(false);               
                    navigate('/login')
                }
            })
            .catch((error) => {                
                const errorMessage = error.message;                          
            });
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

        Login(loginData.email, loginData.password)
            .then((userCredential) => {
                const user = userCredential.user;                
                GetUser(user.email)
                    .then((response) => { 
                        setLocalStorage(response.data());
                    })                         
            })           
    } 

    const setLocalStorage = (data) => {
        if (data) {
            switch (data.roles) {
                case 'CUSTOMER':
                    localStorage.setItem("user", JSON.stringify(data));
                    navigate('/user-profile')
                    setShow(false)
                    break;
                case 'ADMIN':
                    localStorage.setItem("admin", JSON.stringify(data));
                    navigate('/monitor-page')
                    setShow(false)
                    break;
                case 'MODERATOR':
                    localStorage.setItem("moderator", JSON.stringify(data));
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
        Signout().then(() => {            
            localStorage.clear()
            navigate('/')
        })        
    }

    const profileHandler = () => {
        navigate('/user-profile')
    }    

    const googleSigninHandle = () => {
        GoogleSignin()
            .then((result) => {                
                const user = result.user;
                GetUser(user.email)
                    .then((response) => { 
                        setLocalStorage(response.data());
                    })
            }).catch((error) => {               
                const errorMessage = error.message;
                console.log(errorMessage, 'error!!')
            });            
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
                                <button className={'social_btn google_btn'} onClick = {googleSigninHandle}>Sign in with Google+</button>
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
                                            type="surname"
                                            placeholder="Enter SurName"
                                            aria-label="surname"
                                            name="surname"
                                            onChange={registerChangeHandler}
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>

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
                                <button className={'social_btn google_btn'} onClick = {googleSigninHandle}>Sign in with Google+</button>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
            </div>
        </Modal>
    )    

    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    const moderator = JSON.parse(localStorage.getItem('moderator'));    
    let btn;

    if(user || admin || moderator) {
        btn = (
            <div className="col-md-5 d-flex justify-content-end headers-button">
                <Dropdown />
                <span> | </span>
                <button type="button" onClick={logoutHandler} >LOGOUT</button>                
            </div>
        )
    } else {
        btn = (
            <div className="col-md-5 d-flex justify-content-end headers-button">
                <button type="button" onClick={handleShow} >LOGIN</button>
                <span> | </span>
                <button type="button" onClick={handleShow2}>REGISTER</button>
            </div>
        )
    }

    return (
        <UserContext.Provider value={user || admin || moderator}>
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
        </UserContext.Provider>
    );
};
export default Header;