import React from 'react'

export default function TableCell({ children, isHeader = false }) {
    const baseStyle = "p-4 text-left";
    const headerStyle = "font-semibold";
    const cellStyle = "";
    
    return (
      <td className={`${baseStyle} ${isHeader ? headerStyle : cellStyle}`}>
        {children}
      </td>
    );
  }
