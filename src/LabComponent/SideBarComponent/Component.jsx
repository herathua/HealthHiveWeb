// Component1.js, Component2.js, Component3.js
import React from 'react';
import LabInfomationContent from '../LabInfomationContent/LabInfomationContent';
import QrCodeContent from '../QrCodeContent/QrCodeContent';
//import LabLogin from '../LabLogin/LabLogin';
//import PationListComponent from '../PationListComponent/PationListComponent';
import SettingsComponent from '../SettingsComponent/SettingsComponent';
import Dashboard from '../Dashboard/Dashboard';
import PatientListComponent from '../PationListComponent/PationListComponent';
//import PationListComponent from '../../Components/PationListComponent/PationListComponent';
//import Dashboard from '../../Components/LabInfomationContent/LabInfomationContent';



function Component1() {
  return <div><LabInfomationContent/></div>;
}

function Component2() {
  return <div><QrCodeContent/></div>;
}

function Component3() {
  return <div><Dashboard/></div>;
}

function Component4() {
  return <div><PatientListComponent/></div>;
}

function Component5() {
  return <div><SettingsComponent/></div>;
}

export { Component1, Component2, Component3, Component4,Component5 };
