import React from 'react';
import { Button } from '@mui/material';
import axios from '../../services/axiosInstance';
import { useAuth } from './AuthProvider';

const LabLogin = () => {
  const { keycloak } = useAuth();

  const loginAsAdmin = async () => {
    try {
      await keycloak.login({ idpHint: 'admin-login' });
      const token = await keycloak.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Handle admin login logic
      console.log('Logged in as admin');
    } catch (error) {
      console.error('Failed to login as admin', error);
    }
  };

  const loginAsUser = async () => {
    try {
      await keycloak.login({ idpHint: 'user-login' });
      const token = await keycloak.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Handle user login logic
      console.log('Logged in as user');
    } catch (error) {
      console.error('Failed to login as user', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <Button variant="contained" color="primary" onClick={loginAsAdmin}>
        Login as Admin
      </Button>
      <Button variant="contained" color="primary" onClick={loginAsUser}>
        Login as User
      </Button>
    </div>
  );
};

export default LabLogin;
