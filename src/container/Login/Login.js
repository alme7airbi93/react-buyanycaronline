import React, {useState} from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import mockData from "../../Mock";

const Login = () => {
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
                    break;
                case 'ADMIN':
                    localStorage.setItem("adminId", found.id);
                    navigate('/monitor-page')
                    break;
                case 'MODERATOR':
                    localStorage.setItem("moderatorId", found.id);
                    navigate('/manage-ads')
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

export default Login;
