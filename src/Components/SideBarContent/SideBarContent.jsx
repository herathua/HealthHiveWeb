import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload, faSearch, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function SideBarContent() {
  return (
    <div className="flex flex-col items-center justify-between h-full bg-gray-800 text-white py-4">
      <div>
        {/* Home Button */}
        <button className="sidebar-btn">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </button>

        {/* Upload Button */}
        <button className="sidebar-btn">
          <FontAwesomeIcon icon={faUpload} className="mr-2" />
          Upload
        </button>

        {/* Scan Button */}
        <button className="sidebar-btn">
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Scan
        </button>

        {/* Help Center Button */}
        <button className="sidebar-btn">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Help Center
        </button>
      </div>

      {/* Logout Button */}
      <button className="sidebar-btn mt-4">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Log Out
      </button>
    </div>
  );
}
export default SideBarContent