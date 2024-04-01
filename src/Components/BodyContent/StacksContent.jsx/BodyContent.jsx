
import React from 'react'
import './BodyContent.css'
import Stack from 'react-bootstrap/Stack';
import QRCode from 'react-qr-code';

function BodyContent() 
{
  return (
    <>
    <div>
      
      </div>
    <div>
    <Stack gap={3}>
      <div className="p-2" style={{ backgroundColor: "red" }}>First item</div>
      <div className="p-2" style={{ backgroundColor: "blue" }}>Second item</div>
      <div className="p-2" style={{ backgroundColor: "green" }}>Third item</div>
    </Stack>
    </div>
    <div>
    <QRCode
    value="https://www.npmjs.com/package/html-to-pdfmake"
    size={290}
    />
    </div>
    </>
  )
}

export default BodyContent