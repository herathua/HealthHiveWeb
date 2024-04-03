import QRCode from "qrcode.react";

function App() {
  const qrValue = "Apple";
  
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
<div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <h1 className="text-2xl font-bold text-gray-800 mb-8">QR Code and Download</h1>

  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    <QRCode
      id="qr-gen"
      value={qrValue}
      size={290}
      level={"H"}
      includeMargin={true}
    />
    {/* Wrapping the button with a div to center it */}
    <div className="flex justify-center mt-4">
      <button type="button" onClick={downloadQRCode} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
        Download QR Code
      </button>
    </div>
  </div>
</div>

  );
}

export default App;
