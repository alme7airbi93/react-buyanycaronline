import React, { useState, useContext } from "react";
import {NavLink} from "react-router-dom";
import "./styles.css";
import  UserContext from "../../context/Context";

export default function Dropdown(props) {  
  const [isActive, setIsActive] = useState(false);

  const onClickHandle = (e) => {
    e.preventDefault();      
    setIsActive(!isActive);
  }

  const showDropdown = () => {
    setIsActive(false);
  }

  const logoutHalde = () => {
    setIsActive(false);
    props.onClick();
  }

  const {user, setUser}  = useContext(UserContext);

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={(e) => onClickHandle(e)} className="menu-trigger">
          <span>{user.surname}</span>
          <i className = {`fas fa-caret-down ${isActive ? "active" : "inactive"}`}></i>
        </button>        
        <nav          
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>              
              <NavLink to={'/user-profile'} onClick = {showDropdown}>MANAGE PROFILE</NavLink>
            </li>
            <li>              
              <NavLink to={'/manage-ads'} onClick = {showDropdown}>MANAGE ADS</NavLink>
            </li>   
            <li>              
              <NavLink to={'/'} onClick = {logoutHalde}>LOGOUT</NavLink>
            </li>          
          </ul>
        </nav>
      </div>
    </div>
  );
}
