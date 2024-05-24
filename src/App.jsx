import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LabLogin from './LabComponent/LabLogin/LabLogin';
import Lab from './LabComponent/Lab'; // Ensure this component is correctly defined and imported
import LandingPage from './Landing';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
        <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LabLogin/>} />
          <Route path="/lab" element={<Lab />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
