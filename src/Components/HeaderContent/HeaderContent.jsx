import React from 'react'
import './HeaderContent.css'
import logo from '../../assets/logo.png'
import lablogo from '../../assets/lab logo.jpeg'

function HeaderContent() {
  return (
    <div className="HeaderContent">
      <div className="logo area">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="healthhive">
          <h1>Health Hive</h1>
        </div>
      </div>
      <div className="lablogo">
        <img src={lablogo} alt="lab_logo" />
      </div>
      <div className="labname">
        <h2>Lab Name</h2>
      </div>
    </div>
  );
}

export default HeaderContent