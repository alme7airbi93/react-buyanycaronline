import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from "../context/Context";
import {User_Roles} from "../data/User_Roles.js";
import {checkTypeUserRoles} from "../validations/EnumsValidation.js";

// eslint-disable-next-line react/prop-types
export const UserRoutes = ({Component}) => {

	const [user]  = useContext(UserContext);
	console.log("In User Routes ", user);
	if (checkTypeUserRoles(user._role)) {
		return <Component />;
	}
	else {
		return <Navigate to="/user-profile" />;
	}
};


// eslint-disable-next-line react/prop-types
export const AdminModeratorRoutes = ({Component}) => {
	const [user]  = useContext(UserContext);

	if (user._role === User_Roles.ADMIN || user._role === User_Roles.SUPER_ADMIN) {
		return <Component />;
	}
	else {
		return <Navigate to="/user-profile" />;
	}
};
