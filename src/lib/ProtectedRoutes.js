import React from 'react';
import { Navigate } from 'react-router-dom';

export const UserRoutes = ({Component}) => {
    const user = localStorage.getItem('user')
    const admin = localStorage.getItem('admin')
    const moderator = localStorage.getItem('moderator')

    if (user || admin || moderator) {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}

export const CustomerRoutes = ({Component}) => {
    const user = localStorage.getItem('user')

    if (user) {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}

export const AdminModeratorRoutes = ({Component}) => {
    const admin = localStorage.getItem('admin')
    const moderator = localStorage.getItem('moderator')

    if (admin || moderator) {
        return <Component />
    }
    else {
        return <Navigate to="/login" />
    }
}
