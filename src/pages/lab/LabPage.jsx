import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import QRCodePage from './QRCodePage';
import TablePage from './TablePage';
import SettingsPage from './SettingsPage';
import MiniDrawer from './MinDrawer';
import LabOldUploadsComponent from './LabOldUploadsComponent';

const LabPage = () => (
  <MiniDrawer>
    <Routes>
      <Route path="/qrcode" element={<QRCodePage />} />
      <Route path="/requests" element={<TablePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/reports" element={<LabOldUploadsComponent />} />
      <Route path="*" element={<Navigate to="qrcode" />} />
    </Routes>
  </MiniDrawer>
);

export default LabPage;
