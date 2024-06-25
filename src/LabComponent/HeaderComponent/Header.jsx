import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../assets/logo.png';

function Header({ toggleSidebar, isOpen }) {
  return (
    <header className="bg-blue-700 p-1 text-white flex justify-between items-center"> {/* Changed background color to blue */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Health Hive Logo" className="w-20 h-auto mr-2" /> {/* Maximize logo */}
          <span className="text-3xl font-semibold ">Health Hive</span> {/* Maximize website name */}
        </Link>
      </div>
      <button onClick={toggleSidebar} className="block md:hidden bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded"> {/* Changed button color to blue */}
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
    </header>
  );
}

export default Header;
