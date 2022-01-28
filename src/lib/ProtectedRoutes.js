import React from 'react';
import { Navigate } from 'react-router-dom';

export const CustomerProtectedRoutes = ({  children }) => {

    const userId = localStorage.getItem('userId')
    const adminId = localStorage.getItem('adminId')
    const moderatorId = localStorage.getItem('moderatorId')

    if (userId || adminId || moderatorId) {
            return children
    }
    else {
        return <Navigate to="/login" />
    }
};

export const AdminModeratorProtectedRoutes = ({  children }) => {

    const adminId = localStorage.getItem('adminId')
    const moderatorId = localStorage.getItem('moderatorId')

    if (adminId || moderatorId) {
            return children
    }
    else {
        return <Navigate to="/login" />
    }
};


