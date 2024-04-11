import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";

const cachingKey = 'cachedLabData';
const URL = 'http://localhost:33000/api/labs/3';
function QrCodeContent() {
  const [labInfo, setLabInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          try {
              // Check if labInfo is already cached
              const cachedLabInfo = localStorage.getItem(cachingKey);
              if (cachedLabInfo) {
                  setLabInfo(JSON.parse(cachedLabInfo));
              } else {
                  const response = await axios.get(URL);
                  setLabInfo(response.data);
                  // Cache the fetched data
                  //localStorage.setItem(cachingKey, JSON.stringify(response.data));
              }
          } catch (error) {
              console.error("There was an error fetching the lab information: ", error);
              setError(true);
          }
      };

      fetchData();
  }, []);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">QR Code and Download</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {error ? ( // Check if there was an error
          <p>Check your internet connection</p>
        ) : (
          labInfo ? ( // Check if labInfo is available
            <>
              <QRCode
                id="qr-gen"
                value={labInfo.email}
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
            <p>Loading QR code...</p>
          )
        )}
      </div>
    </div>
  );
}

export default QrCodeContent;
