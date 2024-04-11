import React from 'react'

export default function TableRow({ children, isHeader = false }) {
    const baseStyle = "border-b dark:bg-gray-800 dark:border-gray-700";
    const headerStyle = "bg-gray-50 text-gray-500 uppercase text-sm leading-normal";
    const rowStyle = "text-gray-700 dark:text-gray-400";
    
    return (
      <tr className={`${baseStyle} ${isHeader ? headerStyle : rowStyle}`}>
        {children}
      </tr>
    );
  }
