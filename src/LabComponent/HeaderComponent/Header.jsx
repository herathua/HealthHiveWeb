import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

function Header({ toggleSidebar, isOpen }) {
  return (
    <header className="bg-blue-700 p-4 text-white flex justify-between items-center"> {/* Changed background color to blue */}
      <div className="flex items-center">
        <img src={logo} alt="Health Hive" className="w-8 h-8 mr-2" /> {/* Display the logo */}
        <span className="text-lg font-semibold">Health Hive</span> {/* Display the website name */}
      </div>
      <button onClick={toggleSidebar} className="block md:hidden bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded"> {/* Changed button color to blue */}
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
    </header>
  );
}

export default Header;
