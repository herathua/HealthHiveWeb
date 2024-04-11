import React, { useState, useEffect } from 'react';
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// TableData component to represent a single row of data
function TableData({ patient, onDelete }) {
  const handleDelete = () => {
    onDelete(patient.id);
  };

  return (
    <TableRow>
      <TableCell>{patient.id}</TableCell>
      <TableCell>{patient.description}</TableCell>
      <TableCell>{patient.invoice}</TableCell>
      <TableCell>{patient.user}</TableCell>
      <TableCell>{patient.lab}</TableCell>
      <TableCell>
        <div>
          <Tooltip describeChild title="Does not Upload if it already exists.">
            <Button>add</Button>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon className="text-red-500" />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}

function PationListComponent() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:33000/api/labRequests', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setPatients(data))
    .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const deletePatient = (id) => {
    const newPatients = patients.filter(patient => patient.id !== id);
    setPatients(newPatients);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Table>
        <thead>
          <TableRow isHeader>
            <TableCell isHeader>id</TableCell>
            <TableCell isHeader>description</TableCell>
            <TableCell isHeader>invoice</TableCell>
            <TableCell isHeader>user</TableCell>
            <TableCell isHeader>lab</TableCell>
            <TableCell isHeader>Upload/delete</TableCell>
          </TableRow>
        </thead>
        
        <tbody>
          {patients.map((patient) => (
            <TableData key={patient.id} patient={patient} onDelete={deletePatient} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PationListComponent;
