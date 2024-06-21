import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin, isLab } from '../auth';

const PrivateRoute = ({ element, ...rest }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (
    (isAdmin() && location.pathname.startsWith('/admin')) ||
    (isLab() && location.pathname.startsWith('/lab'))
  ) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
