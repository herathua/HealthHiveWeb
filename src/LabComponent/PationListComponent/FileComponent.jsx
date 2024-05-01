import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileComponent({ labRequestID }) {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!labRequestID) return; // No lab request ID, skip fetching

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:33000/api/files?labRequestId=${labRequestID}`);
        setUploadedFiles(response.data);
        setUploadError(null);
      } catch (error) {
        const errMsg = error.response?.data?.message || 'Error fetching files.';
        setUploadError(errMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [labRequestID]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('No file selected for upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:33000/api/files?labRequestId=${labRequestID}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setUploadedFiles(prevFiles => [...prevFiles, response.data]);
      setFile(null); // Clear the current file
      setUploadError(null);
      fetchFiles(); // Fetch all files again to refresh the list
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error uploading file.';
      setUploadError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Extracted fetching logic into a separate function
  const fetchFiles = async () => {
    if (!labRequestID) return; // Check if labRequestID is available
  
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:33000/api/files?labRequestId=${labRequestID}`);
      setUploadedFiles(response.data);
      setUploadError(null);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error fetching files.';
      setUploadError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFiles();
  }, [labRequestID]); // Call fetchFiles when labRequestID changes
  

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:33000/api/files/${fileId}`);
      setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      setUploadError(null);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error deleting file.';
      setUploadError(errMsg);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
      <p className="text-gray-700">Lab Request ID: {labRequestID}</p>

      <div className="flex items-center space-x-4 mt-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-lg"
          disabled={isLoading}
        />
        <button
          onClick={handleUpload}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          &#8679; <span>Upload</span>
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-6">Uploaded Files</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4">
          {uploadedFiles.map(file => (
            <li key={file.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg">
              <a href={`http://localhost:33000/api/files/${file.id}`} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <button
                onClick={() => handleDelete(file.id)}
                className="text-red-600 hover:text-red-800 flex items-center space-x-2"
              >
                &#128465; <span>Delete</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {uploadError && <p className="text-red-600 mt-4">Error: {uploadError}</p>}
    </div>
  );
}

export default FileComponent;
