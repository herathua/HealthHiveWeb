
import React from 'react';
import LabInfomationContent from '.Components/LabInfomationContent/LabInfomationContent';
import QrCodeContent from '.Components/QrCodeContent/QrCodeContent';
import LabLogin from './LabLogin';
import PationListComponent from './PationListComponent';
import Dashboard from '..Dashboard/Dashboard/Dashboard';

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
  return <div><PationListComponent/></div>;
}

function Component5() {
  return <div><LabLogin/></div>;
}

export { Component1, Component2, Component3, Component4,Component5 };
