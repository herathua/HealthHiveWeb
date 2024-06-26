import React from 'react';
import './Landing.css'; // Ensure you import your CSS file

function LandingPage() {
  return (
    <div className="relative bg-blue-900 text-white min-h-screen flex flex-col items-center before:bg-svg before:bg-cover before:bg-center before:absolute before:inset-0 before:z-0">
      <header className="text-center py-10 z-10">
        <h1 className="text-4xl font-bold">Securely Store and Manage Your Health Data</h1>
        <p className="text-xl mt-4">
          Upload and access your health reports anytime, anywhere. Powered by blockchain technology for enhanced security.
        </p>
      </header>
      <div className="bg-white text-black p-10 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl mb-6">Let's get started</h2>
        <div className="space-y-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded-full w-full">Laboratory login</button>
          <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-full w-full">Admin login</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full">Download App</button>
        </div>
      </div>
      <div className="mt-10 text-center z-10">
        <h2 className="text-3xl font-bold mb-6">Revolutionize Your Health Data Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold">Secure and Encrypted</h3>
            <p>Your health data is securely stored and encrypted, ensuring privacy and protection against unauthorized access.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
            <p>Our platform is designed with a simple and intuitive interface, making it easy for users of all technical levels to navigate and manage their health data.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Powered by Blockchain</h3>
            <p>Experience the unparalleled security and transparency of blockchain technology for managing and storing your health data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
