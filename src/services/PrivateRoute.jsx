import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const authToken = Cookies.get('authToken'); // Retrieve the token from cookies

  return authToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
