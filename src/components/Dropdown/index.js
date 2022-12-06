import React, { useState, useContext } from "react";
import {NavLink} from "react-router-dom";
import "./styles.css";
import {UserContext} from "../../context/Context";
import {User_Roles} from "../../common/data/User_Roles.js";

export default function Dropdown(props) {
	const [isActive, setIsActive] = useState(false);

	const onClickHandle = (e) => {
		e.preventDefault();
		setIsActive(!isActive);
	};

	const showDropdown = () => {
		setIsActive(false);
	};

	const logoutHalde = () => {
		setIsActive(false);
		// eslint-disable-next-line react/prop-types
		props.onClick();
	};

	const ctx  = useContext(UserContext);
	const user =  ctx.getUserData()


	const customerOptions = () => {
		if (user._role === User_Roles.CUSTOMER) {
			return (
				<li>
					<NavLink to={"/new-ads"} onClick={showDropdown}>NEW ADS</NavLink>
				</li>
			);
		}
	};

	const adminOptions = () => {
		if(user._role === User_Roles.ADMIN || user._role === User_Roles.SUPER_ADMIN) {
			return (
				<>
					<li>
						<NavLink to={"/manage-ads"} onClick = {showDropdown}>MANAGE ADS</NavLink>
					</li>
					<li>
						<NavLink to={"/monitor-page"} onClick = {showDropdown}>MONITOR PAGE</NavLink>
					</li>
				</>
			);
		}
	};

	return (
		<div className="container">
			<div className="menu-container">
				<button onClick={(e) => onClickHandle(e)} className="menu-trigger">
					<span>{user.surename}</span>
					<i className = {`fas fa-caret-down ${isActive ? "active" : "inactive"}`}></i>
				</button>
				<nav
					className={`menu ${isActive ? "active" : "inactive"}`}
				>
					<ul>
						<li>
							<NavLink to={"/user-profile"} onClick = {showDropdown}>MANAGE PROFILE</NavLink>
						</li>
						{customerOptions()}
						{adminOptions()}
						<li>
							<NavLink to={"/"} onClick = {logoutHalde}>LOGOUT</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
