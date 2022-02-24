import React, {useContext} from "react";
import {UserContext} from "../../../context/Context";


const AccountSettings = () => {
    const [user, setuser] = useContext(UserContext);
    return(
        <React.Fragment>
        <h5>Account Settings</h5>
    <hr />
    <p>Name: <span>{user.surename}</span></p>
    <p>Password: <span> ********** </span></p>

    <p>Address</p>
    <hr />
    <p>Country: <span>currentUser.country</span></p>
    <p>City: <span>currentUser.city</span></p>

    <p>Contact Details</p>
    <hr />
    <p>Mobile: <span>{user.phone}</span></p>
        </React.Fragment>
    )
}

export default AccountSettings;
