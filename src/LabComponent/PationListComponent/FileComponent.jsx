import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileComponent({ patientId, labRequestUrl, userUrl }) {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  // Load existing files for the patient when the component mounts or when patientId changes
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get(`${labRequestUrl}/files`);
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (patientId) {
      fetchUploadedFiles();
    }
  }, [patientId, labRequestUrl]);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload (Create)
  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${labRequestUrl}/files`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploadedFiles((prevFiles) => [...prevFiles, response.data]);
        setFile(null); // Clear the file input
      } catch (error) {
        setUploadError('Error uploading file');
        console.error('Upload failed:', error);
      }
    }
  };

  // Handle file deletion (Delete)
  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`${labRequestUrl}/files/${fileId}`);
      setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md"> {/* Card-like container */}
      <h2 className="text-2xl font-semibold mb-4">Upload File</h2> {/* Heading with larger font size */}
      <p className="text-gray-700">Patient ID: {patientId}</p> {/* Display the patient ID with gray text */}
      
      {/* File input and upload button */}
      <div className="flex items-center space-x-4 mt-4"> {/* Flex layout for file input and button */}
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-lg"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          &#8679; {/* Unicode for upload arrow */}
          <span>Upload</span>
        </button>
      </div>

      {/* Display uploaded files with delete actions */}
      <h3 className="text-xl font-semibold mt-6">Uploaded Files</h3> {/* Sub-heading */}
      <ul className="mt-4">
        {uploadedFiles.map((file) => (
          <li
            key={file.id}
            className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg"
          >
            <span>{file.name}</span> {/* Display file name */}
            <button
              onClick={() => handleDelete(file.id)}
              className="text-red-600 hover:text-red-800 flex items-center space-x-2"
            >
              &#128465; {/* Unicode for trash can */}
              <span>Delete</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Display any error messages */}
      {uploadError && (
        <p className="text-red-600 mt-4">Error: {uploadError}</p> 
      )}
    </div>
  );
}

export default FileComponent;
