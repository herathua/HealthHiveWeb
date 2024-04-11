import React from 'react';

function Sidebar({ isOpen, toggleSidebar, handleComponentChange }) {
  return (
    <aside className={`bg-gray-200 w-64 p-4 ${isOpen ? '' : 'hidden'} md:block`}>
      <button onClick={() => handleComponentChange(1)} className="block w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Component 1</button>
      <button onClick={() => handleComponentChange(2)} className="block w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Component 2</button>
      <button onClick={() => handleComponentChange(3)} className="block w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Component 3</button>
      <div className="mb-4">
        <button onClick={() => handleComponentChange(4)} className="block w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Component 4</button>
        <button onClick={() => handleComponentChange(5)} className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Component 5</button>
      </div>
    </aside>
  );
}

export default Sidebar;
