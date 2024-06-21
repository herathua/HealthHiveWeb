import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isAdmin, isLab } from '../auth';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (
    (isAdmin() && path.startsWith('/admin')) ||
    (isLab() && path.startsWith('/lab'))
  ) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
