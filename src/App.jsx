import React, { useState } from 'react';
import Header from './LabComponent/HeaderComponent/Header';
import Sidebar from './LabComponent/SideBarComponent/Sidebar';
import { Component1, Component2, Component3, Component4, Component5 } from './LabComponent/SideBarComponent/Component';
import Footer from './LabComponent/FooterComponent/Footer'; // Import Footer component
import LabLogin from './LabComponent/LabLogin/LabLogin';
// Import LabLogin component

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleComponentChange = (componentNumber) => {
    setActiveComponent(componentNumber);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
      {!isLoggedIn && <LabLogin onLogin={handleLogin} />} {/* Render login component if not logged in */}
      {isLoggedIn && (
        <div className="flex flex-1">
          <Sidebar isOpen={isOpen} handleComponentChange={handleComponentChange} />
          <main className="flex-1 overflow-y-auto p-6">
            {activeComponent === 1 && <Component1 />}
            {activeComponent === 2 && <Component2 />}
            {activeComponent === 3 && <Component3 />}
            {activeComponent === 4 && <Component4 />}
            {activeComponent === 5 && <Component5 />}
          </main>
        </div>
      )}
      <Footer /> {/* Include Footer component */}
    </div>
  );
}

export default App;
