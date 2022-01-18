import React from 'react';
import "./Login.css";

const Login = () => {
    return (
        <React.Fragment>
            <div className="main-login-div">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 login-row-div">
                            <h4>Login Form</h4>
                            <hr />
                            <p>Please login first to submit new advertisement</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
