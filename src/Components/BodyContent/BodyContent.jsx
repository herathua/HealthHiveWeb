
import React from 'react'
import './BodyContent.css'
import PationListComponent from '../PationListComponent/PationListComponent';
import QrCodeContent from '../QrCodeContent/QrCodeContent';
function BodyContent() {
  return (
    <>
      <div className="flex-1 p-10">
        <div>
          <PationListComponent />
        </div>
        <div>
          <QrCodeContent />
        </div>
      </div>
    </>
  )
}

export default BodyContent