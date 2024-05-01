import React, { useState } from 'react';
import { Component3, Component4, Component5 } from './LabComponent/SideBarComponent/Component';
import LabLogin from './LabComponent/LabLogin/LabLogin';
import Sidebar from './LabComponent/SideBarComponent/Sidebar';
import Header from './LabComponent/HeaderComponent/Header'; // Import the Header component
import Footer from './LabComponent/FooterComponent/Footer'; // Import the Footer component

function App() {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [activeComponent, setActiveComponent] = useState(3); // Default to Component3

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
      case 3:
        return <Component3 />;
      case 4:
        return <Component4 />;
      case 5:
        return <Component5 />;
      default:
        return <Component3 />; // Default content
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? ( // If logged in, render header, sidebar, and content
        <>
          <Header toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Show header */}
          <div className="flex flex-1">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleComponentChange={handleComponentChange} />
            <main className="flex-1 p-4">
              {renderComponent()}
            </main>
          </div>
        </>
      ) : (
        <LabLogin onLogin={handleLogin} /> // If not logged in, show login component
      )}
      <Footer /> {/* Always render the Footer */}
    </div>
  );
}

export default App;
