import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import PatientDataContainer from '../../CustomerDetsails/PatientDataContainer';
import FileComponent from './FileComponent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

function PatientListComponent() {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:33000/api/labRequests/lab/1');
        const patientData = response.data;
        for (const patient of patientData) {
          const userResponse = await axios.get(`http://localhost:33000/api/users/${patient.user}`);
          patient.userDetails = userResponse.data.fullName; // Store the user's full name in patient data
        }
        setPatients(patientData);
      } catch (error) {
        setError('Failed to load patient details');
        setOpenSnackbar(true);
        console.error('Failed to load patient details:', error);
      }
    };

    fetchPatients();
    const interval = setInterval(fetchPatients, 3000); // Set interval to refresh every 30 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = (patientId) => {
    setSelectedPatientId(patientId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenFileDialog = (patientId) => {
    setSelectedPatientId(patientId);
    setOpenFileDialog(true);
  };

  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:33000/api/labRequests/${id}`);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    } catch (error) {
      setError('Error deleting patient');
      setOpenSnackbar(true);
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
      <Table>
        <thead>
          <TableRow isHeader>
            <TableCell isHeader>id</TableCell>
            <TableCell isHeader>description</TableCell>
            <TableCell isHeader>invoice</TableCell>
            <TableCell isHeader>user</TableCell>
            <TableCell isHeader>Actions</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>{patient.description}</TableCell>
              <TableCell>{patient.invoice}</TableCell>
              <TableCell>
                <Link component="button" onClick={() => handleOpenDialog(patient.id)}>
                  {patient.userDetails || 'Loading...'}
                </Link>
              </TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <IconButton color="warning" onClick={() => deletePatient(patient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Upload File">
                  <IconButton color="primary" onClick={() => handleOpenFileDialog(patient.id)}>
                    <CloudUploadIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Dialog for customer details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedPatientId && <PatientDataContainer patientId={selectedPatientId} />}
        </DialogContent>
      </Dialog>

      {/* Dialog for file upload */}
      <Dialog open={openFileDialog} onClose={handleCloseFileDialog}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          {selectedPatientId && (
            <FileComponent

              labRequestID={`${selectedPatientId}`}
            />
          )}
        </DialogContent>
      </Dialog>
      
    </div>
  );
}

export default PatientListComponent;
