import React from 'react';
import logo from '../../assets/logo.png';
import lablogo from '../../assets/lab logo.jpeg';


function HeaderContent() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-blue-200">
      <div className="to-blue-700">
        <div className="flex items-center space-x-2 ">
          <div className="p-2 ">
            <img src={logo} alt="HealthHive Logo" className="w-10 h-10 " />
          </div>
          <h1 className="text-xl font-bold text-blue-800">HealthHive</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-white rounded-full">
          <img src={lablogo} alt="ASIRI Logo" className="w-10 h-10" />
        </div>
        <div className="px-3 py-1 bg-white rounded-full">
          <h2 className="text-lg font-semibold text-blue-800">ASIRI - CENTRAL HOSPITAL</h2>
        </div>
      </div>
      
    </div>
  );
}

export default HeaderContent;


