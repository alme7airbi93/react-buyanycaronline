import React, {useContext} from "react";
import {UserContext} from "../../../context/Context";


const AccountSettings = () => {
	const [user] = useContext(UserContext);
	return(
		<React.Fragment>
			<h5>Account Settings</h5>
			<hr />
			<p>Username : <span>{user.username}</span></p>
			<p>Password : <span> ********** </span></p>
			<p>Mobile: <span>{user.phone}</span></p>

		</React.Fragment>
	);
};

export default AccountSettings;
