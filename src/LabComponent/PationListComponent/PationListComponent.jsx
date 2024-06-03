import React, { useEffect } from 'react';
import { logoutUser } from '.././../services/apiService';

const PationListComponent = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Wait for 3 seconds before logging out
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        await logoutUser();
        // Redirect to the login page or home page after logging out
        window.location.href = '/';
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    handleLogout(); // Call the logout function when the component mounts
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl text-green-600">WELCOME! YOU HAVE BEEN LOGGED OUT SUCCESSFULLY!</p>
    </div>
  );
};

export default PationListComponent;
