import {
	Modal,
	Button,
	InputGroup,
	FormControl,
	Form,
	Container,
	Row,
	Col,
	Alert
} from "react-bootstrap";
import "./login.css";

import React, { useEffect, useState, useContext } from "react";
import {UserContext} from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, GoogleSignin } from "../../../controllers/AuthController.js";

const LoginModal = (props) => {

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");

	const [show, setShow] = useState(false);
	const [loginError, setloginError] = useState("");
	const navigate = useNavigate();

	// eslint-disable-next-line no-unused-vars
	const ctx = useContext(UserContext);

	useEffect(()=>{
		// eslint-disable-next-line react/prop-types
		setShow(props.show);
		if(email !=="" && validateEmail(email) === null) {
			setEmailError("Please enter email exactly!");
			setloginError("");
		} else {
			setEmailError("");
		}

	},[email, props]);


	const handleClose = ()=>{
		setShow(false);
		// eslint-disable-next-line react/prop-types
		props.handleCloseLogin();
	};

	const loginDataHandler = (e) => {
		e.preventDefault();
		logInWithEmailAndPassword(email, password)
			.then((data)=>{
				if(data.error !== ""){
					setloginError(data.error);
				}
				else{
					ctx.setUserData(data.profile)
					document.cookie=`userToken=${data.token}`;
					navigate("/user-profile");
					handleClose();
				}
			});
	};

	const googleSigninHandle =  () => {
		GoogleSignin().then((data) => {
			console.log("Data in Google Sign in:", data.token);
			ctx.setUserData(data.profile)
			document.cookie = `userToken=${data.token}`;
			navigate("/user-profile");
			handleClose();
		}).catch(e =>{
			console.log(e);
		});
	};

	const validateEmail = (email) =>{
		return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	};

	const isValid =
        !validateEmail(email) ||
        password === "";

	return (
		<Modal size={"lg"} show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<div  className="modal_main_div">
				<Modal.Header className="modal_header">
					<Modal.Title>Login</Modal.Title>
					<h3 onClick={handleClose} style={{cursor: "pointer"}}>
                        x
					</h3>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row className="login-modal-content">
							<Col md={6}>
								<Form onSubmit={loginDataHandler}>
									<InputGroup className="mb-3">
										<FormControl
											type={"email"}
											placeholder="Enter Email"
											name="email"
											aria-label="email"
											value = {email}
											onChange={(e) => setEmail(e.target.value)}
											aria-describedby="basic-addon1"
										/>
									</InputGroup>
									{(emailError !== "") && <Alert variant='danger'>{emailError}</Alert>}
									<InputGroup className="mb-3">
										<FormControl
											type={"password"}
											placeholder="Enter Password"
											name="password"
											aria-label="password"
											value = {password}
											onChange={(e) => setPassword(e.target.value)}
											aria-describedby="basic-addon1"
										/>
									</InputGroup>
									{(loginError !== "") && <Alert variant='danger'>{loginError}</Alert>}
									<Button type="submit" disabled={isValid} className='w-100 modal_btn'>LOGIN</Button>
								</Form>
							</Col>

							<Col md={1}>
								<p className={"divider"}>or</p>
							</Col>

							<Col md={5} className={"social_btn_main"}>
								{/*<button className={"social_btn fb_btn"}>Sign in with Facebook</button>*/}
								{/*<button className={"social_btn twitter_btn"}>Sign in with Twitter</button>*/}
								<button className={"social_btn google_btn"} onClick = {googleSigninHandle}>Sign in with Google+</button>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</div>
		</Modal>
	);
};

export default LoginModal;
