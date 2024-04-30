import React, { useState } from 'react';
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import PatientDataContainer from '../../CustomerDetsails/PatientDataContainer';

function PatientListComponent() {
  const dummyPatients = [
    { id: 1, description: 'Blood Test', invoice: 'INV001', user: 'John Doe', lab: 'Lab A' },
    { id: 2, description: 'X-Ray', invoice: 'INV002', user: 'Jane Smith', lab: 'Lab B' },
    { id: 3, description: 'MRI', invoice: 'INV003', user: 'Alice Johnson', lab: 'Lab C' }
  ];

  const [patients, setPatients] = useState(dummyPatients);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  const deletePatient = (id) => {
    try {
      const updatedPatients = patients.filter(patient => patient.id !== id);
      setPatients(updatedPatients);
    } catch (error) {
      setError('Error deleting patient');
      setOpenSnackbar(true);
      console.error('Error deleting patient:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Uploading file:', file.name);
    // Perform further actions here such as uploading to a server or local processing
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
                  {patient.user}
                </Link>
              </TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <IconButton color="warning" onClick={() => deletePatient(patient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Upload File">
                  <IconButton color="primary" component="label">
                    <CloudUploadIcon />
                    <input
                      type="file"
                      hidden
                      onChange={handleFileUpload}
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedPatientId && <PatientDataContainer patientId={selectedPatientId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PatientListComponent;
