import React from 'react';

export default function TableRow({ children, isHeader = false }) {
    const baseStyle = "dark:bg-gray-800 dark:border-gray-700"; // Removed border-b class
    const headerStyle = "bg-gray-50 text-black uppercase text-sm leading-normal"; // Changed text color to black
    const rowStyle = "text-black dark:text-gray-400"; // Changed text color to black
    
    return (
      <tr className={`${baseStyle} ${isHeader ? headerStyle : rowStyle}`}>
        {children}
      </tr>
    );
}
