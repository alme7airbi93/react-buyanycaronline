import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from "../context/Context";
import {User_Roles} from "../common/data/User_Roles.js";
import {checkTypeUserRoles} from "../common/validations/EnumsValidation.js";

// eslint-disable-next-line react/prop-types
export const UserRoutes = ({Component}) => {

	const ctx  = useContext(UserContext);
	const user =  ctx.getUserData();

	console.log("In User Routes ", user);
	if (checkTypeUserRoles(user.role)) {
		return <Component />;
	}
	else {
		// Old code in which nagivating to user-profile casuing infinte loop
		return <Navigate to="/" />;
	}
};


// eslint-disable-next-line react/prop-types
export const AdminModeratorRoutes = ({Component}) => {
	const ctx  = useContext(UserContext);
	const user =  ctx.getUserData();

	// const [user]  = useContext(UserContext);

	if (user._role === User_Roles.ADMIN || user._role === User_Roles.SUPER_ADMIN) {
		return <Component />;
	}
	else {
		return <Navigate to="/user-profile" />;
	}
};
