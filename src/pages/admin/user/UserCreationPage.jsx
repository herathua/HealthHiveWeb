import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CreateUserPage from './CreateUserPage';
import ViewUserPage from './ViewUserPage';

const UserCreationPage = ({ match }) => (
  <Routes>
    <Route path="/create" element={<CreateUserPage />} />
    <Route path="/view" element={<ViewUserPage />} />
    <Navigate to="/create"/>
  </Routes>
);

export default UserCreationPage;
