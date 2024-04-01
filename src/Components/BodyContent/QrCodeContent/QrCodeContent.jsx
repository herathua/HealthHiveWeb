import React from 'react'
import QRCode from "react-qr-code";
function QrCodeContent() {
  return (
    
    <div>
    <QRCode
    value="https://www.npmjs.com/package/html-to-pdfmake"
    size={290}
    />
    </div>
  )
}
export default QrCodeContent