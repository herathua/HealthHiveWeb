import React from 'react';

export default function TableCell({ children, isHeader = false }) {
    const baseStyle = "p-4 text-left"; // Adjusted to add rounded corners
    const headerStyle = "font-semibold bg-blue-500 text-white"; // Blue background color for headers
    const cellStyle = "bg-blue-100"; // Blue background color for cells
    
    return (
        <td className={`${baseStyle} ${isHeader ? headerStyle : cellStyle} border-none`}> {/* Added border-none class */}
            {children}
        </td>
    );
}
