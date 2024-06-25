import React, { useState } from 'react';
import { Component2, Component3, Component4, Component5 } from '../LabComponent/SideBarComponent/Component';
import LabLogin from '../LabComponent/LabLogin/LabLogin';
import Sidebar from '../LabComponent/SideBarComponent/Sidebar';
import Header from '../LabComponent/HeaderComponent/Header';
import Footer from '../LabComponent/FooterComponent/Footer';

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
    <>
      <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />

      <div className="min-h-screen flex">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} handleComponentChange={handleComponentChange} />

        <main className="flex-1">
          {renderComponent()}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
