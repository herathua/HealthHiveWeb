import React, { useState, useEffect } from 'react';
import axios from 'axios';



const LabRequestTable = () => {
  const [labRequests, setLabRequests] = useState([]);

  useEffect(() => {
    fetchLabRequestsData();
  }, []);

  const fetchLabRequestsData = async () => {
    try {
      const response = await axios.get('http://localhost:33000/api/labRequests/lab/1');
      const requests = response.data;

      const formattedRequests = await Promise.all(requests.map(async (request) => {
        const userName = await fetchUserName(request.user);
        return {
          id: request.id,
          description: request.description,
          userName: userName,
        };
      }));

      setLabRequests(formattedRequests);
    } catch (error) {
      console.error('Error fetching lab requests:', error);
    }
  };

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:33000/api/users/${userId}`);
      return response.data.fullName;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return 'Unknown User';
    }
  };

  const handleFileUpload = async (labRequestId) => {
    try {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.click();

      fileInput.onchange = async () => {
        const file = fileInput.files[0];
        //console.log('Selected File:', file); // Log the selected file
        const filePath = await uploadFile(file);
        //console.log('Uploaded File Path:', filePath); // Log the uploaded file path
        const labDataUploadId = await handleLabDataUpload(labRequestId,  file.name);
        //console.log('Lab Data Upload ID:', labDataUploadId); // Log the lab data upload ID
        const IsUpload =await handleFileMetadata(file.name, file.type, filePath, new Date().toISOString(), labDataUploadId);
        //console.log('File metadata uploaded successfully',filePath); // Log success message
        fetchLabRequestsData(); // Refresh lab requests after upload
      };
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      //console.log('Uploading File:', file); // Log the file being uploaded
      const response = await axios.post('http://localhost:33000/api/ipfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      //console.log('Upload Response:', response.data); // Log the response from the upload
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleLabDataUpload = async (labRequestId, description) => {
    //console.log('description:',description);
    try {
      const response = await axios.post('http://localhost:33000/api/labDataUploads', {
        description,
        labRequest: labRequestId
      });
      //console.log('Lab Data Upload Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error handling lab data upload:', error);
      return null;
    }
  };

  //const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileMetadata = async (fileName, fileType, filePath, createdDate, labDataUploadId) => {
    try {
      const response=await axios.post('http://localhost:33000/api/files', {
        name: fileName,
        type: fileType,
        filePath,
        createdDate,
        labDataUpload: labDataUploadId
      });
      console.log('File metadata uploaded:', response.data);
      //setUploadStatus(response);
      console.log('File metadata uploaded',fileName,fileType,filePath,createdDate,labDataUploadId); // Log the success of metadata upload
    } catch (error) {
      //console.error('Error handling file metadata:', error);
      //setUploadStatus(null);
    }
  };

//{uploadStatus ? 'Uploaded' : 'Not Uploaded'}
  return (
    <div>
      <h2>Lab Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Upload</th>
          </tr>
        </thead>
        <tbody>
          {labRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.userName}</td>
              <td>{request.description}</td>
              <td></td>
              <td><button onClick={() => handleFileUpload(request.id)}>Upload</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabRequestTable;
