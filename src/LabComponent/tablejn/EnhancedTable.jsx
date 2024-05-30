import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const LabRequestTable = () => {
  const [labRequests, setLabRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLabRequests();
    const interval = setInterval(fetchLabRequests, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLabRequests = async () => {
    try {
      const response = await axios.get('http://localhost:33000/api/labRequests/lab/4');
      const requests = response.data;

      const formattedRequests = await Promise.all(requests.map(async (request) => {
        const userName = await fetchUserName(request.user);
        const status = await checkUploadStatus(request.id);
        return {
          id: request.id,
          description: request.description,
          userName: userName,
          userId: request.user,
          status: status || 'Not Uploaded',
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

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:33000/api/users/${userId}`);
      setSelectedUser(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleFileUpload = async (labRequestId) => {
    try {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.click();

      fileInput.onchange = async () => {
        const file = fileInput.files[0];
        const filePath = await uploadFile(file);
        const labDataUploadId = await handleLabDataUpload(labRequestId, file.name);
        await handleFileMetadata(file.name, file.type, filePath, new Date().toISOString(), labDataUploadId);
        fetchLabRequests(); // Refresh lab requests after upload
      };
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:33000/api/ipfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleLabDataUpload = async (labRequestId, description) => {
    try {
      const response = await axios.post('http://localhost:33000/api/labDataUploads', {
        description,
        labRequest: labRequestId,
      });
      return response.data;
    } catch (error) {
      console.error('Error handling lab data upload:', error);
      return null;
    }
  };

  const handleFileMetadata = async (fileName, fileType, filePath, createdDate, labDataUploadId) => {
    try {
      const response = await axios.post('http://localhost:33000/api/files', {
        name: fileName,
        type: fileType,
        filePath,
        createdDate,
        labDataUpload: labDataUploadId,
      });
      console.log('File metadata uploaded:', response.data);
    } catch (error) {
      console.error('Error handling file metadata:', error);
    }
  };

  const checkUploadStatus = async (labRequestId) => {
    try {
      const response = await axios.get(`http://localhost:33000/api/labDataUploads/lab/${labRequestId}`);
      if (response.data) {
        return 'Uploaded';
      } else {
        return 'Not Uploaded';
      }
    } catch (error) {
      return null;
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>Lab Requests</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Upload</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labRequests.map((request) => (
              <TableRow key={request.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{request.id}</TableCell>
                <TableCell>
                  <Button onClick={() => fetchUserDetails(request.userId)}>{request.userName}</Button>
                </TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell><Button onClick={() => handleFileUpload(request.id)}>Upload</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          {selectedUser && (
            <div>
              <h2>{selectedUser.fullName}</h2>
              <p>Email: {selectedUser.email}</p>
              <p>Telephone: {selectedUser.telephoneNumber}</p>
              <p>Gender: {selectedUser.gender}</p>
              <p>Age: {selectedUser.age}</p>
              <p>Date of Birth: {selectedUser.dateOfBirth}</p>
              <p>Birth Certificate Number: {selectedUser.birthCertificateNumber}</p>
              <p>NIC: {selectedUser.nic}</p>
              <p>Emergency Contact: {selectedUser.emergencyContactName}</p>
              <p>Emergency Contact Number: {selectedUser.emergencyContactNumber}</p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default LabRequestTable;