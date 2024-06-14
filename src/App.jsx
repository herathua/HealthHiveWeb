import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LabLogin from './LabComponent/LabLogin/LabLogin';
import Lab from './LabComponent/Lab'; // Ensure this component is correctly defined and imported
import LandingPage from './Landing';
import PrivateRoute from './services/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LabLogin />} />
          <Route path="/lab" element={<PrivateRoute element={Lab} />} /> {/* Protect /lab route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
