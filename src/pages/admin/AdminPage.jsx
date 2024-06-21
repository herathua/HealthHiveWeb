import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LabCreationPage from './lab/LabCreationPage';
import UserCreationPage from './user/UserCreationPage';

const AdminPage = ({ match }) => (
  <Routes>
    <Route path={`${match.path}/labcreation/*`} element={<LabCreationPage />} />
    <Route path={`${match.path}/usercreation/*`} element={<UserCreationPage />} />
    <Navigate to={`${match.path}/labcreation/*`} />
  </Routes>
);

export default AdminPage;
