import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CreateLabPage from './CreateLabPage';
import ViewLabPage from './ViewLabPage';
import MinDrawer from './MinDrawer';

const LabCreationPage = ({ match }) => (
  <MinDrawer>
    <Routes>
      <Route path="/create" element={<CreateLabPage />} />
      <Route path="/view" element={<ViewLabPage />} />
      <Navigate to="/create" />
    </Routes>
  </MinDrawer>
);

export default LabCreationPage;
