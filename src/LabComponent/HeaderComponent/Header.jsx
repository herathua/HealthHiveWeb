import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

function Header({ toggleSidebar, isOpen }) {
  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div>Header</div>
      <button onClick={toggleSidebar} className="block md:hidden bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} /> {/* Show different icon based on isOpen state */}
      </button>
    </header>
  );
}

export default Header;
