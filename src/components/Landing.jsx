import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/landing.svg';
import logo from '../assets/logo.png';
import click from '../assets/click.svg';
import chain from '../assets/chain.svg';
import lock from '../assets/lock.svg';

function LandingPage() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login');
  };

  const handleUserClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '150vh' // Set the height to 200% of viewport height
    }}>
      {/* Blue section */}
      <div className="text-white flex flex-col">
        <header className="w-full flex justify-between items-center p-2">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 mr-8" />
            <span className="text-2xl sm:text-4xl text-white">Health Hive</span>
          </div>
          <div className="text-right flex flex-col sm:flex-row sm:items-center sm:space-x-8 mt-4 sm:mt-0">
            <div className='flex items-center sm:mb-0'>
              <svg className="h-8 w-8 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <p className='ml-2 sm:ml-4 text-white'>
                <a href="mailto:contact@healthhive.com">contact@healthhive.com</a>
              </p>
            </div>
            <div className='flex items-center sm:mb-0'>
              <svg className="h-8 w-8 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <p className='ml-2 sm:ml-4 text-white'>
                <a href="tel:+1234567890">(123) 456-7890</a>
              </p>
            </div>
          </div>
        </header>

        <div className="flex items-center">
          <div className="w-3/5 py-4 p-10">
            <h1 className="text-6xl font-bold m-1">Securely Store and Manage <p>Your Health Data</p></h1>
            <p className="text-xl mt-6">
              Upload and access your health reports anytime, anywhere. <p>Powered by blockchain technology for enhanced security.</p>
            </p>
          </div>

          <div className="aspect-w-1 aspect-h-1 py-12 justify-center items-center bg-white text-black p-10 rounded-lg shadow-lg m-5">
            <h2 className="text-4xl mb-9 font-bold p-9 text-center">Let's get started</h2>
            <div className="space-y-4 w-full p-6">
              <button onClick={handleUserClick} className="bg-blue-500 text-white py-3 px-6 rounded-full w-full text-lg font-semibold">Laboratory login</button>
              <button onClick={handleAdminClick} className="border-spacing-4 border border-blue-500 text-black py-3 px-6 rounded-full w-full text-lg font-semibold">Admin login</button>
              <button className="bg-red-500 text-white py-3 px-6 rounded-full w-full text-lg font-semibold">Download App</button>
            </div>
          </div>
        </div>
      </div>

      {/* White section */}
      <div>
        <div className="max-w-screen-xl mx-auto py-20 px-4 mt-[150px]">
          <h2 className="text-center text-5xl font-bold text-black">Revolutionize Your Health Data Management</h2>
          <h4 className="text-center text-2xl font-bold text-black mt-4">Upload and retrieve your health reports on-the-go. Enjoy unparalleled security with our blockchain-based platform.</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div className="flex flex-col items-center m-10">
              <img src={lock} alt="Lock" className="h-16 m-10" />
              <h3 className="text-3xl font-semibold text-black">Secure and Encrypted</h3>
              <p className="text-2xl text-black text-center m-4">Your health data is securely stored and encrypted, ensuring privacy and protection against unauthorized access.</p>
            </div>
            <div className="flex flex-col items-center m-10">
              <img src={click} alt="Click" className="h-16 m-10" />
              <h3 className="text-3xl font-semibold text-black">User-Friendly Interface</h3>
              <p className="text-2xl text-black text-center m-4">Our platform is designed with a simple and intuitive interface, making it easy for users of all technical levels to navigate and manage their health data.</p>
            </div>
            <div className="flex flex-col items-center m-10">
              <img src={chain} alt="Chain" className="h-16 m-10" />
              <h3 className="text-3xl font-semibold text-black text-center break-normal ...">Blockchain Technology</h3>
              <p className="text-2xl text-black text-center m-4">Experience the unparalleled security and transparency of blockchain technology for managing and storing your health data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
