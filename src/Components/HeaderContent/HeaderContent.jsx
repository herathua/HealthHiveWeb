import React from 'react';
import logo from '../../assets/logo.png';
import lablogo from '../../assets/lab logo.jpeg';


function HeaderContent() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
        <h1 className="text-xl font-bold">Health Hive</h1>
      </div>
      <div className="flex items-center">
        <img src={lablogo} alt="lab_logo" className="w-12 h-12 mr-2" />
        <h2 className="text-lg font-semibold">Lab Name</h2>
      </div>
    </div>
  );
}

export default HeaderContent;
