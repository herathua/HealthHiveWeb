import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { jsPDF } from "jspdf";
import 'tailwindcss/tailwind.css';
import { fetchLabInfo } from '../../services/apiService';

function App() {
  const [labInfo, setLabInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchLabInfo();
        setLabInfo(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("There was an error fetching the lab information.");
        console.error("Error fetching lab information:", error);
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
      format: [290, 350]
    });

    pdf.addImage(imgData, 'PNG', 5, 5, 280, 280);
    pdf.save(`${String(labInfo.id)}-QRCode.pdf`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 pt-3 p-5">
      <h1 className="text-4xl font-bold mb-4">Qr code</h1>
      <Box className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-blue-500">
        <Typography variant="h4" component="h2" fontWeight="bold">
          {labInfo ? labInfo.labName : "Loading..."}
        </Typography>
        <Box className="flex flex-col sm:flex-row justify-center items-center mt-4">
          <Box className="mr-0 sm:mr-4 text-left">
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
              labInfo && (
                <>
                  <QRCode
                    id="qr-gen"
                    value={String(labInfo.id)}
                    size={300}
                    level="H"
                    includeMargin={true}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadQRCodeAsPDF}
                    className="mt-4"
                  >
                    Download QR Code as PDF
                  </Button>
                </>
              )
            )}
            {error && (
              <Typography color="error" variant="body1">
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
