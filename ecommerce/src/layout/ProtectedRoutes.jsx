import React, { useEffect, useState } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContex'
const ProtectedRoutes = () => {
    const { user } = useAuth();
const userinfo = JSON.parse(localStorage.getItem('user'))
    if (userinfo) {
        return   <Outlet />;
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default ProtectedRoutes;