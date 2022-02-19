import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/Context';

export const UserRoutes = ({Component}) => { 

    const {user, setUser}  = useContext(UserContext);
    const role = (Object.keys(user).length === 0 && user.constructor === Object) ? null : user.roles[0]  

    if (role === "CUSTOMER" || role === "ADMIN" || role === "MODERATOR") {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}

export const CustomerRoutes = ({Component}) => {

    const {user, setUser}  = useContext(UserContext);
    const role = (Object.keys(user).length === 0 && user.constructor === Object) ? null : user.roles[0]  

    if (role === "CUSTOMER") {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}

export const AdminModeratorRoutes = ({Component}) => {
    const {user, setUser}  = useContext(UserContext);
    const role = (Object.keys(user).length === 0 && user.constructor === Object) ? null : user.roles[0]  

    if (role === "ADMIN" || role === "MODERATOR") {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}
