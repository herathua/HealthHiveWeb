
import React from 'react'
import './BodyContent.css'
import PationListComponent from '../PationListComponent/PationListComponent';
import QrCodeContent from '../QrCodeContent/QrCodeContent';
import SideBarContent from '../SideBarContent/SideBarContent';
function BodyContent() {
  return (
    <>
      <div>
        <SideBarContent />
      </div>
      <div>
        <PationListComponent />
      </div>
      <div>
        <QrCodeContent />
      </div>

    </>
  )
}

export default BodyContent