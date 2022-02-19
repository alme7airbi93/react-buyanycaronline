import React, {useState, useContext, useEffect} from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import {Button, Form, FormControl, InputGroup, Alert} from "react-bootstrap";
import UserContext from '../../context/Context'; 
import { logInWithEmailAndPassword, GoogleSignin } from '../../firebase/Auth'; 


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const [loginError, setloginError] = useState('');
    const navigate = useNavigate();

    const {user, setUser}  = useContext(UserContext);   

    const loginDataHandler = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(email, password)
        .then((data)=>{            
            if(data.error !== ''){
                setloginError(data.error);
            }
            else{                
                setUser(data.profile); 
                document.cookie=`userToken=${data.token}`;
                navigate('/user-profile');
            }
        });         
    }    

    // const googleSigninHandle = () => {            
    //     GoogleSignin()
    //         .then((data)=>{
    //             setUser(data.profile);
    //             document.cookie=`userToken=${data.token}`;
    //             navigate('/user-profile');              
    //         })
    // }    

    const validateEmail = (email) =>{        
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const isValid =
        !validateEmail(email) ||
        password === '';


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
                                        value = {email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        type={'password'}
                                        placeholder="Enter Password"
                                        name="password"
                                        aria-label="password"
                                        value = {password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                {(loginError !== '') && <Alert variant='danger'>{loginError}</Alert>}
                                <Button type="submit" disabled={isValid} className='w-100 modal_btn'>LOGIN</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserLogin;
