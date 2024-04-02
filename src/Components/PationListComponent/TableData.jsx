import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';

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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">
          View
        </button>
      </TableCell>
    </TableRow>
  );
}

export default TableData;