import React, { useState,useContext,useEffect } from "react";
import "./Header.css";
import { Nav, Navbar } from "react-bootstrap";
import Logo from "../../assets/img/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../controllers/AuthController.js";
import Dropdown from "../Dropdown";
import LoginModal from "../Modal/Login/LoginModal";
import SignupModal from "../Modal/Signup/SignupModal";
import { UserContext } from "../../context/Context";
import { useLocation } from 'react-router-dom'



const Header = () => {
	const navigate = useNavigate();
	const [loginShow, setLoginShow] = useState(false);
	const [signupShow, setSignupShow] = useState(false);
	const ctx = useContext(UserContext);
	const user = ctx.getUserData();
	const location = useLocation();
	console.log(location,'location')
	// const [user]  = useContext(UserContext);

	const closeLogin = ()=>{
		setLoginShow(false);
	};

	const closeSignup = ()=>{
		setSignupShow(false);
	};

	const loginShowHandle = (e) => {
		e.preventDefault();
		setLoginShow(true);
	};

	const signupShowHandle = (e) => {
		e.preventDefault();
		setSignupShow(true);
	};

	const logoutHandler = ()=>{
		logOut();
		deleteCookie("userToken");
		ctx.clearUserData();
		navigate("/");
	};

	const getCookie = (cookieName) => {
		// let cookie = {};
		// document.cookie.split(";").forEach(function(el) {
		// 	let [key,value] = el.split("=");
		// 	cookie[key.trim()] = value;
		// });
		// return cookie[cookieName];

		
	};

	const deleteCookie = (name) => {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	};

	const userToken = getCookie("userToken");

	let btn;

	if(user && user._id) {
		btn = (
			<div className="col-md-5 d-flex justify-content-end headers-button">
				<Dropdown onClick={logoutHandler}/>
				{/* <span> | </span>
                <button type="button" onClick={logoutHandler} >LOGOUT</button>                 */}
			</div>
		);
	} else {
		btn = (
			<div className="col-md-5 d-flex justify-content-end headers-button">
				<button type="button" onClick={(e) => loginShowHandle(e)} >LOGIN</button>
				<span> | </span>
				<button type="button" onClick={(e) => {signupShowHandle(e);}}>REGISTER</button>
			</div>
		);
	}

	return (
		<React.Fragment>
			{/*header*/}
			<div style={location.pathname ==='/car-search'?{
				position:"fixed",
				width: "100%",
				zIndex:99
			}:{}}>
			<div className="header-div">
				<div className="container">
					<div className="row header-row">
						<div className="col-md-5 justify-content-center">
							<NavLink to={"/"} > <img src={Logo} alt="logo" /> </NavLink>
						</div>
						{btn}
					</div>
				</div>
			</div>

			<LoginModal  show={loginShow} handleCloseLogin={closeLogin}/>
			<SignupModal  show={signupShow} handleCloseSignup={closeSignup}/>

			{/*NavBar*/}
			<Navbar bg="light" expand="lg" className="Navbar-header">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto Navbar-header-section">
						<div className="navbar-nav Navbar-header-section ">
							<NavLink className="nav-link"  to={"/"}>HOME </NavLink>
							<NavLink className="nav-link"  to={"/car-search"}>CARS</NavLink>
							<NavLink className="nav-link"  to={"/boat-search"}>BOAT</NavLink>
							<NavLink className="nav-link"  to={"/about"}>ABOUT</NavLink>
							<NavLink className="nav-link"  to={"/contact"}>CONTACT</NavLink>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			</div>
		</React.Fragment>
	);
};
export default Header;
