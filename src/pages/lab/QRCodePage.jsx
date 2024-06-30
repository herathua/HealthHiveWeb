import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from "qrcode.react";
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { jsPDF } from "jspdf";
import 'tailwindcss/tailwind.css';
import profilePicture from '../../assets/download.png';
import ProfilePictureUploader from './UserAvatar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const name = "ABC laboratery";
const email = "abc@ gmail.com";

function App() {
  const [labInfo, setLabInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = 1;
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
      <Box className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-blue-100 mr-6">
        <Typography variant="h4" component="h2" fontWeight="bold">
          {labInfo ? labInfo.labName : "Loading..."}
        </Typography>
        <Box className="flex flex-col sm:flex-row justify-center items-center mt-4">
          <Box className="mr-0 sm:mr-4 text-left">
            <div className="flex flex-col items-center p-4">
              <div className="relative w-32 h-32">
                <ProfilePictureUploader />
              </div>

              <div className="mt-4 text-2xl font-bold text-gray-800">{name}</div>
              <div className="text-sm text-gray-500">{email}</div>
              <Button
                variant="contained"
                color="primary"
                onClick={downloadQRCodeAsPDF}
                className="mt-4"
              >
                Download QR Code as PDF
              </Button>
            </div>

          </Box>
          <Box className=" flex flex-col items-center p-border-1 border-blue-400 object-cover shadow-md rounded-lg ml-7">
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
