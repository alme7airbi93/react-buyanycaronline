import React, {useState} from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import { GetUser } from '../../firebase/User';
import { Login } from '../../firebase/Auth'; 

const UserLogin = () => {
    const [loginData, setLoginData] = useState({})
    const navigate = useNavigate();

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
                    break;
                case 'ADMIN':
                    localStorage.setItem("admin", JSON.stringify(data));
                    navigate('/monitor-page')                   
                    break;
                case 'MODERATOR':
                    localStorage.setItem("moderator", JSON.stringify(data));
                    navigate('/manage-ads')                    
                    break;
                default:
                    navigate('/login')
                    break;
            }
        }
    }


    return (
        <React.Fragment>
            <div className="main-login-div">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 login-row-div">
                            <h4>Login Form</h4>
                            <hr />
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
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserLogin;
