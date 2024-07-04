import React, { useState, useEffect } from 'react';
import QRCode from "qrcode.react";
import { Box, Typography, Button } from '@mui/material';
import { jsPDF } from "jspdf";
import 'tailwindcss/tailwind.css';
import ProfilePictureUploader from './UserAvatar';
import { fetchLabInfo } from '../../services/apiService';
import Skeleton from '@mui/material/Skeleton';


function App() {
  const [labInfo, setLabInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response =  await fetchLabInfo();
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
    pdf.text(labInfo.labName, 145, 30, { align: "center" });
    pdf.save(`${String(labInfo.id)}-QRCode.pdf`);
    console.log(labInfo);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 p-5 pb-5">
      <h1 className="text-4xl font-bold mb-4">QR Code</h1>
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
              <div className="mt-4 text-2xl font-bold text-gray-800">{labInfo ? labInfo.labName : <Skeleton className="p-1" variant="rectranfle" width={150} height={12} />}</div>
              <div className="text-sm text-gray-500">{labInfo ? labInfo.email : <Skeleton className="p-1" variant="rectranfle" width={150} height={12} />}</div>
              {labInfo ? <Button
                variant="contained"
                color="primary"
                onClick={downloadQRCodeAsPDF}
                className="mt-4"
              >
                Download QR Code as PDF
              </Button>:<Skeleton className="p-1" variant="rectranfle" width={250} height={50} />}
            </div>
          </Box>
          <Box className="flex flex-col items-center p-border-1 border-blue-400 object-cover shadow-md rounded-lg ml-7">
            {loading ? (
              <Skeleton variant="rectranfle" width={300} height={300} />
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
