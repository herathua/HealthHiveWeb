import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LabLogin from './LabLogin';
import { AuthProvider } from '../AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LabLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
