import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

export const UserRoutes = ({Component}) => {
    const userId = localStorage.getItem('userId')
    const adminId = localStorage.getItem('adminId')
    const moderatorId = localStorage.getItem('moderatorId')

    if (userId || adminId || moderatorId) {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}

export const CustomerRoutes = ({Component}) => {
    const userId = localStorage.getItem('userId')

    if (userId) {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}

export const AdminModeratorRoutes = ({Component}) => {
    const adminId = localStorage.getItem('adminId')
    const moderatorId = localStorage.getItem('moderatorId')

    if (adminId || moderatorId) {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}
