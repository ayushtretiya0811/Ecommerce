import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContex';

const AdminProtectedRoutes = () => {
    const { user } = useAuth();
const userinfo = JSON.parse(localStorage.getItem('user'))
    if (userinfo && userinfo.admin === true) {
       return <Outlet/>
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default AdminProtectedRoutes;
