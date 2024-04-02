import React from 'react';
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// TableData component to represent a single row of data
function TableData({ patient }) {
  return (
    <TableRow>
      <TableCell>{patient.nic}</TableCell>
      <TableCell>{patient.name}</TableCell>
      <TableCell>{patient.address}</TableCell>
      <TableCell>{patient.reportStatus}</TableCell>
      <TableCell>{patient.date}</TableCell>
      <TableCell>{patient.time}</TableCell>
      <TableCell>
        <div>
          <Tooltip describeChild title="Does not Uplode if it already exists.">
            <Button>add</Button>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon className="text-red-500" />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
}

function PationListComponent() {
  // Example patient data, this would likely come from props or state in a real application
  const patients = [
    { nic: '987654321v', name: 'Christian Bale', address: 'Kandy', reportStatus: 'Pending', date: '2021-09-09', time: '10.00', Action: 'View' },{ nic: '987654321v', name: 'Christian Bale', address: 'Kandy', reportStatus: 'Pending', date: '2021-09-09', time: '10.00', Action: 'View' }
    // ... other patient objects
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Table>
        <thead>
          <TableRow isHeader>
            <TableCell isHeader>Nic no</TableCell>
            <TableCell isHeader>Name</TableCell>
            <TableCell isHeader>Address</TableCell>
            <TableCell isHeader>Report</TableCell>
            <TableCell isHeader>Date</TableCell>
            <TableCell isHeader>Time</TableCell>
            <TableCell isHeader>Uplode/deleae</TableCell>
          </TableRow>
        </thead>
        
        <tbody>
          {patients.map((patient, index) => (
            <TableData key={index} patient={patient} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PationListComponent;
