import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

function QrCodeContent() {
  const [value, setValue] = useState(''); // Start with an empty string

  useEffect(() => {
    // Define the function that will fetch the data
    const fetchUrl = async () => {
      try {
        const response = await fetch('https://api.example.com/qr-code');
        const data = await response.json();
        // Assuming the API returns an object with a 'url' property
        setValue(data.url);
      } catch (error) {
        console.error('Error fetching QR code URL:', error);
        // Handle errors or set a default value if necessary
      }
    };

    // Call the function
    fetchUrl();
  }, []); // The empty array causes this effect to only run on mount

  // Only render the QRCode component if 'value' has been set
  return (
    <div>
      {value ? (
        <QRCode
          value={value}
          size={290}
        />
      ) : (
        <p>Loading...</p> // Show a loading state or some placeholder
      )}
    </div>
  );
}

export default QrCodeContent;
