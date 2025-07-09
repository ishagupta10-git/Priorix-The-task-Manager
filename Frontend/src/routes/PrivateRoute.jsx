import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const PrivateRoute = ({allowedRoles}) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    return user.role === "admin" ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />
}

export default PrivateRoute