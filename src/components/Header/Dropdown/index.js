import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import "./styles.css";

export default function Dropdown(props) {  
  const [isActive, setIsActive] = useState(false);

  const onClickHandle = (e) => {
    e.preventDefault();      
    setIsActive(!isActive);
  }

  const showDropdown = () => {
    setIsActive(false);
  }

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={(e) => onClickHandle(e)} className="menu-trigger">
          <span>{props.userData.displayName}</span>
        </button>
        <nav
          
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>              
              <NavLink to={'/user-profile'} onClick = {showDropdown}>Manage Profile</NavLink>
            </li>
            <li>              
              <NavLink to={'/manage-ads'} onClick = {showDropdown}>Manage Ads</NavLink>
            </li>            
          </ul>
        </nav>
      </div>
    </div>
  );
}
