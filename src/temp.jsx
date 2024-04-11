import React, { useState } from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// TableData component to represent a single row of data
function TableData({ patient, onDelete, onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Add your file upload logic here
    if (file) {
      onFileUpload(file);
    } else {
      alert('Please select a file to upload.');
    }
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
          <Tooltip describeChild title="Upload a file">
            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id={`file-input-${patient.id}`} />
            <label htmlFor={`file-input-${patient.id}`}>
              <Button component="span">Add</Button>
            </label>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(patient.id)}>
              <DeleteIcon className="text-red-500" />
            </IconButton>
          </Tooltip>
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableData;
