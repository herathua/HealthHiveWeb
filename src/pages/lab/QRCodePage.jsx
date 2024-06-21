import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";
import { Box, Typography, CircularProgress } from '@mui/material';
import { jsPDF } from "jspdf";
import 'tailwindcss/tailwind.css';
import { fetchLabInfo } from '../../services/apiService';

function App() {
  const [labInfo, setLabInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchLabInfo();
        //console.log('API response:', response);
        setLabInfo(response);
        setLoading(false);
      } catch (error) {
        setLoading(false); // Set loading to false on error
        console.error("There was an error fetching the lab information: ", error);
      }
    };

    fetchData();
  }, []);

  const downloadQRCodeAsPDF = () => {
    if (!labInfo) {
      return;
    }

    const canvas = document.getElementById("qr-gen");
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [290, 350]  // Adjust the PDF size as needed
    });

    pdf.addImage(imgData, 'PNG', 5, 5, 280, 280);  // Adjust image position and size as needed
    pdf.save(`${String(labInfo.id)}-QRCode.pdf`);  // Convert lab ID to string
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Box className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-blue-500">
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            {labInfo ? labInfo.labName : "Loading..."}
          </Typography>
        </Box>
        <Box className="flex flex-row justify-center items-center">
          <Box className="mr-4 text-left">
            <Typography variant="body1" className="mb-2">
              1. Open the lab report sharing app on your phone.
            </Typography>
            <Typography variant="body1" className="mb-2">
              2. Navigate to the "Scan" option in the app.
            </Typography>
            <Typography variant="body1" className="mb-2">
              3. Point your phone's camera at this QR code to identify the lab.
            </Typography>
            <Typography variant="body1" className="mb-2">
              4. Once the lab is identified, we can share the lab reports.
            </Typography>
          </Box>
          <Box className="flex flex-col items-center p-3">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {labInfo && (
                  <>
                    <QRCode
                      id="qr-gen"
                      value={String(labInfo.id)}  // Ensure the value is a string
                      size={300}
                      level={"H"}
                      includeMargin={true}
                    />
                    <button
                      type="button"
                      onClick={downloadQRCodeAsPDF}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Download QR Code as PDF
                    </button>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
