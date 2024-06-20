import React from 'react';
import SettingsComponent from '../SettingsComponent/SettingsComponent';
import QrCodeContent from '../QrCodeContent/QrCodeContent';
import PatientListComponent from '../PationListComponent/PationListComponent';
import EnhancedTable from '../tablejn/EnhancedTable';
function Component2() {
  return <div><EnhancedTable/></div>;
}

function Component3() {
  return <div><QrCodeContent/></div>;
}

function Component4() {
  return <div><PatientListComponent/></div>;
}

function Component5() {
  return <div><SettingsComponent/></div>;
}

export { Component2,Component3, Component4,Component5 };
