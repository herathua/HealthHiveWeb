import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";

function App() {
  const [labInfo, setLabInfo] = useState({ email: "loading..." });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:33000/api/labs/3');
        setLabInfo(response.data);
      } catch (error) {
        console.error("There was an error fetching the lab information: ", error);
        setLabInfo({ email: "error" });
      }
    };

    fetchData();
  }, []);

  const downloadQRCodeAsPDF = () => {
    const canvas = document.getElementById("qr-gen");
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [290, 350]  // Adjust the PDF size as needed
    });

    pdf.addImage(imgData, 'PNG', 5, 5, 280, 280);  // Adjust image position and size as needed
    pdf.save(`${labInfo.id}-QRCode.pdf`);  // Use lab email in the PDF filename
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">QR Code and Download</h1>

      <div>
        <QRCode
          id="qr-gen"
          value={labInfo.id}
          size={290}
          level={"H"}
          includeMargin={true}
        />
        <div className="flex justify-center mt-4">
          <button type="button" onClick={downloadQRCodeAsPDF} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
            Download QR Code as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
