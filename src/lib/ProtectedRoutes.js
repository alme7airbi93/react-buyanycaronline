import React from 'react';
import { Navigate } from 'react-router-dom';

export const CustomerProtectedRoutes = ({  children }) => {

    const userId = localStorage.getItem('userId')
    if (userId) {
            return children
    }
    else {
        return <Navigate to="/login" />
    }
};

export const AdminProtectedRoutes = ({  children }) => {

    const userId = localStorage.getItem('userId')
    if (userId) {
            return children
    }
    else {
        return <Navigate to="/login" />
    }
};

export const ModeratorsProtectedRoutes = ({  children }) => {

    const userId = localStorage.getItem('userId')
    if (userId) {
            return children
        }
    else {
        return <Navigate to="/login" />
    }
};

