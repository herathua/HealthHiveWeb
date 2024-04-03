import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

function App() {
  // Initialize qrValue with null or an empty string
  const [qrValue, setQrValue] = useState('');

  // Function to download the QR code
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-gen');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Fetch QR value when the component mounts
  useEffect(() => {
    fetch('YOUR_API_ENDPOINT')
      .then(response => response.json())
      .then(data => {
        // Assuming the API returns a JSON object with a property that holds the QR code value
        setQrValue(data.qrCodeValue); // Adjust 'qrCodeValue' according to your API response structure
      })
      .catch(error => console.error('Error fetching QR code value:', error));
  }, []); // The empty array means this effect runs once after the initial render

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">QR Code and Download</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {qrValue ? (
          <>
            <QRCode
              id="qr-gen"
              value={qrValue}
              size={290}
              level={"H"}
              includeMargin={true}
            />
            <div className="flex justify-center mt-4">
              <button type="button" onClick={downloadQRCode} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                Download QR Code
              </button>
            </div>
          </>
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
    </div>
  );
}

export default App;
