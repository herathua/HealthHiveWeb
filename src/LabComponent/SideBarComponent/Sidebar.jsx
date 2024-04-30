import React from 'react';

function Sidebar({ isOpen, toggleSidebar, handleComponentChange }) {
  return (
    <aside className={`bg-gray-200 text-gray-800 w-64 p-4 ${isOpen ? '' : 'hidden'} md:block`}> {/* Changed background color to light gray */}
     <button onClick={() => handleComponentChange(3)} className="block w-full mb-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm">Dashboard</button> {/* Adjusted button color to blue */}
        <button onClick={() => handleComponentChange(4)} className="block w-full mb-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm">Uplode List</button> {/* Adjusted button color to blue */}
        <button onClick={() => handleComponentChange(5)} className="block w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm">Settings</button> {/* Adjusted button color to blue */}

    </aside>
  );
}

export default Sidebar;
