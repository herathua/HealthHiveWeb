import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";

function App() {
  // Step 1: Initialize state
  const [labInfo, setLabInfo] = useState({ email: "loading..." }); // Default or loading state

  // Step 2: Fetch lab information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:33000/api/labs/3');
        setLabInfo(response.data); // Update state with fetched data
      } catch (error) {
        console.error("There was an error fetching the lab information: ", error);
        setLabInfo({ email: "error" }); // Error state
      }
    };

    fetchData();
  }, []); // The empty dependency array means this effect runs once on mount

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${labInfo.email}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">QR Code and Download</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {/* Step 3: Use the lab's email for the QR code */}
        <QRCode
          id="qr-gen"
          value={labInfo.email} // Use lab email from state
          size={290}
          level={"H"}
          includeMargin={true}
        />
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
