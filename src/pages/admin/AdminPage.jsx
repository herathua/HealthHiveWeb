import React from 'react';
import { Route, Routes, Navigate, useLocation, Link } from 'react-router-dom';
import MinDrawer1 from './user/MinDrawer';
import MinDrawer2 from './lab/MinDrawer';
import CreateUserPage from './user/CreateUserPage';
import ViewUserPage from './user/ViewUserPage';
import CreateLabPage from './lab/CreateLabPage';
import ViewLabPage from './lab/ViewLabPage';
import { Button, Box } from '@mui/material';

const AdminPage = () => {
  const location = useLocation();

  const isUserRoute = location.pathname.startsWith('/admin/usercreation');
  const isLabRoute = location.pathname.startsWith('/admin/labcreation');

  return (
    <div>
      <Box display="flex" justifyContent="center" m={2}>
        <Button variant="contained" component={Link} to="/admin/usercreation/create" sx={{ mx: 1 }}>
          User Creation
        </Button>
        <Button variant="contained" component={Link} to="/admin/labcreation/create" sx={{ mx: 1 }}>
          Lab Creation
        </Button>
      </Box>
      {isUserRoute && (
        <MinDrawer1>
          <Routes>
            <Route path="usercreation/create" element={<CreateUserPage />} />
            <Route path="usercreation/view" element={<ViewUserPage />} />
            <Route path="*" element={<Navigate to="usercreation/create" />} />
          </Routes>
        </MinDrawer1>
      )}
      {isLabRoute && (
        <MinDrawer2>
          <Routes>
            <Route path="labcreation/create" element={<CreateLabPage />} />
            <Route path="labcreation/view" element={<ViewLabPage />} />
            <Route path="*" element={<Navigate to="labcreation/create" />} />
          </Routes>
        </MinDrawer2>
      )}
    </div>
  );
};

export default AdminPage;
