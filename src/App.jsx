import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Landing';
import LoginPage from './LoginPage'; // Assuming this is your login page component
import AdminPage from './pages/admin/AdminPage'; // Import your AdminPage component here
import LabPage from './pages/lab/LabPage'; // Import your LabPage component here
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<PrivateRoute element={<AdminPage />} />} />
        <Route path="/lab/*" element={<PrivateRoute element={<LabPage />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
