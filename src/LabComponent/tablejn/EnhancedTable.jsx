import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const LabRequestTable = () => {
  const [labRequests, setLabRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLabRequests();
    const interval = setInterval(fetchLabRequests, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLabRequests = async () => {
    try {
      const response = await axios.get('http://localhost:33000/api/labRequests/lab/2');
      const requests = response.data;

      const formattedRequests = await Promise.all(requests.map(async (request) => {
        const userName = await fetchUserName(request.user);
        const status = await checkUploadStatus(request.id); // Check upload status
        return {
          id: request.id,
          description: request.description,
          userName: userName,
          userId: request.user,
          status: status || 'Not Uploaded', // Default status if not found
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
      setShowModal(true);
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
              <td>
                <button onClick={() => fetchUserDetails(request.userId)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                  {request.userName}
                </button>
              </td>
              <td>{request.description}</td>
              <td>{request.status}</td>
              <td><button onClick={() => handleFileUpload(request.id)}>Upload</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Telephone Number:</strong> {selectedUser.telephoneNumber}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Date of Birth:</strong> {selectedUser.dateOfBirth}</p>
              <p><strong>Birth Certificate Number:</strong> {selectedUser.birthCertificateNumber}</p>
              <p><strong>NIC:</strong> {selectedUser.nic}</p>
              <p><strong>Emergency Contact Name:</strong> {selectedUser.emergencyContactName}</p>
              <p><strong>Emergency Contact Number:</strong> {selectedUser.emergencyContactNumber}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LabRequestTable;
