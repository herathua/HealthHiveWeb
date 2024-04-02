import React, { useRef } from 'react';
import QRCode from 'react-qr-code';

function QrCodeContent2() {
  let value = "https://www.google.com/";
  const qrRef = useRef(null);

  const printQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const qrImgData = canvas.toDataURL("image/png");
    const windowPrint = window.open('', '_blank');
    windowPrint.document.write(`<img src="${qrImgData}" onload="window.print();window.close()" />`);
    windowPrint.focus();
  };

  return (
    <div className="">
      <div ref={qrRef}>
        <QRCode
          value={value}
          size={290}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
          renderAs={"canvas"}
        />
      </div>
      <button onClick={printQRCode}>
        Print QR Code
      </button>
    </div>
  )
}

export default QrCodeContent2;
