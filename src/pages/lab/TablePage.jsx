import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
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
import { Typography, IconButton, TextField, colors } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { fetchLabRequestsByLabId, fetchUserUrl, fetchUserName, fetchUserDataByUserId, UplodeFileToIPFS, handleLabDataUploadinAPI, handleFileMetadatainAPI, checkUploadStatusInAPI, handleFileDeleteinAPI } from '.././../services/apiService';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

const LabRequestTable = () => {
  const [labRequests, setLabRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // New state for selected file content
  const [prevRequests, setPrevRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLabRequests();
    const interval = setInterval(fetchLabRequests, 45000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLabRequests = async () => {
    try {
      const requests = await fetchLabRequestsByLabId();
      // Check if there are any changes in requests
      if (!areRequestsEqual(prevRequests, requests)) {
        setPrevRequests(requests); // Update previous requests
        const formattedRequests = await Promise.all(requests.map(async (request) => {
          const userName = await fetchUserName(request.user);
          const avatar = await fetchUserUrl(request.user);
          const status = await checkUploadStatus(request.id);
          //console.log(status);
          return {
            id: request.id,
            description: request.description,
            userName: userName,
            userAvatar: avatar,
            userId: request.user,
            status: status || 'Not Uploaded',
          };
        }));
        setLabRequests(formattedRequests);
      }
    } catch (error) {
      console.error('Error fetching lab requests:', error);
    }
  }

  const areRequestsEqual = (prevRequests, newRequests) => {
    if (prevRequests.length !== newRequests.length) return false;
    for (let i = 0; i < prevRequests.length; i++) {
      if (prevRequests[i].id !== newRequests[i].id) return false;
    }
    return true;
  }

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetchUserDataByUserId(userId);
      setSelectedUser(response);
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
        setSelectedFile(file); // Set selected file content
        setOpen1(true); // Open modal to display file content

        // Store the selected labRequestId in a state variable
        setSelectedLabRequestId(labRequestId);
      };
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileSelect = async () => {
    if (selectedFile && selectedLabRequestId) {
      try {
        setLoading(true);
        const filePath = await uploadFile(selectedFile);
        const labDataUploadId = await handleLabDataUpload(selectedLabRequestId, selectedFile.name);
        await handleFileMetadata(selectedFile.name, selectedFile.type, filePath, new Date().toISOString(), labDataUploadId);
        fetchLabRequests(); // Refresh lab requests after upload
        setLoading(false);
        setOpen1(false); // Close the modal
      } catch (error) {
        console.error('Error during file selection process:', error);
      }
    } else {
      //console.log("Select a correct file");
    }
  };

  // New state variable to store the selected lab request ID
  const [selectedLabRequestId, setSelectedLabRequestId] = useState(null);

  // Existing handleClose1 function remains the same
  const handleClose1 = () => {
    setOpen1(false);
    setSelectedFile(null);
    setSelectedLabRequestId(null);
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await UplodeFileToIPFS(file);
      //console.log('File uploaded successfully:', response);
      return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleLabDataUpload = async (labRequestId, description) => {
    try {
      const response = await handleLabDataUploadinAPI(labRequestId, description);
      return response;
    } catch (error) {
      console.error('Error handling lab data upload:', error);
      return null;
    }
  };

  const handleFileMetadata = async (fileName, fileType, filePath, createdDate, labDataUploadId) => {
    try {
      //console.log('File metadata:', fileName, fileType, filePath, createdDate, labDataUploadId);
      const response = await handleFileMetadatainAPI(fileName, fileType, filePath, createdDate, labDataUploadId);
    } catch (error) {
      console.error('Error handling file metadata:', error);
    }
  };

  const checkUploadStatus = async (labRequestId) => {
    try {
      const response = await checkUploadStatusInAPI(labRequestId);
      //console.log('Upload status:', response);
      return response;
    } catch (error) {
      console.error('Error checking upload status:', error);
      return null;
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = labRequests.filter((request) =>
    request.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleFileDelete = async (labRequestId) => {
  //   //console.log('Delete file:', labRequestId);
  //   try {
  //     await handleFileDeleteinAPI(labRequestId);
  //     //console.log('File deleted successfully:', response);
  //     fetchLabRequests(); // Refresh lab requests after delete
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //   }
  // }

  return (

    <div className="p-16 ">
      <Box>
        <Typography variant="h4"
          component="h2"
          fontWeight="bold"
        >
          Lab Requests
        </Typography>
      </Box>

      <Box borderRadius={8} p={2} mx="auto" display="block" margin={2}>
        <TextField

          label="Search User Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 400, mx: 'auto', display: 'block' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-blue-100">
            <TableRow className="text-left">
              <TableCell className="font-semibold">Request ID</TableCell>
              <TableCell className="font-semibold">User Name</TableCell>
              <TableCell className="font-semibold">Description</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold">Upload</TableCell>
              {/* <TableCell className="font-semibold">Delete</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
  {filteredRequests.map((request) => (
    <TableRow 
      key={request.id} 
      sx={{ 
        '&:last-child td, &:last-child th': { border: 0 }, 
        padding: 0 // minimize padding for the row
      }}
    >
      <TableCell 
        component="th" 
        scope="row" 
        sx={{ padding: '4px' }} // minimize padding for the cell
      >
        <img
          src={request.userAvatar}
          alt={request.customerName}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: '4px' }}>
        <Button onClick={() => fetchUserDetails(request.userId)}>
          {request.userName}
        </Button>
      </TableCell>
      <TableCell sx={{ padding: '4px' }}>{request.description}</TableCell>
      <TableCell sx={{ padding: '4px' }}>
        {request.status === 'Uploaded' ? (
          <Tooltip title="File Uploaded">
            <CheckCircleIcon color="success" />
          </Tooltip>
        ) : (
          <Tooltip title="Upload Pending">
            <PendingActionsIcon color="info" />
          </Tooltip>
        )}
      </TableCell>
      <TableCell sx={{ padding: '4px' }}>
        <Tooltip title="Upload file">
          <Button onClick={() => handleFileUpload(request.id)}>
            <FileOpenIcon />
          </Button>
        </Tooltip>
      </TableCell>
      {/* <TableCell sx={{ padding: '4px' }}>
        <Tooltip title="Delete request">
          <Button onClick={() => handleFileDelete(request.id)}>
          <DeleteIcon sx={{ color: red[500] }} />
          </Button>
        </Tooltip>
      </TableCell> */}
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>

      <Modal open={open1} onClose={handleClose1}>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            p: 4,
          }}

        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

            <Typography variant="h6" component="h2" fontWeight="bold">
              File Details

            </Typography>
            <IconButton onClick={handleClose1}>
              <CloseIcon />
            </IconButton>
          </Box>
          {loading ? (
            <LinearProgress />
          ) : (
            <Box sx={{ alignItems: 'center', marginBottom: 2, borderBottom: 'solid 2px #666' }}></Box>
          )}
          {selectedFile && (
            <div>
              <Typography variant="body1">File Name: {selectedFile.name}</Typography>
              <Typography variant="body1">File Size: {(selectedFile.size / 1024).toFixed(2)} KB</Typography>
              <Box sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                {selectedFile.type === 'application/pdf' ? (
                  <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="400px" />
                ) : selectedFile.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} style={{ width: '100%' }} />
                ) : (
                  <Typography variant="body1">Unsupported file type</Typography>
                )}
              </Box>
            </div>
          )}
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleFileSelect} variant="contained" color="primary" sx={{ mr: 2 }}>Select</Button>
            <Button onClick={handleClose1} variant="contained" color="secondary">Not Select</Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            p: 4
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', mb: 2,
            borderBottom: "solid 1px #666"
          }}>
            <Typography variant="h6"
              component="h2"
              fontWeight="bold"
            >
              Customer Details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedUser && (
            <div>
              <Typography variant="body1">Full Name: {selectedUser.fullName}</Typography>
              <Typography variant="body1">Email: {selectedUser.email}</Typography>
              <Typography variant="body1">Telephone: {selectedUser.telephoneNumber}</Typography>
              <Typography variant="body1">Gender: {selectedUser.gender}</Typography>
              <Typography variant="body1">Age: {selectedUser.age}</Typography>
              <Typography variant="body1">Date of Birth: {selectedUser.dateOfBirth}</Typography>
              <Typography variant="body1">Birth Certificate Number: {selectedUser.birthCertificateNumber}</Typography>
              <Typography variant="body1">NIC: {selectedUser.nic}</Typography>
              <Typography variant="body1">Emergency Contact: {selectedUser.emergencyContactName}</Typography>
              <Typography variant="body1">Emergency Contact Number: {selectedUser.emergencyContactNumber}</Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default LabRequestTable;