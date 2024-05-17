import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component2,Component3, Component4, Component5 } from './LabComponent/SideBarComponent/Component';
import LabLogin from './LabComponent/LabLogin/LabLogin';
import Sidebar from './LabComponent/SideBarComponent/Sidebar';
import Header from './LabComponent/HeaderComponent/Header';
import Footer from './LabComponent/FooterComponent/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState(3);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleComponentChange = (componentNumber) => {
    setActiveComponent(componentNumber);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 2:
        return <Component2 />;
      case 3:
        return <Component3 />;
      case 4:
        return <Component4 />;
      case 5:
        return <Component5 />;
      default:
        return <Component3 />;
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/login" element={<LabLogin onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? (<><Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
                <div className="flex flex-1">
                  <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleComponentChange={handleComponentChange} />
                  <main className="flex-1 p-4">
                    {renderComponent()}
                  </main>
                </div><Footer />
              </>
            ) : (
              // Redirect to login or handle the login logic differently as needed
              <LabLogin onLogin={handleLogin} />
            )
          } />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
